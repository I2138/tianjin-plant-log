/* ============================================================
   images.js · SVG 模拟图片生成器（莫兰迪色系，零外部资源）
   ============================================================ */

const MORANDI = {
  bgs: [
    ['#EAF0E4', '#DCE7D6'], ['#F0EEE3', '#E3E0D0'], ['#E7EDEA', '#D8E3DE'],
    ['#F1EDE6', '#E4DECF'], ['#E4ECE7', '#D3E0D5'], ['#EEF0E6', '#DFE3D2'],
    ['#EDE9E6', '#DED7D1'], ['#E6EDE8', '#D6E2D8'],
  ],
  inks: ['#5C7A62', '#6B8A70', '#54725E', '#71897B', '#4F6E5A', '#64826B'],
  accents: ['#C7A36B', '#C0827D', '#A3B18A', '#8CA6B8', '#B7A284'],
};

function _svg(w, h, inner) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${inner}</svg>`
  );
}

/* 植物剪影模板（viewBox 400x300） */
const ART_KINDS = {
  tree(i, ink, acc) { // 圆头乔木
    return `<rect width="400" height="300" fill="url(#g${i})"/>
      <ellipse cx="200" cy="128" rx="118" ry="88" fill="${ink}" opacity=".9"/>
      <ellipse cx="130" cy="150" rx="62" ry="46" fill="${ink}" opacity=".75"/>
      <ellipse cx="272" cy="148" rx="58" ry="44" fill="${ink}" opacity=".7"/>
      <rect x="188" y="180" width="24" height="96" rx="10" fill="${ink}"/>
      <circle cx="96" cy="96" r="7" fill="${acc}" opacity=".8"/>
      <circle cx="308" cy="82" r="5.5" fill="${acc}" opacity=".7"/>
      <ellipse cx="200" cy="286" rx="130" ry="14" fill="${ink}" opacity=".12"/>`;
  },
  willow(i, ink, acc) { // 垂柳
    return `<rect width="400" height="300" fill="url(#g${i})"/>
      <rect x="186" y="60" width="26" height="216" rx="12" fill="${ink}"/>
      <ellipse cx="199" cy="66" rx="98" ry="52" fill="${ink}" opacity=".92"/>
      <path d="M118 80 q-14 90 6 178" stroke="${ink}" stroke-width="7" fill="none" opacity=".65" stroke-linecap="round"/>
      <path d="M160 62 q-10 100 4 196" stroke="${ink}" stroke-width="7" fill="none" opacity=".6" stroke-linecap="round"/>
      <path d="M240 62 q10 98 -2 192" stroke="${ink}" stroke-width="7" fill="none" opacity=".6" stroke-linecap="round"/>
      <path d="M282 82 q14 88 -6 172" stroke="${ink}" stroke-width="7" fill="none" opacity=".65" stroke-linecap="round"/>
      <ellipse cx="200" cy="288" rx="120" ry="12" fill="${ink}" opacity=".12"/>
      <circle cx="326" cy="70" r="6" fill="${acc}" opacity=".75"/>`;
  },
  leaf(i, ink, acc) { // 大叶
    return `<rect width="400" height="300" fill="url(#g${i})"/>
      <g transform="translate(200 160)">
        <path d="M0 0 C-70 -36 -104 -108 -70 -150 C-34 -128 -8 -76 0 0 Z" fill="${ink}" opacity=".9"/>
        <path d="M0 0 C74 -30 110 -100 80 -146 C42 -126 10 -72 0 0 Z" fill="${ink}" opacity=".72"/>
        <path d="M0 0 C-36 52 -30 128 8 152 C34 116 22 56 0 0 Z" fill="${ink}" opacity=".55"/>
        <path d="M0 0 L-58 -128 M0 0 L66 -124 M0 0 L14 138" stroke="#fff" stroke-width="3" opacity=".5" fill="none"/>
      </g>
      <circle cx="330" cy="62" r="7" fill="${acc}" opacity=".8"/>
      <circle cx="66" cy="240" r="5" fill="${acc}" opacity=".65"/>`;
  },
  flower(i, ink, acc) { // 花朵
    return `<rect width="400" height="300" fill="url(#g${i})"/>
      <g transform="translate(200 140)">
        ${[0, 60, 120, 180, 240, 300].map(a => `<ellipse cx="0" cy="-58" rx="34" ry="60" fill="${acc}" opacity=".85" transform="rotate(${a})"/>`).join('')}
        <circle r="30" fill="#F3EEDF"/>
        <circle r="16" fill="${ink}" opacity=".85"/>
      </g>
      <path d="M200 210 C196 246 202 268 198 292" stroke="${ink}" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M199 244 q-42 -10 -50 -44 q40 2 50 44Z" fill="${ink}" opacity=".8"/>
      <path d="M199 258 q44 -6 54 -40 q-42 0 -54 40Z" fill="${ink}" opacity=".6"/>`;
  },
  reed(i, ink, acc) { // 芦苇草丛
    return `<rect width="400" height="300" fill="url(#g${i})"/>
      <path d="M0 232 Q100 208 200 226 T400 218 L400 300 L0 300 Z" fill="${ink}" opacity=".16"/>
      ${[64, 108, 158, 214, 262, 316, 352].map((x, idx) => {
        const h = 150 + (idx % 3) * 34;
        return `<path d="M${x} 292 C${x - 8} ${292 - h * .6} ${x + 6} ${292 - h * .85} ${x + (idx % 2 ? 10 : -8)} ${292 - h}" stroke="${ink}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".85"/>
          <ellipse cx="${x + (idx % 2 ? 10 : -8)}" cy="${292 - h}" rx="7" ry="22" fill="${ink}" opacity=".9"/>`;
      }).join('')}
      <circle cx="336" cy="66" r="7" fill="${acc}" opacity=".8"/>`;
  },
  vine(i, ink, acc) { // 藤蔓
    return `<rect width="400" height="300" fill="url(#g${i})"/>
      <path d="M-10 70 C90 130 60 210 150 236 C240 262 300 190 410 216" stroke="${ink}" stroke-width="7" fill="none" stroke-linecap="round" opacity=".85"/>
      <path d="M-10 140 C100 180 130 110 230 150 C310 182 340 250 410 240" stroke="${ink}" stroke-width="5.5" fill="none" stroke-linecap="round" opacity=".6"/>
      ${[[70, 92], [140, 130], [96, 232], [212, 150], [268, 220], [330, 196], [186, 246], [368, 236], [56, 168], [296, 160]].map(([x, y]) => `
        <path d="M${x} ${y} c-16 -20 -14 -44 4 -54 c14 10 16 36 -4 54Z" fill="${ink}" opacity=".8"/>
      `).join('')}
      <circle cx="352" cy="80" r="6.5" fill="${acc}" opacity=".8"/>`;
  },
  water(i, ink, acc) { // 水生
    return `<rect width="400" height="300" fill="url(#g${i})"/>
      <path d="M0 210 Q50 198 100 210 T200 210 T300 210 T400 210 L400 300 L0 300 Z" fill="${acc}" opacity=".28"/>
      <path d="M0 242 Q50 230 100 242 T200 242 T300 242 T400 242 L400 300 L0 300 Z" fill="${acc}" opacity=".2"/>
      <g transform="translate(200 150)">
        <ellipse cx="-58" cy="14" rx="40" ry="17" fill="${ink}" opacity=".85" transform="rotate(-16 -58 14)"/>
        <ellipse cx="52" cy="20" rx="44" ry="18" fill="${ink}" opacity=".7" transform="rotate(12 52 20)"/>
        <path d="M0 0 C-8 -70 -2 -110 4 -132" stroke="${ink}" stroke-width="7" fill="none" stroke-linecap="round"/>
        ${[0, 1, 2, 3, 4].map(k => `<ellipse cx="${4}" cy="${-132 + k * 6}" rx="${16 - k * 1.6}" ry="${11 - k}" fill="${k % 2 ? '#F3EEDF' : acc}" opacity=".92" transform="rotate(${(k - 2) * 14} 4 ${-132 + k * 6})"/>`).join('')}
      </g>
      <ellipse cx="120" cy="188" rx="26" ry="7" fill="${ink}" opacity=".2"/>
      <ellipse cx="292" cy="176" rx="22" ry="6" fill="${ink}" opacity=".16"/>`;
  },
};

const ART_KIND_LIST = Object.keys(ART_KINDS);

/* 生成植物图（kind 模板 / seed 决定配色） */
function art(kind, seed = 0) {
  const bg = MORANDI.bgs[seed % MORANDI.bgs.length];
  const ink = MORANDI.inks[seed % MORANDI.inks.length];
  const acc = MORANDI.accents[seed % MORANDI.accents.length];
  const tpl = ART_KINDS[kind] || ART_KINDS.tree;
  return _svg(400, 300, `<defs><linearGradient id="g${seed % 97}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/>
  </linearGradient></defs>` + tpl(seed % 97, ink, acc));
}

/* 根据植物 id 取真实照片（循环取用）；无清单时回退 SVG 模拟图 */
function plantPhoto(plantId, idx = 0) {
  if (typeof PLANT_PHOTOS !== 'undefined') {
    const list = PLANT_PHOTOS[String(plantId)];
    if (list && list.length) {
      const i = ((idx % list.length) + list.length) % list.length;
      return 'images/plants/' + list[i];
    }
  }
  const seed = (plantId * 7 + idx * 13) % 97;
  const kind = ART_KIND_LIST[(plantId * 5 + idx * 3) % ART_KIND_LIST.length];
  return art(kind, seed);
}

/* 植物默认主图 */
function plantCover(plantId) { return plantPhoto(plantId, 0); }

/* 头像（首字符 + 莫兰迪底色） */
function avatar(name, size = 72) {
  const ch = (name || '友').trim().charAt(0).toUpperCase();
  const bg = MORANDI.bgs[(name || '').length % MORANDI.bgs.length][1];
  const ink = MORANDI.inks[(name || '').length % MORANDI.inks.length];
  return _svg(size, size,
    `<rect width="${size}" height="${size}" rx="${size / 2}" fill="${bg}"/>
     <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
       font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="${size * .42}"
       font-weight="700" fill="${ink}">${ch}</text>`);
}

/* ---------------- 预设头像（植物主题 8 款） ---------------- */
const AVATAR_PRESETS = {
  sprout: ['#DDEBD2', 'M48 80 V48 M48 48 C48 32 36 24 22 24 C22 40 33 50 48 50 M48 42 C48 30 58 22 72 22 C72 36 63 46 48 46'],
  leaf:   ['#D8E6DA', 'M28 68 C28 38 46 22 74 22 C74 52 58 68 30 68 M28 68 C36 52 48 38 64 28'],
  tree:   ['#CFE3D6', 'M48 82 V56 M48 56 C34 56 27 45 27 35 C27 25 35 16 48 16 C61 16 69 25 69 35 C69 45 62 56 48 56 Z'],
  flower: ['#F3DFDA', 'M48 40 C40 26 24 24 22 34 C20 44 34 52 46 52 M48 40 C56 26 72 24 74 34 C76 44 62 52 50 52 M48 46 V74 M41 80 L48 72 L55 80'],
  fruit:  ['#F5E3CE', 'M48 84 C30 84 22 72 22 58 C22 44 33 34 48 34 C63 34 74 44 74 58 C74 72 66 84 48 84 Z M48 34 C48 26 52 20 60 17 M48 34 C48 26 44 20 36 23'],
  sun:    ['#F6EAC8', 'M48 54 m-16 0 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0 M48 24 V32 M48 76 V84 M18 54 H26 M70 54 H78 M27 33 L33 39 M63 69 L69 75 M69 33 L63 39 M33 69 L27 75'],
  water:  ['#D6E4EE', 'M48 20 C60 38 67 49 67 58 C67 71 58 78 48 78 C38 78 29 71 29 58 C29 49 36 38 48 20 Z'],
  butterfly: ['#E4DEF0', 'M48 38 C41 24 25 22 22 32 C19 42 33 51 46 52 M48 38 C55 24 71 22 74 32 C77 42 63 51 50 52 M48 42 V72 M41 78 L48 70 L55 78 M48 42 C46 36 46 32 48 28'],
};

function avatarPreset(key, size = 96) {
  const d = AVATAR_PRESETS[key];
  if (!d) return avatar(key, size);
  return _svg(size, size,
    `<rect width="${size}" height="${size}" rx="${size / 2}" fill="${d[0]}"/>
     <g transform="scale(${size / 96})"><path d="${d[1]}" stroke="#FFFFFF" stroke-width="6.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`);
}

