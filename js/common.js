/* ============================================================
   common.js · 公共组件与全局交互
   ============================================================ */

/* ---------------- 基础工具 ---------------- */
function $(sel, root) { return (root || document).querySelector(sel); }
function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
function debounce(fn, ms) { let t; return function (...a) { clearTimeout(t); t = setTimeout(() => fn.apply(this, a), ms); }; }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function icon(name) { return ICONS[name] || ''; }

/* ---------------- 天津导航风格矢量地图 SVG ---------------- */
const TJ_MAP_SVG = `
<svg class="tj-shape" viewBox="0 0 1000 760" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="tjland" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FBF9F4"/><stop offset="1" stop-color="#F6F3EC"/>
    </linearGradient>
    <filter id="tjsoft" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="2.2" flood-color="#C9C2B2" flood-opacity=".45"/>
    </filter>
  </defs>

  <!-- 底板：邻接地界 -->
  <rect width="1000" height="760" fill="#EFECE4"/>
  <path d="M0 0 H340 V70 H0 Z M0 640 H300 V760 H0 Z M700 0 H1000 V120 H700 Z M640 700 H1000 V760 H640 Z" fill="#EAE6DB" opacity=".65"/>
  <path d="M60 120 L210 150 M80 240 L180 260 M60 520 L200 560 M740 80 L880 110 M720 600 L880 640" stroke="#E2DCCE" stroke-width="2.5" opacity=".7"/>
  <text x="86" y="86" font-size="13" fill="#C0B9A8" letter-spacing="6">北京方向</text>
  <text x="796" y="726" font-size="13" fill="#C0B9A8" letter-spacing="6">沧州方向</text>
  <text x="792" y="52" font-size="13" fill="#C0B9A8" letter-spacing="6">唐山方向</text>
  <text x="52" y="712" font-size="13" fill="#C0B9A8" letter-spacing="6">廊坊方向</text>

  <!-- 天津市域 -->
  <path d="M390 55 L450 35 L505 60 L530 105 L560 130 L625 150 L700 165 L760 195 L810 240 L845 300 L870 370 L860 430 L885 500 L875 570 L830 640 L760 690 L660 720 L540 735 L420 730 L320 705 L255 650 L225 570 L235 490 L265 420 L255 350 L295 275 L335 205 L355 130 Z"
    fill="url(#tjland)" stroke="#FFFFFF" stroke-width="5" stroke-linejoin="round" filter="url(#tjsoft)"/>
  <path d="M390 55 L450 35 L505 60 L530 105 L560 130 L625 150 L700 165 L760 195 L810 240 L845 300 L870 370 L860 430 L885 500 L875 570 L830 640 L760 690 L660 720 L540 735 L420 730 L320 705 L255 650 L225 570 L235 490 L265 420 L255 350 L295 275 L335 205 L355 130 Z"
    fill="none" stroke="#DDD6C6" stroke-width="1.6" stroke-linejoin="round"/>

  <!-- 区县分界（示意） -->
  <g stroke="#E6E0D2" stroke-width="2" fill="none" stroke-linecap="round" opacity=".9">
    <path d="M370 348 C420 332 500 328 552 348"/>
    <path d="M370 452 C430 468 500 468 556 452"/>
    <path d="M408 332 C402 380 404 420 410 456"/>
    <path d="M556 340 C562 384 562 420 556 452"/>
    <path d="M332 210 C380 260 420 300 448 332"/>
    <path d="M560 200 C540 250 530 300 528 336"/>
    <path d="M660 180 C640 240 620 300 600 350"/>
    <path d="M320 480 C360 520 390 560 400 600"/>
    <path d="M560 460 C560 510 552 552 540 590"/>
    <path d="M760 240 C726 300 700 360 678 420"/>
    <path d="M700 300 C740 350 770 400 786 460"/>
  </g>

  <!-- 城市建成区 -->
  <path d="M382 342 C440 326 540 330 578 352 C600 368 602 428 580 448 C540 472 420 470 388 448 C366 428 362 364 382 342 Z" fill="#ECE8DE" opacity=".9"/>
  <g fill="#F3F0E8">
    <rect x="398" y="360" width="26" height="16" rx="2"/><rect x="432" y="360" width="20" height="16" rx="2"/>
    <rect x="460" y="360" width="28" height="16" rx="2"/><rect x="496" y="360" width="22" height="16" rx="2"/>
    <rect x="526" y="360" width="24" height="16" rx="2"/><rect x="404" y="386" width="20" height="14" rx="2"/>
    <rect x="432" y="386" width="30" height="14" rx="2"/><rect x="470" y="386" width="24" height="14" rx="2"/>
    <rect x="502" y="386" width="26" height="14" rx="2"/><rect x="398" y="410" width="26" height="14" rx="2"/>
    <rect x="432" y="410" width="20" height="14" rx="2"/><rect x="460" y="410" width="28" height="14" rx="2"/>
    <rect x="496" y="410" width="22" height="14" rx="2"/><rect x="526" y="410" width="18" height="14" rx="2"/>
    <rect x="408" y="434" width="30" height="12" rx="2"/><rect x="446" y="434" width="24" height="12" rx="2"/>
    <rect x="478" y="434" width="28" height="12" rx="2"/><rect x="514" y="434" width="20" height="12" rx="2"/>
  </g>

  <!-- 绿地公园 -->
  <g fill="#D5E3C3">
    <path d="M415 42 C428 32 452 32 464 42 C474 50 470 64 456 70 C442 76 422 70 416 58 C412 50 412 46 415 42 Z"/>
    <ellipse cx="418" cy="406" rx="17" ry="11"/>
    <ellipse cx="482" cy="416" rx="13" ry="8"/>
    <ellipse cx="560" cy="440" rx="15" ry="9"/>
    <ellipse cx="802" cy="520" rx="24" ry="14"/>
    <ellipse cx="350" cy="602" rx="21" ry="12"/>
    <ellipse cx="600" cy="420" rx="12" ry="7"/>
    <path d="M660 160 C690 150 730 152 750 166 C762 176 758 192 742 198 C718 206 682 200 668 188 C658 178 656 166 660 160 Z" opacity=".85"/>
  </g>

  <!-- 水系：河流 -->
  <g stroke="#A9CBE3" stroke-width="6.5" fill="none" stroke-linecap="round" opacity=".92">
    <path d="M405 432 C430 448 452 462 478 468 C502 474 522 482 548 494 C578 508 612 502 646 488 C690 470 742 454 792 462 C830 468 856 462 878 468"/>
    <path d="M355 302 C375 342 392 386 405 430"/>
    <path d="M302 502 C332 486 370 470 405 438"/>
    <path d="M252 562 C300 546 352 530 405 436"/>
    <path d="M300 424 C380 398 460 376 540 356 C620 336 700 316 782 300"/>
    <path d="M562 252 C612 272 662 286 716 296"/>
    <path d="M446 132 C492 162 542 192 602 226 C652 254 682 280 712 300"/>
    <path d="M265 602 C332 616 402 622 470 616 C532 611 582 606 622 600"/>
  </g>
  <g stroke="#D6E8F2" stroke-width="2" fill="none" stroke-linecap="round" opacity=".9">
    <path d="M405 432 C430 448 452 462 478 468 C502 474 522 482 548 494 C578 508 612 502 646 488 C690 470 742 454 792 462 C830 468 856 462 878 468"/>
    <path d="M446 132 C492 162 542 192 602 226 C652 254 682 280 712 300"/>
  </g>

  <!-- 水系：湖库 -->
  <g fill="#B7D5E8" stroke="#97BBD6" stroke-width="1.2">
    <ellipse cx="470" cy="102" rx="46" ry="18"/>
    <ellipse cx="742" cy="248" rx="46" ry="20"/>
    <ellipse cx="378" cy="588" rx="42" ry="18"/>
    <ellipse cx="330" cy="672" rx="52" ry="20"/>
    <ellipse cx="612" cy="436" rx="15" ry="9"/>
  </g>

  <!-- 道路：高速（白路面 + 浅壳描边） -->
  <g stroke="#DCD5C6" stroke-width="9" fill="none" stroke-linecap="round" opacity=".85">
    <path d="M355 315 C400 355 470 400 540 430 C620 463 720 468 858 452"/>
    <path d="M462 398 C456 300 451 200 448 92"/>
    <path d="M262 486 C310 472 360 456 408 442"/>
    <path d="M272 640 C340 630 420 622 500 618 C560 615 612 610 652 604"/>
    <path d="M600 440 C660 470 720 500 780 528"/>
  </g>
  <g stroke="#FFFFFF" stroke-width="5.5" fill="none" stroke-linecap="round">
    <path d="M355 315 C400 355 470 400 540 430 C620 463 720 468 858 452"/>
    <path d="M462 398 C456 300 451 200 448 92"/>
    <path d="M262 486 C310 472 360 456 408 442"/>
    <path d="M272 640 C340 630 420 622 500 618 C560 615 612 610 652 604"/>
    <path d="M600 440 C660 470 720 500 780 528"/>
  </g>
  <!-- 外环线 -->
  <g fill="none">
    <path d="M402 348 Q480 326 558 348 Q588 366 584 408 Q580 452 544 462 Q468 478 408 460 Q374 446 376 402 Q378 366 402 348 Z" stroke="#D3CCBC" stroke-width="7" stroke-linecap="round"/>
    <path d="M402 348 Q480 326 558 348 Q588 366 584 408 Q580 452 544 462 Q468 478 408 460 Q374 446 376 402 Q378 366 402 348 Z" stroke="#FFF6D8" stroke-width="4" stroke-linecap="round"/>
  </g>
  <!-- 城市主干道 -->
  <g stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round" opacity=".95">
    <path d="M446 348 C449 380 450 420 452 458"/>
    <path d="M396 386 C440 383 482 383 524 388"/>
    <path d="M404 440 C452 435 502 435 548 442"/>
    <path d="M512 348 C516 382 516 420 512 456"/>
  </g>

  <!-- 铁路 -->
  <g stroke="#9B948A" stroke-width="2.4" fill="none" stroke-dasharray="9 6" opacity=".75">
    <path d="M470 448 C520 442 600 424 680 402 C740 386 800 370 864 356"/>
    <path d="M462 444 C430 380 410 300 400 220"/>
  </g>

  <!-- 地图注记 -->
  <g font-family="PingFang SC, Microsoft YaHei, sans-serif">
    <text x="600" y="474" font-size="13" fill="#7FA0B5" letter-spacing="5" transform="rotate(3 600 474)">海河</text>
    <text x="470" y="107" text-anchor="middle" font-size="12" fill="#7F9BA4">于桥水库</text>
    <text x="742" y="253" text-anchor="middle" font-size="12" fill="#7F9BA4">七里海</text>
    <text x="378" y="593" text-anchor="middle" font-size="12" fill="#7F9BA4">团泊洼</text>
    <text x="330" y="677" text-anchor="middle" font-size="12" fill="#7F9BA4">北大港水库</text>
    <text x="658" y="446" font-size="10.5" fill="#A8A093" letter-spacing="2">京津塘高速</text>
    <text x="452" y="186" font-size="10.5" fill="#A8A093" letter-spacing="2" transform="rotate(88 452 186)">津蓟高速</text>
    <text x="480" y="336" text-anchor="middle" font-size="10" fill="#B3AC9C" letter-spacing="2">外环线</text>
    <text x="700" y="312" font-size="10.5" fill="#A8A093" letter-spacing="2">永定新河</text>
    <text x="430" y="634" font-size="10.5" fill="#A8A093" letter-spacing="2">独流减河</text>
    <text x="452" y="70" font-size="10.5" fill="#8FA383" letter-spacing="2">盘山</text>
  </g>

  <!-- 指北针 + 比例尺 -->
  <g transform="translate(938 58)">
    <circle r="21" fill="#FFFFFF" stroke="#D9D3C5" stroke-width="2"/>
    <path d="M0 -13 L5 6 L0 2 L-5 6 Z" fill="#C0827D"/>
    <path d="M0 13 L5 -6 L0 -2 L-5 -6 Z" fill="#B9C4BD"/>
    <text y="-27" text-anchor="middle" font-size="11" fill="#9A9488" font-weight="600">北</text>
  </g>
  <g transform="translate(38 728)">
    <rect x="-6" y="-14" width="96" height="24" rx="7" fill="#FFFFFF" opacity=".88"/>
    <line x1="4" y1="0" x2="76" y2="0" stroke="#9A9488" stroke-width="2.5"/>
    <line x1="4" y1="-4" x2="4" y2="4" stroke="#9A9488" stroke-width="2.5"/>
    <line x1="40" y1="-3" x2="40" y2="3" stroke="#9A9488" stroke-width="2"/>
    <line x1="76" y1="-4" x2="76" y2="4" stroke="#9A9488" stroke-width="2.5"/>
    <text x="40" y="-7" text-anchor="middle" font-size="9.5" fill="#9A9488">10 km</text>
  </g>
</svg>`;

