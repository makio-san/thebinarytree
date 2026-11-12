/**
 * Search: an inline field on desktop, a full screen overlay on a phone.
 *
 * Same input element in both cases. A phone keyboard covers roughly half the
 * viewport, so an inline field at the top would put results underneath it; the
 * overlay puts the field at the top and the results in the space that is left.
 */

import { ERA_BY_ID, formatYear, wikiTitle } from 'the-binary-tree'
import type { TreeNode } from 'the-binary-tree'
import { prefetch } from '../wiki'

export interface SearchHandlers {
  search: (query: string, limit: number) => TreeNode[]
  onPick: (node: TreeNode) => void
  /** The dim second column of a row. Defaults to the parent's name. */
  where?: (node: TreeNode, query: string) => string | undefined
}

export class Search {
  private timer: number | null = null
  private results: TreeNode[] = []
  private cursor = -1

  constructor(
    private readonly root: HTMLElement,
    private readonly input: HTMLInputElement,
    private readonly list: HTMLUListElement,
    private readonly handlers: SearchHandlers,
  ) {
    input.addEventListener('input', () => this.schedule())
    input.addEventListener('focus', () => {
      this.root.dataset.active = 'true'
      if (this.input.value.trim().length >= 2) this.run()
    })
    input.addEventListener('keydown', (event) => this.onKey(event))

    document.addEventListener('pointerdown', (event) => {
      const target = event.target as Node
      if (!this.root.contains(target)) this.close()
    })
  }

  open(): void {
    this.root.dataset.active = 'true'
    this.input.focus()
    this.input.select()
  }

  /** Open with a query already typed, as if the reader had entered it. */
  query(text: string): void {
    this.input.value = text
    this.root.dataset.active = 'true'
    this.input.focus()
    this.run()
  }

  close(): void {
    this.root.dataset.active = 'false'
    this.list.hidden = true
    this.cursor = -1
    this.input.blur()
  }

  clear(): void {
    this.input.value = ''
    this.list.replaceChildren()
    this.list.hidden = true
    this.results = []
    this.cursor = -1
  }

  private schedule(): void {
    if (this.timer) clearTimeout(this.timer)
    this.timer = window.setTimeout(() => this.run(), 90)
  }

  private run(): void {
    const query = this.input.value.trim()
    this.results = query.length < 2 ? [] : this.handlers.search(query, 14)
    this.cursor = -1
    this.render()
    // Warm the top few, so picking one shows its picture immediately.
    for (const node of this.results.slice(0, 4)) prefetch(wikiTitle(node.id))
  }

  private render(): void {
    this.list.replaceChildren()
    if (!this.results.length) {
      const query = this.input.value.trim()
      if (query.length >= 2) {
        this.list.append(this.emptyRow(`Nothing matches "${query}"`))
        this.list.hidden = false
      } else {
        this.list.hidden = true
      }
      return
    }

    this.results.forEach((node, index) => {
      const item = document.createElement('li')
      item.setAttribute('role', 'option')
      const button = document.createElement('button')
      button.type = 'button'
      button.dataset.index = String(index)

      const dot = document.createElement('i')
      dot.className = 'dot'
      const hex = (ERA_BY_ID[(node.data.era as string) ?? '']?.color ?? 0x7c8798)
        .toString(16)
        .padStart(6, '0')
      dot.style.setProperty('--c', `#${hex}`)

      const name = document.createElement('span')
      name.className = 'row__name'
      name.textContent = node.data.name

      const where = document.createElement('span')
      where.className = 'row__where'
      where.textContent =
        this.handlers.where?.(node, this.input.value.trim()) ?? node.parent?.data.name ?? ''

      const year = document.createElement('span')
      year.className = 'row__year'
      year.textContent = formatYear(node.data.year as number | undefined)

      button.append(dot, name, where, year)
      button.addEventListener('click', () => this.pick(index))
      button.addEventListener('pointerenter', () => prefetch(wikiTitle(node.id)))
      item.append(button)
      this.list.append(item)
    })
    this.list.hidden = false
  }

  private emptyRow(text: string): HTMLLIElement {
    const item = document.createElement('li')
    item.className = 'search__empty'
    item.textContent = text
    return item
  }

  private pick(index: number): void {
    const node = this.results[index]
    if (!node) return
    this.clear()
    this.close()
    this.handlers.onPick(node)
  }

  private onKey(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault()
      this.clear()
      this.close()
      return
    }
    if (!this.results.length) return

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const step = event.key === 'ArrowDown' ? 1 : -1
      this.cursor = (this.cursor + step + this.results.length) % this.results.length
      const buttons = this.list.querySelectorAll('button')
      buttons.forEach((b, i) => b.classList.toggle('is-cursor', i === this.cursor))
      buttons[this.cursor]?.scrollIntoView({ block: 'nearest' })
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      this.pick(this.cursor >= 0 ? this.cursor : 0)
    }
  }
}
