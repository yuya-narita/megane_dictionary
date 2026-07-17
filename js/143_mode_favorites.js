/* 143_mode_favorites.js v3
 * - 音楽中央★：保護した曲一覧を直接開く
 * - 勝手に「保護しました♪」プレイヤーへ移動しない
 * - 会議中央★：お気に入り会議一覧
 * - 会議一覧は左スワイプ削除
 * - 辞書お気に入りとの二重表示を遮断
 */
(() => {
  "use strict";

  const STYLE_ID = "modeFavorites143StyleV3";
  const DIALOG_ID = "modeFavorites143Dialog";
  const LIST_ID = "modeFavorites143List";
  const CONF_FAV_KEY = "megane_conf_favorites";

  let clickLock = false;

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

  function centerButtonFrom(target){
    return target && target.closest
      ? target.closest("#randomWord,#randomWordFixed")
      : null;
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

  function readConfFavs(){
    try{
      return JSON.parse(localStorage.getItem(CONF_FAV_KEY) || "{}");
    }catch(_){
      return {};
    }
  }

  function isConfFavorite(store,id){
    if(Array.isArray(store)) return store.includes(id);
    return !!(store && store[id]);
  }

  function removeConfFavorite(id){
    const store = readConfFavs();

    if(Array.isArray(store)){
      localStorage.setItem(
        CONF_FAV_KEY,
        JSON.stringify(store.filter(x => x !== id))
      );
      return;
    }

    if(store && typeof store === "object"){
      delete store[id];
      localStorage.setItem(CONF_FAV_KEY,JSON.stringify(store));
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

  function conferenceNumber(story,index){
    for(const value of [story && story.no,story && story.number,story && story.id]){
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
        background:rgba(210,45,55,.78);
      }

      .mf143-delete-bg{
        position:absolute;
        right:0;
        top:0;
        bottom:0;
        width:92px;
        display:grid;
        place-items:center;
        color:#fff;
        font-size:13px;
        font-weight:900;
        opacity:0;
        transition:opacity .08s linear;
        pointer-events:none;
      }

      .mf143-row-wrap.swiping .mf143-delete-bg{
        opacity:1;
      }

      .mf143-row{
        position:relative;
        z-index:1;
        width:100%;
        display:grid;
        grid-template-columns:76px minmax(0,1fr);
        align-items:center;
        gap:14px;
        min-height:96px;
        padding:12px;
        border:1px solid rgba(255,255,255,.12);
        border-radius:22px;
        background:rgb(29,32,43);
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

    dlg.querySelector(".mf143-close").addEventListener("click",() => {
      try{ dlg.close(); }catch(_){ dlg.removeAttribute("open"); }
    });

    dlg.addEventListener("click",e => {
      if(e.target === dlg){
        try{ dlg.close(); }catch(_){ dlg.removeAttribute("open"); }
      }
    });

    return dlg;
  }

  function openConferenceByIndex(index){
    const story = stories()[index];
    if(!story) return;

    try{
      window.selectedMangaIndex = index;
      window.mangaStoryIndex = index;
      window.mangaPageIndex = 0;
      window.mangaReadMode = "page";
      window.mangaState = "reader";
      window.appMode = "manga";
    }catch(_){}

    try { if(typeof selectedMangaIndex !== "undefined") selectedMangaIndex = index; } catch(_){}
    try { if(typeof mangaStoryIndex !== "undefined") mangaStoryIndex = index; } catch(_){}
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

  function bindSwipe(wrapper,row,storyId,index){
    let startX = 0;
    let startY = 0;
    let dx = 0;
    let horizontal = false;
    let suppressClick = false;

    row.addEventListener("touchstart",e => {
      const t = e.touches && e.touches[0];
      if(!t) return;
      startX = t.clientX;
      startY = t.clientY;
      dx = 0;
      horizontal = false;
      row.classList.add("dragging");
    },{passive:true});

    row.addEventListener("touchmove",e => {
      const t = e.touches && e.touches[0];
      if(!t) return;

      const nextX = t.clientX - startX;
      const nextY = t.clientY - startY;

      if(!horizontal){
        horizontal =
          Math.abs(nextX) > 10 &&
          Math.abs(nextX) > Math.abs(nextY) * 1.15;
      }

      if(!horizontal) return;

      e.preventDefault();
      dx = Math.min(0,Math.max(-125,nextX));
      suppressClick = Math.abs(dx) > 8;
      wrapper.classList.add("swiping");
      row.style.transform = `translateX(${dx}px)`;
    },{passive:false});

    row.addEventListener("touchend",() => {
      row.classList.remove("dragging");

      if(horizontal && dx <= -82){
        row.classList.add("removing");
        window.setTimeout(() => {
          removeConfFavorite(storyId);
          wrapper.remove();

          const list = q(LIST_ID);
          if(list && !list.querySelector(".mf143-row-wrap")){
            list.innerHTML =
              `<div class="mf143-empty">まだお気に入り会議はありません。</div>`;
          }
        },180);
      }else{
        row.style.transform = "";
        wrapper.classList.remove("swiping");
      }

      window.setTimeout(() => {
        horizontal = false;
        suppressClick = false;
      },180);
    },{passive:true});

    row.addEventListener("click",e => {
      if(suppressClick){
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
    const store = readConfFavs();

    const rows = stories()
      .map((story,index) => ({story,index}))
      .filter(x =>
        x.story &&
        x.story.id &&
        isConfFavorite(store,x.story.id)
      );

    if(!rows.length){
      list.innerHTML =
        `<div class="mf143-empty">まだお気に入り会議はありません。</div>`;
    }else{
      list.innerHTML = rows.map(({story,index}) => `
        <div class="mf143-row-wrap">
          <div class="mf143-delete-bg">削除</div>
          <button
            type="button"
            class="mf143-row"
            data-conf-id="${esc(story.id)}"
            data-conf-index="${index}"
          >
            <span class="mf143-thumb">
              ${story.thumb ? `<img src="${esc(story.thumb)}" alt="">` : ""}
            </span>
            <span class="mf143-meta">
              <span class="mf143-title">
                🎙 ${esc(String(story.title || "").replace(/^🎙️?\s*/,""))}
              </span>
              <span class="mf143-sub">
                Syntax Conference｜#${conferenceNumber(story,index)}
              </span>
            </span>
          </button>
        </div>
      `).join("");

      list.querySelectorAll(".mf143-row-wrap").forEach(wrapper => {
        const row = wrapper.querySelector(".mf143-row");
        if(!row) return;
        bindSwipe(
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

    if(typeof window.MEGANE_MUSIC_V7_OPEN_FAVORITES_LIST === "function"){
      window.MEGANE_MUSIC_V7_OPEN_FAVORITES_LIST();
      return true;
    }

    return false;
  }

  function blockStart(e){
    if(!centerButtonFrom(e.target)) return;
    const current = mode();
    if(current !== "music" && current !== "conf") return;

    // 既存のお気に入り処理へイベントを渡さない。
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
  }

  function activate(e){
    if(!centerButtonFrom(e.target)) return;

    const current = mode();
    if(current !== "music" && current !== "conf") return;

    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();

    if(clickLock) return;
    clickLock = true;

    if(current === "music"){
      openMusicFavorites();
    }else{
      openConferenceFavorites();
    }

    window.setTimeout(() => { clickLock = false; },260);
  }

  function updateLabel(){
    const btn = q("randomWord") || q("randomWordFixed");
    if(!btn) return;

    const current = mode();

    if(current === "music"){
      btn.textContent = "★";
      btn.title = "保護した曲";
      btn.setAttribute("aria-label","保護した曲");
    }else if(current === "conf"){
      btn.textContent = "★";
      btn.title = "お気に入り会議";
      btn.setAttribute("aria-label","お気に入り会議");
    }
  }

  function boot(){
    ensureStyle();
    ensureDialog();

    // 開始イベントは伝播だけ止める。
    // preventDefaultしないため、iPhoneでもclickは生成される。
    window.addEventListener("pointerdown",blockStart,true);
    window.addEventListener("touchstart",blockStart,{
      capture:true,
      passive:true
    });
    window.addEventListener("mousedown",blockStart,true);

    // 実行はclick一回だけ。
    window.addEventListener("click",activate,true);

    new MutationObserver(() => {
      requestAnimationFrame(updateLabel);
    }).observe(document.body,{
      attributes:true,
      attributeFilter:["class"]
    });

    document.addEventListener("click",() => {
      window.setTimeout(updateLabel,60);
    },true);

    updateLabel();
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded",boot,{once:true});
  }else{
    boot();
  }
})();