/* ---------------- 页面转场（全局跳转 loading） ---------------- */
let _navLock = false;
function navigate(url, text) {
  if (_navLock) return;
  _navLock = true;
  const mask = document.createElement('div');
  mask.className = 'loader-mask show';
  mask.innerHTML = `<div class="leaf-loader"><span>${icon('leaf')}</span><span>${icon('leaf')}</span><span>${icon('leaf')}</span></div>
    <div class="loader-text">${esc(text || '正在加载')}</div>`;
  document.body.appendChild(mask);
  setTimeout(() => { location.href = url; }, 430);
}
document.addEventListener('click', e => {
  const a = e.target.closest('a[data-nav]');
  if (a) { e.preventDefault(); navigate(a.dataset.nav || a.getAttribute('href'), a.dataset.navText); }
});

/* 页面进入 loader */
function _bootPageLoader() {
  const mask = document.createElement('div');
  mask.className = 'loader-mask show';
  mask.style.background = 'rgba(242,245,241,.9)';
  mask.innerHTML = `<div class="leaf-loader"><span>${icon('leaf')}</span><span>${icon('leaf')}</span><span>${icon('leaf')}</span></div>
    <div class="loader-text">加载中</div>`;
  document.body.appendChild(mask);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    setTimeout(() => { mask.classList.remove('show'); setTimeout(() => mask.remove(), 350); }, 380);
  }));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', _bootPageLoader);
