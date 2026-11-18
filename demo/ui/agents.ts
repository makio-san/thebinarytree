import {
  AGENTS,
  ago,
  liveEnabled,
  loadStatus,
  nextRun,
  subscribeLive,
  type LiveAgent,
  type LiveSnapshot,
  type StatusFile,
} from '../agents'

const el = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}

const when = (iso: string): string => {
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00` : iso)
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

const clock = (d: Date): string =>
  d.toLocaleString('en-GB', { weekday: 'short', hour: '2-digit', minute: '2-digit' })

const nameOf = (id: string): string => AGENTS.find((a) => a.id === id)?.name ?? id

const running = (snapshot: LiveSnapshot | null): LiveAgent[] =>
  snapshot ? Object.values(snapshot.agents).filter((a) => a.state === 'running') : []

/** The pill on each card: what the agent is doing, or did last. */
function pill(agent: LiveAgent | undefined, ranOnRecord: boolean): HTMLElement {
  if (agent?.state === 'running') {
    const node = el('span', 'agent__pill agent__pill--live')
    node.append(el('span', 'live-dot'), document.createTextNode('Working now'))
    return node
  }
  if (agent?.state === 'failed') return el('span', 'agent__pill agent__pill--failed', 'Last run failed')
  if (agent?.state === 'stale') return el('span', 'agent__pill agent__pill--failed', 'No word since start')
  if (agent?.state === 'done' || ranOnRecord) return el('span', 'agent__pill agent__pill--ran', 'Idle')
  return el('span', 'agent__pill', 'Scheduled')
}

function card(id: string, status: StatusFile | null, snapshot: LiveSnapshot | null): HTMLElement {
  const info = AGENTS.find((a) => a.id === id)!
  const mine = status?.agents[id]
  const now = snapshot?.agents[id]
  const ranOnRecord = Boolean(mine && mine.runs > 0)
  const item = el('li', 'agent')
  item.dataset.state = now?.state ?? 'idle'

  const head = el('div', 'agent__head')
  head.append(el('strong', 'agent__name', info.name), pill(now, ranOnRecord))

  item.append(head)

  if (now?.state === 'running' && now.startedAt) {
    const work = el('div', 'agent__work')
    work.append(el('span', 'agent__bar'), el('span', 'agent__since', `Started ${ago(now.startedAt)}`))
    item.append(work)
  }

  item.append(el('p', 'agent__job', info.job))

  const meta = el('dl', 'agent__meta')
  const row = (label: string, value: string): void => {
    meta.append(el('dt', undefined, label), el('dd', undefined, value))
  }
  row('Runs', info.schedule)
  const next = nextRun(info.cron)
  if (next) row('Next run', `${clock(next)} (${ago(next)})`)
  if (now && now.state !== 'running' && now.finishedAt) {
    row('Last run', `${ago(now.finishedAt)}${now.summary ? `: ${now.summary}` : ''}`)
  } else if (ranOnRecord && mine?.last) {
    row('Last report', `${when(mine.last)} (${mine.runs} ${mine.runs === 1 ? 'day' : 'days'} on record)`)
  } else if (!now) {
    row('Last run', 'None yet')
  }
  row('Leaves', info.leaves)

  item.append(meta)
  return item
}

/** Every agent's recent runs, newest first. */
function feed(snapshot: LiveSnapshot): HTMLElement | null {
  const rows = Object.values(snapshot.agents)
    .flatMap((agent) => agent.runs.map((run) => ({ agent: agent.id, run })))
    .sort((a, b) => (b.run.finishedAt ?? b.run.startedAt).localeCompare(a.run.finishedAt ?? a.run.startedAt))
    .slice(0, 10)
  if (rows.length === 0) return null

  const section = el('section', 'agents__feed')
  section.append(el('h3', undefined, 'Recent activity'))
  const list = el('ol')
  for (const { agent, run } of rows) {
    const li = el('li', `feed__row feed__row--${run.state}`)
    const at = run.finishedAt ?? run.startedAt
    const what =
      run.state === 'running'
        ? 'started working'
        : run.state === 'failed'
          ? `failed${run.summary ? `: ${run.summary}` : ''}`
          : run.summary || 'finished'
    li.append(el('time', 'feed__when', ago(at)), el('strong', undefined, nameOf(agent)), el('span', undefined, what))
    list.append(li)
  }
  section.append(list)
  return section
}

/** The Agents view: who looks after the tree, and what they are doing right now. */
export async function openAgents(): Promise<void> {
  const overlay = el('div', 'agents')
  overlay.setAttribute('role', 'dialog')
  overlay.setAttribute('aria-modal', 'true')
  overlay.setAttribute('aria-label', 'The agents behind the tree')

  const sheet = el('div', 'agents__sheet')
  const head = el('header', 'agents__head')
  const titles = el('div')
  const title = el('h2', undefined, 'The agents behind the tree')
  titles.append(
    title,
    el(
      'p',
      'agents__lede',
      'Eight Claude agents run on a schedule to find new technologies, add them, check them and publish. Nothing reaches the live site without a review.',
    ),
  )
  const close = el('button', 'icon-btn agents__close')
  close.type = 'button'
  close.setAttribute('aria-label', 'Close')
  close.append(el('span', 'icon-x'))
  head.append(titles, close)

  const body = el('div', 'agents__body')
  const now = el('div', 'agents__now')
  now.setAttribute('aria-live', 'polite')
  const summary = el('p', 'agents__summary', 'Loading status')
  const list = el('ul', 'agents__list')
  const feedSlot = el('div')
  body.append(now, summary, list, feedSlot)
  sheet.append(head, body)
  overlay.append(sheet)

  let status: StatusFile | null = null
  let snapshot: LiveSnapshot | null = null

  const render = (): void => {
    list.replaceChildren(...AGENTS.map((a) => card(a.id, status, snapshot)))

    const busy = running(snapshot)
    now.dataset.live = busy.length > 0 ? 'true' : 'false'
    if (busy.length > 0) {
      const line = el('p', 'agents__now-line')
      line.append(
        el('span', 'live-dot live-dot--big'),
        el('strong', undefined, busy.length === 1 ? '1 agent is working right now' : `${busy.length} agents are working right now`),
      )
      const who = el('p', 'agents__now-who', busy.map((a) => `${nameOf(a.id)}, started ${ago(a.startedAt!)}`).join(' · '))
      now.replaceChildren(line, who)
    } else if (snapshot) {
      const upcoming = AGENTS.map((a) => ({ a, at: nextRun(a.cron) }))
        .filter((x): x is { a: (typeof AGENTS)[number]; at: Date } => x.at !== null)
        .sort((x, y) => x.at.getTime() - y.at.getTime())[0]
      const line = el('p', 'agents__now-line')
      line.append(
        el('span', 'live-dot live-dot--idle'),
        el('strong', undefined, 'All agents are idle'),
        document.createTextNode(upcoming ? ` · next up: ${upcoming.a.name}, ${ago(upcoming.at)}` : ''),
      )
      now.replaceChildren(line)
    } else {
      now.replaceChildren()
    }

    const fed = snapshot ? feed(snapshot) : null
    feedSlot.replaceChildren(...(fed ? [fed] : []))

    const active = AGENTS.filter(
      (a) => (status?.agents[a.id]?.runs ?? 0) > 0 || (snapshot?.agents[a.id]?.runs.length ?? 0) > 0,
    ).length
    const parts = [`${AGENTS.length} scheduled`, `${active} have run`]
    if (status) parts.push(`${status.merged} ${status.merged === 1 ? 'merge' : 'merges'} published`)
    summary.textContent = snapshot
      ? `${parts.join(', ')}. Live, checked ${ago(snapshot.fetchedAt)}.`
      : liveEnabled()
        ? `${parts.join(', ')}. Connecting to the live status.`
        : `${parts.join(', ')}. Counted from the repository at the last build.`
  }

  // Keeps "started 4 min ago" honest between polls.
  const tick = setInterval(render, 30_000)
  const unsubscribe = subscribeLive((next) => {
    snapshot = next
    render()
  })

  const dismiss = (): void => {
    clearInterval(tick)
    unsubscribe()
    overlay.remove()
    document.removeEventListener('keydown', onKey, true)
  }
  const onKey = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape') return
    event.stopPropagation()
    dismiss()
  }
  close.addEventListener('click', dismiss)
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) dismiss()
  })
  document.addEventListener('keydown', onKey, true)
  document.body.append(overlay)
  close.focus()

  render()
  status = await loadStatus()
  render()
}

/**
 * Turns the Agents button into a live indicator: a pulsing dot and a count
 * while any agent works, and a short toast whenever one starts or finishes.
 */
export function mountAgentsIndicator(button: HTMLButtonElement, onOpen: () => void): void {
  if (!liveEnabled()) return
  const label = button.querySelector<HTMLElement>('.btn__label')
  const dot = el('span', 'live-dot live-dot--idle')
  dot.setAttribute('aria-hidden', 'true')
  button.prepend(dot)

  const toasts = el('div', 'agent-toasts')
  toasts.setAttribute('aria-live', 'polite')
  document.body.append(toasts)

  const toast = (text: string, kind: 'start' | 'done' | 'failed'): void => {
    const node = el('button', `agent-toast agent-toast--${kind}`)
    node.type = 'button'
    node.append(el('span', kind === 'start' ? 'live-dot' : 'live-dot live-dot--idle'), el('span', undefined, text))
    node.addEventListener('click', () => {
      node.remove()
      onOpen()
    })
    toasts.append(node)
    setTimeout(() => node.classList.add('agent-toast--out'), 7000)
    setTimeout(() => node.remove(), 7600)
  }

  let previous: Record<string, string> | null = null
  subscribeLive((snapshot) => {
    const busy = running(snapshot)
    button.classList.toggle('tools__agents--live', busy.length > 0)
    dot.className = busy.length > 0 ? 'live-dot' : 'live-dot live-dot--idle'
    if (label) {
      label.textContent = busy.length > 0 ? `${busy.length} working` : 'Agents'
    }
    button.title =
      busy.length > 0
        ? `Working now: ${busy.map((a) => nameOf(a.id)).join(', ')}`
        : 'The agents behind the tree: all idle'

    if (!snapshot) return
    const states: Record<string, string> = {}
    for (const agent of Object.values(snapshot.agents)) states[agent.id] = `${agent.state}|${agent.startedAt}|${agent.finishedAt}`
    if (previous) {
      for (const agent of Object.values(snapshot.agents)) {
        if (previous[agent.id] === states[agent.id]) continue
        if (agent.state === 'running') toast(`${nameOf(agent.id)} started working`, 'start')
        else if (agent.state === 'done') toast(`${nameOf(agent.id)} finished${agent.summary ? `: ${agent.summary}` : ''}`, 'done')
        else if (agent.state === 'failed') toast(`${nameOf(agent.id)} failed`, 'failed')
      }
    } else {
      // On arrival, say so once if something is already at work.
      for (const agent of busy) toast(`${nameOf(agent.id)} is working right now`, 'start')
    }
    previous = states
  })
}
