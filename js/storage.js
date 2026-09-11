/* ============================================================
   storage.js · 模拟后台：多用户认证 + 数据隔离（localStorage）
   每个用户拥有独立命名空间，互不干扰，刷新不丢失。
   ============================================================ */

const LS_PREFIX = 'plantlog:';

function _lsGet(key, def) {
  try {
    const v = localStorage.getItem(LS_PREFIX + key);
    return v === null ? def : JSON.parse(v);
  } catch (e) { return def; }
}
function _lsSet(key, val) {
  try { localStorage.setItem(LS_PREFIX + key, JSON.stringify(val)); } catch (e) { }
}

/* ---------------- 演示账号种子数据 ---------------- */
function _seedDemo() {
  const uid = 'u_demo';
  if (_lsGet(`u:${uid}:seeded`)) return;
  _lsSet(`u:${uid}:seeded`, true);
  _lsSet(`u:${uid}:logs`, [
    {
      id: 'm1', plantId: 5, time: '2026-09-07 10:12', stage: '开花', health: '健康',
      note: '家门口花坛的月季第二茬开得正好，数了数有 23 朵。顺手拔了周边的杂草。',
      place: '河东区 · 成林道社区花坛', coords: '117.2412°E, 39.1288°N', photoSeeds: [1, 2], taskId: null, likes: 9, comments: 1,
    },
    {
      id: 'm2', plantId: 3, time: '2026-09-02 08:40', stage: '展叶', health: '缺水',
      note: '小区南门白蜡树池土壤干裂，叶缘轻微卷曲，希望物业关注浇水。',
      place: '河东区 · 万新村小区南门', coords: '117.2630°E, 39.1382°N', photoSeeds: [1, 2, 3], taskId: null, likes: 5, comments: 0,
    },
  ]);
  _lsSet(`u:${uid}:drafts`, [
    {
      id: 'd1', plantId: 4, plantName: '西府海棠', family: '蔷薇科 苹果属', time: '2026-09-09 21:05', stage: '开花', health: '健康',
      note: '文化中心海棠观察草稿，明天白天补几张特写再发布。',
      place: '河西区 · 文化中心海棠大道', coords: '117.2220°E, 39.0790°N', photoSeeds: [1, 2], stage2: '公园绿地',
    },
  ]);
  _lsSet(`u:${uid}:favs`, [1, 4, 10, 13, 15]);
  _lsSet(`u:${uid}:favArts`, ['a1', 'a5']);
  _lsSet(`u:${uid}:reports`, [
    {
      id: 'r1', type: '病虫害', plantId: 2, plantName: '垂柳', place: '和平区 · 海河亲水平台', coords: '117.2088°E, 39.1156°N',
      desc: '两株垂柳蚜虫较多，叶面发黏有蜜露，树下长椅被滴。', time: '2026-09-05 09:30', photoSeeds: [1, 2],
      status: 'done',
      timeline: [
        { name: '已提交', time: '09-05 09:30', desc: '上报已提交至绿化管理部门' },
        { name: '已受理', time: '09-05 14:20', desc: '绿化监理单位已受理' },
        { name: '处理中', time: '09-06 10:00', desc: '养护班组已到场查看' },
        { name: '已办结', time: '09-08 16:45', desc: '完成药剂防治，复查虫口密度明显下降' },
      ],
      reply: '感谢您对城市绿化的关注。已安排养护单位完成两株垂柳的蚜虫防治作业，后续将加强巡查频次。如发现其他问题欢迎再次上报。',
    },
    {
      id: 'r2', type: '树木倒伏', plantId: 1, plantName: '国槐', place: '南开区 · 长虹公园北门', coords: '117.1612°E, 39.0930°N',
      desc: '台风过后一株国槐侧枝折断横在步道上，有安全隐患。', time: '2026-09-10 07:15', photoSeeds: [1],
      status: 'processing',
      timeline: [
        { name: '已提交', time: '09-10 07:15', desc: '上报已提交至绿化管理部门' },
        { name: '已受理', time: '09-10 08:40', desc: '公园管理处已受理，设置临时警戒' },
        { name: '处理中', time: '09-10 09:30', desc: '修剪车辆正在赶往现场' },
      ],
      reply: '',
    },
    {
      id: 'r3', type: '垃圾堆积', plantId: 9, plantName: '二月兰', place: '河西区 · 友谊路绿化带', coords: '117.2195°E, 39.0852°N',
      desc: '绿化带内堆积装修垃圾约两车，压住大片二月兰。', time: '2026-09-11 12:02', photoSeeds: [1, 2, 3],
      status: 'submitted',
      timeline: [{ name: '已提交', time: '09-11 12:02', desc: '上报已提交至绿化管理部门，等待受理' }],
      reply: '',
    },
  ]);
  _lsSet(`u:${uid}:joined`, ['t3']);
  _lsSet(`u:${uid}:liked`, ['l5', 'l8']);
  _lsSet(`u:${uid}:artLikes`, ['a3']);
  _lsSet(`u:${uid}:settings`, { notifyComment: true, notifyTask: false, publicMoments: true, hideCoord: false });
  _lsSet(`u:${uid}:myComments`, {});
}