else _bootPageLoader();

/* ---------------- 底部导航 ---------------- */
function renderTabbar(active) {
  const items = [
    { key: 'atlas', label: '图鉴', ic: 'book', url: 'index.html' },
    { key: 'map', label: '地图', ic: 'map', url: 'map.html' },
    { key: 'record', label: '记录', ic: 'camera', url: 'record.html' },
    { key: 'task', label: '任务', ic: 'list', url: 'task.html' },
    { key: 'mine', label: '我的', ic: 'user', url: 'profile.html' },
  ];
  const bar = document.createElement('nav');
  bar.className = 'tabbar';
  bar.innerHTML = `<div class="tabbar-inner">${items.map(it => `
    <a href="${it.url}" ${it.key === 'mine' && !Auth.current() ? 'data-auth' : ''} class="${it.key === active ? 'active' : ''}">
      ${icon(it.ic)}<span>${it.label}</span></a>`).join('')}</div>`;
  bar.addEventListener('click', e => {
    const a = e.target.closest('a[data-auth]');
    if (a) { e.preventDefault(); Auth.current() ? navigate(a.href) : navigate('auth.html', '请先登录'); return; }
  });
  document.body.appendChild(bar);
}

/* ---------------- Toast ---------------- */
function showToast(msg, ms = 1800) {
  let wrap = $('.toast-wrap');
  if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toast-wrap'; document.body.appendChild(wrap); }
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 320); }, ms);
}

