/* ============================================================
   common.js · 公共组件与全局交互
   ============================================================ */

/* ---------------- 基础工具 ---------------- */
function $(sel, root) { return (root || document).querySelector(sel); }
function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
function debounce(fn, ms) { let t; return function (...a) { clearTimeout(t); t = setTimeout(() => fn.apply(this, a), ms); }; }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function icon(name) { return ICONS[name] || ''; }

/* ---------------- 天津导航风格矢量地图 SVG（百度地图风格） ---------------- */
const TJ_MAP_SVG = `
<svg class="tj-shape" viewBox="0 0 1000 760" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="tjsoft" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="2.4" flood-color="#C4BCA9" flood-opacity=".5"/>
    </filter>
  </defs>

  <!-- ① 底板：邻接地界（米白纸面） -->
  <rect width="1000" height="760" fill="#F2EFE8"/>
  <path d="M0 0 H336 V66 H0 Z M0 646 H296 V760 H0 Z M694 0 H1000 V118 H694 Z M642 702 H1000 V760 H642 Z" fill="#EBE7DD" opacity=".8"/>
  <g stroke="#E3DED2" stroke-width="2" opacity=".8">
    <path d="M52 118 L206 148"/><path d="M74 236 L182 258"/><path d="M58 520 L198 556"/>
    <path d="M742 82 L884 112"/><path d="M722 600 L878 640"/><path d="M60 392 L150 410"/>
  </g>
  <g font-family="PingFang SC, Microsoft YaHei, sans-serif" fill="#BDB5A2" font-size="12.5" letter-spacing="5">
    <text x="78" y="88">北京方向</text>
    <text x="790" y="48">唐山方向</text>
    <text x="786" y="728">沧州方向</text>
    <text x="48" y="712">廊坊方向</text>
  </g>

  <!-- ② 天津市域主体 -->
  <path d="M390 55 L450 35 L505 60 L530 105 L560 130 L625 150 L700 165 L760 195 L810 240 L845 300 L870 370 L860 430 L885 500 L875 570 L830 640 L760 690 L660 720 L540 735 L420 730 L320 705 L255 650 L225 570 L235 490 L265 420 L255 350 L295 275 L335 205 L355 130 Z"
    fill="#FAF8F2" stroke="#FFFFFF" stroke-width="6" stroke-linejoin="round" filter="url(#tjsoft)"/>
  <path d="M390 55 L450 35 L505 60 L530 105 L560 130 L625 150 L700 165 L760 195 L810 240 L845 300 L870 370 L860 430 L885 500 L875 570 L830 640 L760 690 L660 720 L540 735 L420 730 L320 705 L255 650 L225 570 Z M225 570 L235 490 L265 420 L255 350 L295 275 L335 205 L355 130 Z"
    fill="none" stroke="#E0D9C8" stroke-width="1.6" stroke-linejoin="round"/>

  <!-- ③ 区县分界（白色分隔线，百度风格） -->
  <g stroke="#FFFFFF" stroke-width="4.5" fill="none" stroke-linecap="round" opacity=".95">
    <path d="M368 346 C424 330 500 328 554 348"/>
    <path d="M368 454 C430 470 502 470 558 452"/>
    <path d="M406 330 C400 380 402 420 408 458"/>
    <path d="M558 340 C564 384 564 420 558 452"/>
    <path d="M330 208 C378 258 420 300 448 330"/>
    <path d="M562 198 C542 250 532 300 530 336"/>
    <path d="M662 178 C642 240 622 300 602 350"/>
    <path d="M318 480 C358 520 390 560 400 600"/>
    <path d="M562 460 C562 510 554 552 542 590"/>
    <path d="M762 238 C728 300 702 360 680 420"/>
    <path d="M702 298 C742 350 772 400 788 460"/>
    <path d="M470 600 C520 590 570 586 616 590"/>
  </g>
  <g stroke="#E6E0D0" stroke-width="1" fill="none" opacity=".8">
    <path d="M368 346 C424 330 500 328 554 348"/>
    <path d="M368 454 C430 470 502 470 558 452"/>
  </g>

  <!-- ④ 水系（河流双色调 + 湖库） -->
  <g stroke="#A9CAE6" stroke-width="7.5" fill="none" stroke-linecap="round">
    <path d="M404 430 C432 448 456 462 480 468 C504 474 524 482 550 494 C580 508 614 502 648 488 C692 470 744 454 794 462 C832 468 858 462 880 468"/>
    <path d="M354 300 C376 342 392 386 404 428"/>
    <path d="M300 502 C330 486 368 470 404 436"/>
    <path d="M250 562 C298 546 350 530 402 434"/>
    <path d="M298 422 C380 396 460 374 540 354 C620 334 700 314 782 298"/>
    <path d="M560 250 C612 270 662 286 716 296"/>
    <path d="M444 130 C492 162 542 192 602 226 C652 254 684 280 714 300"/>
    <path d="M262 602 C332 616 402 622 470 616 C532 611 584 606 624 600"/>
  </g>
  <g stroke="#D6E8F4" stroke-width="2.5" fill="none" stroke-linecap="round">
    <path d="M404 430 C432 448 456 462 480 468 C504 474 524 482 550 494 C580 508 614 502 648 488 C692 470 744 454 794 462 C832 468 858 462 880 468"/>
    <path d="M444 130 C492 162 542 192 602 226 C652 254 684 280 714 300"/>
  </g>
  <g fill="#AFD0EA" stroke="#98BCDA" stroke-width="1.2">
    <ellipse cx="470" cy="102" rx="46" ry="18"/>
    <ellipse cx="742" cy="248" rx="46" ry="20"/>
    <ellipse cx="378" cy="588" rx="42" ry="18"/>
    <ellipse cx="330" cy="672" rx="52" ry="20"/>
    <ellipse cx="612" cy="436" rx="15" ry="9"/>
  </g>

  <!-- ⑤ 绿地公园（淡绿，圆角规整） -->
  <g fill="#D6E7C7" stroke="#C4DBB2" stroke-width="1">
    <path d="M414 40 C428 30 452 30 464 40 C474 50 470 64 456 70 C442 76 422 70 416 58 C412 50 412 44 414 40 Z"/>
    <rect x="400" y="368" rx="4" width="34" height="26"/>
    <rect x="474" y="392" rx="4" width="26" height="20"/>
    <rect x="548" y="428" rx="4" width="30" height="22"/>
    <rect x="780" y="508" rx="6" width="46" height="28"/>
    <rect x="336" y="596" rx="5" width="40" height="24"/>
    <rect x="586" y="356" rx="4" width="24" height="18"/>
    <rect x="656" y="156" rx="6" width="92" height="44"/>
    <rect x="600" y="420" rx="4" width="22" height="16"/>
  </g>

  <!-- ⑥ 城市街区（规整楼块网格，市区核心） -->
  <g fill="#EFEBE1" stroke="#FFFFFF" stroke-width="1.4">
    <rect x="392" y="356" width="30" height="18" rx="1.5"/><rect x="428" y="356" width="24" height="18" rx="1.5"/>
    <rect x="458" y="356" width="32" height="18" rx="1.5"/><rect x="496" y="356" width="26" height="18" rx="1.5"/>
    <rect x="528" y="356" width="28" height="18" rx="1.5"/><rect x="396" y="380" width="24" height="16" rx="1.5"/>
    <rect x="428" y="380" width="34" height="16" rx="1.5"/><rect x="470" y="380" width="26" height="16" rx="1.5"/>
    <rect x="504" y="380" width="28" height="16" rx="1.5"/><rect x="540" y="380" width="20" height="16" rx="1.5"/>
    <rect x="392" y="402" width="30" height="16" rx="1.5"/><rect x="428" y="402" width="24" height="16" rx="1.5"/>
    <rect x="458" y="402" width="32" height="16" rx="1.5"/><rect x="496" y="402" width="26" height="16" rx="1.5"/>
    <rect x="528" y="402" width="24" height="16" rx="1.5"/><rect x="396" y="424" width="24" height="14" rx="1.5"/>
    <rect x="428" y="424" width="34" height="14" rx="1.5"/><rect x="470" y="424" width="26" height="14" rx="1.5"/>
    <rect x="504" y="424" width="28" height="14" rx="1.5"/><rect x="540" y="424" width="22" height="14" rx="1.5"/>
  </g>

  <!-- ⑦ 道路网（白色主干 + 淡黄快速/高速，百度配色） -->
  <!-- 高速：淡黄壳 + 亮芯 -->
  <g stroke="#F2DCA4" stroke-width="10" fill="none" stroke-linecap="round">
    <path d="M354 314 C400 354 470 400 540 430 C620 463 720 468 858 452"/>
    <path d="M462 398 C456 300 451 200 448 92"/>
    <path d="M262 486 C310 472 360 456 406 440"/>
    <path d="M272 640 C342 630 422 622 502 618 C562 615 614 610 654 604"/>
    <path d="M600 440 C660 470 720 500 782 528"/>
  </g>
  <g stroke="#FFE9AF" stroke-width="6" fill="none" stroke-linecap="round">
    <path d="M354 314 C400 354 470 400 540 430 C620 463 720 468 858 452"/>
    <path d="M462 398 C456 300 451 200 448 92"/>
    <path d="M262 486 C310 472 360 456 406 440"/>
    <path d="M272 640 C342 630 422 622 502 618 C562 615 614 610 654 604"/>
    <path d="M600 440 C660 470 720 500 782 528"/>
  </g>
  <!-- 外环线（橙黄环） -->
  <path d="M402 348 Q480 326 558 348 Q588 366 584 408 Q580 452 544 462 Q468 478 408 460 Q374 446 376 402 Q378 366 402 348 Z"
    fill="none" stroke="#F5D48A" stroke-width="7" stroke-linecap="round"/>
  <path d="M402 348 Q480 326 558 348 Q588 366 584 408 Q580 452 544 462 Q468 478 408 460 Q374 446 376 402 Q378 366 402 348 Z"
    fill="none" stroke="#FFF0C8" stroke-width="3.5" stroke-linecap="round"/>
  <!-- 城市主干道（白） -->
  <g stroke="#E7E2D4" stroke-width="6" fill="none" stroke-linecap="round">
    <path d="M446 348 C449 380 450 420 452 458"/>
    <path d="M396 386 C440 383 482 383 524 388"/>
    <path d="M404 440 C452 435 502 435 548 442"/>
    <path d="M512 348 C516 382 516 420 512 456"/>
    <path d="M580 356 C596 390 606 420 612 448"/>
    <path d="M350 300 C360 320 372 336 388 350"/>
    <path d="M310 480 C340 470 368 462 392 456"/>
    <path d="M560 250 C580 290 596 330 606 356"/>
  </g>
  <g stroke="#FFFFFF" stroke-width="3.5" fill="none" stroke-linecap="round">
    <path d="M446 348 C449 380 450 420 452 458"/>
    <path d="M396 386 C440 383 482 383 524 388"/>
    <path d="M404 440 C452 435 502 435 548 442"/>
    <path d="M512 348 C516 382 516 420 512 456"/>
    <path d="M580 356 C596 390 606 420 612 448"/>
    <path d="M350 300 C360 320 372 336 388 350"/>
    <path d="M310 480 C340 470 368 462 392 456"/>
    <path d="M560 250 C580 290 596 330 606 356"/>
  </g>
  <!-- 次干道（细白） -->
  <g stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" opacity=".95">
    <path d="M422 350 C424 384 424 420 424 458"/>
    <path d="M478 348 C480 380 480 420 480 460"/>
    <path d="M412 408 C448 405 500 405 540 408"/>
    <path d="M536 352 C540 384 540 420 538 456"/>
    <path d="M628 200 C616 252 606 306 596 354"/>
    <path d="M660 180 C648 240 636 300 626 352"/>
  </g>

  <!-- ⑧ 铁路（灰白相间） -->
  <g stroke="#C9C3B6" stroke-width="3" fill="none" stroke-linecap="round">
    <path d="M470 448 C520 442 600 424 680 402 C740 386 800 370 864 356"/>
    <path d="M462 444 C430 380 410 300 400 220"/>
  </g>
  <g stroke="#FFFFFF" stroke-width="1.5" fill="none" stroke-dasharray="7 7" stroke-linecap="round">
    <path d="M470 448 C520 442 600 424 680 402 C740 386 800 370 864 356"/>
    <path d="M462 444 C430 380 410 300 400 220"/>
  </g>

  <!-- ⑨ 地图注记（分级排版） -->
  <g font-family="PingFang SC, Microsoft YaHei, sans-serif">
    <g fill="#5F6670" font-size="12" font-weight="600" letter-spacing="1.5" opacity=".92">
      <text x="604" y="478" font-size="11" fill="#6E93B5" font-style="italic" letter-spacing="4" transform="rotate(4 604 478)">海　河</text>
      <text x="712" y="316" font-size="10.5" fill="#6E93B5" font-style="italic" letter-spacing="2">永定新河</text>
      <text x="432" y="636" font-size="10.5" fill="#6E93B5" font-style="italic" letter-spacing="2">独流减河</text>
    </g>
    <g fill="#7A93A8" font-size="11.5" text-anchor="middle">
      <text x="470" y="107">于桥水库</text>
      <text x="742" y="253">七里海</text>
      <text x="378" y="593">团泊洼</text>
      <text x="330" y="677">北大港水库</text>
    </g>
    <g fill="#9B9484" font-size="10" letter-spacing="1.5">
      <text x="652" y="450">京津塘高速</text>
      <text x="436" y="182" transform="rotate(88 436 182)">津蓟高速</text>
      <text x="482" y="336" text-anchor="middle">外环线</text>
    </g>
    <g fill="#8FA383" font-size="10.5" letter-spacing="2">
      <text x="428" y="62">盘山风景区</text>
      <text x="682" y="182">环秀湖</text>
    </g>
  </g>

  <!-- ⑩ 指北针 + 比例尺 -->
  <g transform="translate(938 58)">
    <circle r="21" fill="#FFFFFF" stroke="#DCD6C6" stroke-width="2"/>
    <path d="M0 -13 L5 6 L0 2 L-5 6 Z" fill="#D06B5E"/>
    <path d="M0 13 L5 -6 L0 -2 L-5 -6 Z" fill="#BCC6BF"/>
    <text y="-27" text-anchor="middle" font-size="11" fill="#9A9488" font-weight="600">北</text>
  </g>
  <g transform="translate(38 728)">
    <rect x="-6" y="-14" width="96" height="24" rx="7" fill="#FFFFFF" opacity=".9"/>
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
/* 后退时清除残留遮罩 + 解锁 */
window.addEventListener('pageshow', e => {
  _navLock = false;
  $$('.loader-mask').forEach(m => m.remove());
});
document.addEventListener('click', e => {
  const a = e.target.closest('[data-nav]');
  if (a) { e.preventDefault(); navigate(a.dataset.nav || a.getAttribute('href'), a.dataset.navText); }
});

/* 页面进入 loader（仅首次加载，后退 bfcache 恢复时跳过） */
let _pageLoaded = false;
function _bootPageLoader() {
  if (_pageLoaded) return;
  _pageLoaded = true;
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
window.addEventListener('pageshow', e => {
  if (e.persisted) { _pageLoaded = true; $$('.loader-mask').forEach(m => m.remove()); }
});
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', _bootPageLoader);
else _bootPageLoader();

/* ---------------- 底部导航 ---------------- */
function renderTabbar(active) {
  const items = [
    { key: 'share', label: '分享', ic: 'sprout', url: 'share.html' },
    { key: 'map', label: '地图', ic: 'map', url: 'map.html' },
    { key: 'record', label: '记录', ic: 'camera', url: 'record.html' },
    { key: 'task', label: '任务', ic: 'list', url: 'task.html' },
    { key: 'atlas', label: '图鉴', ic: 'book', url: 'atlas.html' },
  ];
  const bar = document.createElement('nav');
  bar.className = 'tabbar';
  bar.innerHTML = `<div class="tabbar-inner">${items.map(it => `
    <a href="${it.url}" class="${it.key === active ? 'active' : ''}">
      ${icon(it.ic)}<span>${it.label}</span></a>`).join('')}</div>`;
  document.body.appendChild(bar);

  /* 右上角注入"我的"入口（分享页本身不注入，其余所有页面都注入） */
  if (active !== 'share') {
    const header = $('.header .header-inner') || $('.sub-header .header-inner');
    if (header) {
      const sp = header.querySelector('.spacer');
      if (sp) {
        const profileBtn = document.createElement('a');
        profileBtn.className = 'h-btn home-btn';
        profileBtn.href = 'profile.html';
        profileBtn.title = '我的';
        profileBtn.innerHTML = icon('user');
        profileBtn.addEventListener('click', e => {
          e.preventDefault();
          if (Auth.current()) navigate('profile.html', '我的');
          else navigate('auth.html', '请先登录');
        });
        sp.insertAdjacentElement('afterend', profileBtn);
      }
    }
  }
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
  panel.style.zIndex = '310';
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
  panel.style.zIndex = '310';
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
