/* 108_music_prohibited_stage_v3.js */
(function(){
"use strict";
function usingV7(){return !!document.querySelector(".music-v7-restricted-grid");}
function removeLegacy(){var o=document.querySelector(".music-prohibited-stage");if(o)o.remove();}
function injectStyle(){
 if(document.getElementById("musicProhibitedStageStyle"))return;
 var s=document.createElement("style");
 s.id="musicProhibitedStageStyle";
 s.textContent=".music-prohibited-stage{grid-column:1/-1;width:100%;display:flex;justify-content:center;padding:34px 18px 90px}.music-prohibited-stage-inner{width:min(250px,72vw);text-align:center}";
 document.head.appendChild(s);
}
function isProhibited(el){
 var t=(el.textContent||"").toLowerCase();
 return t.indexOf("prohibited")>=0||t.indexOf("禁止")>=0;
}
function stage(list){
 var w=list.querySelector(".music-prohibited-stage");
 if(w)return w;
 w=document.createElement("section");
 w.className="music-prohibited-stage";
 w.innerHTML='<div class="music-prohibited-stage-inner"><div>RESTRICTED OBSERVATION</div></div>';
 list.appendChild(w);
 return w;
}
function arrange(){
 if(usingV7()){removeLegacy();return;}
 injectStyle();
 var list=document.getElementById("musicList");
 if(!list)return;
 var cards=[].slice.call(list.querySelectorAll(".music-v7-album-art[data-album],.music-v7-single-card[data-album]"));
 var target=cards.find(isProhibited);
 if(!target)return;
 var inner=stage(list).querySelector(".music-prohibited-stage-inner");
 if(target.parentNode!==inner)inner.appendChild(target);
}
function boot(){
 if(usingV7()){removeLegacy();return;}
 injectStyle();
 var list=document.getElementById("musicList");
 if(!list)return;
 new MutationObserver(function(){
   clearTimeout(window.__musicProhibitedStageTimer);
   window.__musicProhibitedStageTimer=setTimeout(arrange,30);
 }).observe(list,{childList:true,subtree:true});
 arrange();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);
else boot();
})();