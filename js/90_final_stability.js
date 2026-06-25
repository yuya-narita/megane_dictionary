/* 90_final_stability.js
   v100 cleanup final patch
   - MUSIC: controls sizing is handled in CSS; seekbar swipe is guarded in player.
   - FAVORITES: restore dictionary long-press jump even when opened from MUSIC.
*/
(function(){
  "use strict";

  const FAV_KEY = "meganeFavoritesV65";

  function loadFavorites(){
    try{ return JSON.parse(localStorage.getItem(FAV_KEY) || "[]") || []; }
    catch(e){ return []; }
  }

  function findDictItem(key){
    return loadFavorites().find(f => f && f.key === key && f.type === "dict") || null;
  }

  function jumpToDict(item){
    if(!item) return;

    try{
      if(typeof appMode !== "undefined") appMode = "dictionary";

      document.body.classList.remove("mode-music","music-v7");
      document.body.classList.add("mode-dictionary");

      const mv = document.getElementById("musicView");
      if(mv) mv.hidden = true;

      if(typeof data !== "undefined" && data){
        if(Array.isArray(data.words) && typeof wordIndex !== "undefined"){
          const wi = data.words.findIndex(w => w && w.word === item.word);
          if(wi >= 0) wordIndex = wi;
        }
        if(Array.isArray(data.glasses) && typeof glassIndex !== "undefined"){
          const gi = data.glasses.findIndex(g => g && (g.id === item.glassId || g.name === item.glassName));
          if(gi >= 0) glassIndex = gi;
        }
      }

      if(typeof render === "function") render("flash");
    }catch(e){}

    const dialog = document.getElementById("favoriteDialog");
    if(dialog && dialog.open) dialog.close();

    setTimeout(function(){
      try{
        if(typeof updateFavoriteButton === "function") updateFavoriteButton();
        if(typeof updateFavoriteToggle === "function") updateFavoriteToggle();
      }catch(e){}
    }, 80);
  }

  function bindFavoriteItem(el){
    if(!el || el.dataset.v100FavoriteBound) return;

    const item = findDictItem(el.dataset.key);
    if(!item) return;

    el.dataset.v100FavoriteBound = "1";

    let timer = null;
    let sx = 0;
    let sy = 0;
    let fired = false;

    function clear(){
      if(timer) clearTimeout(timer);
      timer = null;
      el.classList.remove("longpress-charging");
    }

    function start(x,y){
      sx = x; sy = y; fired = false;
      clear();
      el.classList.add("longpress-charging");
      timer = setTimeout(function(){
        fired = true;
        el.classList.remove("longpress-charging");
        el.classList.add("longpress-ready");
        try{ if(navigator.vibrate) navigator.vibrate(18); }catch(e){}
        setTimeout(function(){ jumpToDict(item); }, 60);
      }, 560);
    }

    function move(x,y){
      if(Math.abs(x - sx) > 10 || Math.abs(y - sy) > 10) clear();
    }

    function end(e){
      clear();
      setTimeout(function(){ el.classList.remove("longpress-ready"); }, 220);
      if(fired && e){
        e.preventDefault();
        e.stopPropagation();
        if(e.stopImmediatePropagation) e.stopImmediatePropagation();
      }
    }

    el.addEventListener("pointerdown", function(e){ start(e.clientX, e.clientY); }, true);
    el.addEventListener("pointermove", function(e){ move(e.clientX, e.clientY); }, true);
    el.addEventListener("pointerup", end, true);
    el.addEventListener("pointercancel", end, true);

    el.addEventListener("touchstart", function(e){
      const t = e.touches && e.touches[0]; if(!t) return;
      start(t.clientX, t.clientY);
    }, {capture:true, passive:true});
    el.addEventListener("touchmove", function(e){
      const t = e.touches && e.touches[0]; if(!t) return;
      move(t.clientX, t.clientY);
    }, {capture:true, passive:true});
    el.addEventListener("touchend", end, true);
    el.addEventListener("touchcancel", end, true);
  }

  function bindFavorites(){
    const d = document.getElementById("favoriteDialog");
    if(!d) return;
    d.querySelectorAll(".favorite-item[data-key]").forEach(bindFavoriteItem);
  }

  function patchFavoriteOpen(){
    const btn = document.getElementById("randomWord");
    const dialog = document.getElementById("favoriteDialog");
    if(!btn || !dialog || btn.dataset.v100FavOpen) return;
    btn.dataset.v100FavOpen = "1";

    btn.addEventListener("click", function(){
      setTimeout(function(){
        try{
          if(typeof window.renderDictFavoriteList === "function") window.renderDictFavoriteList();
          else if(typeof renderFavoriteList === "function") renderFavoriteList();
        }catch(e){}
        bindFavorites();
      }, 0);
    }, true);
  }

  function patchSeekBar(){
    const seek = document.getElementById("musicV7Seek");
    if(!seek || seek.dataset.v100SeekGuard) return;
    seek.dataset.v100SeekGuard = "1";
    ["touchstart","touchmove","touchend","pointerdown","pointermove","pointerup","mousedown","mousemove","mouseup","click"].forEach(function(ev){
      seek.addEventListener(ev, function(e){ e.stopPropagation(); }, {passive:true});
    });
  }

  const observer = new MutationObserver(function(){
    bindFavorites();
    patchFavoriteOpen();
    patchSeekBar();
  });

  function boot(){
    observer.observe(document.body, {childList:true, subtree:true});
    bindFavorites();
    patchFavoriteOpen();
    patchSeekBar();
    setInterval(function(){
      bindFavorites();
      patchFavoriteOpen();
      patchSeekBar();
    }, 700);
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