/* ---------------- 居中弹窗 ---------------- */
function showModal({ icon: ic = 'success', title = '', content = '', html = '', confirmText = '好的', cancelText = '', loading = false, onConfirm, onCancel, closable = true }) {
  const mask = document.createElement('div');
  mask.className = 'modal-mask';
  const iconHtml = loading
    ? `<div class="m-icon loading"><div class="spinner lg"></div></div>`
    : (ic === 'none' ? '' : `<div class="m-icon ${ic === 'error' ? 'error' : 'success'}">${ic === 'error' ? icon('alert') : icon('check')}</div>`);
  mask.innerHTML = `
    <div class="modal-center">
      ${iconHtml}
      ${title ? `<div class="m-title">${esc(title)}</div>` : ''}
      ${content ? `<div class="m-content">${esc(content)}</div>` : ''}
      ${html ? `<div class="m-content">${html}</div>` : ''}
      <div class="m-btns">
        ${cancelText ? `<button class="btn btn-ghost" data-act="cancel">${esc(cancelText)}</button>` : ''}
        ${!loading ? `<button class="btn btn-primary" data-act="ok">${esc(confirmText)}</button>` : ''}
      </div>
    </div>`;
  document.body.appendChild(mask);
  requestAnimationFrame(() => mask.classList.add('show'));
  const close = () => { mask.classList.remove('show'); setTimeout(() => mask.remove(), 300); };
  if (closable) mask.addEventListener('click', e => { if (e.target === mask) { close(); onCancel && onCancel(); } });
  mask.addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    if (b.dataset.act === 'ok') { close(); onConfirm && onConfirm(); }
    if (b.dataset.act === 'cancel') { close(); onCancel && onCancel(); }
  });
  return { close, el: mask };
}

