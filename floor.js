
const floorMemoList = [];

for (let floor = 1; floor <= 99; floor++) {
    const memo = {
        index: floor - 1,
        name: `${floor}F`,
        memo: ""
    };
    floorMemoList.push(memo);
}
