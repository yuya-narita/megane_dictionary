/* 108_music_prohibited_stage_v4.js
   Legacy compatibility patch.
   MUSIC V7 (52) owns the restricted section and lock overlays.
*/
(function(){
  "use strict";

  function removeLegacyArtifacts(){
    var old=document.querySelector(".music-prohibited-stage");
    if(old) old.remove();
    var oldStyle=document.getElementById("musicProhibitedStageStyle");
    if(oldStyle) oldStyle.remove();
  }

  function usingV7(){
    return !!document.querySelector(".music-v7-restricted-grid,.music-v7-restricted-head");
  }

  function isProhibited(el){
    var text=(el.textContent||"").toLowerCase();
    return text.indexOf("prohibited")>=0 || text.indexOf("禁止")>=0;
  }

  function injectLegacyStyle(){
    if(document.getElementById("musicProhibitedStageStyle")) return;
    var st=document.createElement("style");
    st.id="musicProhibitedStageStyle";
    st.textContent=
      ".music-prohibited-stage{grid-column:1/-1;width:100%;display:flex;justify-content:center;padding:34px 18px 90px;box-sizing:border-box}"+
      ".music-prohibited-stage-inner{width:min(250px,72vw);text-align:center}"+
      ".music-prohibited-stage-label{margin-bottom:14px;font-size:10px;font-weight:900;letter-spacing:.24em;color:rgba(255,232,138,.58)}";
    document.head.appendChild(st);
  }

  function legacyStage(list){
    var wrap=list.querySelector(".music-prohibited-stage");
    if(wrap) return wrap;
    wrap=document.createElement("section");
    wrap.className="music-prohibited-stage";
    wrap.innerHTML='<div class="music-prohibited-stage-inner"><div class="music-prohibited-stage-label">RESTRICTED OBSERVATION</div></div>';
    list.appendChild(wrap);
    return wrap;
  }

  function arrange(){
    if(usingV7()){
      removeLegacyArtifacts();
      return;
    }
    var list=document.getElementById("musicList");
    if(!list) return;
    injectLegacyStyle();
    var cards=[].slice.call(list.querySelectorAll(".music-v7-album-art[data-album],.music-v7-single-card[data-album]"));
    var target=cards.find(isProhibited);
    if(!target) return;
    var inner=legacyStage(list).querySelector(".music-prohibited-stage-inner");
    if(inner && target.parentNode!==inner) inner.appendChild(target);
  }

  function boot(){
    removeLegacyArtifacts();
    var list=document.getElementById("musicList");
    if(!list) return;
    var observer=new MutationObserver(function(){
      clearTimeout(window.__musicProhibitedStageTimer);
      window.__musicProhibitedStageTimer=setTimeout(arrange,30);
    });
    observer.observe(list,{childList:true,subtree:true});
    arrange();
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",boot);
  else boot();
})();