function showErrorModal(content, title = '操作失败') {
  return showModal({ icon: 'error', title, content, confirmText: '知道了' });
}

/* ---------------- 全屏图片预览 ---------------- */
function showImagePreview(images, index = 0, caption) {
  const list = images.map(i => (typeof i === 'string' ? { src: i } : i));
  const mask = document.createElement('div');
  mask.className = 'preview-mask';
  mask.innerHTML = `
    <div class="preview-top">
      <div class="pv-count"></div>
      <button class="preview-close">${icon('close')}</button>
    </div>
    <div class="preview-stage">
      <button class="pv-nav prev">${icon('chevronLeft')}</button>
      <img alt="预览大图">
      <button class="pv-nav next">${icon('chevronRight')}</button>
    </div>
    <div class="preview-caption"></div>`;
  document.body.appendChild(mask);
  const img = mask.querySelector('img');
  const count = mask.querySelector('.pv-count');
  const cap = mask.querySelector('.preview-caption');
  let cur = index;
  function render() {
    const item = list[cur];
    img.style.animation = 'none';
    void img.offsetWidth;
    img.style.animation = '';
    img.src = item.src;
    count.textContent = `${cur + 1} / ${list.length}`;
    cap.textContent = item.caption || caption || '';
  }
  render();
  requestAnimationFrame(() => mask.classList.add('show'));
  const close = () => { mask.classList.remove('show'); setTimeout(() => mask.remove(), 300); };
  mask.querySelector('.preview-close').addEventListener('click', close);
  mask.addEventListener('click', e => { if (e.target === mask || e.target.classList.contains('preview-stage')) close(); });
  mask.querySelector('.pv-nav.prev').addEventListener('click', e => { e.stopPropagation(); cur = (cur - 1 + list.length) % list.length; render(); });
  mask.querySelector('.pv-nav.next').addEventListener('click', e => { e.stopPropagation(); cur = (cur + 1) % list.length; render(); });
}

/* ---------------- 图片盒子（骨架屏 + 失败态 + 重试） ---------------- */
function imgBoxHTML(cls = '', style = '') {
  return `<div class="img-box ${cls}" style="${style}">
    <img alt="">
    <div class="img-fail">${brokenMarkHTML()}<button type="button" class="retry-btn">点击重试</button></div>
  </div>`;
}
function brokenMarkHTML() { return `<img src="${brokenImg()}" style="width:64px;height:48px;opacity:.9" alt="加载失败">`; }

function mountImg(box, src, { fail = false, delay = 350, onRetry } = {}) {
  if (typeof box === 'string') box = $(box);
  const img = box.querySelector('img');
  /* 本地照片丢失时，按同一套种子规则回退到内置 SVG 插画 */
  function photoFallback(s) {
    const m = /^images\/plants\/p(\d+)_(\d+)\.jpe?g$/i.exec(s || '');
    if (!m || typeof art !== 'function') return null;
    const id = +m[1], idx = +m[2];
    const seed = (id * 7 + idx * 13) % 97;
    const kind = ART_KIND_LIST[(id * 5 + idx * 3) % ART_KIND_LIST.length];
    return art(kind, seed);
  }
  function doLoad() {
    box.classList.remove('failed');
    const retry = () => {
      box.classList.remove('failed');
      img.onerror = null;
      setTimeout(() => {
        img.onload = () => { box.classList.add('done'); img.classList.add('loaded'); };
        img.src = src;
      }, 500);
    };
    setTimeout(() => {
      if (fail) { box.classList.add('failed'); img.removeAttribute('src'); }
      else {
        img.onload = () => { box.classList.add('done'); img.classList.add('loaded'); };
        img.onerror = () => {
          const fb = photoFallback(src);
          if (fb) { img.onerror = null; img.src = fb; return; }
          box.classList.add('failed');
        };
        img.src = src;
      }
    }, delay);
    const rbtn = box.querySelector('.retry-btn');
    if (rbtn) rbtn.onclick = e => { e.stopPropagation(); onRetry ? onRetry() : retry(); };
  }
  doLoad();
}

