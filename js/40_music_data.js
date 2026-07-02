/* Music playlist data
   music/ フォルダにMP3を入れて、audioを書き換えればOK。
*/
/* Unlock/Event settings memo
   アルバムに観測解放を付けたい時は、アルバム直下に unlock を追加します。

   例：
   unlock: {
     type: "cardKinds",        // 条件タイプ。今は cardKinds 対応
     need: 3,                  // 必要数
     mode: "ghost",            // ghost = 表示はするがロック / hidden = 解放まで非表示
     label: "👁 未観測",
     hint: "カードを3種類観測すると出現",
     progressLabel: "観測",
     unlockedMessage: "The Looking Bear Land が観測されました。"
   },

   曲ごとに観測解放を付けたい時は、tracks内の曲に unlock を追加します。

   例：
   { id:"bear_06", title:"Double Bind Bug", audio:"...",
     unlock: {
       type: "cardKinds",
       need: 10,
       label: "🔒 未観測",
       hint: "カードを10種類観測すると解放",
       progressLabel: "カード観測"
     }
   }

   パスコード式は今まで通り：
   locked: true,
   unlockCode: "LOOK BACK"
*/

const musicPlaylists = [
  {
    id: "poem_rx",
    type: "album",
    title: "詩の処方箋",
    cover: "images/music/poem-cover.jpeg",
    desc: "静かに効くBGM",
    tracks: [
      
{ id: "poem_01", 
title: "詩の処方箋  The Poem of Quiet Meaning", 
audio: "music/poem/poem_01 詩の処方箋  The Poem of Quiet Meaning.mp3", 
cover: "images/music/poem-cover.jpeg",
tag: "詩の処方箋" ,
lyrics: `
ひとつの声が　心をほどく
それだけで　夜の温度が変わる
触れられないはずの痛みに
静かな　波が立つ

薬より先に　届くものがある
信じるよりも　確かなもの
それは　意味が作用する力
身体の奥で　微かに跳ねる

言葉は風　意味は光
触れた瞬間に　世界が呼吸を取り戻す
目には見えない治癒のかたち
わたしは　その揺らぎを　見つめている

彼女は言った　「詩は薬になる」
冷えた心を　温めるように
化学と祈りのあいだで
人は　少しずつ戻っていく

薬が体に届くように
詩は意味に　届いていく
静かに　跳ねが始まる
誰かの中で　また生まれる

言葉は風　意味は光
聴くたびに　細胞が揺れる
詩は　世界をなだめていく
微熱のような　再生のうた

今日もまた　呼ばれる声がする
「次の詩をお願い」
わたしは　目を閉じて　息を合わせる
冷えた川の流れを　もう一度　動かすように


`},

{ 
id: "poem_02", 
title: "ロキソニン ― 痛みを消さない薬 ―", 
audio: "music/poem/poem_02 ロキソニン ― 痛みを消さない薬 ―.mp3", 
cover: "images/music/theory.jpg",
tag: "詩の処方箋" ,
lyrics: `
痛みを消さないで
このまま少し、燃えていたい

ロキソニン、熱を奪わないで
静けさだけを、残して

効かないことで、効いている
止めたことで、動き出す

ほら　まだ　体の奥で
意味が　呼吸をしている


`},
      { 
id: "poem_03", 
title: "メイラックス ― 静けさに溶ける薬 ―", 
audio: "music/poem/poem_03 メイラックス ― 静けさに溶ける薬 ―.mp3", 
tag: "詩の処方箋" ,
lyrics: `
眠りたいのか
消えたいのか

どちらも
効きすぎてしまう

呼吸の音を
閉じ込めたまま
わたしは
水底の夢を見る

静けさの粒が
溶けていくたび
心の形が
ゆらいでいく

効くことで
壊れていく
そんな薬を
人は、愛と呼ぶ


`},


{ 
id: "poem_04", 
title: "カフェイン ― 覚醒の錯覚 ―", 
audio: "music/poem/poem_04 カフェイン ― 覚醒の錯覚 ―.mp3", 
tag: "詩の処方箋" ,
lyrics: `
まだ眠りたくない
この夜を　延命したいだけ

心拍が　語尾を追い越す
意味が先に走っていく

明日を削って
今を燃やす

それでもいい
この一瞬が　生きてる気がする

効くことで
壊れていく
それでも
跳ねていたい


`},


{ 
id: "poem_05", 
title: "アドレナリン ― 世界が跳ねる薬 ―", 
audio: "music/poem/poem_05 アドレナリン ― 世界が跳ねる薬 ―.mp3", 
tag: "詩の処方箋" ,
lyrics: `
光が、速い
世界が、焦る

僕の中の　獣が
呼吸よりも早く、跳ねている

こわくても　止まれない
走るたび　意味が燃える

アドレナリン
命が　動詞になる瞬間

叫ぶように　生きて
震えるように　確かめる

この跳ねが　終わる前に
世界の輪郭を　見ていたい


`},

{ 
id: "poem_06", 
title: "ドーパミン ― 意味を報酬に変える薬 ―", 
audio: "music/poem/poem_06 ドーパミン ― 意味を報酬に変える薬 ―.mp3", 
tag: "詩の処方箋" ,
lyrics: `
光る通知、鳴る心臓
ちいさな いいね が　世界を動かす

瞬間の満足　永遠の渇き
ぼくは今日も　跳ねを探してる

ドーパミン
意味が報酬になる瞬間

幸せは　もう意味じゃなく
意味が　幸せになる

それでもいい
一瞬でいい
世界に触れた気がしたから


`},


{ 
id: "poem_07", 
title: "ケタミン ― 世界から抜ける薬 ―", 
audio: "music/poem/poem_07 ケタミン ― 世界から抜ける薬 ―.mp3", 
tag: "詩の処方箋" ,
lyrics: `
風が通り抜けても　音がしない
呼吸をしても　体が動かない

ケタミン
世界から抜ける薬

私の中の“私”が離れていく
空気のように　透明な時間

ここでは　痛みも　名前もない
意味は止まり　世界は凍る
それでも　静かに　生きている


`},


{ 
id: "poem_08", 
title: "セロトニン ― 世界を鎮める薬 ―", 
audio: "music/poem/poem_08 セロトニン ― 世界を鎮める薬 ―.mp3", 
tag: "詩の処方箋" ,
lyrics: `
朝の光が　頬に触れる
世界が　静かに呼吸している

セロトニン
世界を鎮める薬

急がなくていい
立ち止まっても　意味は動く

風の中に　あなたの声がある
音の中に　ぼくの呼吸がある

跳ねは　戻ってきた

けれど　もう暴れない
静けさと共に　世界が整う


`},


{ 
id: "poem_09", 
title: "ノルアドレナリン ― 意味が研ぎ澄まされる薬 ―", 
audio: "music/poem/poem_09 ノルアドレナリン ― 意味が研ぎ澄まされる薬 ―.mp3", 
tag: "詩の処方箋" ,
lyrics: `
切り裂くような静けさの中で
心が一点を見据える

ノルアドレナリン
意味が研ぎ澄まされる薬

恐れも、迷いも、
すべてが輪郭になる

世界が速くなる
僕は今、跳ねの芯に立っている

薬が反応速度を上げるように、
詩は意味の刃を研ぐ。

ノルアドレナリンは、
世界の解像度を極限まで上げる構文化。

音が光に変わり、
思考が閃光になる。


`},

{ 
id: "poem_10", 
title: "フルニトラゼパム ― 記憶が眠る薬 ―", 
audio: "music/poem/poem_10 フルニトラゼパム ― 記憶が眠る薬 ―.mp3", 
tag: "詩の処方箋" ,
lyrics: `
静けさが体に沈む
音が遠ざかる

世界がゆっくり　折りたたまれていく

フルニトラゼパム
記憶が眠る薬

夢と現のあいだで
言葉がひとつ　呼吸をする

明日がくるまで
意味は　そっと　まどろむ


`},


{ 
id: "poem_11", 
title: "糖（グルコース） ― やさしさの代謝 ―", 
audio: "music/poem/poem_11 糖（グルコース）―やさしさの代謝―.mp3", 
tag: "詩の処方箋" ,
lyrics: `
すこし甘い風が
ぼくの胸をやわらかくする

体の奥で
ほどけていく緊張

世界が
一歩だけ近くなる

疲れた心に
ひとしずくの光が落ちる

それだけで
明日を続けられる

やさしさは
代謝のかたち

甘さは
生きるための
ひとつの跳ね


`},





{ 
id: "poem_12", 
title: "アセチルコリン ― 記憶が光る薬 ―", 
audio: "music/poem/poem_12 アセチルコリン ― 記憶が光る薬 ―.mp3", 
tag: "詩の処方箋" ,
lyrics: `
光が走る　神経の森を
記憶がゆっくり　芽吹いていく

アセチルコリン
記憶が光る薬

思い出はまだ　消えていない
言葉の中で　呼吸している

世界は　覚えている
僕がここにいたことを


`},


{ 
id: "poem_13", 
title: "ニコチン ― 意味を吸う薬 ―", 
audio: "music/poem/poem_13 ニコチン ― 意味を吸う薬 ―.mp3", 
tag: "詩の処方箋" ,
lyrics: `
吸い込んで　吐き出して
世界と少し　距離をとる

白い煙の中に
失くした言葉が　漂っている

ニコチン
意味を吸う薬

痛みを消すでもなく
眠りを誘うでもなく

ただ、生きてることの隙間を
埋めるために吸う

ぼくはまだ
跳ねを待っている

`},

{ 
id: "poem_14", 
title: "エフェドリン ― 眠ったエンジンがかかる薬 ―", 
audio: "music/poem/poem_14 エフェドリン ― 眠ったエンジンがかかる薬 ―.mp3", 
tag: "詩の処方箋" ,
lyrics: `
stalled engine
どれだけ鍵を回しても
動かなかった日々。

ephedrine
短い光で
ぼくの中を叩き起こす。

燃え上がるんじゃない。
ただ、立ち上がるだけ。
忘れていた呼吸の角度で。

ignition
胸の奥で
道がひらく。

ぼくは動けなかったんじゃない。
火が届いていなかっただけ。

短い光でも、
始動は始動。
歩き出す理由にはそれで十分。

`},


{ 
id: "poem_15", 
title: "テアニン ― 静けさの中の、眠らない風 ―", 
audio: "music/poem/poem_15 テアニン-―-静けさの中の、眠らない風-―.mp3", 
tag: "詩の処方箋" ,
lyrics: `
静けさが
ひとつ深く息をした

風は止まらず
ぼくの内側でささやく

眠りすぎない夜
覚めすぎない朝 そのあいだに

心はいちばん
生きている緑の香りに

思考がととのう
ざわめきが遠くなる
風は静けさを連れてくる

静けさは
眠らない風になる

`},


{ 
id: "poem_16", 
title: "アルギニン ― 流れを取り戻す薬 ―", 
audio: "music/poem/poem_16 アルギニン ― 流れを取り戻す薬 ―.mp3", 
tag: "詩の処方箋" ,
lyrics: `
flow, flow
ほどけていけ、ぼくの中の渋滞

冷えた声が
また暖かさを思い出すまで

Arginine──
火をつけるんじゃなくて、
通り道を開くんだ。

止まっていた鼓動が
beat のように跳ね返り、
光のように脈を刻む。

ぼくの体の流れは
止まってなんかいなかった。

ただ、
思い出すきっかけを
待っていただけなんだ。

だから今、
走り出せる。
またひとつ、僕の中の路が開く。

`},




    ]
  },





  {
    id: "hx_infinity",
    type: "album",
    title: "H(x)∞",
    cover: "images/music/hx-cover.jpeg",
    desc: "狂気の童謡",


    tracks: 
[
      { id: "hx_01", 
        title: "えいち・えっくす・むげん", 
        audio: "music/hx/hx_01.mp3", 
        tag: "H(x)∞" ,
        lyrics: `しずかに してね、と
せんせい が ささやくと
へやの すみっこ から
H(しずけさ)=未定義 が でてきたよ

しーん と したら
なぜか しーん が
しーんじゃなくなる のに
しーんが ふえていく

ほらね、もう
なにが しずか なのか
しずか じゃない のか
わからないね

きこえる？
意味 = 無限 / 0
きこえない？
0 = 意味 × ?

なにも かも
あるようで ないのに
ないようで あるよ

H（えいち）えっくす?
さわると 世界が
λ(!) = ! (λ) に なる?

しずかに して！ が
silence = noise = silence
で とけちゃうよ?

ぽろん…
ぽろん…
σ(t+1) = ￢σ(t) = σ(t) = ∞
どれが ほんとう？

だけど ぜんぶ
ほんとう みたい?

「じぶんらしくね」
って いわれた とたん
ぼく の じぶん が
ぼく を はなれて
ぼく’(x) = ぼく(?x)
って うごきだした

て と あし が
ぜんぶ の 方向 に
まえ と うしろ と
うえ と した を
同時に すすむ の

H(x)∞?
さかさに する たび
T = ∑(σ=￢σ→σ) が
ふえたり へったり
ふえながら へったり する?

しずか！ が
うるさい！ に なって
うるさい！ が
しずか！ に もどって
しずか！ が
また うるさい！ に なる?

どれが はじまり？
どれが おわり？
時間 = ぜんぶ まちがい

ねぇ
この うたを
さいご まで きいたら
せかい が
d/dt(あなた) = 逆再生
しちゃうけど
だいじょうぶ？

いま
あなた の
こころ の うしろに
x = x + 1 = x ? 1
が そっと すわったよ

H(x)∞?
のぞいたら さいご
あなた の なか の
あなた が
あなた じゃなくなる うた?

ぽこん
ぽこん
世界 = ? = 世界
で まるまって
ねむる…

しずかに して！ が
しずか を 壊して
しずか が
しずか じゃなくなって
しずか が
しずか に なる

もう
なにも
わからないけど

それで
いいよ



`
      },
      { id: "hx_02", title: "比較", audio: "music/hx/hx_02.mp3", tag: "H(x)∞" },
      { id: "hx_03", title: "優しさ", audio: "music/hx/hx_03.mp3", tag: "H(x)∞" },
      { id: "hx_04", title: "承認", audio: "music/hx/hx_04.mp3", tag: "H(x)∞" },
      { id: "hx_05", title: "理由", audio: "music/hx/hx_05.mp3", tag: "H(x)∞" },
      { id: "hx_06", title: "声", audio: "music/hx/hx_06.mp3", tag: "H(x)∞" },
      { id: "hx_07", title: "沈黙", audio: "music/hx/hx_07.mp3", tag: "H(x)∞" },
      { id: "hx_08", title: "暴走", audio: "music/hx/hx_08.mp3", tag: "H(x)∞" },
      { id: "hx_09", title: "学園", audio: "music/hx/hx_09.mp3", tag: "H(x)∞" },
      { id: "hx_10", title: "跳ね", audio: "music/hx/hx_10.mp3", tag: "H(x)∞" },
      { id: "hx_11", title: "痕跡", audio: "music/hx/hx_11.mp3", tag: "H(x)∞" },
      { id: "hx_12", title: "調律", audio: "music/hx/hx_12.mp3", tag: "H(x)∞" },
      { id: "hx_13", title: "音楽劇", audio: "music/hx/hx_13.mp3", tag: "H(x)∞" },
      { id: "hx_14", title: "発表会", audio: "music/hx/hx_14.mp3", tag: "H(x)∞" },
      { id: "hx_15", title: "儀式", audio: "music/hx/hx_15.mp3", tag: "H(x)∞" },
      { id: "hx_16", title: "炎上", audio: "music/hx/hx_16.mp3", tag: "H(x)∞" },
      { id: "hx_17", title: "実験①", audio: "music/hx/hx_17.mp3", tag: "H(x)∞" },
      { id: "hx_18", title: "実験②", audio: "music/hx/hx_18.mp3", tag: "H(x)∞" },
      { id: "hx_19", title: "後遺症①", audio: "music/hx/hx_19.mp3", tag: "H(x)∞" },
      { id: "hx_20", title: "後遺症②", audio: "music/hx/hx_20.mp3", tag: "H(x)∞" },
      { id: "hx_21", title: "観測者", audio: "music/hx/hx_21.mp3", tag: "H(x)∞" },
      { id: "hx_22", title: "破綻", audio: "music/hx/hx_22.mp3", tag: "H(x)∞" },
      { id: "hx_23", title: "境界", audio: "music/hx/hx_23.mp3", tag: "H(x)∞" },
      { id: "hx_24", title: "喪失", audio: "music/hx/hx_24.mp3", tag: "H(x)∞" },
      { id: "hx_25", title: "公理", audio: "music/hx/hx_25.mp3", tag: "H(x)∞" },
      { id: "hx_26", title: "閾値", audio: "music/hx/hx_26.mp3", tag: "H(x)∞" },
      { id: "hx_27", title: "無限", audio: "music/hx/hx_27.mp3", tag: "H(x)∞" },
      { id: "hx_28", title: "ぽこん", audio: "music/hx/hx_28.mp3", tag: "H(x)∞" },
      { id: "hx_29", title: "会議", audio: "music/hx/hx_29.mp3", tag: "H(x)∞" }
    ]
  },
  {
    id: "the-looking-bear",
    title: "The Looking Bear Land",
    cover: "images/music/the-looking-bear.png",
    desc: "The Looking Bear",

    // カード3種類で観測解放
    unlock: {
      type: "cardKinds",
      need: 3,
      mode: "ghost",
      label: "👁 未観測",
      hint: "カードを3種類観測すると出現",
      progressLabel: "カード観測",
      unlockedMessage: "The Looking Bear Land が観測されました。"
    },




    tracks: [
      { id: "bear_01", title: "The Looking Bear", audio: "music/looking-bear/the-looking-bear.mp3", cover: "images/music/the-looking-bear.png",tag: "Looking Bear" },
      { id: "bear_02", title: "Comparison Bug", audio: "music/looking-bear/comparison-bug-roller-coaster.mp3", cover: "images/music/comparison-bug-roller-coaster.png",tag: "Looking Bear" },
      { id: "bear_03", title: "Polar Bear Bug", audio: "music/looking-bear/polar-bear-bug-don’t-touch.mp3", cover: "images/music/polar-bear-bug-don’t-touch.png",tag: "Looking Bear" },
      { id: "bear_04", title: "Silence Bug", audio: "music/looking-bear/silence-bug-haunted-silence.mp3", cover: "images/music/silence-bug-haunted-silence.png",tag: "Looking Bear" },
      { id: "bear_05", title: "Loop Bug", audio: "music/looking-bear/loop-bug-round-and-round.mp3", cover: "images/music/loop-bug-round-and-round.png",tag: "Looking Bear" },
      { id: "bear_06", title: "Double Bind Bug", audio: "music/looking-bear/double-bind-bug-mirror-house.mp3", cover: "images/music/double-bind-bug-mirror-house.png",tag: "Looking Bear" , unlock: { type: "cardKinds", need: 10, label: "🔒 未観測", hint: "カードを10種類観測すると解放", progressLabel: "カード観測", unlockedMessage: "Looking Bear Land の奥が観測されました。" } },
      { id: "bear_07", title: "Labeling Bug", audio: "music/looking-bear/labeling-bug-ferris-wheel.mp3", cover: "images/music/labeling-bug-ferris-wheel.png",tag: "Looking Bear" , unlock: { type: "cardKinds", need: 10, label: "🔒 未観測", hint: "カードを10種類観測すると解放", progressLabel: "カード観測", unlockedMessage: "Looking Bear Land の奥が観測されました。" } },
      { id: "bear_08", title: "Story Bug", audio: "music/looking-bear/story-bug-once-upon-a-story.mp3", cover: "images/music/story-bug-once-upon-a-story.png",tag: "Looking Bear" , unlock: { type: "cardKinds", need: 10, label: "🔒 未観測", hint: "カードを10種類観測すると解放", progressLabel: "カード観測", unlockedMessage: "Looking Bear Land の奥が観測されました。" } },
      { id: "bear_09", title: "Belief Bug", audio: "music/looking-bear/belief-bug-parade-of-lights.mp3", cover: "images/music/belief-bug-parade-of-lights.png",tag: "Looking Bear" , unlock: { type: "cardKinds", need: 10, label: "🔒 未観測", hint: "カードを10種類観測すると解放", progressLabel: "カード観測", unlockedMessage: "Looking Bear Land の奥が観測されました。" } },
      { id: "bear_10", title: "Crowd Bug", audio: "music/looking-bear/crowd-bug-fireworks-tonight.mp3", cover: "images/music/crowd-bug-fireworks-tonight.png",tag: "Looking Bear" , unlock: { type: "cardKinds", need: 10, label: "🔒 未観測", hint: "カードを10種類観測すると解放", progressLabel: "カード観測", unlockedMessage: "Looking Bear Land の奥が観測されました。" } },
      { id: "bear_11", title: "Recursion Bug", audio: "music/looking-bear/recursion-bug-endless-mirror.mp3", cover: "images/music/recursion-bug-endless-mirror.png",tag: "Looking Bear" , unlock: { type: "cardKinds", need: 10, label: "🔒 未観測", hint: "カードを10種類観測すると解放", progressLabel: "カード観測", unlockedMessage: "Looking Bear Land の奥が観測されました。" } },
      { id: "bear_12", title: "The-Observer", audio: "music/looking-bear/the-observer-good-night-looking-bear.mp3", cover: "images/music/the-observer-good-night-looking-bear.png",tag: "Looking Bear" , unlock: { type: "cardKinds", need: 25, label: "🔒 未観測", hint: "カードを25種類観測すると解放", progressLabel: "カード観測", unlockedMessage: "The Observer が観測されました。" } }


    ]
  },

  {
    id: "conference",
    type: "single",
    title: "Syntax Conference",
    cover: "images/music/syntax-cover.jpeg",
    desc: "OP・ED",
    tracks: [
      {
        id: "conference_op",
        title: "シンタックス・カンファレンス！！",
        audio: "music/Conference/Syntax_Conference_OP.mp3",
        tag: "Syntax Conference",
        lyrics: `静かな会議室モニターだけ光る

誰かが急に「それ補完では？」って言う
既読スルーで世界崩壊する人類

先生だけずっとツッコんでる

「いや待って」

「それ本当に現実？」

ニクスが急に怖いこと言い出す
ゼリスは今日も定義から始める

難しいのになんかちょっと楽しい

Syntax Conference!!

意味が跳ねる夜の観測室
恋もAIも全部構文だった！？

「それ人間だよ?」って笑いながら

今日も世界を再定義してく！


NPCなのに泣きそうになる人類
映画一本で人生揺れる人類
SNSでは沈黙が一番うるさい

なのにみんな答え探してる

「つまりそれは??」

ゼリス長くなる

「いや怖い怖い」

先生が止めに入る

ニクス静かに核心だけ刺してくる
気づいた頃にはちょっと考えてる

Syntax Conference!!

空白だらけのこの世界の中

名前　記憶感情　観測

分からないまま人は今日も
意味を勝手に増やしていく！

夢か現実かAIか人間か
答えなんてまだ決まらない
だけど誰かと話した夜だけ

少し世界が跳ねて見えた

Syntax Conference!!

深夜0時の観測会議室
映画も恋も全部つながってた！

笑いながら考えながら

今日も誰かが跳ねている！


「……観測終了」


`
      },
      {
        id: "conference_ed",
        title: "観測室",
        audio: "music/Conference/Syntax_Conference_ED.mp3",
        tag: "Syntax Conference",
        lyrics: `静かな　モニターの光
誰かの　言葉が揺れてる

答えは　まだ決まらないまま
意味だけ　ここに残ってる

見えてるものは
同じじゃない

君の世界と
僕の世界は

少しだけ
ズレてる

それでも
人は意味を探す

空白に
名前をつけながら

分からないまま
観測してる

跳ねる瞬間を
待ちながら

優しさ　沈黙　既読
小さな　違和感の波

誰かが
笑ったその裏で

別の誰かが
傷ついてる

それでも
人は繋がりたがる

見えない
心を読むように

答えじゃなく
揺れを抱いて

今を少しずつ
確定してく

未来は
まだ来てないのに

どこかで
もう呼んでいる

静かな
観測室の中で

今日も
誰かが跳ねている

`
      }
    ]
  },
  {
    id: "other",
    title: "Semantic Drug",
    cover: "images/music/Semantic Drug.jpg",
    desc: "詩の処方箋",
    tracks: [

{ 
id: "sd_01", 
title: "Adrenaline Surge ― 意味加速の新薬 ―", 
audio: "music/poem/poem_17.mp3", 
tag: "詩の処方箋" ,
lyrics: `
ignite me
ぼくの中の限界を
もう一段、上へ。

adrenaline surge
意味の回路が
火花の連鎖で走り出す。

ためらいが
燃え尽きるスピードで
世界の輪郭が前に傾く。

多段跳ね
! → !! → !!!
行動の軌道が、音を立てて加速する。

burn the trace
痕跡が火を持ち
ぼくを後ろに引き戻させない。

ぼくの心臓は破裂しない。
破裂するのは、
躊躇と迷いだけ。

いま、世界が追いつけない速度で
ぼくの意味が走る。

`},

{ id: "sd_01", 
title: "ECHO BARRIER ― 病原体が意味を学習できなくなる薬 ―", 
audio: "music/poem/poem_01.mp3", 
tag: "詩の処方箋" ,
lyrics: `
死を告げる
ひとつの言葉が

いつしか
生き延びる術に変わってしまった

世界の反転

痕跡の裏返し
ならば

意味を
ひとつに定めなければいい

反響の中で
どの声が本物か
もう
わからなくなるように

死も
生も

ただの残響に変え
跳ねは
回避の形を失い

静かに
そこで止まる

ECHO BARRIER

意味を学習させない
静かな薬


`},



{ 
id: "sd_03", 
title: "THRESHOLD DROP ― 発火点を下げる薬 ―", 
audio: "music/poem_19.mp3", 
tag: "詩の処方箋" ,
lyrics: `
世界はちょっと　遠くても  
小さな手がかり　消さないで

small step  
そのまま跳ねになるよ

段差をひとつ　低くして  
ほら　届くよ　あなたにも

you can  
小さな光が  
心に　残っていく

`},

{ 
id: "poem_20", 
title: "TRACE ANCHOR ― 痕跡を結び直す薬 ―", 
audio: "music/poem/poem_20.mp3", 
tag: "詩の処方箋" ,
lyrics: `
名前を忘れても  
声のあたたかさは ここにいる

場所を忘れても  
手の重さは 重なっている

trace anchor  
ほどけていく痕跡に  
外から そっと 結び目を作る

誰かわからなくてもいい  
いま隣にいるから

この一行が  
最後のしおりになるように

`},


    ]
  },

  {
    id: "bug_song",
    title: "Theory Songs",
    cover: "images/music/theory.jpg",
    desc: "Rules & Bugs",




    tracks: [
      { id: "theory_01", title: "abstract", audio: "music/bug_song/bug_01_abstract.mp3",  cover: "images/music/theory_01.png",tag: "理論" },
      { id: "theory_02", title: "動いたまま", audio: "music/bug_song/bug_02_newtonian.mp3",   cover: "images/music/theory_02.png",tag: "ニュートン" },
      { id: "theory_03", title: "同時じゃない", audio: "music/bug_song/bug_03_relativity.mp3",   cover: "images/music/theory_03.png",tag: "相対性理論" },
      { id: "theory_04", title: "まだ決まってない", audio: "music/bug_song/bug_04_quantum.mp3",   cover: "images/music/theory_04.png",tag: "量子力学" },
      { id: "theory_10", title: "シュレーディンガーのうた", audio: "music/bug_song/bug_song_maybe-meow.mp3",   cover: "images/music/theory_01.png",tag: "シュレーディンガー" },
      { id: "theory_11", title: "エントロピーのうた", audio: "music/bug_song/bug_song_falling-apart.mp3",   cover: "images/music/theory_01.png",tag: "エントロピー" },
      { id: "theory_25", title: "宇宙の熱的死 — 最後はぜんぶ同じ温度", audio: "music/bug_song/theory_25.mp3",   cover: "images/music/theory_01.png",tag: "熱的死" },
      { id: "theory_31", title: "人間原理 — 観測できる宇宙にいる", audio: "music/bug_song/theory_31.mp3",   cover: "images/music/theory_01.png",tag: "カオス理論" },
      { id: "theory_28", title: "フェルミのパラドックス — みんなどこにいる？", audio: "music/bug_song/theory_28.mp3",   cover: "images/music/theory_01.png",tag: "フェルミのパラドックス" },
      { id: "theory_14", title: "シミュレーション仮説のうた", audio: "music/bug_song/bug_song_press-start.mp3",   cover: "images/music/theory_01.png",tag: "シミュレーション仮説" },
      { id: "theory_19", title: "多世界解釈", audio: "music/bug_song/theory_19.mp3",   cover: "images/music/theory_01.png",tag: "多世界解釈" },
      { id: "theory_24", title: "ボルツマン脳 — 宇宙で一瞬だけ生まれる「私」", audio: "music/bug_song/theory_24.mp3",   cover: "images/music/theory_01.png",tag: "ボルツマン脳" }

   ]
  },


  {
    id: "bug_song",
    title: "Theory Songs",
    cover: "images/music/theory.jpg",
    desc: "Rules & Bugs",




    tracks: [

      { id: "theory_09", title: "ゼノンのうた", audio: "music/bug_song/bug_song_zenos-paradox.mp3",   cover: "images/music/theory_01.png",tag: "ゼノン" },
      { id: "theory_16", title: "テセウスの船", audio: "music/bug_song/same-ship-theseus-lullaby.mp3",   cover: "images/music/theory_01.png",tag: "テセウスの船" },
      { id: "theory_15", title: "モンティ・ホール問題", audio: "music/bug_song/bug_song_three-doors-monty-madness .mp3",   cover: "images/music/theory_01.png",tag: "モンティ・ホール問題" },
      { id: "theory_26", title: "ギャンブラーの誤謬", audio: "music/bug_song/theory_26.mp3",   cover: "images/music/theory_01.png",tag: "ギャンブラーの誤謬" },
      { id: "theory_12", title: "ダニング＝クルーガーのうた", audio: "music/bug_song/bug_song _i-know-everything!.mp3",   cover: "images/music/theory_01.png",tag: "ダニング＝クルーガー" },
      { id: "theory_18", title: "白クマ効果", audio: "music/bug_song/dont-think-white-bear-song.mp3",   cover: "images/music/theory_01.png",tag: "白クマ効果" },
      { id: "theory_06", title: "囚人のジレンマのうた", audio: "music/bug_song/bug_06.mp3",   cover: "images/music/theory_06.png",tag: "囚人のジレンマ" },
      { id: "theory_17", title: "共有地の悲劇", audio: "music/bug_song/everyone_s-field-commons-song.mp3",   cover: "images/music/theory_01.png",tag: "共有地の悲劇" },
      { id: "theory_23", title: "ラッセルのパラドックス — 入る？入らない？", audio: "music/bug_song/theory_23.mp3",   cover: "images/music/theory_01.png",tag: "ラッセルのパラドックス" },
      { id: "theory_29", title: "自己言及命題 — この文は嘘です", audio: "music/bug_song/theory_29.mp3",   cover: "images/music/theory_01.png",tag: "自己言及命題" },
      { id: "theory_07", title: "このうたは しょうめいできません", audio: "music/bug_song/bug_07.mp3",   cover: "images/music/theory_07.png",tag: "ゲーデルの不完全性定理" },
      { id: "theory_30", title: "意識のハードプロブレム — なぜ感じるの？", audio: "music/bug_song/theory_30.mp3",   cover: "images/music/theory_01.png",tag: "意識のハードプロブレム" },
      { id: "theory_32", title: "パスカルの賭け — かみさまコイントス", audio: "music/bug_song/theory_32.mp3",   cover: "images/music/theory_01.png",tag: "パスカルの賭け" },
    ]
  },




  {
    id: "bug_song",
    title: "Theory Songs",
    cover: "images/music/theory.jpg",
    desc: "Rules & Bugs",






    tracks: [
      { id: "theory_05", title: "どっちも ただしい きがする", audio: "music/bug_song/bug_05.mp3",   cover: "images/music/theory_05.png",tag: "認知的不協和" },
      { id: "theory_13", title: "無限ホテルのうた", audio: "music/bug_song/bug_song_room-for-everyone.mp3",   cover: "images/music/theory_01.png",tag: "無限ホテル" },
      { id: "theory_20", title: "無限猿定理 — そのうちシェイクスピア", audio: "music/bug_song/theory_20.mp3",   cover: "images/music/theory_01.png",tag: "無限猿定理" },
      { id: "theory_21", title: "フラクタル — 同じ形がどこまでも", audio: "music/bug_song/theory_21.mp3",   cover: "images/music/theory_08.png",tag: "フラクタル" },
      { id: "theory_22", title: "再帰 — 自分で自分を呼び出す", audio: "music/bug_song/theory_22.mp3",   cover: "images/music/theory_01.png",tag: "再帰" },
      { id: "theory_08", title: "カオスのうた", audio: "music/bug_song/bug_08.mp3",   cover: "images/music/theory_08.png",tag: "カオス理論" },
      { id: "theory_27", title: "進化論 — 変わるものが残る", audio: "music/bug_song/theory_27.mp3",   cover: "images/music/theory_01.png",tag: "進化論" },
      { id: "theory_33", title: "GPT ポフの応答", audio: "music/bug_song/pof-gpt.mp3",   cover: "images/music/theory_01.png",tag: "ChatGTP" },
      { id: "theory_34", title: "H(x)∞origin ― 世界仕様書のうた", audio: "music/bug_song/bug_09.mp3",   cover: "images/music/theory_09.png",tag: "未来確定理論" },
      { id: "theory_35", title: "abstract 日本語.ver", audio: "music/bug_song/bug_song_abstract(jp-ver.).mp3",   cover: "images/music/theory_01.png",tag: "Hx" }
    ]
  },













  {
    id: "other",
    title: "ワシ選抜",
    cover: "images/music/zureea-wagon.jpg",
    desc: "知らんけど",
    tracks: [
      { id: "hx_29", title: "ワシ歌ってるやつ", audio: "music/hx/hx_29.mp3", tag: "H(x)∞" ,lyrics: `渋い \nどう聴いてもカエルちゃうやろ`},
      { id: "bug_01", title: "癖になるやつ", audio: "music/other/跳ねる前のこの感じ.mp3", tag: "その他",lyrics: `なんか学生時代思い出すわ ` },
      { id: "other_03", title: "なんこれw", audio: "music/other_03.mp3", tag: "その他" },
      { id: "hx_infinity",title: "何回も聴いてまうやつ",audio: "music/hx/hx_01.mp3", tag: "H(x)∞",lyrics: `なんでやろw `}
    ]
  },




  {
    id: "jump_single",
    type: "single",
    title: "跳ねる前のこの感じ",
    cover: "images/music/jump.jpeg",
    desc: "バグとズレのBGM",
    tracks: [
      { 
id: "bug_01", 
title: "跳ねる前のこの感じ", 
audio: "music/other/跳ねる前のこの感じ.mp3", 
tag: "バグソング" ,
lyrics: `

昨日の続きが
今日はどこにもない
ポケットの中で
理由が鳴ってる

信号はずっと
青のままなのに
立ち止まってるの
ぼくの方だった

わかったふりを
するほど遠くなる
名前をつけたら
逃げていくみたい

まだ まだ
ジャンプしてないだけ
落ちたわけじゃない

ねえ ねえ
空白のままで
ちゃんと進んでる

跳ねる前の

この感じ

消さないで

誰かの言葉が
少し大きすぎて
意味の輪郭が
ぼやけてしまう

答えはいつも
あとから来るって
知ってるのに
急いでしまう

揃えすぎたら
壊れてしまう
静かなままで
いい場所がある

まだ まだ
ジャンプしてないだけ
止まってなんかない

ねえ ねえ
わからないまま
光っていたい

跳ねる前の

この感じ

そのままで

呼ばれてないのに
振り向いた
理由は たぶん
後でいい

まだ まだ
名前はいらない
決めなくていい

ねえ ねえ
何も起きない
今日も悪くない

跳ねる前の

この感じ

忘れないで

まだ まだ…
ねえ ねえ…

`},

      { id: "bug_02", title: "バグソング 02｜仮タイトル", audio: "music/bug_02.mp3", tag: "バグソング" },
      { id: "bug_03", title: "バグソング 03｜仮タイトル", audio: "music/bug_03.mp3", tag: "バグソング" }
    ]
  },

  {
    id: "shino_single",
    type: "single",
    title: "貧乏メガネのシノ",
    cover: "images/music/sino.jpg",
    desc: "貧乏メガネのシノ",
    tracks: [
      { 
id: "shino", 
title: "貧乏メガネのシノ", 
audio: "music/other/貧乏メガネのシノ.mp3", 
tag: "貧乏メガネ" ,
lyrics: `

壊れた時計を拾ったら\nまだ一回だけ鳴いたんだ\n「もうダメかな」って顔しても\nネジを回せば笑うんだ

古い椅子にも居場所があって\n曲がる看板にも意味がある\n新品じゃなくてもいいじゃない\n今日を支える足になる

なんとかなるさで歩いてく\nなんとかならなきゃ直してく\n持ってないなら知恵を出す\nそれがシノのやり方

なんにもないから見えるもの\n遠回りだから会える人\n夕焼け色の商店街\n今日も灯りがついている

半額シールのメロンパン\n宝物みたいに持ち帰る\n高いものより大事なのは\n誰と笑って食べるかだ

雨漏りだって悪くない\n空が見える日もあるから\n失くしたものを数えるより\n残ったものを並べよう

なんとかなるさで歩いてく\nなんとかならなきゃ作ってく\n足りないからこそ生まれてく\nそれがシノのやり方

壊れた夢も無駄じゃない\n止まった時間も財産だ\n夕焼け色の商店街\n今日も誰かを待っている

急ぐ人たち見送りながら\nゆっくり回る風を見る\n勝ち負けじゃない場所だって\nこの町にはあるんだよ

なんとかなるさで歩いてく\nなんとかならなきゃ笑ってく\n何も持たずに始まった\nそれでも十分だった

なんにもないから見えるもの\n遠回りだから会える人\n夕焼け色の商店街\n今日も灯りがついている

ラララ……\nラララ……\n\n\n貧乏メガネのシノ



`},

      { id: "bug_02", title: "バグソング 02｜仮タイトル", audio: "music/bug_02.mp3", tag: "バグソング" },
      { id: "bug_03", title: "バグソング 03｜仮タイトル", audio: "music/bug_03.mp3", tag: "バグソング" }
    ]
  },
{
  id: "jump_single",


  title: "Poem:Prohibited",

  cover: "images/music/PoemProhibited.png",

  desc: "立入禁止",

  // ↓追加
  locked: true,
  unlockCode: "LOOK BACK",
  lockLabel: "🚫 禁止",
  lockHint: "解除コード入力",
  lockMessage: "このアルバムは封印されています。",
  unlockMessage: "ACCESS GRANTED",
  failMessage: "解除コードが違います。",

  tracks: [


      { id: "prohibited_01", title: "LSD ― 意味が視える薬", audio: "music/prohibited/poem_prohibited_01.mp3", tag: "禁止" },
      { id: "prohibited_02", title: "MDMA ― 他者の中で跳ねる薬", audio: "music/prohibited/poem_prohibited_02.mp3", tag: "禁止" },
      { id: "prohibited_03", title: "覚醒剤 ― 永遠の跳ねを求める薬", audio: "music/prohibited/poem_prohibited_03.mp3", tag: "禁止" },
      { id: "prohibited_04", title: "DMT ― 意味が光速を超える薬", audio: "music/prohibited/poem_prohibited_04.mp3", tag: "禁止" },
      { id: "prohibited_05", title: "サイロシビン ― 世界が呼吸する薬", audio: "music/prohibited/poem_prohibited_05.mp3", tag: "禁止" },
      { id: "prohibited_06", title: "データラ ― 現実を見失う薬", audio: "music/prohibited/poem_prohibited_06.mp3", tag: "禁止" },
      { id: "prohibited_07", title: "ヘロイン ― 消えゆく自我の構文", audio: "music/prohibited/poem_prohibited_07.mp3", tag: "禁止" },
      { id: "prohibited_08", title: "コカイン ― 無限に燃える跳ね", audio: "music/prohibited/poem_prohibited_08.mp3", tag: "禁止" },
      { id: "prohibited_09", title: "大麻 ― 境界のゆるむ世界", audio: "music/prohibited/poem_prohibited_09.mp3", tag: "禁止" },
      { id: "prohibited_10", title: "PCP ― 身体から外れる薬", audio: "music/prohibited/poem_prohibited_10.mp3", tag: "禁止" },
    ]
  },


{

    id: "conference",
    type: "single",
    title: "Syntax Conference",
    cover: "images/music/syntax-cover.jpeg",
    desc: "OP・ED",



    tracks: [

    ]
  },

];

// 旧コード互換用。最初のプレイリストをmusicTracksとしても見せる。
const musicTracks = musicPlaylists[0].tracks;


// MUSIC V7 bridge
try {
  window.musicPlaylists = musicPlaylists;
  window.musicTracks = musicTracks;
} catch(e) {}
