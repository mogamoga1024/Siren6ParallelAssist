
const kusa = {};

kusa.unskbtNameList = [
    "あおい",
    "あかい",
    "うすみどり",
    "うすむらさき",
    "おうど色",
    "オレンジ色",
    "かっ色",
    "きいろい",
    "きみどり",
    "金色",
    "銀色",
    "クリーム色",
    "くろい",
    "ぐんじょう色",
    "こうはく",
    "こがね色",
    "こげちゃ色",
    "こん色",
    "しろい",
    "しんく",
    "すおう色",
    "そら色",
    "たまむし色",
    "ちゃ色",
    "つち色",
    "にじ色",
    "はい色",
    "ピンク色",
    "ベージュ色",
    "べに色",
    "みず色",
    "みどり",
    "むらさき",
    "やまぶき色",
    "レモン色",
];

// 雑草は除外
kusa.skbtItemList = [
    {name: "薬草", unskbtName: ""},
    {name: "毒草", unskbtName: ""},
    {name: "暴走の種", unskbtName: ""},
    {name: "混乱草", unskbtName: ""},
    {name: "睡眠草", unskbtName: ""},
    {name: "目つぶし草", unskbtName: ""},
    {name: "めぐすり草", unskbtName: ""},
    {name: "すばやさ草", unskbtName: ""},
    {name: "パワーアップ草", unskbtName: ""},
    {name: "弟切草", unskbtName: ""},
    {name: "高飛び草", unskbtName: ""},
    {name: "くねくね草", unskbtName: ""},
    {name: "いやし草", unskbtName: ""},
    {name: "かぐわし草", unskbtName: ""},
    {name: "胃拡張の種", unskbtName: ""},
    {name: "胃縮小の種", unskbtName: ""},
    {name: "ドラゴン草", unskbtName: ""},
    {name: "復活の草", unskbtName: ""},
    {name: "無敵草", unskbtName: ""},
    {name: "不幸の種", unskbtName: ""},
    {name: "命の草", unskbtName: ""},
    {name: "毒消し草", unskbtName: ""},
    {name: "ちからの草", unskbtName: ""},
    {name: "しあわせ草", unskbtName: ""},
    {name: "天使の種", unskbtName: ""},
    {name: "超不幸の種", unskbtName: ""},
];

for (const skbtItem of kusa.skbtItemList) {
    const unskbtName = localStorage.getItem(skbtItem.name);
    if (unskbtName !== null) {
        skbtItem.unskbtName = unskbtName;
    }
}
