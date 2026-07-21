/* 108_music_prohibited_stage_typography_poster.js
   LOOKING BEAR 初回ロック専用タイポグラフィ・ポスター
   - 「3種類観測すると出現」のロックだけをポスター化
   - 3種類のカードで6曲解放、という情報を大小の文字として散りばめる
   - 「観測すると」は1行のまま90度回転
   - タップ時の既存ヒント表示・解除判定には触れない
*/
(function(){
"use strict";

function usingV7(){
  return !!document.querySelector(".music-v7-restricted-grid");
}

function removeLegacy(){
  var oldStage=document.querySelector(".music-prohibited-stage");
  if(oldStage) oldStage.remove();
}

function injectStyle(){
  var old=document.getElementById("musicProhibitedStageStyle");
  if(old) old.remove();

  var s=document.createElement("style");
  s.id="musicProhibitedStageStyle";
  s.textContent=`
    .music-prohibited-stage{
      grid-column:1/-1;
      width:100%;
      display:flex;
      justify-content:center;
      padding:34px 18px 90px
    }
    .music-prohibited-stage-inner{
      width:min(250px,72vw);
      text-align:center
    }

    .music-v7-unlock-mask b:empty{
      display:none!important
    }

    /* 初回ロック・ポスター */
    .music-v7-unlock-mask.lb-type-poster-mask{
      container-type:inline-size;
      display:block!important;
      inset:0!important;
      padding:0!important;
      overflow:hidden!important;
      border-radius:inherit!important;
      background:
        linear-gradient(90deg,rgba(0,0,0,.20),rgba(0,0,0,.02) 42%,rgba(0,0,0,.23)),
        linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.42))!important;
      color:#efe6b5!important;
      text-align:left!important;
      pointer-events:none!important;
    }

    .lb-type-poster{
      position:absolute;
      inset:-1px;
      overflow:hidden;
      font-family:
        "Arial Black","Helvetica Neue",
        "Hiragino Kaku Gothic ProN","Yu Gothic",sans-serif;
      font-weight:950;
      line-height:.86;
      letter-spacing:-.06em;
      color:#efe6b5;
      text-shadow:0 1px 2px rgba(0,0,0,.55);
      isolation:isolate;
    }

    .lb-type-poster .t{
      position:absolute;
      display:block;
      margin:0;
      padding:0;
      white-space:nowrap;
      transform-origin:center;
      mix-blend-mode:normal;
    }

    /* 主役 */
    .lb-type-poster .n3{
      left:-3cqw;
      top:-7cqw;
      font-size:43cqw;
      line-height:.9;
      letter-spacing:-.13em;
      z-index:3;
    }
    .lb-type-poster .types{
      left:33cqw;
      top:4cqw;
      font-size:21cqw;
      z-index:4;
    }
    .lb-type-poster .observe{
      right:-27cqw;
      top:38cqw;
      width:82cqw;
      font-size:13.5cqw;
      letter-spacing:-.11em;
      transform:rotate(90deg);
      z-index:5;
    }
    .lb-type-poster .appear{
      left:-2cqw;
      bottom:-2cqw;
      font-size:25cqw;
      z-index:4;
    }

    /* 中サイズの情報 */
    .lb-type-poster .six{
      left:4cqw;
      top:45cqw;
      font-size:11cqw;
      letter-spacing:-.04em;
      z-index:4;
    }
    .lb-type-poster .collect{
      left:5cqw;
      top:57cqw;
      font-size:8.7cqw;
      z-index:4;
    }
    .lb-type-poster .unlock{
      left:29cqw;
      top:66cqw;
      font-size:10.5cqw;
      transform:rotate(-2deg);
      z-index:4;
    }
    .lb-type-poster .gate{
      left:3cqw;
      top:76cqw;
      font-size:7.8cqw;
      z-index:4;
    }

    /* 小文字の密度 */
    .lb-type-poster .micro{
      font-family:"Helvetica Neue","Hiragino Kaku Gothic ProN","Yu Gothic",sans-serif;
      font-weight:900;
      line-height:1;
      letter-spacing:-.03em;
      opacity:.95;
      z-index:2;
    }
    .lb-type-poster .m1{left:39cqw;top:29cqw;font-size:4.5cqw}
    .lb-type-poster .m2{left:4cqw;top:38cqw;font-size:3.5cqw}
    .lb-type-poster .m3{left:5cqw;top:68cqw;font-size:3.8cqw}
    .lb-type-poster .m4{left:43cqw;top:78cqw;font-size:3.5cqw}
    .lb-type-poster .m5{left:4cqw;top:87cqw;font-size:4.4cqw}
    .lb-type-poster .m6{right:3cqw;top:20cqw;font-size:3.1cqw}
    .lb-type-poster .m7{left:43cqw;top:34cqw;font-size:3cqw}
    .lb-type-poster .m8{left:4cqw;top:93cqw;font-size:3.1cqw}
    .lb-type-poster .m9{right:5cqw;bottom:23cqw;font-size:3.2cqw}
    .lb-type-poster .m10{left:44cqw;bottom:7cqw;font-size:3.2cqw}
    .lb-type-poster .m11{
      left:-9cqw;
      top:48cqw;
      font-size:3.2cqw;
      transform:rotate(-90deg);
    }
    .lb-type-poster .m12{
      right:-12cqw;
      bottom:11cqw;
      font-size:3.2cqw;
      transform:rotate(90deg);
    }

    /* 細い罫線で紙面感を追加 */
    .lb-type-poster:before,
    .lb-type-poster:after{
      content:"";
      position:absolute;
      background:currentColor;
      opacity:.75;
      z-index:1;
    }
    .lb-type-poster:before{
      left:4cqw;
      right:5cqw;
      top:43cqw;
      height:.65cqw;
    }
    .lb-type-poster:after{
      left:37cqw;
      top:28cqw;
      bottom:4cqw;
      width:.55cqw;
    }

    @supports not (font-size:1cqw){
      .lb-type-poster .n3{font-size:128px}
      .lb-type-poster .types{font-size:62px}
      .lb-type-poster .observe{font-size:40px}
      .lb-type-poster .appear{font-size:74px}
      .lb-type-poster .six{font-size:33px}
      .lb-type-poster .collect{font-size:26px}
      .lb-type-poster .unlock{font-size:31px}
      .lb-type-poster .gate{font-size:23px}
      .lb-type-poster .micro{font-size:11px}
    }
  `;
  document.head.appendChild(s);
}

function scrubDefaultLabels(root){
  root=root||document;
  root.querySelectorAll(
    ".music-v7-restricted-grid .music-v7-unlock-mask b,"+
    ".music-v7-restricted-album .music-v7-unlock-mask b"
  ).forEach(function(el){
    var t=(el.textContent||"").replace(/\s+/g,"").trim();
    if(t.indexOf("未観測")>=0 || t.indexOf("👁")>=0 || t.indexOf("👁️")>=0){
      el.textContent="";
      el.style.display="none";
    }
  });
}

function posterHTML(){
  return `
    <div class="lb-type-poster" aria-hidden="true">
      <span class="t n3">3</span>
      <span class="t types">種類</span>
      <span class="t observe">観測すると</span>
      <span class="t six">6曲</span>
      <span class="t collect">カードを集める</span>
      <span class="t unlock">解放</span>
      <span class="t gate">FIRST GATE</span>
      <span class="t appear">出現</span>

      <span class="t micro m1">03 CARDS / 06 TRACKS</span>
      <span class="t micro m2">LOOKING BEAR LAND</span>
      <span class="t micro m3">OBSERVATION REQUIRED</span>
      <span class="t micro m4">TRACK 01—06</span>
      <span class="t micro m5">収集条件　異なるカード三種</span>
      <span class="t micro m6">ENTRY CONDITION</span>
      <span class="t micro m7">BUG ARCHIVE / COLLECT</span>
      <span class="t micro m8">THE LAND OPENS AFTER OBSERVATION</span>
      <span class="t micro m9">RESTRICTED OBSERVATION</span>
      <span class="t micro m10">未観測　入口封鎖中</span>
      <span class="t micro m11">THE LOOKING BEAR LAND</span>
      <span class="t micro m12">CARD 03 / UNLOCK 06</span>
    </div>
  `;
}

function applyPoster(root){
  root=root||document;
  root.querySelectorAll(".music-v7-unlock-mask").forEach(function(mask){
    if(mask.dataset.lbTypePoster==="1") return;

    var raw=(mask.textContent||"").replace(/\s+/g,"");
    var isFirstGate=
      raw.indexOf("3種類")>=0 ||
      raw.indexOf("3種")>=0 ||
      (raw.indexOf("観測すると")>=0 && raw.indexOf("出現")>=0);

    if(!isFirstGate) return;

    mask.dataset.lbTypePoster="1";
    mask.classList.add("lb-type-poster-mask");
    mask.setAttribute("aria-label","3種類のカードを観測すると6曲解放");
    mask.innerHTML=posterHTML();
  });
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
  applyPoster();

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
  arrange();

  var list=document.getElementById("musicList");
  if(!list) return;

  var observer=new MutationObserver(function(){
    clearTimeout(window.__musicProhibitedStageTimer);
    window.__musicProhibitedStageTimer=setTimeout(arrange,40);
  });
  observer.observe(list,{childList:true,subtree:true,characterData:true});
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",boot);
}else{
  boot();
}
})();