/* ---------------- 认证 ---------------- */
const Auth = {
  users() { return _lsGet('users', []); },
  current() {
    const uid = _lsGet('session', null);
    if (!uid) return null;
    return this.users().find(u => u.id === uid) || null;
  },
  register(name, pwd) {
    name = (name || '').trim();
    if (!name) return { ok: false, msg: '请填写昵称' };
    if (name.length < 2 || name.length > 12) return { ok: false, msg: '昵称需 2-12 个字符' };
    if (!pwd || pwd.length < 6) return { ok: false, msg: '密码至少 6 位' };
    const users = this.users();
    if (users.some(u => u.name === name)) return { ok: false, msg: '该昵称已被注册，请换一个试试' };
    const user = { id: 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name, pwd, createdAt: Date.now() };
    users.push(user);
    _lsSet('users', users);
    _lsSet('session', user.id);
    return { ok: true, user };
  },
  login(name, pwd) {
    const users = this.users();
    if (!users.some(u => u.name === 'demo' && u.pwd === '123456')) {
      users.push({ id: 'u_demo', name: 'demo', pwd: '123456', createdAt: Date.now() });
      _lsSet('users', users);
    }
    _seedDemo();
    const user = users.find(u => u.name === (name || '').trim());
    if (!user) return { ok: false, msg: '账号不存在，请先注册' };
    if (user.pwd !== pwd) return { ok: false, msg: '密码不正确，请重新输入' };
    _lsSet('session', user.id);
    return { ok: true, user };
  },
  logout() { _lsSet('session', null); },
  /* 修改资料（昵称 / 头像） */
  updateProfile(patch) {
    const users = this.users();
    const uid = _lsGet('session', null);
    const user = users.find(u => u.id === uid);
    if (!user) return { ok: false, msg: '请先登录后再修改资料' };
    if (patch && patch.name !== undefined) {
      const name = String(patch.name || '').trim();
      if (name.length < 2 || name.length > 12) return { ok: false, msg: '昵称需 2-12 个字符' };
      if (users.some(u => u.name === name && u.id !== uid)) return { ok: false, msg: '该昵称已被使用，请换一个' };
      user.name = name;
    }
    if (patch && patch.avatar !== undefined) {
      user.avatar = typeof AVATAR_PRESETS !== 'undefined' && AVATAR_PRESETS[patch.avatar] ? patch.avatar : '';
    }
    _lsSet('users', users);
    return { ok: true, user };
  },
};

/* ---------------- 当前用户数据读写（隔离命名空间） ---------------- */
const UD = {
  _uid() { return _lsGet('session', null) || 'guest'; },
  get(key, def) { return _lsGet(`u:${this._uid()}:${key}`, def); },
  set(key, val) { _lsSet(`u:${this._uid()}:${key}`, val); },
};

