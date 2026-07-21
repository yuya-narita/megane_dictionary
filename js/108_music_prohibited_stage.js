/* 108_music_prohibited_stage_v4.js
   - V7の隔離棚を優先
   - 旧ステージを自動削除
   - 「👁 未観測」「🔒 未観測」だけを非表示
   - ヒント文（例：3種類観測すると出現）は残す
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
    ".music-v7-restricted-album .music-v7-unlock-mask b:empty{display:none!important}";
  document.head.appendChild(s);

var s2=document.createElement("style");
s2.textContent=".lb-poster{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;overflow:visible}.lb-top{position:absolute;top:4%;left:12%;font-size:clamp(32px,7vw,56px);font-weight:900}.lb-bottom{position:absolute;right:10%;bottom:5%;font-size:clamp(34px,8vw,62px);font-weight:900}.lb-vertical{font-size:clamp(56px,13vw,110px);font-weight:900;line-height:.82;letter-spacing:-.06em;text-align:center}";
document.head.appendChild(s2);

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


function stylizeVerticalHints(root){
  root=(root||document);
  var masks=root.querySelectorAll(".music-v7-unlock-mask");
  masks.forEach(function(mask){
    var els=[].slice.call(mask.children).filter(function(n){
      return n.tagName!=="B" && (n.textContent||"").trim();
    });
    els.forEach(function(el){
      var t=(el.textContent||"").trim();
      if(t.indexOf("観測すると")>=0){
        el.innerHTML='<div class="lb-poster"><div class="lb-top">3種類</div><div class="lb-vertical">観<br>測<br>す<br>る<br>と</div><div class="lb-bottom">出現</div></div>';
      }
    });
  });
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
  stylizeVerticalHints();
  arrange();
  stylizeVerticalHints();
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",boot);
}else{
  boot();
}
})();