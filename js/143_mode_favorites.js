/* 143_mode_favorites.js
 * 下部中央ボタンをモード別一覧へ振り分ける。
 *
 * dictionary -> 既存のお気に入り単語
 * cards      -> 既存のカードバインダー
 * music      -> 保護した曲一覧
 * conference -> お気に入り会議一覧
 */
(() => {
  "use strict";

  const STYLE_ID = "modeFavorites143Style";
  const DIALOG_ID = "modeFavorites143Dialog";
  const LIST_ID = "modeFavorites143List";
  const CONF_FAV_KEY = "megane_conf_favorites";

  let lastActivation = 0;

  function q(id){ return document.getElementById(id); }

  function mode(){
    const b = document.body;
    if(b.classList.contains("mode-music")) return "music";
    if(b.classList.contains("mode-cards")) return "cards";
    if(b.classList.contains("mode-manga") || b.classList.contains("mode-conf")) return "conf";
    return "dictionary";
  }

  function readJSON(key, fallback){
    try{
      const v = JSON.parse(localStorage.getItem(key) || "");
      return v && typeof v === "object" ? v : fallback;
    }catch(_){ return fallback; }
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
        background:rgba(13,16,26,.96);
        color:#fff;
        box-shadow:0 28px 90px rgba(0,0,0,.58);
        -webkit-backdrop-filter:blur(18px);
        backdrop-filter:blur(18px);
        overflow:hidden;
      }
      #${DIALOG_ID}::backdrop{background:rgba(0,0,0,.58)}
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
      .mf143-row{
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
        <strong id="modeFavorites143Title">お気に入り</strong>
        <button type="button" class="mf143-close" aria-label="閉じる">×</button>
      </div>
      <div id="${LIST_ID}"></div>
    `;
    document.body.appendChild(dlg);

    dlg.querySelector(".mf143-close").addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", e => {
      if(e.target === dlg) dlg.close();
    });

    return dlg;
  }

  function openDictionaryFavorites(){
    const dlg = q("favoriteDialog");
    if(!dlg) return false;
    try{
      if(typeof dlg.showModal === "function" && !dlg.open) dlg.showModal();
      else dlg.setAttribute("open","");
      return true;
    }catch(_){ return false; }
  }

  function openBinder(){
    const candidates = [
      "binderOpenBtn",
      "binderButton",
      "cardBinderOpen",
      "randomWordFixed"
    ];
    for(const id of candidates){
      const el = q(id);
      if(el && el.offsetParent !== null){
        el.click();
        return true;
      }
    }
    try{
      if(typeof window.MEGANE_OPEN_BINDER === "function"){
        window.MEGANE_OPEN_BINDER();
        return true;
      }
    }catch(_){}
    return false;
  }

  function openMusicFavorites(){
    try{
      if(typeof window.MEGANE_MUSIC_V7_OPEN_FAVORITES === "function"){
        window.MEGANE_MUSIC_V7_OPEN_FAVORITES();
        return true;
      }
    }catch(_){}
    return false;
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

    try{ localStorage.setItem("megane_current_conference_id", story.id || ""); }catch(_){}

    try{
      if(typeof window.setMode === "function") window.setMode("manga");
      else if(typeof setMode === "function") setMode("manga");
      else if(typeof window.render === "function") window.render("flash");
      else if(typeof render === "function") render("flash");
    }catch(_){}
  }

  function openConferenceFavorites(){
    const dlg = ensureDialog();
    const title = q("modeFavorites143Title");
    const list = q(LIST_ID);
    const favMap = readJSON(CONF_FAV_KEY, {});
    const data = stories();

    title.textContent = "お気に入り会議";

    const rows = data
      .map((story, index) => ({story, index}))
      .filter(x => x.story && x.story.id && favMap[x.story.id]);

    if(!rows.length){
      list.innerHTML = `<div class="mf143-empty">まだお気に入り会議はありません。</div>`;
    }else{
      list.innerHTML = rows.map(({story,index}) => {
        const titleText = String(story.title || `Conference ${index + 1}`).replace(/^🎙️?\s*/,"");
        const thumb = story.thumb
          ? `<img src="${esc(story.thumb)}" alt="">`
          : "";
        const no = story.no || story.number || String(index + 1).padStart(3,"0");
        return `
          <button type="button" class="mf143-row" data-conf-index="${index}">
            <span class="mf143-thumb">${thumb}</span>
            <span class="mf143-meta">
              <span class="mf143-title">🎙 ${esc(titleText)}</span>
              <span class="mf143-sub">Syntax Conference｜#${esc(no)}</span>
            </span>
          </button>
        `;
      }).join("");

      list.querySelectorAll("[data-conf-index]").forEach(row => {
        row.addEventListener("click", e => {
          e.preventDefault();
          e.stopPropagation();
          const idx = Number(row.dataset.confIndex || 0);
          dlg.close();
          openConferenceByIndex(idx);
        });
      });
    }

    if(typeof dlg.showModal === "function" && !dlg.open) dlg.showModal();
    else dlg.setAttribute("open","");
  }

  function activate(e){
    const btn = e.target && e.target.closest
      ? e.target.closest("#randomWord,#randomWordFixed")
      : null;
    if(!btn) return;

    const now = Date.now();
    if(now - lastActivation < 420) return;
    lastActivation = now;

    const m = mode();

    // 辞書・カードは既存処理を壊さない。
    if(m === "dictionary" || m === "cards") return;

    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();

    if(m === "music"){
      openMusicFavorites();
      return false;
    }

    if(m === "conf"){
      openConferenceFavorites();
      return false;
    }
  }

  function updateCenterLabel(){
    const btn = q("randomWord") || q("randomWordFixed");
    if(!btn) return;
    const m = mode();

    if(m === "music"){
      btn.textContent = "★";
      btn.setAttribute("aria-label","保護した曲");
      btn.title = "保護した曲";
    }else if(m === "conf"){
      btn.textContent = "★";
      btn.setAttribute("aria-label","お気に入り会議");
      btn.title = "お気に入り会議";
    }
  }

  function boot(){
    ensureStyle();
    ensureDialog();

    window.addEventListener("pointerup", activate, true);
    window.addEventListener("click", activate, true);

    const obs = new MutationObserver(() => requestAnimationFrame(updateCenterLabel));
    obs.observe(document.body,{attributes:true,attributeFilter:["class"]});

    document.addEventListener("click", () => setTimeout(updateCenterLabel,60), true);
    updateCenterLabel();
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded",boot,{once:true});
  }else{
    boot();
  }
})();
