/* 143_mode_favorites.js v2
 * 修正:
 * - 音楽モードで辞書お気に入りが開く競合を遮断
 * - 会議モードで辞書お気に入りが背面に残る競合を遮断
 * - 会議お気に入りを左スワイプ削除
 * - 音楽お気に入りは既存の左スワイプ削除UIをそのまま使用
 */
(() => {
  "use strict";

  const STYLE_ID = "modeFavorites143StyleV2";
  const DIALOG_ID = "modeFavorites143Dialog";
  const LIST_ID = "modeFavorites143List";
  const CONF_FAV_KEY = "megane_conf_favorites";

  let handling = false;
  let lastHandledAt = 0;

  function q(id){ return document.getElementById(id); }

  function mode(){
    const b = document.body;
    if(b.classList.contains("mode-music")) return "music";
    if(b.classList.contains("mode-cards")) return "cards";
    if(
      b.classList.contains("mode-manga") ||
      b.classList.contains("mode-conf") ||
      b.classList.contains("mode-conference")
    ) return "conf";
    return "dictionary";
  }

  function isCenterButton(target){
    return !!(
      target &&
      target.closest &&
      target.closest("#randomWord,#randomWordFixed")
    );
  }

  function closeDictionaryFavorites(){
    const dlg = q("favoriteDialog");
    if(!dlg) return;

    try{
      if(dlg.open && typeof dlg.close === "function") dlg.close();
      else dlg.removeAttribute("open");
    }catch(_){
      dlg.removeAttribute("open");
    }
  }

  function readRawConfFavs(){
    try{
      return JSON.parse(localStorage.getItem(CONF_FAV_KEY) || "{}");
    }catch(_){
      return {};
    }
  }

  function isConfFavorite(store, id){
    if(Array.isArray(store)) return store.includes(id);
    return !!(store && store[id]);
  }

  function removeConfFavorite(id){
    const store = readRawConfFavs();

    if(Array.isArray(store)){
      const next = store.filter(x => x !== id);
      localStorage.setItem(CONF_FAV_KEY, JSON.stringify(next));
      return;
    }

    if(store && typeof store === "object"){
      delete store[id];
      localStorage.setItem(CONF_FAV_KEY, JSON.stringify(store));
    }
  }

  function stories(){
    try{
      if(Array.isArray(window.mangaStories)) return window.mangaStories;
      if(typeof mangaStories !== "undefined" && Array.isArray(mangaStories)) return mangaStories;
    }catch(_){}
    return [];
  }

  function esc(v){
    return String(v == null ? "" : v)
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;");
  }

  function conferenceNumber(story, index){
    const candidates = [
      story && story.no,
      story && story.number,
      story && story.id
    ];

    for(const value of candidates){
      const m = String(value || "").match(/(\d{1,4})/);
      if(m) return String(Number(m[1])).padStart(3,"0");
    }

    return String(index + 1).padStart(3,"0");
  }

  function ensureStyle(){
    if(q(STYLE_ID)) return;

    const st = document.createElement("style");
    st.id = STYLE_ID;
    st.textContent = `
      #${DIALOG_ID}{
        width:min(92vw,560px);
        max-height:76dvh;
        padding:0;
        border:1px solid rgba(255,255,255,.16);
        border-radius:28px;
        background:rgba(13,16,26,.97);
        color:#fff;
        box-shadow:0 28px 90px rgba(0,0,0,.58);
        -webkit-backdrop-filter:blur(18px);
        backdrop-filter:blur(18px);
        overflow:hidden;
      }

      #${DIALOG_ID}::backdrop{
        background:rgba(0,0,0,.62);
      }

      .mf143-head{
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:12px;
        padding:20px 22px 14px;
      }

      .mf143-head strong{
        font-size:23px;
        letter-spacing:.02em;
      }

      .mf143-close{
        width:42px;
        height:42px;
        border:0;
        border-radius:50%;
        background:transparent;
        color:#fff;
        font-size:25px;
        font-weight:900;
      }

      #${LIST_ID}{
        display:grid;
        gap:12px;
        max-height:calc(76dvh - 82px);
        overflow:auto;
        padding:8px 20px 24px;
        -webkit-overflow-scrolling:touch;
      }

      .mf143-row-wrap{
        position:relative;
        overflow:hidden;
        border-radius:22px;
        background:rgba(255,70,70,.18);
      }

      .mf143-delete-bg{
        position:absolute;
        inset:0 0 0 auto;
        width:92px;
        display:grid;
        place-items:center;
        color:#fff;
        font-size:13px;
        font-weight:900;
        pointer-events:none;
      }

      .mf143-row{
        position:relative;
        width:100%;
        display:grid;
        grid-template-columns:76px minmax(0,1fr);
        align-items:center;
        gap:14px;
        min-height:96px;
        padding:12px;
        border:1px solid rgba(255,255,255,.12);
        border-radius:22px;
        background:rgba(255,255,255,.055);
        color:#fff;
        text-align:left;
        transform:translateX(0);
        transition:transform .16s ease,opacity .16s ease;
        touch-action:pan-y;
        user-select:none;
        -webkit-user-select:none;
      }

      .mf143-row.dragging{
        transition:none;
      }

      .mf143-row.delete-ready{
        transform:translateX(-92px);
      }

      .mf143-row.removing{
        transform:translateX(-120%);
        opacity:0;
      }

      .mf143-thumb{
        width:76px;
        height:76px;
        border-radius:15px;
        overflow:hidden;
        background:rgba(255,255,255,.06);
      }

      .mf143-thumb img{
        width:100%;
        height:100%;
        display:block;
        object-fit:cover;
      }

      .mf143-meta{
        min-width:0;
        display:grid;
        gap:7px;
      }

      .mf143-title{
        font-size:17px;
        font-weight:900;
        line-height:1.35;
      }

      .mf143-sub{
        font-size:13px;
        font-weight:700;
        color:rgba(255,255,255,.58);
      }

      .mf143-empty{
        padding:36px 14px 46px;
        text-align:center;
        color:rgba(255,255,255,.62);
        font-weight:800;
      }
    `;
    document.head.appendChild(st);
  }

  function ensureDialog(){
    let dlg = q(DIALOG_ID);
    if(dlg) return dlg;

    dlg = document.createElement("dialog");
    dlg.id = DIALOG_ID;
    dlg.innerHTML = `
      <div class="mf143-head">
        <strong>お気に入り会議</strong>
        <button type="button" class="mf143-close" aria-label="閉じる">×</button>
      </div>
      <div id="${LIST_ID}"></div>
    `;

    document.body.appendChild(dlg);

    dlg.querySelector(".mf143-close").addEventListener("click", () => {
      try{ dlg.close(); }catch(_){ dlg.removeAttribute("open"); }
    });

    dlg.addEventListener("click", e => {
      if(e.target === dlg){
        try{ dlg.close(); }catch(_){ dlg.removeAttribute("open"); }
      }
    });

    return dlg;
  }

  function openConferenceByIndex(idx){
    const data = stories();
    const story = data[idx];
    if(!story) return;

    try{
      window.selectedMangaIndex = idx;
      window.mangaStoryIndex = idx;
      window.mangaPageIndex = 0;
      window.mangaReadMode = "page";
      window.mangaState = "reader";
      window.appMode = "manga";
    }catch(_){}

    try { if(typeof selectedMangaIndex !== "undefined") selectedMangaIndex = idx; } catch(_){}
    try { if(typeof mangaStoryIndex !== "undefined") mangaStoryIndex = idx; } catch(_){}
    try { if(typeof mangaPageIndex !== "undefined") mangaPageIndex = 0; } catch(_){}
    try { if(typeof mangaReadMode !== "undefined") mangaReadMode = "page"; } catch(_){}
    try { if(typeof mangaState !== "undefined") mangaState = "reader"; } catch(_){}
    try { if(typeof appMode !== "undefined") appMode = "manga"; } catch(_){}

    try{
      if(typeof window.setMode === "function") window.setMode("manga");
      else if(typeof setMode === "function") setMode("manga");
      else if(typeof window.render === "function") window.render("flash");
      else if(typeof render === "function") render("flash");
    }catch(_){}
  }

  function attachConferenceSwipe(wrapper, row, storyId, index){
    let startX = 0;
    let startY = 0;
    let dx = 0;
    let dragging = false;
    let moved = false;

    row.addEventListener("touchstart", e => {
      const t = e.touches && e.touches[0];
      if(!t) return;
      startX = t.clientX;
      startY = t.clientY;
      dx = 0;
      moved = false;
      dragging = true;
      row.classList.add("dragging");
    }, {passive:true});

    row.addEventListener("touchmove", e => {
      if(!dragging) return;
      const t = e.touches && e.touches[0];
      if(!t) return;

      const nextX = t.clientX - startX;
      const nextY = t.clientY - startY;

      if(Math.abs(nextY) > Math.abs(nextX)) return;

      dx = Math.min(0, Math.max(-112, nextX));
      if(Math.abs(dx) > 8) moved = true;
      row.style.transform = `translateX(${dx}px)`;
    }, {passive:true});

    row.addEventListener("touchend", () => {
      if(!dragging) return;
      dragging = false;
      row.classList.remove("dragging");

      if(dx <= -78){
        row.classList.add("delete-ready");
        row.style.transform = "";
        window.setTimeout(() => {
          removeConfFavorite(storyId);
          row.classList.add("removing");
          window.setTimeout(() => {
            wrapper.remove();
            const list = q(LIST_ID);
            if(list && !list.querySelector(".mf143-row-wrap")){
              list.innerHTML = `<div class="mf143-empty">まだお気に入り会議はありません。</div>`;
            }
          },180);
        },70);
      }else{
        row.style.transform = "";
        row.classList.remove("delete-ready");
      }

      window.setTimeout(() => { moved = false; },160);
    }, {passive:true});

    row.addEventListener("click", e => {
      if(moved) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const dlg = q(DIALOG_ID);
      try{ dlg && dlg.close(); }catch(_){}
      openConferenceByIndex(index);
    });
  }

  function openConferenceFavorites(){
    closeDictionaryFavorites();

    const dlg = ensureDialog();
    const list = q(LIST_ID);
    const store = readRawConfFavs();
    const data = stories();

    const rows = data
      .map((story,index) => ({story,index}))
      .filter(x => x.story && x.story.id && isConfFavorite(store,x.story.id));

    if(!rows.length){
      list.innerHTML = `<div class="mf143-empty">まだお気に入り会議はありません。</div>`;
    }else{
      list.innerHTML = rows.map(({story,index}) => {
        const titleText = String(story.title || `Conference ${index + 1}`).replace(/^🎙️?\s*/,"");
        const thumb = story.thumb
          ? `<img src="${esc(story.thumb)}" alt="">`
          : "";
        const no = conferenceNumber(story,index);

        return `
          <div class="mf143-row-wrap">
            <div class="mf143-delete-bg">削除</div>
            <button
              type="button"
              class="mf143-row"
              data-conf-index="${index}"
              data-conf-id="${esc(story.id)}"
            >
              <span class="mf143-thumb">${thumb}</span>
              <span class="mf143-meta">
                <span class="mf143-title">🎙 ${esc(titleText)}</span>
                <span class="mf143-sub">Syntax Conference｜#${esc(no)}</span>
              </span>
            </button>
          </div>
        `;
      }).join("");

      list.querySelectorAll(".mf143-row-wrap").forEach(wrapper => {
        const row = wrapper.querySelector(".mf143-row");
        if(!row) return;
        attachConferenceSwipe(
          wrapper,
          row,
          row.dataset.confId,
          Number(row.dataset.confIndex || 0)
        );
      });
    }

    try{
      if(typeof dlg.showModal === "function" && !dlg.open) dlg.showModal();
      else dlg.setAttribute("open","");
    }catch(_){
      dlg.setAttribute("open","");
    }
  }

  function openMusicFavorites(){
    closeDictionaryFavorites();

    try{
      if(typeof window.MEGANE_MUSIC_V7_OPEN_FAVORITES === "function"){
        window.MEGANE_MUSIC_V7_OPEN_FAVORITES();
        return true;
      }
    }catch(_){}

    return false;
  }

  function handleCenterPress(e){
    if(!isCenterButton(e.target)) return;

    const currentMode = mode();
    if(currentMode !== "music" && currentMode !== "conf") return;

    const now = Date.now();
    if(handling || now - lastHandledAt < 350){
      e.preventDefault();
      e.stopPropagation();
      if(e.stopImmediatePropagation) e.stopImmediatePropagation();
      return;
    }

    handling = true;
    lastHandledAt = now;

    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();

    if(currentMode === "music"){
      openMusicFavorites();
    }else{
      openConferenceFavorites();
    }

    window.setTimeout(() => { handling = false; },220);
  }

  function updateCenterLabel(){
    const btn = q("randomWord") || q("randomWordFixed");
    if(!btn) return;

    const currentMode = mode();

    if(currentMode === "music"){
      btn.textContent = "★";
      btn.setAttribute("aria-label","保護した曲");
      btn.title = "保護した曲";
    }else if(currentMode === "conf"){
      btn.textContent = "★";
      btn.setAttribute("aria-label","お気に入り会議");
      btn.title = "お気に入り会議";
    }
  }

  function boot(){
    ensureStyle();
    ensureDialog();

    // pointerdownで既存の辞書お気に入り処理より先に奪う。
    window.addEventListener("pointerdown",handleCenterPress,true);
    window.addEventListener("touchstart",handleCenterPress,{
      capture:true,
      passive:false
    });
    window.addEventListener("click",handleCenterPress,true);

    const observer = new MutationObserver(() => {
      requestAnimationFrame(updateCenterLabel);
    });

    observer.observe(document.body,{
      attributes:true,
      attributeFilter:["class"]
    });

    document.addEventListener("click",() => {
      window.setTimeout(updateCenterLabel,60);
    },true);

    updateCenterLabel();
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded",boot,{once:true});
  }else{
    boot();
  }
})();
