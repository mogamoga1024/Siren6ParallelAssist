
const floorMemoList = [];

for (let floor = 1; floor <= 99; floor++) {
    const data = {
        index: floor - 1,
        name: `${floor}F`,
        memo: ""
    };

    const memo = localStorage.getItem(data.name);
    if (memo !== null) {
        data.memo = memo;
    }

    floorMemoList.push(data);
}
