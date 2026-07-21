/* 108_music_prohibited_stage_v5.js
   - V7の隔離棚を優先
   - 旧ステージを自動削除
   - 「👁 未観測」「🔒 未観測」だけを非表示
   - ヒント文の手動改行・行間・余白を固定
*/
(function(){
"use strict";

function usingV7(){
  return !!document.querySelector(".music-v7-restricted-grid");
}

function removeLegacy(){
  var o=document.querySelector(".music-prohibited-stage");
  if(o) o.remove();
}

function scrubDefaultLabels(root){
  root = root || document;
  var labels = root.querySelectorAll(
    ".music-v7-restricted-grid .music-v7-unlock-mask b," +
    ".music-v7-restricted-album .music-v7-unlock-mask b"
  );

  labels.forEach(function(el){
    var t=(el.textContent||"").replace(/\s+/g,"").trim();
    if(
      t.indexOf("未観測")>=0 ||
      t.indexOf("👁")>=0 ||
      t.indexOf("👁️")>=0
    ){
      el.textContent="";
      el.style.display="none";
    }
  });
}

function injectStyle(){
  if(document.getElementById("musicProhibitedStageStyle")) return;

  var s=document.createElement("style");
  s.id="musicProhibitedStageStyle";
  s.textContent =
    ".music-prohibited-stage{grid-column:1/-1;width:100%;display:flex;justify-content:center;padding:34px 18px 90px}" +
    ".music-prohibited-stage-inner{width:min(250px,72vw);text-align:center}" +
    ".music-v7-restricted-grid .music-v7-unlock-mask b:empty," +
    ".music-v7-restricted-album .music-v7-unlock-mask b:empty{display:none!important}" +
    ".music-v7-restricted-grid .music-v7-unlock-mask," +
    ".music-v7-restricted-album .music-v7-unlock-mask{" +
      "padding:5.5% 5%!important;" +
      "display:flex!important;" +
      "align-items:center!important;" +
      "justify-content:center!important;" +
      "overflow:hidden!important;" +
      "white-space:pre-line!important;" +
      "word-break:keep-all!important;" +
      "overflow-wrap:normal!important;" +
      "line-break:strict!important;" +
      "line-height:.9!important;" +
      "letter-spacing:-.065em!important;" +
    "}" +
    ".music-v7-restricted-grid .music-v7-unlock-mask>*:not(b)," +
    ".music-v7-restricted-album .music-v7-unlock-mask>*:not(b){" +
      "white-space:pre-line!important;" +
      "word-break:keep-all!important;" +
      "overflow-wrap:normal!important;" +
      "line-break:strict!important;" +
      "text-align:left!important;" +
      "line-height:.9!important;" +
      "letter-spacing:-.065em!important;" +
      "max-width:100%!important;" +
      "margin:0!important;" +
      "padding:0!important;" +
    "}" +
    "@media(max-width:430px){" +
      ".music-v7-restricted-grid .music-v7-unlock-mask," +
      ".music-v7-restricted-album .music-v7-unlock-mask{" +
        "padding:5% 4.5%!important;" +
      "}" +
    "}";
  document.head.appendChild(s);
}

function isProhibited(el){
  var t=(el.textContent||"").toLowerCase();
  return t.indexOf("prohibited")>=0 || t.indexOf("禁止")>=0;
}

function stage(list){
  var w=list.querySelector(".music-prohibited-stage");
  if(w) return w;

  w=document.createElement("section");
  w.className="music-prohibited-stage";
  w.innerHTML='<div class="music-prohibited-stage-inner"><div>RESTRICTED OBSERVATION</div></div>';
  list.appendChild(w);
  return w;
}

function arrange(){
  injectStyle();
  scrubDefaultLabels();

  if(usingV7()){
    removeLegacy();
    return;
  }

  var list=document.getElementById("musicList");
  if(!list) return;

  var cards=[].slice.call(
    list.querySelectorAll(".music-v7-album-art[data-album],.music-v7-single-card[data-album]")
  );
  var target=cards.find(isProhibited);
  if(!target) return;

  var inner=stage(list).querySelector(".music-prohibited-stage-inner");
  if(target.parentNode!==inner) inner.appendChild(target);
}

function boot(){
  injectStyle();

  var list=document.getElementById("musicList");
  if(!list) return;

  var observer=new MutationObserver(function(){
    clearTimeout(window.__musicProhibitedStageTimer);
    window.__musicProhibitedStageTimer=setTimeout(arrange,30);
  });

  observer.observe(list,{childList:true,subtree:true,characterData:true});
  arrange();
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",boot);
}else{
  boot();
}
})();