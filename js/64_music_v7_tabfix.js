/* MUSIC V7 TABFIX
   音楽タブが押しても反応しない問題を修正。
   既存の辞書/カード/confを壊さず、musicModeクリック時だけmusicViewを表示する。
*/
(function(){
  function q(id){ return document.getElementById(id); }

  function hide(el){ if(el) el.hidden = true; }
  function show(el){ if(el) el.hidden = false; }

  function setBodyMode(){
    document.body.classList.remove("mode-dictionary","mode-cards","mode-manga","mode-conf");
    document.body.classList.add("mode-music","music-v7");
  }

  function setActiveTab(){
    ["dictionaryMode","cardMode","mangaMode","musicMode"].forEach(function(id){
      var b = q(id);
      if(!b) return;
      b.classList.toggle("active", id === "musicMode");
      b.setAttribute("aria-pressed", id === "musicMode" ? "true" : "false");
    });
  }

  function showMusic(){
    try { window.appMode = "music"; } catch(e) {}

    setBodyMode();
    setActiveTab();

    // main card/dictionary/card/conf layers
    var card = q("card");
    var content = q("content");
    var music = q("musicView");

    if(card) card.hidden = true;
    if(content) content.hidden = true;

    [
      "confPlayerLayer",
      "mangaListLayer",
      "mangaChoiceLayer",
      "fullscreenOverlay",
      "mangaFullscreenOverlay",
      "collectionDialog"
    ].forEach(function(id){
      var el = q(id);
      if(el) {
        try{ el.hidden = true; }catch(e){}
        try{ if(el.open) el.close(); }catch(e){}
      }
    });

    if(music){
      music.hidden = false;
      music.style.display = "block";
      music.style.visibility = "visible";
      music.style.opacity = "1";
      music.classList.add("music-v7-view");
    }

    // V7 render hook
    try{
      if(typeof window.MEGANE_MUSIC_V7_RENDER === "function"){
        window.MEGANE_MUSIC_V7_RENDER();
      }
    }catch(e){
      console.log("music v7 render failed", e);
    }
  }

  function bind(){
    var b = q("musicMode");
    if(!b || b.dataset.musicV7Tabfix) return;
    b.dataset.musicV7Tabfix = "1";
    b.addEventListener("click", function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
      showMusic();
      return false;
    }, true);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", bind);
  }else{
    bind();
  }

  window.MEGANE_SHOW_MUSIC_V7 = showMusic;
})();
