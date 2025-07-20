const questions = [
  // セット1
  [
    { question: "歯の本数が一番多い生き物は？", answer: "かたつむり", explanation: "かたつむりには1万本以上の歯があります。" },
    { question: "日本で一番高い山は？", answer: "富士山", explanation: "標高3,776m。" },
    { question: "地球で最も深い海溝は？", answer: "マリアナ海溝", explanation: "約1万m以上の深さがあります。" },
    { question: "哺乳類で最も長寿なのは？", answer: "ホッキョククジラ", explanation: "200年以上生きる個体も確認されています。" },
    { question: "人間の体で一番強い筋肉は？", answer: "咬筋", explanation: "顎の筋肉で非常に強力です。" },
    { question: "世界で最も使用されている言語は？", answer: "英語", explanation: "非ネイティブ含め利用者数最多です。" },
    { question: "日本で一番長い川は？", answer: "信濃川", explanation: "全長367km。" },
    { question: "一年で最も昼が短い日は？", answer: "冬至", explanation: "12月22日頃。" },
    { question: "鳥の中で一番速く飛べるのは？", answer: "ハヤブサ", explanation: "急降下時に時速300km以上出ます。" },
    { question: "血液型の中で一番少ないのは？", answer: "AB型", explanation: "全人口の約5%未満。" },
  ],
  // セット2
  [
    { question: "世界で一番広い国は？", answer: "ロシア", explanation: "面積は約1,700万平方キロメートルです。" },
    { question: "日本で一番人口が多い都道府県は？", answer: "東京都", explanation: "約1,400万人が住んでいます。" },
    { question: "陸上で最も速い動物は？", answer: "チーター", explanation: "最高時速は110km以上。" },
    { question: "日本の国鳥は？", answer: "キジ", explanation: "日本の象徴とされています。" },
    { question: "世界で一番高い建物は？", answer: "ブルジュ・ハリファ", explanation: "高さ828m、ドバイにあります。" },
    { question: "日本で最も古いお寺は？", answer: "飛鳥寺", explanation: "推古天皇の時代に建立されました。" },
    { question: "一番重い金属は？", answer: "オスミウム", explanation: "非常に高密度です。" },
    { question: "人間の体で一番大きな臓器は？", answer: "皮膚", explanation: "体全体を覆っています。" },
    { question: "太陽系で最も大きい惑星は？", answer: "木星", explanation: "地球の約11倍の直径です。" },
    { question: "世界最大の島は？", answer: "グリーンランド", explanation: "オーストラリアを除いた中で最大です。" },
  ],
  // セット3
  [
    { question: "世界で最も深い湖は？", answer: "バイカル湖", explanation: "深さ約1,700m。" },
    { question: "人間の体で最も小さい骨は？", answer: "耳小骨", explanation: "耳の中にあります。" },
    { question: "最も長い川は？", answer: "ナイル川", explanation: "全長約6,650km。" },
    { question: "最も多くの人に読まれた本は？", answer: "聖書", explanation: "何十億冊も発行されています。" },
    { question: "哺乳類で唯一飛べるのは？", answer: "コウモリ", explanation: "翼を持つ哺乳類です。" },
    { question: "地球の約70%を占めるのは？", answer: "水", explanation: "主に海です。" },
    { question: "日本の首都は？", answer: "東京", explanation: "政治・経済の中心地です。" },
    { question: "宇宙で最も明るい恒星は？", answer: "シリウス", explanation: "おおいぬ座にあります。" },
    { question: "一番高い木は？", answer: "ハイペリオン", explanation: "高さ115m以上のセコイアです。" },
    { question: "日本で一番広い湖は？", answer: "琵琶湖", explanation: "滋賀県にあります。" },
  ],
  // セット4
  [
    { question: "地球の衛星は？", answer: "月", explanation: "地球唯一の自然衛星です。" },
    { question: "日本の国花は？", answer: "桜", explanation: "春の象徴です。" },
    { question: "世界最古の大学は？", answer: "カラウィーイーン大学", explanation: "モロッコにあります。" },
    { question: "世界一長寿の木は？", answer: "ブリストルコーンパイン", explanation: "樹齢4,800年以上です。" },
    { question: "世界最長の陸上動物は？", answer: "キリン", explanation: "首がとても長いです。" },
    { question: "人間の目の色素がない状態は？", answer: "アルビノ", explanation: "メラニンが欠乏しています。" },
    { question: "北極の王と呼ばれる動物は？", answer: "ホッキョクグマ", explanation: "北極圏に生息します。" },
    { question: "日本で一番短い川は？", answer: "ぶつぶつ川", explanation: "和歌山県にあります。" },
    { question: "日本最古の貨幣は？", answer: "和同開珎", explanation: "奈良時代に鋳造されました。" },
    { question: "世界で最も人口の多い国は？", answer: "インド", explanation: "約14億人以上です。" },
  ],
  // セット5
  [
    { question: "日本で最初のオリンピック開催地は？", answer: "東京", explanation: "1964年に開催されました。" },
    { question: "太陽系で一番熱い惑星は？", answer: "金星", explanation: "表面温度は約460℃。" },
    { question: "世界で一番大きなサンゴ礁は？", answer: "グレートバリアリーフ", explanation: "オーストラリアにあります。" },
    { question: "人間の血液の色は何色？", answer: "赤", explanation: "ヘモグロビンの色です。" },
    { question: "世界最速の電車は？", answer: "リニアモーターカー", explanation: "600km/h以上で走ります。" },
    { question: "最も古い宗教は？", answer: "ヒンドゥー教", explanation: "約4千年以上の歴史があります。" },
    { question: "最も多くの映画に登場する動物は？", answer: "犬", explanation: "忠実なパートナーです。" },
    { question: "地球から一番近い恒星は？", answer: "太陽", explanation: "我々の星です。" },
    { question: "最も硬い自然物は？", answer: "ダイヤモンド", explanation: "非常に硬い鉱物です。" },
    { question: "日本で一番多い苗字は？", answer: "佐藤", explanation: "日本最多の姓です。" },
  ]
];

export default questions;
