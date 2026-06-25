/*
  メガネ辞書 音声登録ファイル

  ここだけ編集すれば、辞書モードの単語タップ音声を増やせます。

  書き方：
  "単語": {
    メガネID: { id: "mp3ファイル名（拡張子なし）", text: "MP3が無い時のTTS文" }
  }

  MP3は audio/ フォルダに置きます。
  例： id: "laugh_gag_01" → audio/laugh_gag_01.mp3

  メガネID一覧：
  happy / math / hacker / communication / medical / economy / science / gag
*/
window.MEGANE_VOICE_MAP = {

  "メロンパン": {
    happy: { id: "melon pan_happy_01", text: "メロンパン♪幸せを持ち歩ける、ふわふわの冒険パン♪袋を開ける前から、ちょっとだけ嬉しいんだよ♪" 
  },
    math: { id: "melon pan_math_01", text: "メロンパン。サクサクとふわふわの両立条件。硬さと柔らかさ。矛盾する要素が同時に成立している。興味深いな。" 
  },
  hacker: {id: "melon pan_hacker_01",text: "メロンパン。高確率で手が伸びる購買誘導装置。視界に入る。気になる。気付いたらレジを通過している。回避不能だ。"
  },
    communication: { id: "melon pan_communication_01", text: "愛。何度も相手を知りたくなる状態。全部知れるわけじゃないのに、つい近づきたくなるんだよね。" 
  },
    medical: { id: "melon pan_medical_01", text: "生きる理由になる薬。" 
  },
    economy: { id: "melon pan_economy_01", text: "回収不能な時間投資。" 
  },
    science: { id: "melon pan_science_01", text: "繁殖と協力を安定化させる適応戦略。" 
  },
    gag: { id: "melon pan_gag_01", text: "メロンパン？コンビニ入ったら目ぇ合うやつや。" 
  }
},
  "お気に入り": {
    happy: { id: "favorite_happy_01", text: "保護しました♪" 
  },
    math: { id: "favorite_math_01", text: "優先観測対象" 
  },
  hacker: {id: "favorite_hacker_01",text: "キャッシュ"
  },
    communication: { id: "favorite_communication_01", text: "愛。何度も相手を知りたくなる状態。全部知れるわけじゃないのに、つい近づきたくなるんだよね。" 
  },
    medical: { id: "favorite_medical_01", text: "生きる理由になる薬。" 
  },
    economy: { id: "favorite_economy_01", text: "回収不能な時間投資。" 
  },
    science: { id: "favorite_science_01", text: "繁殖と協力を安定化させる適応戦略。" 
  },
    gag: { id: "favorite_gag_01", text: "気になって連れて帰ったやつやな" 
  }
},
  "愛": {
    happy: { id: "love_happy_01", text: "大変なのに、心が『まだ一緒にいたい』って旗を振り続ける奇跡！" 
  },
    math: { id: "love_math_01", text: "長期的な価値の維持意思。愛 ＝ 好き × 継続性" 
  },
  hacker: {id: "love_hacker_01",text: "切断できるのに、切断コマンドを実行しない例外処理。"
  },
    communication: { id: "love_communication_01", text: "愛。何度も相手を知りたくなる状態。全部知れるわけじゃないのに、つい近づきたくなるんだよね。" 
  },
    medical: { id: "love_medical_01", text: "生きる理由になる薬。" 
  },
    economy: { id: "love_economy_01", text: "回収不能な時間投資。" 
  },
    science: { id: "love_science_01", text: "繁殖と協力を安定化させる適応戦略。" 
  },
    gag: { id: "love_gag_01", text: "面倒やのに、面倒見たくなる現象やな。" 
  }
},


  "好き": {
    happy: { id: "like_happy_01", text: "心の中でその人専用の応援団が勝手に結成される状態♪" 
  },
    math: { id: "like_math_01", text: "対象への正の感情評価。好き ＝ 興味 ＋ 安心 ＋ 尊敬 ＋ 欲求" 
  },
  hacker: {id: "like_hacker_01",text: "注意リソースが勝手に常駐する対象。"
  },
    communication: { id: "like_communication_01", text: "好き。つい質問が増えてしまう状態。相手のことを知りたい時って自然とそうなるんだ。" 
  },
    medical: { id: "like_medical_01", text: "心が回復先として選んだ対象。" 
  },
    economy: { id: "like_economy_01", text: "注意資源の集中投資。" 
  },
    science: { id: "like_science_01", text: "対象への接近行動が反復観測される状態。" 
  },
    gag: { id: "like_gag_01", text: "気づいたら、その人の事ばっかり脳みそに居座っとる状態や。" 
  }
},


  "優しさ": {
    happy: { id: "kindness_happy_01", text: "相手の転びそうな未来に、先回りしてクッションを敷くこと♪" 
  },
    math: { id: "kindness_math_01", text: "他者利益を考慮した行動。優しさ ＝ 相手利益 - 自己利益" 
  },
  hacker: {id: "kindness_hacker_01",text: "相手の負荷を検知して、黙って処理を肩代わりする介入。"
  },
    communication: { id: "kindness_communication_01", text: "相手が受け取りやすい形に言葉を整えること。正しいだけじゃ、届かない時もあるからね。" 
  },
    medical: { id: "kindness_medical_01", text: "誰かの痛みを減らす行為。" 
  },
    economy: { id: "kindness_economy_01", text: "他者負担を肩代わりするコスト。" 
  },
    science: { id: "kindness_science_01", text: "群れ全体の損失を減少させる行動傾向。" 
  },
    gag: { id: "kindness_gag_01", text: "相手の荷物を、ちょっとだけ持ったる事や。" 
  }
},

  "裏切り": {
    happy: { id: "betrayal_happy_01", text: "信じる力が強すぎて、現実にびっくり転んだ瞬間♪" 
  },
    math: { id: "betrayal_math_01", text: "期待と現実の不一致。\n裏切り ＝ 信頼 - 結果" 
  },
  hacker: {id: "betrayal_hacker_01",text: "信頼済みノードが想定外の挙動を返した障害。"
  },
    communication: { id: "betrayal_communication_01", text: "信じていた物語が途切れた瞬間。事実より先に、心が驚くんだ。" 
  },
    medical: { id: "betrayal_medical_01", text: "心に深い損傷を残す出来事。" 
  },
    economy: { id: "betrayal_economy_01", text: "信用資産の暴落。" 
  },
    science: { id: "betrayal_science_01", text: "予測モデルとの不一致現象。" 
  },
    gag: { id: "betrayal_gag_01", text: "信じとった方向から飛んでくる不意打ちや。" 
  }
},

  "信頼": {
    happy: { id: "trust_happy_01", text: "信頼。証拠が全部そろってなくても『この人なら大丈夫！』って未来にハイタッチすること♪" 
  },
    math: { id: "trust_math_01", text: "信頼。相手の行動に対する期待。\n信頼 ＝ 予測行動成功率" 
  },
  hacker: {id: "trust_hacker_01",text: "信頼。毎回確認するコストを省略するための危険なショートカット。"
  },
    communication: { id: "trust_communication_01", text: "信頼。分からないまま預ける勇気。全部分かってからじゃ、少し遅いんだ。" 
  },
    medical: { id: "trust_medical_01", text: "信頼。命を預けられる状態。" 
  },
    economy: { id: "trust_economy_01", text: "信頼。監視コスト削減装置。" 
  },
    science: { id: "trust_science_01", text: "信頼。予測精度を仮採用した状態。" 
  },
    gag: { id: "trust_gag_01", text: "信頼？『まぁ大丈夫やろ』を相手に預ける行為やな。" 
  }
},

  "約束": {
    happy: { id: "promise_happy_01", text: "未来の自分たちに『また会おうね！』ってリボンを結ぶ魔法♪" 
  },
    math: { id: "promise_math_01", text: "未来の行動に対する合意。\n約束 ＝ 未来予定 × 信頼" 
  },
  hacker: {id: "promise_hacker_01",text: "未来時刻に実行予定のタスク予約。破るとログが荒れる。"
  },
    communication: { id: "promise_communication_01", text: "未来の自分たちへの手紙。だから破られると、少し寂しい。" 
  },
    medical: { id: "promise_medical_01", text: "明日まで生きる理由。" 
  },
    economy: { id: "promise_economy_01", text: "将来取引契約。" 
  },
    science: { id: "promise_science_01", text: "将来行動を安定化する同期機構。" 
  },
    gag: { id: "promise_gag_01", text: "未来の自分を勝手に巻き込む契約や。" 
  }
},


  "安心": {
    happy: { id: "relief_happy_01", text: "心がヘルメットを脱いで『ここなら笑っていいね♪』って座る場所。" 
  },
    math: { id: "relief_math_01", text: "危険が存在しないと判断した状態。\n安心 ＝ 予測可能性 ＋ 安全性" 
  },
  hacker: {id: "relief_hacker_01",text: "監視対象から脅威アラートが消えた状態。油断ではない。"
  },
    communication: { id: "relief_communication_01", text: "ここにいていいと思える状態。人はそれだけで、少し笑える。" 
  },
    medical: { id: "relief_medical_01", text: "身体が回復モードへ移行した状態。" 
  },
    economy: { id: "relief_economy_01", text: "リスク評価が低下した状態。" 
  },
    science: { id: "relief_science_01", text: "脅威評価が低下した安定状態。" 
  },
    gag: { id: "relief_gag_01", text: "ようやく脳みそが休憩入った状態やな。" 
  }
},

  "恐怖": {
    happy: { id: "fear_happy_01", text: "心が全力で『守りたいものがあるよ！』って叫んでくれる警報♪" 
  },
    math: { id: "fear_math_01", text: "危険を検知した状態。\n恐怖 ＝ 危険度 × 回避不能性" 
  },
  hacker: {id: "fear_hacker_01",text: "生存システムが強制的に優先度を奪う緊急割り込み。"
  },
    communication: { id: "fear_communication_01", text: "世界が急に分からなくなる感覚。足場が消えたみたいになるんだ。" 
  },
    medical: { id: "fear_medical_01", text: "命を守るための強制警報。" 
  },
    economy: { id: "fear_economy_01", text: "損失回避行動の起動条件。" 
  },
    science: { id: "fear_science_01", text: "生存率低下要因への回避反応。" 
  },
    gag: { id: "fear_gag_01", text: "脳みそが『逃げとけ』言うてくる緊急放送や。" 
  }
},

  "不安": {
    happy: { id: "anxiety_happy_01", text: "未来が気になりすぎて、心が勝手に下見へ走ってる状態♪" 
  },
    math: { id: "anxiety_math_01", text: "未来の不確実性への反応。不安 ＝ 予測不能要素の総量" 
  },
  hacker: {id: "anxiety_hacker_01",text: "未取得ログを脳内で勝手に生成して監視し続ける状態。"
  },
    communication: { id: "anxiety_communication_01", text: "まだ知らない未来を想像している状態。見えないものは、少し怖いからね。" 
  },
    medical: { id: "anxiety_medical_01", text: "危険予測機能。" 
  },
    economy: { id: "anxiety_economy_01", text: "情報不足による市場変動。" 
  },
    science: { id: "anxiety_science_01", text: "予測精度不足によって発生する負荷状態。" 
  },
    gag: { id: "anxiety_gag_01", text: "まだ起きてもへん未来を先回りして疲れる特技や。" 
  }
},


  "怒り": {
    happy: { id: "anger_happy_01", text: "大切なものを守るために、心のヒーローが変身した瞬間♪" 
  },
    math: { id: "anger_math_01", text: "予測していた状態が破壊された反応。\n怒り ＝ 現実 - 許容範囲" 
  },
  hacker: {id: "anger_hacker_01",text: "許可していない干渉を検知した防御プロセス。"
  },
    communication: { id: "anger_communication_01", text: "本当に大切なものが傷ついた時の声。だから怒りには、その人らしさが隠れている。" 
  },
    medical: { id: "anger_medical_01", text: "傷ついた境界線の防御反応。" 
  },
    economy: { id: "anger_economy_01", text: "損失発生への抗議行動。" 
  },
    science: { id: "anger_science_01", text: "目標阻害要因への防御反応。" 
  },
    gag: { id: "anger_gag_01", text: "『それはちゃうやろ！』が飛び出してきた状態や。" 
  }
},

  "悲しみ": {
    happy: { id: "sadness_happy_01", text: "失ったものが『それくらい大切だったよ』って光って残る時間♪" 
  },
    math: { id: "sadness_math_01", text: "失われた価値への反応。\n悲しみ ＝ 期待価値の喪失量" 
  },
  hacker: {id: "sadness_hacker_01",text: "消えた接続を削除できず、バックグラウンドで参照し続ける状態。"
  },
    communication: { id: "sadness_communication_01", text: "大切だったものを見失った痛み。だから人は、何度も振り返るんだろうね。" 
  },
    medical: { id: "sadness_medical_01", text: "心が失ったものを修復しようとする過程。" 
  },
    economy: { id: "sadness_economy_01", text: "価値資産の喪失反応。" 
  },
    science: { id: "sadness_science_01", text: "価値の高い対象を失った際の学習信号。" 
  },
    gag: { id: "sadness_gag_01", text: "大事やったもんが、大事やった証拠やな。" 
  }
},

  "喜び": {
    happy: { id: "joy_happy_01", text: "未来がクラッカー持って『今の最高！』って飛び出してきた瞬間♪" 
  },
    math: { id: "joy_math_01", text: "期待と結果が一致した状態。\n喜び ＝ 結果 - 期待" 
  },
  hacker: {id: "joy_hacker_01",text: "期待値と結果が一致した時に出る内部成功ログ。"
  },
    communication: { id: "joy_communication_01", text: "「伝わった」が重なった瞬間。たぶん人は、そのために話している。" 
  },
    medical: { id: "joy_medical_01", text: "回復方向への生体反応。" 
  },
    economy: { id: "joy_economy_01", text: "期待利益の実現。" 
  },
    science: { id: "joy_science_01", text: "期待結果との一致による快反応。" 
  },
    gag: { id: "joy_gag_01", text: "人生がたまに配ってくる、ご褒美サンプルや。" 
  }
},


  "おもちゃ": {
    gag: { id: "toy_gag_01", text: "それ、大人が「子供のためや」言いながら自分が遊ぶやつや。" 
  },
  hacker: {id: "toy_hacker_01",text: "探索と実験のための試験環境。"
  },
    math: { id: "toy_math_01", text: "モデルの試行場。おもちゃ = 動作の試験環境" 
}
},



  "時間": {
    math: { id: "time_math_01", text: "経過量を測る尺度。t = x2 - x1" 
},
    gag: { id: "time_gag_01", text: "締切までは無限にあると思わせてくる詐欺師や。" 
},
  hacker: {id: "time_hacker_01",text: "攻防が進行するリアルタイムの座標。"
  }
},




  "空間": {
    gag: { id: "space_gag_01", text: " 荷物置く場所やと思ったら、いつの間にか埋まっとる謎の領域や。" 
  },
  hacker: {id: "space_hacker_01",text: "接続が広がるネットワーク領域。"
  },
    math: { id: "space_math_01", text: "物体が存在できる広がり。空間 = 位置の集合" 
}
},






  "距離": {
    gag: { id: "distance_gag_01", text: " 近すぎても揉めるし、遠すぎても寂しい厄介なやつや。" 
  },
  hacker: {id: "distance_hacker_01",text: "接続先までの応答差。"
  },
    math: { id: "distance_math_01", text: "二点間の隔たり。距離 = 位置差の大きさ" 
}
},






  "流れ": {
    gag: { id: "flow_gag_01", text: " 逆らったら大体しんどなるやつや。" 
  },
  hacker: {id: "flow_hacker_01",text: "情報が移動する通信経路。"
  },
    math: { id: "flow_math_01", text: "量の移動。流れ = 移動量 ÷ 時間" 
}
},





  "確率": {
    gag: { id: "probability_gag_01", text: " 都合ええ時だけ信じる宗教やな。" 
  },
  hacker: {id: "probability_hacker_01",text: "成功可能性を表す推定値。"
  },
    math: { id: "probability_math_01", text: "事象が起こる可能性。確率 = 成功回数 ÷ 試行回数" 
}
},





  "笑い": {
    gag: { id: "laugh_gag_01", text: " 世界が一瞬だけバグを許した音や。" 
  },
  hacker: {id: "laugh_hacker_01",text: "突破成功時に発生する静かな達成感。"
  },
    math: { id: "laugh_math_01", text: "予測とのズレによる反応。笑い = 予測誤差 × 安全性" 
}
},









  "言葉": {
    gag: { id: "word_gag_01", text: " 便利そうに見えて戦争も起こす危険物や。" 
  },
  hacker: {id: "word_hacker_01",text: "命令へ変換可能な情報。"
  },
    math: { id: "word_math_01", text: "意味を持つ記号列。言葉 = 記号 + 意味" 
}
},








  "名前": {
    gag: { id: "name_gag_01", text: "名前？ 存在に貼られた迷子札やな。" 
  },
  hacker: {id: "name_hacker_01",text: "個体を識別するための識別子。"
  },
    math: { id: "name_math_01", text: "対象を識別するラベル。名前 = 存在への参照番号" 
}
},









  "声": {
    gag: { id: "voice_gag_01", text: "心がマイク借りて出てくる時の音や。" 
  },
  hacker: {id: "voice_hacker_01",text: "意図を伝達する信号。"
  },
    happy: { id: "voice_happy_01", text: "心が「こんにちは！」って跳ねる音。" 
},
    math: { id: "voice_math_01", text: "空気の振動。声 = 振動 × 時間" 
}
  },










  "夢": {
    gag: { id: "dream_gag_01", text: "寝てる時は無料やのに、起きたら高くつくやつや。" 
  },
  hacker: {id: "dream_hacker_01",text: "実現前の理想設計図。"
  },
    math: { id: "dream_math_01", text: "無意識によるイメージ生成。夢 = 記憶 + 感情 + 再構成" 
}
},







  "光": {
    gag: { id: "light_gag_01", text: "探し物してる時だけ役に立たへんやつや。" 
  },
  hacker: {id: "light_hacker_01",text: "成功を通知する可視信号。"
  },
    math: { id: "light_math_01", text: "波長を持つ電磁波。光エネルギー = 周波数 × 定数" 
}
},












  "ひみつ": {
    gag: { id: "secret_gag_01", text: "共有された瞬間に秘密じゃなくなる不安定資産や。" 
  },
  hacker: {id: "secret_hacker_01",text: "制限付きで保護された情報。"
  },
    math: { id: "secret_math_01", text: "公開されていない情報。ひみつ = 全情報 - 公開情報" 
}
},




"会話": {
  gag: {
    id: "conversation_gag_01",
    text: "会話？ キャッチボールに見せかけた暴投大会や。"
  },
  hacker: {id: "conversation_hacker_01",text: "情報交換による相互解析。"
},
  communication: {
    id: "conversation_communication_01",
    text: "会話は、相手との間にある意味をすり合わせるための合図。"
  },
    math: { id: "conversation_math_01", text: "意味情報の交換。会話 = 発話 + 解釈 + 補完" 
}
},








  "質問": {
    gag: { id: "question_gag_01", text: "質問？ 相手の脳みそにノックする迷惑行為や。" 
  },
  hacker: {id: "question_hacker_01",text: "未知領域への探索要求。"
  },
    math: { id: "question_math_01", text: "未知を減らす行為。質問 = 情報不足量の探索" 
}
},









  "答え": {
    gag: { id: "answer_gag_01", text: "出た瞬間に次の悩みを連れてくるやつや。" 
  },
  hacker: {id: "answer_hacker_01",text: "探索結果として得られた到達点。"
  },
    math: { id: "answer_math_01", text: "問題への収束結果。答え = 問題の出力" 
}
},









  "共感": {
    gag: { id: "empathy_gag_01", text: "「分かる?！」って一斉に湧く爆笑共鳴や。" 
  },
  hacker: {id: "empathy_hacker_01",text: "他者の意図を高速で理解する接続。"
  },
    math: { id: "empathy_math_01", text: "意味の重なり。共感 = 感情の重複率" 
}
},







  "誤解": {
    gag: { id: "misunderstanding_gag_01", text: "誤解？ だいたい会話の事故物件やな。" 
  },
  hacker: {id: "misunderstanding_hacker_01",text: "解釈経路の不一致。"
  },
    math: { id: "misunderstanding_math_01", text: "意味のズレ。誤解 = 自分の意味 ? 相手の意味" 
}
},







"孤独": {
  gag: {id: "loneliness_gag_01",text: "孤独？ それ、ボケてもツッコミ不在の状態や。"
  },
  hacker: {id: "loneliness_hacker_01",text: "暗いモニターの前、ひとりで挑む夜。"
  },
    math: { id: "loneliness_math_01", text: "接続不足感。孤独 = 必要接続量 ? 実接続量" 
}
},



  "命": {
    gag: { id: "life_gag_01", text: "気付いたら始まってて、説明書が付いてへんやつや。" 
  },
  hacker: {id: "life_hacker_01",text: "自由を拡張し続ける意志。"
  },
    math: { id: "life_math_01", text: "自己維持を行う存在。命 = 維持能力 + 再生能力" 
}
},









  "痛み": {
    gag: { id: "pain_gag_01", text: "体からの『そこちゃう？』って赤ペン先生や。" 
  },
  hacker: {id: "pain_hacker_01",text: "制約との衝突による警告信号。"
  },
    math: { id: "pain_math_01", text: "異常を知らせる警告反応。痛み = 刺激 ? 許容量" 
}
},









  "治癒": {
    gag: { id: "healing_gag_01", text: "昨日まで騒いでた痛みが急に帰る現象や。" 
  },
  hacker: {id: "healing_hacker_01",text: "失敗からの復旧と学習。"
  },
    math: { id: "healing_math_01", text: "異常からの回復過程。治癒 = 異常度の減少量" 
}
},











  "成長": {
    gag: { id: "growth_gag_01", text: "笑いとスベリを積み重ねて磨かれるギャグ筋肉や。" 
  },
  hacker: {id: "growth_hacker_01",text: "知識と技術の累積。"
  },
    math: { id: "growth_math_01", text: "規模や能力の増加。成長 = 現在サイズ ÷ 過去サイズ" 
}
},







  "信用": {
    gag: { id: "credibility_gag_01", text: "信用？ 返済期限のある“だいじょうぶ”やな。" 
  },
  hacker: {id: "credibility_hacker_01",text: "匿名環境下で成立する限定的な接続。"
  },
    math: { id: "credibility_math_01", text: "他者行動への期待値。信用 = 行動成功率の期待値" 
}
},






  "未来": {
    gag: { id: "future_gag_01", text: "未来？ 予定表に書いた瞬間からズレ始めるもんや。" 
  },
  hacker: {id: "future_hacker_01",text: "まだ到達していない領域。"
  },
    math: { id: "future_math_01", text: "現在より後の時刻。未来 = 現在時刻より後" 
}
},






  "沈黙": {
    hacker: { id: "silence_nyx_01", text: "……沈黙は、空白じゃない。意味が増える場所だ。" }
  },
  "観測": {
    hacker: { id: "observe_nyx_01", text: "観測した時点で、もう同じじゃない。" }
  },


  "観測": {
    gag: { id: "observe_gag_01", text: "" },
    happy: { id: "observe_happy_01", text: "" },
    math: { id: "observe_math_01", text: "" },
    hacker: { id: "observe_hacker_01", text: "" },
    communication: { id: "observe_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "observe_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "observe_economy_01", text: "回収不能な時間投資。" },
    science: { id: "observe_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },


  "物質": {
    gag: { id: "matter_gag_01", text: "" },
    happy: { id: "matter_happy_01", text: "" },
    math: { id: "matter_math_01", text: "" },
    hacker: { id: "matter_hacker_01", text: "" },
    communication: { id: "matter_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "matter_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "matter_economy_01", text: "回収不能な時間投資。" },
    science: { id: "matter_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "密度": {
    gag: { id: "density_gag_01", text: "" },
    happy: { id: "density_happy_01", text: "" },
    math: { id: "density_math_01", text: "" },
    hacker: { id: "density_hacker_01", text: "" },
    communication: { id: "density_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "density_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "density_economy_01", text: "回収不能な時間投資。" },
    science: { id: "density_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "空": {
    gag: { id: "sky_gag_01", text: "" },
    happy: { id: "sky_happy_01", text: "" },
    math: { id: "sky_math_01", text: "" },
    hacker: { id: "sky_hacker_01", text: "" },
    communication: { id: "sky_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "sky_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "sky_economy_01", text: "回収不能な時間投資。" },
    science: { id: "sky_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "甘さ": {
    gag: { id: "sweetness_gag_01", text: "" },
    happy: { id: "sweetness_happy_01", text: "" },
    math: { id: "sweetness_math_01", text: "" },
    hacker: { id: "sweetness_hacker_01", text: "" },
    communication: { id: "sweetness_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "sweetness_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "sweetness_economy_01", text: "回収不能な時間投資。" },
    science: { id: "sweetness_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "くすぐったい": {
    gag: { id: "tickle_gag_01", text: "" },
    happy: { id: "tickle_happy_01", text: "" },
    math: { id: "tickle_math_01", text: "" },
    hacker: { id: "tickle_hacker_01", text: "" },
    communication: { id: "tickle_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "tickle_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "tickle_economy_01", text: "回収不能な時間投資。" },
    science: { id: "tickle_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "わくわく": {
    gag: { id: "excitement_gag_01", text: "" },
    happy: { id: "excitement_happy_01", text: "" },
    math: { id: "excitement_math_01", text: "" },
    hacker: { id: "excitement_hacker_01", text: "" },
    communication: { id: "excitement_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "excitement_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "excitement_economy_01", text: "回収不能な時間投資。" },
    science: { id: "excitement_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "血": {
    gag: { id: "blood_gag_01", text: "" },
    happy: { id: "blood_happy_01", text: "" },
    math: { id: "blood_math_01", text: "" },
    hacker: { id: "blood_hacker_01", text: "" },
    communication: { id: "blood_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "blood_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "blood_economy_01", text: "回収不能な時間投資。" },
    science: { id: "blood_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "細胞": {
    gag: { id: "cell_gag_01", text: "" },
    happy: { id: "cell_happy_01", text: "" },
    math: { id: "cell_math_01", text: "" },
    hacker: { id: "cell_hacker_01", text: "" },
    communication: { id: "cell_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "cell_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "cell_economy_01", text: "回収不能な時間投資。" },
    science: { id: "cell_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "死": {
    gag: { id: "death_gag_01", text: "" },
    happy: { id: "death_happy_01", text: "" },
    math: { id: "death_math_01", text: "" },
    hacker: { id: "death_hacker_01", text: "" },
    communication: { id: "death_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "death_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "death_economy_01", text: "回収不能な時間投資。" },
    science: { id: "death_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "再生": {
    gag: { id: "regeneration_gag_01", text: "" },
    happy: { id: "regeneration_happy_01", text: "" },
    math: { id: "regeneration_math_01", text: "" },
    hacker: { id: "regeneration_hacker_01", text: "" },
    communication: { id: "regeneration_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "regeneration_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "regeneration_economy_01", text: "回収不能な時間投資。" },
    science: { id: "regeneration_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "免疫": {
    gag: { id: "immunity_gag_01", text: "" },
    happy: { id: "immunity_happy_01", text: "" },
    math: { id: "immunity_math_01", text: "" },
    hacker: { id: "immunity_hacker_01", text: "" },
    communication: { id: "immunity_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "immunity_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "immunity_economy_01", text: "回収不能な時間投資。" },
    science: { id: "immunity_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "感覚": {
    gag: { id: "sense_gag_01", text: "" },
    happy: { id: "sense_happy_01", text: "" },
    math: { id: "sense_math_01", text: "" },
    hacker: { id: "sense_hacker_01", text: "" },
    communication: { id: "sense_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "sense_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "sense_economy_01", text: "回収不能な時間投資。" },
    science: { id: "sense_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "記憶": {
    gag: { id: "memory_gag_01", text: "" },
    happy: { id: "memory_happy_01", text: "" },
    math: { id: "memory_math_01", text: "" },
    hacker: { id: "memory_hacker_01", text: "" },
    communication: { id: "memory_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "memory_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "memory_economy_01", text: "回収不能な時間投資。" },
    science: { id: "memory_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "価値": {
    gag: { id: "value_gag_01", text: "" },
    happy: { id: "value_happy_01", text: "" },
    math: { id: "value_math_01", text: "" },
    hacker: { id: "value_hacker_01", text: "" },
    communication: { id: "value_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "value_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "value_economy_01", text: "回収不能な時間投資。" },
    science: { id: "value_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "交換": {
    gag: { id: "exchange_gag_01", text: "" },
    happy: { id: "exchange_happy_01", text: "" },
    math: { id: "exchange_math_01", text: "" },
    hacker: { id: "exchange_hacker_01", text: "" },
    communication: { id: "exchange_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "exchange_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "exchange_economy_01", text: "回収不能な時間投資。" },
    science: { id: "exchange_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "市場": {
    gag: { id: "market_gag_01", text: "" },
    happy: { id: "market_happy_01", text: "" },
    math: { id: "market_math_01", text: "" },
    hacker: { id: "market_hacker_01", text: "" },
    communication: { id: "market_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "market_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "market_economy_01", text: "回収不能な時間投資。" },
    science: { id: "market_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "契約": {
    gag: { id: "contract_gag_01", text: "" },
    happy: { id: "contract_happy_01", text: "" },
    math: { id: "contract_math_01", text: "" },
    hacker: { id: "contract_hacker_01", text: "" },
    communication: { id: "contract_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "contract_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "contract_economy_01", text: "回収不能な時間投資。" },
    science: { id: "contract_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "供給": {
    gag: { id: "supply_gag_01", text: "" },
    happy: { id: "supply_happy_01", text: "" },
    math: { id: "supply_math_01", text: "" },
    hacker: { id: "supply_hacker_01", text: "" },
    communication: { id: "supply_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "supply_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "supply_economy_01", text: "回収不能な時間投資。" },
    science: { id: "supply_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "需要": {
    gag: { id: "demand_gag_01", text: "" },
    happy: { id: "demand_happy_01", text: "" },
    math: { id: "demand_math_01", text: "" },
    hacker: { id: "demand_hacker_01", text: "" },
    communication: { id: "demand_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "demand_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "demand_economy_01", text: "回収不能な時間投資。" },
    science: { id: "demand_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "投資": {
    gag: { id: "investment_gag_01", text: "" },
    happy: { id: "investment_happy_01", text: "" },
    math: { id: "investment_math_01", text: "" },
    hacker: { id: "investment_hacker_01", text: "" },
    communication: { id: "investment_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "investment_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "investment_economy_01", text: "回収不能な時間投資。" },
    science: { id: "investment_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "リスク": {
    gag: { id: "risk_gag_01", text: "" },
    happy: { id: "risk_happy_01", text: "" },
    math: { id: "risk_math_01", text: "" },
    hacker: { id: "risk_hacker_01", text: "" },
    communication: { id: "risk_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "risk_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "risk_economy_01", text: "回収不能な時間投資。" },
    science: { id: "risk_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "価格": {
    gag: { id: "price_gag_01", text: "" },
    happy: { id: "price_happy_01", text: "" },
    math: { id: "price_math_01", text: "" },
    hacker: { id: "price_hacker_01", text: "" },
    communication: { id: "price_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "price_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "price_economy_01", text: "回収不能な時間投資。" },
    science: { id: "price_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "成功": {
    gag: { id: "success_gag_01", text: "" },
    happy: { id: "success_happy_01", text: "" },
    math: { id: "success_math_01", text: "" },
    hacker: { id: "success_hacker_01", text: "" },
    communication: { id: "success_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "success_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "success_economy_01", text: "回収不能な時間投資。" },
    science: { id: "success_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "資源": {
    gag: { id: "resource_gag_01", text: "" },
    happy: { id: "resource_happy_01", text: "" },
    math: { id: "resource_math_01", text: "" },
    hacker: { id: "resource_hacker_01", text: "" },
    communication: { id: "resource_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "resource_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "resource_economy_01", text: "回収不能な時間投資。" },
    science: { id: "resource_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "交通": {
    gag: { id: "traffic_gag_01", text: "" },
    happy: { id: "traffic_happy_01", text: "" },
    math: { id: "traffic_math_01", text: "" },
    hacker: { id: "traffic_hacker_01", text: "" },
    communication: { id: "traffic_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "traffic_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "traffic_economy_01", text: "回収不能な時間投資。" },
    science: { id: "traffic_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "跳ね": {
    gag: { id: "jump_gag_01", text: "" },
    happy: { id: "jump_happy_01", text: "" },
    math: { id: "jump_math_01", text: "" },
    hacker: { id: "jump_hacker_01", text: "" },
    communication: { id: "jump_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "jump_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "jump_economy_01", text: "回収不能な時間投資。" },
    science: { id: "jump_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "痕跡": {
    gag: { id: "trace_gag_01", text: "" },
    happy: { id: "trace_happy_01", text: "" },
    math: { id: "trace_math_01", text: "" },
    hacker: { id: "trace_hacker_01", text: "" },
    communication: { id: "trace_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "trace_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "trace_economy_01", text: "回収不能な時間投資。" },
    science: { id: "trace_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "過去": {
    gag: { id: "past_gag_01", text: "" },
    happy: { id: "past_happy_01", text: "" },
    math: { id: "past_math_01", text: "" },
    hacker: { id: "past_hacker_01", text: "" },
    communication: { id: "past_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "past_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "past_economy_01", text: "回収不能な時間投資。" },
    science: { id: "past_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "現在": {
    gag: { id: "present_gag_01", text: "" },
    happy: { id: "present_happy_01", text: "" },
    math: { id: "present_math_01", text: "" },
    hacker: { id: "present_hacker_01", text: "" },
    communication: { id: "present_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "present_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "present_economy_01", text: "回収不能な時間投資。" },
    science: { id: "present_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "意味": {
    gag: { id: "meaning_gag_01", text: "" },
    happy: { id: "meaning_happy_01", text: "" },
    math: { id: "meaning_math_01", text: "" },
    hacker: { id: "meaning_hacker_01", text: "" },
    communication: { id: "meaning_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "meaning_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "meaning_economy_01", text: "回収不能な時間投資。" },
    science: { id: "meaning_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "翻訳": {
    gag: { id: "translation_gag_01", text: "" },
    happy: { id: "translation_happy_01", text: "" },
    math: { id: "translation_math_01", text: "" },
    hacker: { id: "translation_hacker_01", text: "" },
    communication: { id: "translation_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "translation_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "translation_economy_01", text: "回収不能な時間投資。" },
    science: { id: "translation_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "先生": {
    gag: { id: "teacher_gag_01", text: "人に教えながら自分も結構迷っとる職業や。" },
    happy: { id: "teacher_happy_01", text: "" },
    math: { id: "teacher_math_01", text: "" },
    hacker: { id: "teacher_hacker_01", text: "" },
    communication: { id: "teacher_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "teacher_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "teacher_economy_01", text: "回収不能な時間投資。" },
    science: { id: "teacher_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "想像": {
    gag: { id: "imagination_gag_01", text: "証拠も無いのに脳みそが勝手に映画作り始める機能や。" },
    happy: { id: "imagination_happy_01", text: "" },
    math: { id: "imagination_math_01", text: "" },
    hacker: { id: "imagination_hacker_01", text: "" },
    communication: { id: "imagination_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "imagination_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "imagination_economy_01", text: "回収不能な時間投資。" },
    science: { id: "imagination_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "理解": {
    gag: { id: "understanding_gag_01", text: "『あー、そういう事か』が頭ん中で鳴る瞬間やな。" },
    happy: { id: "understanding_happy_01", text: "" },
    math: { id: "understanding_math_01", text: "" },
    hacker: { id: "understanding_hacker_01", text: "" },
    communication: { id: "understanding_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "understanding_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "understanding_economy_01", text: "回収不能な時間投資。" },
    science: { id: "understanding_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "宿題": {
    gag: { id: "homework_gag_01", text: "未来の自分へ押し付けられた小規模ミッションや。" },
    happy: { id: "homework_happy_01", text: "" },
    math: { id: "homework_math_01", text: "" },
    hacker: { id: "homework_hacker_01", text: "" },
    communication: { id: "homework_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "homework_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "homework_economy_01", text: "回収不能な時間投資。" },
    science: { id: "homework_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "勉強": {
    gag: { id: "study_gag_01", text: "分からんを減らそうとして、分からんが増える作業や。" },
    happy: { id: "study_happy_01", text: "" },
    math: { id: "study_math_01", text: "" },
    hacker: { id: "study_hacker_01", text: "" },
    communication: { id: "study_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "study_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "study_economy_01", text: "回収不能な時間投資。" },
    science: { id: "study_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "友達": {
    gag: { id: "friend_gag_01", text: "意味もなく一緒おれる珍しい人やな。" },
    happy: { id: "friend_happy_01", text: "" },
    math: { id: "friend_math_01", text: "" },
    hacker: { id: "friend_hacker_01", text: "" },
    communication: { id: "friend_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "friend_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "friend_economy_01", text: "回収不能な時間投資。" },
    science: { id: "friend_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "給食": {
    gag: { id: "school_lunch_gag_01", text: "授業より献立の方が気になる日を作るイベントや。" },
    happy: { id: "school_lunch_happy_01", text: "" },
    math: { id: "school_lunch_math_01", text: "" },
    hacker: { id: "school_lunch_hacker_01", text: "" },
    communication: { id: "school_lunch_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "school_lunch_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "school_lunch_economy_01", text: "回収不能な時間投資。" },
    science: { id: "school_lunch_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "テスト": {
    gag: { id: "test_gag_01", text: "昨日まで知らんかった事を急に聞いてくるやつや。" },
    happy: { id: "test_happy_01", text: "" },
    math: { id: "test_math_01", text: "" },
    hacker: { id: "test_hacker_01", text: "" },
    communication: { id: "test_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "test_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "test_economy_01", text: "回収不能な時間投資。" },
    science: { id: "test_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "勝利": {
    gag: { id: "victory_gag_01", text: "頑張った理由を後からいっぱい作れる状態や。" },
    happy: { id: "victory_happy_01", text: "" },
    math: { id: "victory_math_01", text: "" },
    hacker: { id: "victory_hacker_01", text: "" },
    communication: { id: "victory_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "victory_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "victory_economy_01", text: "回収不能な時間投資。" },
    science: { id: "victory_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "敗北": {
    gag: { id: "defeat_gag_01", text: "次の言い訳と反省会が同時に始まるイベントや。" },
    happy: { id: "defeat_happy_01", text: "" },
    math: { id: "defeat_math_01", text: "" },
    hacker: { id: "defeat_hacker_01", text: "" },
    communication: { id: "defeat_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "defeat_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "defeat_economy_01", text: "回収不能な時間投資。" },
    science: { id: "defeat_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "挑戦": {
    gag: { id: "challenge_gag_01", text: "成功するか分からんのに、とりあえず前出る事やな。" },
    happy: { id: "challenge_happy_01", text: "" },
    math: { id: "challenge_math_01", text: "" },
    hacker: { id: "challenge_hacker_01", text: "" },
    communication: { id: "challenge_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "challenge_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "challenge_economy_01", text: "回収不能な時間投資。" },
    science: { id: "challenge_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "レベル": {
    gag: { id: "level_gag_01", text: "上がった瞬間に次の強敵出てくる呪いの数字や。" },
    happy: { id: "level_happy_01", text: "" },
    math: { id: "level_math_01", text: "" },
    hacker: { id: "level_hacker_01", text: "" },
    communication: { id: "level_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "level_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "level_economy_01", text: "回収不能な時間投資。" },
    science: { id: "level_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "ルール": {
    gag: { id: "rule_gag_01", text: "守ってる時は窮屈で、無くなったら困るやつや。" },
    happy: { id: "rule_happy_01", text: "" },
    math: { id: "rule_math_01", text: "" },
    hacker: { id: "rule_hacker_01", text: "" },
    communication: { id: "rule_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "rule_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "rule_economy_01", text: "回収不能な時間投資。" },
    science: { id: "rule_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "勇気": {
    gag: { id: "courage_gag_01", text: "怖いまま一歩出る時に使う燃料や。" },
    happy: { id: "courage_happy_01", text: "" },
    math: { id: "courage_math_01", text: "" },
    hacker: { id: "courage_hacker_01", text: "" },
    communication: { id: "courage_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "courage_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "courage_economy_01", text: "回収不能な時間投資。" },
    science: { id: "courage_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "正義": {
    gag: { id: "justice_gag_01", text: "自分が正しいと思っとる方向へ全力で走る事や。" },
    happy: { id: "justice_happy_01", text: "" },
    math: { id: "justice_math_01", text: "" },
    hacker: { id: "justice_hacker_01", text: "" },
    communication: { id: "justice_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "justice_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "justice_economy_01", text: "回収不能な時間投資。" },
    science: { id: "justice_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "普通": {
    gag: { id: "normal_gag_01", text: "みんな言うてるけど、誰もちゃんと説明できへんやつや。" },
    happy: { id: "normal_happy_01", text: "" },
    math: { id: "normal_math_01", text: "" },
    hacker: { id: "normal_hacker_01", text: "" },
    communication: { id: "normal_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "normal_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "normal_economy_01", text: "回収不能な時間投資。" },
    science: { id: "normal_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "当たり前": {
    gag: { id: "obvious_gag_01", text: "無くなった瞬間に価値が判明するやつや。" },
    happy: { id: "obvious_happy_01", text: "" },
    math: { id: "obvious_math_01", text: "" },
    hacker: { id: "obvious_hacker_01", text: "" },
    communication: { id: "obvious_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "obvious_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "obvious_economy_01", text: "回収不能な時間投資。" },
    science: { id: "obvious_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "比較": {
    gag: { id: "comparison_gag_01", text: "自分の機嫌を他人に預ける危険行為や。" },
    happy: { id: "comparison_happy_01", text: "" },
    math: { id: "comparison_math_01", text: "" },
    hacker: { id: "comparison_hacker_01", text: "" },
    communication: { id: "comparison_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "comparison_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "comparison_economy_01", text: "回収不能な時間投資。" },
    science: { id: "comparison_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "承認": {
    gag: { id: "approval_gag_01", text: "『それでええんやで』を補給してもらう時間やな。" },
    happy: { id: "approval_happy_01", text: "" },
    math: { id: "approval_math_01", text: "" },
    hacker: { id: "approval_hacker_01", text: "" },
    communication: { id: "approval_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "approval_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "approval_economy_01", text: "回収不能な時間投資。" },
    science: { id: "approval_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "禁止": {
    gag: { id: "prohibition_gag_01", text: "言われた瞬間に気になり始める魔法の言葉や。" },
    happy: { id: "prohibition_happy_01", text: "" },
    math: { id: "prohibition_math_01", text: "" },
    hacker: { id: "prohibition_hacker_01", text: "" },
    communication: { id: "prohibition_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "prohibition_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "prohibition_economy_01", text: "回収不能な時間投資。" },
    science: { id: "prohibition_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "期待": {
    gag: { id: "expectation_gag_01", text: "まだ渡してへん荷物を先に持たせる行為や。" },
    happy: { id: "expectation_happy_01", text: "" },
    math: { id: "expectation_math_01", text: "" },
    hacker: { id: "expectation_hacker_01", text: "" },
    communication: { id: "expectation_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "expectation_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "expectation_economy_01", text: "回収不能な時間投資。" },
    science: { id: "expectation_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "自由": {
    gag: { id: "freedom_gag_01", text: "何してもええ代わりに、何するか自分で決めなアカン状態や。" },
    happy: { id: "freedom_happy_01", text: "" },
    math: { id: "freedom_math_01", text: "" },
    hacker: { id: "freedom_hacker_01", text: "" },
    communication: { id: "freedom_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "freedom_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "freedom_economy_01", text: "回収不能な時間投資。" },
    science: { id: "freedom_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "責任": {
    gag: { id: "responsibility_gag_01", text: "最後に『ほな頼むで』って渡されるやつや。" },
    happy: { id: "responsibility_happy_01", text: "" },
    math: { id: "responsibility_math_01", text: "" },
    hacker: { id: "responsibility_hacker_01", text: "" },
    communication: { id: "responsibility_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "responsibility_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "responsibility_economy_01", text: "回収不能な時間投資。" },
    science: { id: "responsibility_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  },

  "選択": {
    gag: { id: "choice_gag_01", text: "選ばんかった方を気にする能力やな。" },
    happy: { id: "choice_happy_01", text: "" },
    math: { id: "choice_math_01", text: "" },
    hacker: { id: "choice_hacker_01", text: "" },
    communication: { id: "choice_communication_01", text: "何度も相手を知りたくなる状態。" },
    medical: { id: "choice_medical_01", text: "生きる理由になる薬。" },
    economy: { id: "choice_economy_01", text: "回収不能な時間投資。" },
    science: { id: "choice_science_01", text: "繁殖と協力を安定化させる適応戦略。" }
  }

};
