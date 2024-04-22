
const tue = {};

tue.unskbtNameList = [
    "イチョウ",
    "ウィロー",
    "ウメ",
    "エボニー",
    "カエデ",
    "カキ",
    "カシ",
    "キリ",
    "クリ",
    "クワ",
    "サクラ",
    "スギ",
    "スプルース",
    "ツバキ",
    "ナシ",
    "パイン",
    "ヒッコリー",
    "ヒノキ",
    "ブナ",
    "マツ",
    "マホガニー",
    "モミ",
    "モモ",
    "ヤシ",
    "ヤナギ",
];

tue.skbtItemList = [
    {name: "ただの杖", unskbtName: ""},
    {name: "かなしばりの杖", unskbtName: ""},
    {name: "封印の杖", unskbtName: ""},
    {name: "吹き飛ばしの杖", unskbtName: ""},
    {name: "場所がえの杖", unskbtName: ""},
    {name: "飛びつきの杖", unskbtName: ""},
    {name: "感電の杖", unskbtName: ""},
    {name: "転ばぬ先の杖", unskbtName: ""},
    {name: "トンネルの杖", unskbtName: ""},
    {name: "土塊の杖", unskbtName: ""},
    {name: "導きの杖", unskbtName: ""},
    {name: "加速の杖", unskbtName: ""},
    {name: "鈍足の杖", unskbtName: ""},
    {name: "痛み分けの杖", unskbtName: ""},
    {name: "一時しのぎの杖", unskbtName: ""},
    {name: "ガイコツまどうの杖", unskbtName: ""},
    {name: "幸せの杖", unskbtName: ""},
    {name: "不幸の杖", unskbtName: ""},
    {name: "身代わりの杖", unskbtName: ""},
    {name: "桃まんの杖", unskbtName: ""},
];

for (const skbtItem of tue.skbtItemList) {
    const unskbtName = localStorage.getItem(skbtItem.name);
    if (unskbtName !== null) {
        skbtItem.unskbtName = unskbtName;
    }
}
