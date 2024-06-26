
const tubo = {};

tubo.unskbtNameList = [
    "あさい",
    "あつ手",
    "あやしい",
    "いびつな",
    "うす手",
    "おもい",
    "かたい",
    "かるい",
    "キュートな",
    "くねった",
    "くびれた",
    "くぼんだ",
    "ごつごつした",
    "さんかく",
    "しかく",
    "すぼまった",
    "セクシーな",
    "だい形",
    "たかそうな",
    "たまご形",
    "だるま形",
    "でこぼこな",
    "とがった",
    "ながい",
    "ハート形",
    "はんげつ形",
    "ひし形",
    "ふかい",
    "ふるめかしい",
    "ほし形",
    "ほそい",
    "まるい",
    "みかづき形",
    "ゆがんだ",
    "よじれた",
];

// ビックリ、倉庫は除外
tubo.skbtItemList = [
    {name: "保存の壺", unskbtName: ""},
    {name: "識別の壺", unskbtName: ""},
    {name: "変化の壺", unskbtName: ""},
    {name: "ただの壺", unskbtName: ""},
    {name: "やりすごしの壺", unskbtName: ""},
    {name: "換金の壺", unskbtName: ""},
    {name: "底抜けの壺", unskbtName: ""},
    {name: "手封じの壺", unskbtName: ""},
    {name: "割れない壺", unskbtName: ""},
    {name: "おはらいの壺", unskbtName: ""},
    {name: "呪いの壺", unskbtName: ""},
    {name: "背中の壺", unskbtName: ""},
    {name: "トドの壺", unskbtName: ""},
    {name: "水鉄砲の壺", unskbtName: ""},
    {name: "笑いの壺", unskbtName: ""},
    {name: "魔物の壺", unskbtName: ""},
    {name: "合成の壺", unskbtName: ""},
    {name: "強化の壺", unskbtName: ""},
    {name: "弱化の壺", unskbtName: ""},    
];

for (const skbtItem of tubo.skbtItemList) {
    const unskbtName = localStorage.getItem(skbtItem.name);
    if (unskbtName !== null) {
        skbtItem.unskbtName = unskbtName;
    }
}