/* ---------------- 业务数据封装 ---------------- */
const DB = {
  /* 用户观察日志（统一格式） */
  myLogs() {
    const uname = Auth.current() ? Auth.current().name : '我';
    return UD.get('logs', []).map(l => ({
      ...l, author: uname, mine: true, likes: l.likes || 0, comments: (l.comments || 0),
      photos: (l.photoSeeds || []).length, id: l.id,
    })).sort((a, b) => (b.time || '').localeCompare(a.time || ''));
  },
  addLog(data) {
    const logs = UD.get('logs', []);
    const id = 'm' + Date.now().toString(36);
    logs.push({ id, ...data, likes: 0, comments: 0 });
    UD.set('logs', logs);
    return id;
  },
  removeDraft(id) { UD.set('drafts', UD.get('drafts', []).filter(d => d.id !== id)); },
  getDraft(id) { return UD.get('drafts', []).find(d => d.id === id) || null; },

  /* 日志统一读取（内置 + 用户） */
  getLog(id) {
    const mine = this.myLogs().find(l => l.id === id);
    if (mine) return mine;
    return getBuiltinLog(id) || null;
  },
  allLogs() { return [...this.myLogs(), ...BUILTIN_LOGS]; },

  /* 收藏 */
  isFav(plantId) { return UD.get('favs', []).includes(Number(plantId)); },
  toggleFav(plantId) {
    const favs = UD.get('favs', []);
    const pid = Number(plantId);
    const i = favs.indexOf(pid);
    if (i >= 0) { favs.splice(i, 1); UD.set('favs', favs); return false; }
    favs.push(pid); UD.set('favs', favs); return true;
  },
  isFavArt(aid) { return UD.get('favArts', []).includes(aid); },
  toggleFavArt(aid) {
    const f = UD.get('favArts', []);
    const i = f.indexOf(aid);
    if (i >= 0) { f.splice(i, 1); UD.set('favArts', f); return false; }
    f.push(aid); UD.set('favArts', f); return true;
  },

  /* 点赞 */
  liked(id) { return UD.get('liked', []).includes(id); },
  toggleLike(id) {
    const arr = UD.get('liked', []);
    const i = arr.indexOf(id);
    if (i >= 0) { arr.splice(i, 1); UD.set('liked', arr); return false; }
    arr.push(id); UD.set('liked', arr); return true;
  },
  artLiked(id) { return UD.get('artLikes', []).includes(id); },
  toggleArtLike(id) {
    const arr = UD.get('artLikes', []);
    const i = arr.indexOf(id);
    if (i >= 0) { arr.splice(i, 1); UD.set('artLikes', arr); return false; }
    arr.push(id); UD.set('artLikes', arr); return true;
  },

  /* 任务参与 */
  joined(taskId) { return UD.get('joined', []).includes(taskId); },
  joinTask(taskId) {
    const arr = UD.get('joined', []);
    if (!arr.includes(taskId)) { arr.push(taskId); UD.set('joined', arr); }
  },

  /* 上报 */
  myReports() { return UD.get('reports', []).sort((a, b) => (b.time || '').localeCompare(a.time || '')); },
  addReport(r) {
    const arr = UD.get('reports', []);
    const id = 'r' + Date.now().toString(36);
    arr.push({
      id, status: 'submitted', photoSeeds: r.photoSeeds || [],
      timeline: [{ name: '已提交', time: _nowShort(), desc: '上报已提交至绿化管理部门，等待受理' }],
      ...r,
    });
    UD.set('reports', arr);
    return id;
  },

  /* 设置 */
  settings() { return UD.get('settings', { notifyComment: true, notifyTask: true, publicMoments: true, hideCoord: false }); },
  setSetting(k, v) { const s = this.settings(); s[k] = v; UD.set('settings', s); },

  /* 统计 */
  stats() {
    const logs = this.myLogs();
    const species = new Set(logs.map(l => l.plantId)).size;
    const places = new Set(logs.map(l => l.place)).size;
    const badges = BADGES.filter(b => b.unlocked).length + (logs.length >= 1 ? 0 : 0);
    return { logs: logs.length, species, places, badges };
  },
};

function _nowShort() {
  const d = new Date();
  const p = n => String(n).padStart(2, '0');
  return `${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
function _nowFull() {
  const d = new Date();
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
