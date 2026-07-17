/* 143_mode_favorites_production.js
 * mvp_last 本番専用
 *
 * 下部中央ボタン:
 * - 辞書: 既存のお気に入り単語
 * - カード: 既存のカードバインダー
 * - 音楽: 実データ megane_music_v7_favs の「保護しました♪」一覧
 * - 会議: 実データ megane_conf_favorites のお気に入り会議一覧
 *
 * 80_favorites_singleton / 99_nav_real_fix の旧イベントを
 * 中央ボタンの安全なcloneで無効化する。
 */
(function(){
  "use strict";

  var CONF_KEY = "megane_conf_favorites";
  var DIALOG_ID = "productionConfFavorites143";
  var LIST_ID = "productionConfFavorites143List";
  var STYLE_ID = "productionConfFavorites143Style";
  var reboundTimer = 0;

  function q(id){ return document.getElementById(id); }

  function mode(){
    try{
      if(document.body.classList.contains("mode-cards")) return "cards";
      if(document.body.classList.contains("mode-music")) return "music";
      if(document.body.classList.contains("mode-manga") ||
         document.body.classList.contains("mode-conf")) return "conf";
      if(typeof appMode !== "undefined" && appMode === "cards") return "cards";
      if(typeof appMode !== "undefined" && appMode === "manga") return "conf";
    }catch(_){}
    return "dictionary";
  }

  function stop(e){
    if(!e) return;
    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
  }

  function readMap(key){
    try{ return JSON.parse(localStorage.getItem(key) || "{}") || {}; }
    catch(_){ return {}; }
  }

  function writeMap(key,value){
    try{ localStorage.setItem(key,JSON.stringify(value)); }catch(_){}
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

  function confNo(story,index){
    var values = [
      story && story.no,
      story && story.number,
      story && story.id,
      story && story.title
    ];
    for(var i=0;i<values.length;i++){
      var m = String(values[i] || "").match(/(?:conf[_-]?|#)?(\d{1,4})/i);
      if(m) return String(Number(m[1])).padStart(3,"0");
    }
    return String(index + 1).padStart(3,"0");
  }

  function closeDictionaryDialog(){
    var d = q("favoriteDialog");
    if(!d) return;
    try{
      if(d.open && typeof d.close === "function") d.close();
      else d.removeAttribute("open");
    }catch(_){
      d.removeAttribute("open");
    }
  }

  function ensureStyle(){
    if(q(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
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
      #${DIALOG_ID}::backdrop{background:rgba(0,0,0,.62)}
      .p143-head{
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:12px;
        padding:20px 22px 14px;
      }
      .p143-head strong{font-size:23px;letter-spacing:.02em}
      .p143-close{
        width:42px;height:42px;border:0;border-radius:50%;
        background:transparent;color:#fff;font-size:25px;font-weight:900;
      }
      #${LIST_ID}{
        display:grid;
        gap:12px;
        max-height:calc(76dvh - 82px);
        overflow:auto;
        padding:8px 20px 24px;
        -webkit-overflow-scrolling:touch;
      }
      .p143-wrap{
        position:relative;
        overflow:hidden;
        border-radius:22px;
        background:#b93643;
      }
      .p143-delete{
        position:absolute;
        right:0;top:0;bottom:0;
        width:88px;
        display:grid;
        place-items:center;
        font-size:13px;
        font-weight:900;
        opacity:0;
        transition:opacity .08s linear;
        pointer-events:none;
      }
      .p143-wrap.swiping .p143-delete{opacity:1}
      .p143-row{
        position:relative;
        z-index:1;
        width:100%;
        min-height:96px;
        display:grid;
        grid-template-columns:76px minmax(0,1fr);
        align-items:center;
        gap:14px;
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
      .p143-row.dragging{transition:none}
      .p143-row.removing{transform:translateX(-120%);opacity:0}
      .p143-thumb{
        width:76px;height:76px;border-radius:15px;
        overflow:hidden;background:rgba(255,255,255,.06);
      }
      .p143-thumb img{width:100%;height:100%;display:block;object-fit:cover}
      .p143-meta{min-width:0;display:grid;gap:7px}
      .p143-title{font-size:17px;font-weight:900;line-height:1.35}
      .p143-sub{font-size:13px;font-weight:700;color:rgba(255,255,255,.58)}
      .p143-empty{
        padding:36px 14px 46px;
        text-align:center;
        color:rgba(255,255,255,.62);
        font-weight:800;
      }
    `;
    document.head.appendChild(style);
  }

  function ensureDialog(){
    var dlg = q(DIALOG_ID);
    if(dlg) return dlg;

    dlg = document.createElement("dialog");
    dlg.id = DIALOG_ID;
    dlg.innerHTML =
      '<div class="p143-head">'+
        '<strong>お気に入り会議</strong>'+
        '<button type="button" class="p143-close" aria-label="閉じる">×</button>'+
      '</div>'+
      '<div id="'+LIST_ID+'"></div>';

    document.body.appendChild(dlg);

    dlg.querySelector(".p143-close").addEventListener("click",function(){
      try{ dlg.close(); }catch(_){ dlg.removeAttribute("open"); }
    });

    dlg.addEventListener("click",function(e){
      if(e.target === dlg){
        try{ dlg.close(); }catch(_){ dlg.removeAttribute("open"); }
      }
    });

    return dlg;
  }

  function removeConfFavorite(id){
    var map = readMap(CONF_KEY);
    delete map[id];
    writeMap(CONF_KEY,map);

    try{
      document.querySelectorAll(".manga-item").forEach(function(item){
        var idx = Number(item.dataset.index || 0);
        var story = stories()[idx];
        if(story && story.id === id){
          item.classList.remove("conf-min-fav","conf-favorited");
        }
      });
    }catch(_){}
  }

  function openConfByIndex(index){
    var data = stories();
    if(!data[index]) return;

    try{
      selectedMangaIndex = index;
      mangaStoryIndex = index;
      mangaPageIndex = 0;
      mangaReadMode = "page";
      mangaState = "reader";
      appMode = "manga";
      localStorage.setItem("megane_current_conference_id",data[index].id || "");
    }catch(_){}

    try{
      if(typeof window.setMode === "function") window.setMode("manga");
      else if(typeof setMode === "function") setMode("manga");
      else if(typeof window.render === "function") window.render("flash");
      else if(typeof render === "function") render("flash");
    }catch(_){}
  }

  function bindSwipe(wrap,row,id,index){
    var sx=0, sy=0, dx=0, horizontal=false, suppress=false;

    row.addEventListener("touchstart",function(e){
      var t=e.touches && e.touches[0];
      if(!t) return;
      sx=t.clientX; sy=t.clientY; dx=0; horizontal=false; suppress=false;
      row.classList.add("dragging");
    },{passive:true});

    row.addEventListener("touchmove",function(e){
      var t=e.touches && e.touches[0];
      if(!t) return;
      var nx=t.clientX-sx;
      var ny=t.clientY-sy;

      if(!horizontal){
        horizontal=Math.abs(nx)>10 && Math.abs(nx)>Math.abs(ny)*1.15;
      }
      if(!horizontal) return;

      e.preventDefault();
      dx=Math.min(0,Math.max(-118,nx));
      suppress=Math.abs(dx)>8;
      wrap.classList.add("swiping");
      row.style.transform="translateX("+dx+"px)";
    },{passive:false});

    row.addEventListener("touchend",function(){
      row.classList.remove("dragging");

      if(horizontal && dx<=-80){
        row.classList.add("removing");
        setTimeout(function(){
          removeConfFavorite(id);
          wrap.remove();
          var list=q(LIST_ID);
          if(list && !list.querySelector(".p143-wrap")){
            list.innerHTML='<div class="p143-empty">まだお気に入り会議はありません。</div>';
          }
        },180);
      }else{
        row.style.transform="";
        wrap.classList.remove("swiping");
      }

      setTimeout(function(){horizontal=false;suppress=false;},180);
    },{passive:true});

    row.addEventListener("click",function(e){
      if(suppress){
        stop(e);
        return false;
      }
      var dlg=q(DIALOG_ID);
      try{ if(dlg) dlg.close(); }catch(_){}
      openConfByIndex(index);
    });
  }

  function openConferenceFavorites(){
    closeDictionaryDialog();

    var dlg=ensureDialog();
    var list=q(LIST_ID);
    var map=readMap(CONF_KEY);
    var data=stories();
    var rows=[];

    data.forEach(function(story,index){
      if(story && story.id && map[story.id]) rows.push({story:story,index:index});
    });

    if(!rows.length){
      list.innerHTML='<div class="p143-empty">まだお気に入り会議はありません。</div>';
    }else{
      list.innerHTML=rows.map(function(x){
        var story=x.story;
        var title=String(story.title || ("Conference "+(x.index+1))).replace(/^🎙️?\s*/,"");
        return ''+
          '<div class="p143-wrap">'+
            '<div class="p143-delete">削除</div>'+
            '<button type="button" class="p143-row" data-id="'+esc(story.id)+'" data-index="'+x.index+'">'+
              '<span class="p143-thumb">'+(story.thumb?'<img src="'+esc(story.thumb)+'" alt="">':'')+'</span>'+
              '<span class="p143-meta">'+
                '<span class="p143-title">🎙 '+esc(title)+'</span>'+
                '<span class="p143-sub">Syntax Conference｜#'+confNo(story,x.index)+'</span>'+
              '</span>'+
            '</button>'+
          '</div>';
      }).join("");

      list.querySelectorAll(".p143-wrap").forEach(function(wrap){
        var row=wrap.querySelector(".p143-row");
        bindSwipe(
          wrap,
          row,
          row.dataset.id,
          Number(row.dataset.index || 0)
        );
      });
    }

    try{
      if(dlg.showModal && !dlg.open) dlg.showModal();
      else dlg.setAttribute("open","");
    }catch(_){
      dlg.setAttribute("open","");
    }
  }

  function openMusicFavorites(){
    closeDictionaryDialog();
    if(typeof window.MEGANE_MUSIC_V7_OPEN_FAVORITES_LIST === "function"){
      window.MEGANE_MUSIC_V7_OPEN_FAVORITES_LIST();
      return;
    }
    if(typeof window.MEGANE_MUSIC_V7_OPEN_FAVORITES === "function"){
      window.MEGANE_MUSIC_V7_OPEN_FAVORITES();
    }
  }

  function openDictionaryFavorites(e){
    if(window.MEGANE_FAVORITES_SINGLETON &&
       typeof window.MEGANE_FAVORITES_SINGLETON.open === "function"){
      return window.MEGANE_FAVORITES_SINGLETON.open(e);
    }
    var d=q("favoriteDialog");
    if(d){
      try{ if(d.showModal && !d.open) d.showModal(); else d.setAttribute("open",""); }
      catch(_){ d.setAttribute("open",""); }
    }
  }

  function openBinder(){
    var m=q("binderModal");
    if(!m) return;
    try{ if(typeof window.renderBinder === "function") window.renderBinder(); }catch(_){}
    m.style.display="block";
  }

  function activate(e){
    stop(e);
    var m=mode();
    if(m==="music") openMusicFavorites();
    else if(m==="conf") openConferenceFavorites();
    else if(m==="cards") openBinder();
    else openDictionaryFavorites(e);
    return false;
  }

  function bindCenter(){
    var old=q("randomWord");
    if(!old || old.dataset.production143Bound==="1") return;

    var clone=old.cloneNode(true);

    // 80_favorites_singleton / 99_nav_real_fix が再上書きしない印。
    clone.dataset.production143Bound="1";
    clone.dataset.singletonCloned="1";
    clone.dataset.singletonOverride="1";
    clone.dataset.v6Favorite="1";
    clone.dataset.v6Binder="1";

    clone.onclick=null;
    clone.ontouchend=null;
    clone.onpointerup=null;
    clone.onpointerdown=null;

    old.parentNode.replaceChild(clone,old);

    clone.addEventListener("pointerdown",function(e){
      e.stopPropagation();
      if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    },true);

    clone.addEventListener("touchstart",function(e){
      e.stopPropagation();
      if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    },{capture:true,passive:true});

    clone.addEventListener("click",activate,true);

    updateCenter();
  }

  function updateCenter(){
    var btn=q("randomWord");
    if(!btn) return;
    var m=mode();

    if(m==="cards"){
      btn.textContent="📘";
      btn.setAttribute("aria-label","カードバインダー");
      btn.title="カードバインダー";
    }else if(m==="music"){
      btn.textContent="★";
      btn.setAttribute("aria-label","保護した曲");
      btn.title="保護した曲";
    }else if(m==="conf"){
      btn.textContent="★";
      btn.setAttribute("aria-label","お気に入り会議");
      btn.title="お気に入り会議";
    }else{
      btn.textContent="★";
      btn.setAttribute("aria-label","お気に入り単語");
      btn.title="お気に入り単語";
    }
  }

  function scheduleRebind(){
    clearTimeout(reboundTimer);
    reboundTimer=setTimeout(function(){
      var btn=q("randomWord");
      if(!btn || btn.dataset.production143Bound!=="1") bindCenter();
      else updateCenter();
    },50);
  }

  function boot(){
    ensureStyle();
    ensureDialog();

    // 80_favorites_singleton の初回clone後に本番143を確定。
    setTimeout(bindCenter,1350);
    setTimeout(bindCenter,1800);

    new MutationObserver(scheduleRebind).observe(document.body,{
      childList:true,
      subtree:true,
      attributes:true,
      attributeFilter:["class"]
    });

    document.addEventListener("click",scheduleRebind,true);
    document.addEventListener("touchend",scheduleRebind,true);
    window.addEventListener("pageshow",scheduleRebind);

    // Singletonは1200ms周期なので、その直後だけ軽く確認。
    setInterval(function(){
      var btn=q("randomWord");
      if(!btn || btn.dataset.production143Bound!=="1") bindCenter();
      else updateCenter();
    },1600);
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",boot,{once:true});
  }else{
    boot();
  }
})();
