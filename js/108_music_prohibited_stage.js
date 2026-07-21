/* 108_music_prohibited_stage_cinema_poster.js
   LOOKING BEAR 初回ロック専用・映画館ポスター版
   - 中央のクマを見せる
   - 情報階層を4段階に整理
   - 「観測すると」は一行のまま90度回転
   - SVGで一枚の紙面として固定配置
*/
(function(){
"use strict";

function usingV7(){
  return !!document.querySelector(".music-v7-restricted-grid");
}

function removeLegacy(){
  var old=document.querySelector(".music-prohibited-stage");
  if(old) old.remove();
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
    .music-v7-unlock-mask b:empty{display:none!important}

    .music-v7-unlock-mask.lb-cinema-poster-mask{
      position:absolute!important;
      inset:0!important;
      display:block!important;
      padding:0!important;
      overflow:hidden!important;
      border-radius:inherit!important;
      pointer-events:none!important;
      background:
        radial-gradient(circle at 51% 47%, transparent 0 21%, rgba(0,0,0,.03) 36%, rgba(0,0,0,.22) 100%),
        linear-gradient(180deg,rgba(0,0,0,.02),rgba(0,0,0,.27))!important;
    }

    .lb-cinema-poster{
      position:absolute;
      inset:0;
      width:100%;
      height:100%;
      display:block;
      overflow:hidden;
      color:#efe5b3;
      filter:drop-shadow(0 2px 2px rgba(0,0,0,.58));
    }

    .lb-cinema-poster text{
      fill:currentColor;
      font-family:
        "Arial Black",
        "Helvetica Neue",
        "Hiragino Kaku Gothic ProN",
        "Yu Gothic",
        sans-serif;
      font-weight:900;
    }

    .lb-cinema-poster .jp{letter-spacing:-.08em}
    .lb-cinema-poster .thin{
      font-family:
        "Helvetica Neue",
        "Hiragino Sans",
        "Yu Gothic",
        sans-serif;
      font-weight:700;
      letter-spacing:.03em;
    }
    .lb-cinema-poster .en{
      font-family:"Helvetica Neue",Arial,sans-serif;
      font-weight:800;
      letter-spacing:.10em;
    }
    .lb-cinema-poster .rule{
      stroke:currentColor;
      stroke-width:4;
      opacity:.82;
    }
    .lb-cinema-poster .hair{
      stroke-width:2;
      opacity:.58;
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
  <svg class="lb-cinema-poster" viewBox="0 0 1000 1000"
       preserveAspectRatio="none" aria-hidden="true">

    <!-- LEVEL 1 / 画面の骨格 -->
    <text class="jp" x="-22" y="235" font-size="300">3</text>

    <text class="jp" x="615" y="980" font-size="205"
          textLength="370" lengthAdjust="spacingAndGlyphs">出現</text>

    <!-- LEVEL 2 / 大見出し -->
    <text class="jp" x="285" y="178" font-size="148"
          textLength="520" lengthAdjust="spacingAndGlyphs">種類</text>

    <text class="jp" x="28" y="744" font-size="170"
          textLength="340" lengthAdjust="spacingAndGlyphs">6曲</text>

    <text class="jp" x="392" y="730" font-size="128"
          textLength="300" lengthAdjust="spacingAndGlyphs">解放</text>

    <!-- LEVEL 3 / 中情報。中央の顔を避けて左右に分散 -->
    <text class="jp thin" x="52" y="350" font-size="62"
          textLength="380" lengthAdjust="spacingAndGlyphs">異なるカード</text>

    <text class="jp" x="45" y="460" font-size="122"
          textLength="280" lengthAdjust="spacingAndGlyphs">三種</text>

    <text class="jp thin" x="48" y="522" font-size="55"
          textLength="255" lengthAdjust="spacingAndGlyphs">集める</text>

    <g transform="translate(955 280) rotate(90)">
      <text class="jp thin" x="0" y="0" font-size="72"
            textLength="470" lengthAdjust="spacingAndGlyphs">観測すると</text>
      <line class="hair" x1="0" y1="24" x2="470" y2="24"/>
    </g>

    <!-- 中央のクマを空けるための視覚的なフレーム -->
    <line class="rule" x1="36" y1="272" x2="790" y2="272"/>
    <line class="hair" x1="36" y1="560" x2="690" y2="560"/>
    <line class="rule" x1="36" y1="785" x2="700" y2="785"/>

    <!-- LEVEL 4 / 小さな情報 -->
    <text class="en" x="300" y="220" font-size="22"
          textLength="470" lengthAdjust="spacingAndGlyphs">THREE DIFFERENT CARDS</text>

    <text class="en" x="50" y="590" font-size="22"
          textLength="300" lengthAdjust="spacingAndGlyphs">COLLECT / OBSERVE / OPEN</text>

    <text class="en" x="398" y="765" font-size="20"
          textLength="285" lengthAdjust="spacingAndGlyphs">TRACK 01—06 UNLOCK</text>

    <text class="en" x="42" y="820" font-size="25"
          textLength="310" lengthAdjust="spacingAndGlyphs">FIRST OBSERVATION GATE</text>

    <text class="en" x="385" y="820" font-size="25"
          textLength="315" lengthAdjust="spacingAndGlyphs">THE LOOKING BEAR LAND</text>

    <text class="en" x="44" y="855" font-size="20"
          textLength="260" lengthAdjust="spacingAndGlyphs">ENTRY CONDITION / 03</text>

    <text class="en" x="390" y="855" font-size="20"
          textLength="300" lengthAdjust="spacingAndGlyphs">RESTRICTED OBSERVATION</text>

    <text class="en" x="44" y="890" font-size="18"
          textLength="240" lengthAdjust="spacingAndGlyphs">CARD ARCHIVE</text>

    <text class="en" x="390" y="890" font-size="18"
          textLength="300" lengthAdjust="spacingAndGlyphs">MUSIC ACCESS 01—06</text>

    <!-- 左右の縦ノイズ -->
    <g transform="translate(18 800) rotate(-90)">
      <text class="en" x="0" y="0" font-size="18"
            textLength="300" lengthAdjust="spacingAndGlyphs">LOOKING BEAR / FIRST GATE</text>
    </g>

    <g transform="translate(985 880) rotate(90)">
      <text class="en" x="0" y="0" font-size="17"
            textLength="230" lengthAdjust="spacingAndGlyphs">OBSERVE THREE</text>
    </g>
  </svg>`;
}

function applyPoster(root){
  root=root||document;

  root.querySelectorAll(".music-v7-unlock-mask").forEach(function(mask){
    if(mask.dataset.lbCinemaPoster==="1") return;

    var raw=(mask.textContent||"").replace(/\s+/g,"");
    var target=
      raw.indexOf("3種類")>=0 ||
      raw.indexOf("3種")>=0 ||
      (raw.indexOf("観測すると")>=0 && raw.indexOf("出現")>=0);

    if(!target) return;

    mask.dataset.lbCinemaPoster="1";
    mask.classList.add("lb-cinema-poster-mask");
    mask.setAttribute("aria-label","異なる3種類のカードを観測すると6曲解放");
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