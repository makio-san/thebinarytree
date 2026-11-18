import { AGENTS, loadStatus, type StatusFile } from '../agents'

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
  const d = new Date(`${iso}T00:00:00`)
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

function card(id: string, status: StatusFile | null): HTMLElement {
  const info = AGENTS.find((a) => a.id === id)!
  const mine = status?.agents[id]
  const item = el('li', 'agent')

  const head = el('div', 'agent__head')
  head.append(el('strong', 'agent__name', info.name))
  const ran = mine && mine.runs > 0
  const pill = el('span', ran ? 'agent__pill agent__pill--ran' : 'agent__pill', ran ? 'Active' : 'Scheduled')
  head.append(pill)

  const meta = el('dl', 'agent__meta')
  const row = (label: string, value: string): void => {
    meta.append(el('dt', undefined, label), el('dd', undefined, value))
  }
  row('Runs', info.schedule)
  row('Leaves', info.leaves)
  row(
    'Last report',
    ran && mine.last ? `${when(mine.last)} (${mine.runs} ${mine.runs === 1 ? 'day' : 'days'} on record)` : 'None yet',
  )

  item.append(head, el('p', 'agent__job', info.job), meta)
  return item
}

/** The Agents view: who looks after the tree, and what the repository shows they did. */
export async function openAgents(): Promise<void> {
  const overlay = el('div', 'agents')
  overlay.setAttribute('role', 'dialog')
  overlay.setAttribute('aria-modal', 'true')
  overlay.setAttribute('aria-label', 'The agents behind the tree')

  const sheet = el('div', 'agents__sheet')
  const head = el('header', 'agents__head')
  const titles = el('div')
  titles.append(
    el('h2', undefined, 'The agents behind the tree'),
    el(
      'p',
      'agents__lede',
      'Eight AI agents run on a schedule to find new technologies, add them, check them and publish. Nothing reaches the live site without a review.',
    ),
  )
  const close = el('button', 'icon-btn agents__close')
  close.type = 'button'
  close.setAttribute('aria-label', 'Close')
  close.append(el('span', 'icon-x'))
  head.append(titles, close)

  const body = el('div', 'agents__body')
  const summary = el('p', 'agents__summary', 'Loading status')
  const list = el('ul', 'agents__list')
  body.append(summary, list)
  sheet.append(head, body)
  overlay.append(sheet)

  const dismiss = (): void => {
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

  const status = await loadStatus()
  list.replaceChildren(...AGENTS.map((a) => card(a.id, status)))
  if (!status) {
    summary.textContent = 'Status is not available in this build. The agents are scheduled all the same.'
    return
  }
  const active = AGENTS.filter((a) => (status.agents[a.id]?.runs ?? 0) > 0).length
  const built = new Date(status.generatedAt).toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
  summary.textContent = `${AGENTS.length} scheduled, ${active} with a report on record, ${status.merged} ${status.merged === 1 ? 'merge' : 'merges'} published. Counted from the repository at the last build (${built}).`
}