/* 取用户头像：自定义预设优先，否则按昵称生成 */
function avatarFor(user, size = 72) {
  if (user && user.avatar && AVATAR_PRESETS[user.avatar]) return avatarPreset(user.avatar, size);
  return avatar(user ? user.name : '', size);
}

/* 图片失效占位图 */
function brokenImg() {
  return _svg(120, 90,
    `<rect width="120" height="90" rx="10" fill="#EEF1EC"/>
     <rect x="28" y="22" width="64" height="48" rx="6" fill="none" stroke="#C4CEC4" stroke-width="3"/>
     <circle cx="46" cy="38" r="6" fill="#C4CEC4"/>
     <path d="M32 64 L54 46 L66 56 L82 40 L88 46" stroke="#C4CEC4" stroke-width="3" fill="none" stroke-linejoin="round"/>
     <path d="M100 14 L78 36 M78 14 L100 36" stroke="#D8A7A2" stroke-width="3.5" stroke-linecap="round"/>`);
}

/* 通用线性图标集 */
const ICONS = {
  leaf: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15Z"/><path d="M5 19c3-5 7-9 11-11"/></svg>',
  search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  close: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  chevronDown: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  chevronLeft: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 4-8 8 8 8"/></svg>',
  chevronRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 4 8 8-8 8"/></svg>',
  heart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.5C7 16.5 3 13 3 8.9 3 6.2 5.1 4 7.8 4c1.7 0 3.3.9 4.2 2.3C12.9 4.9 14.5 4 16.2 4 18.9 4 21 6.2 21 8.9c0 4.1-4 7.6-9 11.6Z"/></svg>',
  heartFill: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.5C7 16.5 3 13 3 8.9 3 6.2 5.1 4 7.8 4c1.7 0 3.3.9 4.2 2.3C12.9 4.9 14.5 4 16.2 4 18.9 4 21 6.2 21 8.9c0 4.1-4 7.6-9 11.6Z"/></svg>',
  pin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  clock: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  camera: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4V8Z"/><circle cx="12" cy="13" r="3.5"/></svg>',
  image: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="15" rx="2.5"/><circle cx="9" cy="10.5" r="1.8"/><path d="m5 18 5-5 3 3 3-3 3 3"/></svg>',
  filter: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
  locate: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="8"/></svg>',
  check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m4 12.5 5 5L20 6.5"/></svg>',
  alert: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.6v.2"/></svg>',
  like: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v10H4V10h3Zm0 0 4.2-6.4c.4-.7 1.5-.5 1.6.3l.6 4.1H19c1.1 0 1.9 1 1.7 2l-1.3 7A2 2 0 0 1 17.4 19H7"/></svg>',
  comment: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8.5 8.5 0 0 1-8.5 8.5c-1.5 0-3-.4-4.2-1.1L3 21l1.6-5A8.5 8.5 0 1 1 21 12Z"/></svg>',
  sprout: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21v-8"/><path d="M12 13C12 8 8 6 4 6c0 4 3 7 8 7Z"/><path d="M12 11c0-4 3.5-6 8-6 0 4-3 7-8 7Z"/></svg>',
  book: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z"/><path d="M4 5.5v15M20 18v3H6.5"/><path d="M9 8h7M9 11.5h5"/></svg>',
  map: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m9 4 6 2 6-2v14l-6 2-6-2-6 2V6l6-2Z"/><path d="M9 4v14M15 6v14"/></svg>',
  edit: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9a2.5 2.5 0 0 0-3.5-3.5L4 16.5V20Z"/><path d="m13.5 8 3 3"/></svg>',
  list: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1.2" fill="currentColor"/><circle cx="4" cy="12" r="1.2" fill="currentColor"/><circle cx="4" cy="18" r="1.2" fill="currentColor"/></svg>',
  user: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c1.2-3.5 4.1-5 7.5-5s6.3 1.5 7.5 5"/></svg>',
  medal: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14.5" r="5.5"/><path d="M12 12.2l.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2-1.4-1.4 2-.3.9-1.8Z"/><path d="M8.5 9.5 6 3h4l2 5 2-5h4l-2.5 6.5"/></svg>',
  settings: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M19 12a7 7 0 0 0-.14-1.4l2-1.55-2-3.46-2.35.95A7 7 0 0 0 14 5.1L13.6 2.6h-3.2L10 5.1a7 7 0 0 0-2.5 1.44l-2.36-.95-2 3.46 2.01 1.55a7.06 7.06 0 0 0 0 2.8L3.14 15l2 3.46 2.36-.95A7 7 0 0 0 10 18.9l.4 2.5h3.2l.4-2.5a7 7 0 0 0 2.5-1.39l2.36.95 2-3.46-2.01-1.55c.1-.46.15-.93.15-1.4Z"/></svg>',
  trash: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13"/></svg>',
  send: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3 10.5 13.5M21 3l-7 18-3.5-7.5L3 10l18-7Z"/></svg>',
  eye: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
  star: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8L12 3Z"/></svg>',
  starFill: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="m12 3 2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8L12 3Z"/></svg>',
  plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  empty: '<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21v-8"/><path d="M12 13C12 8 8 6 4 6c0 4 3 7 8 7Z"/><path d="M12 11c0-4 3.5-6 8-6 0 4-3 7-8 7Z"/><path d="M4 6C4 4.5 5 3 7 3"/><path d="M20 5c0-1.5-1-2-2.5-2.5"/></svg>',
};