/* ---------------- 骨架屏 ---------------- */
function skeletonCardsHTML(n = 4) {
  let html = '';
  for (let i = 0; i < n; i++) {
    html += `<div class="sk-card"><div class="skeleton sk-img"></div>
      <div class="sk-pad"><div class="skeleton sk-text" style="width:62%"></div>
      <div class="skeleton sk-text" style="width:40%;height:9px;margin:7px 0"></div>
      <div class="skeleton sk-text" style="width:78%;height:9px"></div></div></div>`;
  }
  return html;
}
function listLoadingHTML(text = '加载中') {
  return `<div class="list-loading"><div class="spinner"></div>${esc(text)}</div>`;
}
function listEndHTML() { return `<div class="list-end">— 已经加载全部 —</div>`; }

/* ---------------- 空状态 ---------------- */
function emptyStateHTML({ title = '暂无内容', desc = '', btnText = '', btnUrl = '', btnIcon = 'sprout', small = false }) {
  return `<div class="empty-state ${small ? 'small' : ''}">
    <div class="empty-icon">${icon(btnIcon || 'empty')}</div>
    <div class="empty-title">${esc(title)}</div>
    ${desc ? `<div class="empty-desc">${esc(desc)}</div>` : ''}
    ${btnText ? `<button class="btn btn-soft btn-sm" data-nav="${esc(btnUrl)}">${esc(btnText)}</button>` : ''}
  </div>`;
}

/* ---------------- 折叠面板 ---------------- */
function initCollapsibles(root) {
  $$('.collapsible', root || document).forEach(col => {
    const head = $('.col-head', col);
    const body = $('.col-body', col);
    if (!head || !body || col._inited) return;
    col._inited = true;
    const sync = () => { body.style.maxHeight = col.classList.contains('open') ? body.scrollHeight + 40 + 'px' : '0px'; };
    head.addEventListener('click', () => { col.classList.toggle('open'); sync(); });
    setTimeout(sync, 60);
    window.addEventListener('resize', debounce(sync, 200));
  });
}

/* ---------------- 自定义下拉 ---------------- */
function fakeSelectHTML(options, { placeholder = '请选择', name = '', value = '' }) {
  return `<div class="fake-select" data-fs data-name="${esc(name)}" data-value="${esc(value)}">
    <div class="fs-value"><span class="fs-text ${value ? '' : 'placeholder'}">${esc(value || placeholder)}</span>
      <span class="fs-arrow">${icon('chevronDown')}</span></div>
    <ul class="fs-list">${options.map(o => `<li data-v="${esc(o)}" class="${o === value ? 'selected' : ''}">${esc(o)}</li>`).join('')}</ul>
  </div>`;
}
function initFakeSelects(root, onChange) {
  $$('.fake-select', root || document).forEach(fs => {
    if (fs._inited) return; fs._inited = true;
    const val = $('.fs-value', fs), list = $('.fs-list', fs);
    val.addEventListener('click', e => {
      e.stopPropagation();
      const wasOpen = fs.classList.contains('open');
      $$('.fake-select.open').forEach(o => o.classList.remove('open'));
      if (!wasOpen) fs.classList.add('open');
    });
    list.addEventListener('click', e => {
      const li = e.target.closest('li'); if (!li) return;
      fs.dataset.value = li.dataset.v;
      const txt = $('.fs-text', fs);
      txt.textContent = li.dataset.v;
      txt.classList.remove('placeholder');
      $$('.fs-list li', fs).forEach(x => x.classList.toggle('selected', x === li));
      fs.classList.remove('open');
      onChange && onChange(fs.dataset.name, li.dataset.v, fs);
    });
  });
  document.addEventListener('click', () => $$('.fake-select.open').forEach(o => o.classList.remove('open')));
}
function fsValue(name) { const fs = $(`.fake-select[data-name="${name}"]`); return fs ? fs.dataset.value : ''; }

