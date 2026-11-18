/**
 * Draws `public/og-image.png`, the picture shown when the site is shared on
 * LinkedIn, X, Slack and the like.
 *
 *   npm run dev   (in another terminal, port 5199)
 *   node scripts/og-image.mjs
 *
 * Opens the dev server in headless Chrome at 1200x630 CSS pixels and 2x density (a 2400x1260 picture, sharp on retina screens), hides the controls, lays
 * the title over the right side and saves a screenshot. Update the numbers in
 * OVERLAY when the tree grows.
 */
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const out = join(import.meta.dirname, '..', 'public', 'og-image.png')
const OVERLAY = `(() => {
  const s = document.createElement('style')
  s.textContent = \`
    #panel,#bottom,#tabbar,.bar--top,.hints,.agent-toasts,[class*=hint]{display:none!important}
    .og{position:fixed;top:0;right:0;bottom:0;width:520px;padding-left:50px!important;background:linear-gradient(90deg,rgb(8 10 17 / 0%),rgb(8 10 17 / 88%) 22%,rgb(8 10 17 / 94%));display:flex;flex-direction:column;justify-content:center;gap:18px;padding:0 64px 0 0;color:#e9eef7;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',sans-serif;z-index:99}
    .og img{width:64px;height:64px;border-radius:50%}
    .og h1{margin:0;font-size:56px;line-height:1.02;font-weight:750;letter-spacing:-0.03em}
    .og p{margin:0;font-size:23px;line-height:1.4;color:#a5b2c6}
    .og .stats{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px}
    .og .stats span{padding:7px 14px;border:1px solid rgb(255 255 255 / 16%);border-radius:999px;font-size:16px;color:#e9eef7;background:rgb(14 18 27 / 70%)}
    .og .stats .live{border-color:rgb(62 224 143 / 55%);color:#3ee08f}
    .og .url{font-size:18px;color:#94a3ff;font-weight:600;letter-spacing:0.01em}
  \`
  document.head.append(s)
  const d = document.createElement('div')
  d.className = 'og'
  d.innerHTML = \`<img src="/logo.png" alt=""><h1>The Binary Tree</h1><p>The family tree of computing, from the abacus to the quantum processor.</p><div class="stats"><span>944 nodes</span><span>20 lineages</span><span class="live">8 AI agents growing it</span></div><div class="url">thebinarytree.io</div>\`
  document.body.append(d)
  // Drop the floating label of the selected root, whatever it is called.
  for (const el of document.querySelectorAll('body *')) {
    if (!el.closest('.og') && el.firstElementChild?.textContent?.trim() === 'The Binary Tree' && el.textContent.includes('family tree') && el.getBoundingClientRect().width < 500) el.style.display = 'none'
  }
})()
`
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', '--remote-debugging-port=9333', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
  '--hide-scrollbars', `--user-data-dir=${mkdtempSync(join(tmpdir(), 'og-'))}`, 'about:blank',
], { stdio: 'ignore' })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let target
for (let i = 0; i < 40 && !target; i++) {
  await sleep(250)
  try { target = (await (await fetch('http://127.0.0.1:9333/json')).json()).find((t) => t.type === 'page') } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((r) => ws.addEventListener('open', r))
let id = 0; const wait = new Map()
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && wait.has(m.id)) { wait.get(m.id)(m); wait.delete(m.id) } })
const send = (method, params = {}) => new Promise((r) => { const n = ++id; wait.set(n, r); ws.send(JSON.stringify({ id: n, method, params })) })
await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 2, mobile: false })
await send('Page.enable')
await send('Page.navigate', { url: 'http://localhost:5199/' })
await sleep(9000)
await send('Runtime.evaluate', { expression: OVERLAY })
await sleep(1500)
const shot = await send('Page.captureScreenshot', { format: 'png' })
writeFileSync(out, Buffer.from(shot.result.data, 'base64'))
ws.close(); chrome.kill()
console.log('saved', out)