/* ---------------- 底部滑出面板（详情面板） ---------------- */
function showSheet(title, html, { full = false } = {}) {
  const mask = document.createElement('div');
  mask.className = 'sheet-mask';
  const panel = document.createElement('div');
  panel.className = 'sheet-panel';
  panel.innerHTML = `<div class="sheet-grip"></div>
    <div class="flex-between" style="padding:8px 20px 12px">
      <div style="font-size:16px;font-weight:700">${esc(title)}</div>
      <button class="sub-header-back-btn" style="width:30px;height:30px;background:var(--bg-soft);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--text-2)">${icon('close')}</button>
    </div>
    <div class="sheet-body" style="padding:0 20px 26px;overflow-y:auto;max-height:60vh">${html}</div>`;
  document.body.append(mask, panel);
  requestAnimationFrame(() => { mask.classList.add('show'); panel.classList.add('show'); });
  const close = () => { mask.classList.remove('show'); panel.classList.remove('show'); setTimeout(() => { mask.remove(); panel.remove(); }, 340); };
  mask.addEventListener('click', close);
  panel.querySelector('button').addEventListener('click', close);
  return { close, panel };
}

/* ---------------- 右侧滑出抽屉（筛选面板） ---------------- */
function showDrawer({ title = '筛选', groups = [], onConfirm, onReset }) {
  /* groups: [{key,label,options:[{v,label}] or strings, selected:[]}] */
  const mask = document.createElement('div');
  mask.className = 'sheet-mask';
  const panel = document.createElement('div');
  panel.className = 'drawer-panel';
  panel.innerHTML = `
    <div class="drawer-head"><div class="d-title">${esc(title)}</div>
      <button style="width:32px;height:32px;border-radius:50%;background:var(--bg-soft);display:flex;align-items:center;justify-content:center;color:var(--text-2)">${icon('close')}</button></div>
    <div class="drawer-body">${groups.map(g => `
      <div class="drawer-group" data-g="${esc(g.key)}">
        <div class="dg-title">${esc(g.label)}</div>
        <div class="dg-chips">${g.options.map(o => {
    const v = typeof o === 'string' ? o : o.v;
    const lb = typeof o === 'string' ? o : o.label;
    return `<button class="chip ${g.selected.includes(v) ? 'active' : ''}" data-v="${esc(v)}">${esc(lb)}</button>`;
  }).join('')}</div>
      </div>`).join('')}</div>
    <div class="drawer-foot">
      <button class="btn btn-ghost" data-act="reset" style="flex:0 0 88px">重置</button>
      <button class="btn btn-primary" data-act="ok" style="flex:1">确认筛选</button>
    </div>`;
  document.body.append(mask, panel);
  requestAnimationFrame(() => { mask.classList.add('show'); panel.classList.add('show'); });
  const close = () => { mask.classList.remove('show'); panel.classList.remove('show'); setTimeout(() => { mask.remove(); panel.remove(); }, 340); };
  panel.querySelector('.drawer-head button').addEventListener('click', close);
  mask.addEventListener('click', close);
  const state = {};
  groups.forEach(g => state[g.key] = [...g.selected]);
  panel.addEventListener('click', e => {
    const chip = e.target.closest('.dg-chips .chip');
    if (chip) {
      const g = chip.closest('.drawer-group').dataset.g;
      const v = chip.dataset.v;
      const single = groups.find(x => x.key === g).single;
      if (single) {
        state[g] = state[g][0] === v ? [] : [v];
      } else {
        const i = state[g].indexOf(v);
        i >= 0 ? state[g].splice(i, 1) : state[g].push(v);
      }
      chip.parentElement.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', state[g].includes(c.dataset.v)));
      return;
    }
    const act = e.target.closest('[data-act]');
    if (!act) return;
    if (act.dataset.act === 'reset') {
      Object.keys(state).forEach(k => state[k] = []);
      panel.querySelectorAll('.dg-chips .chip').forEach(c => c.classList.remove('active'));
      onReset && onReset(state);
    } else { close(); onConfirm && onConfirm(state); }
  });
  return { close, panel };
}

/* ---------------- 登录引导 ---------------- */
function requireLoginToast() {
  showModal({
    icon: 'error', title: '请先登录', content: '登录后即可使用该功能，\n每个账号拥有独立的数据空间。',
    confirmText: '去登录', cancelText: '暂不',
    onConfirm: () => navigate('auth.html', '正在前往登录'),
  });
}

/* ---------------- 子页返回 ---------------- */
function goBack(fallback = 'index.html') {
  if (history.length > 1) navigate(fallback, '正在返回');
  else navigate(fallback, '正在返回');
}
