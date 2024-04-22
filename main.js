
let timer = 0;
let floorScrollY = 0;

const vm = {
    data() {
        return {
            mode: "kusa",
            unskbtNameList: [],
            skbtItemList: [],
            editTargetItemName: "",
            floorMemoList: floorMemoList,
            editTargetFloorName: "",
            startFloorNum: 1,
            floorNumList: [1, 11, 21, 31, 41, 51, 61, 71, 81, 91],

            isImportMode: false,
            isExportMode: false,
            exportText: "",
        };
    },
    created() {
        this.unskbtNameList = kusa.unskbtNameList;
        this.skbtItemList = kusa.skbtItemList;
    },
    watch: {
        mode(newVal) {
            this.editTargetItemName = "";
            this.editTargetFloorName = "";
            this.updateItemList(newVal);
        },
    },
    methods: {
        onClickReset() {
            if (!confirm("本当にリセットしますか？")) {
                return;
            }
            this.editTargetItemName = "";
            localStorage.clear();
            for (const target of [this, kusa, tue, makimono, tubo, okou, udewa]) {
                target.skbtItemList.forEach(item => item.unskbtName = "");
            }
            this.floorMemoList.forEach(floor => floor.memo = "");
        },

        onClickImport(importText) {
            if (importText.trim() === "") {
                return;
            }

            this.editTargetItemName = "";
            this.editTargetFloorName = "";
            localStorage.clear();

            for (const target of [this, kusa, tue, makimono, tubo, okou, udewa]) {
                target.skbtItemList.forEach(item => item.unskbtName = "");
            }
            this.floorMemoList.forEach(floor => floor.memo = "");
            
            const importStrList = importText.split("\n");
            let isFloorData = false;
            let memoList = [];
            
            for (let i = 0; i < importStrList.length; i++) {
                const importStr = importStrList[i];
                if (!isFloorData && importStr === "<[===]>") {
                    isFloorData = true;
                    continue;
                }
                if (isFloorData) {
                    if (importStr === "<[===]>") {
                        const [floorName, ...mainMemoList] = memoList;
                        localStorage.setItem(floorName, mainMemoList.join("\n"));
                        memoList = [];
                    }
                    else if (i === importStrList.length - 1) {
                        memoList.push(importStr);
                        const [floorName, ...mainMemoList] = memoList;
                        localStorage.setItem(floorName, mainMemoList.join("\n"));
                        memoList = [];
                    }
                    else {
                        memoList.push(importStr);
                    }
                }
                else {
                    let [skbtName, unskbtName] = importStr.split(",");
                    localStorage.setItem(skbtName, unskbtName);
                }
            }

            // 反映

            for (const target of [kusa, tue, makimono, tubo, okou, udewa]) {
                for (const skbtItem of target.skbtItemList) {
                    const unskbtName = localStorage.getItem(skbtItem.name);
                    if (unskbtName !== null) {
                        skbtItem.unskbtName = unskbtName;
                    }
                }
            }

            for (const floor of this.floorMemoList) {
                const memo = localStorage.getItem(floor.name);
                if (memo !== null) {
                    floor.memo = memo;
                }
            }

            this.updateItemList(this.mode);

            this.isImportMode = false;
        },

        onClickExportMode() {
            this.isExportMode = !this.isExportMode;
            this.isImportMode = false

            this.exportText = "";
            for (const target of [kusa, tue, makimono, tubo, okou, udewa]) {
                target.skbtItemList.forEach(item => {
                    if (item.unskbtName !== "") {
                        this.exportText += `${item.name},${item.unskbtName}\n`;
                    }
                });
            }
            this.floorMemoList.forEach(floor => {
                if (floor.memo.trim() !== "") {
                    this.exportText += `<[===]>\n${floor.name}\n${floor.memo}\n`;
                }
            });
        },

        onClickFloorNum(floorNum) {
            this.startFloorNum = floorNum

            const element = this.$refs.floorTitle[floorNum - 1];
            const elementTop = element.getBoundingClientRect().top;
            const y = elementTop + scrollY - this.$refs.header.clientHeight;

            // scrollTo(0, y);
            scrollTo({
                top: y,
                behavior: "smooth",
            });
        },

        onClickUnskbtItem(skbtItemName, index) {
            clearInterval(timer);

            this.editTargetItemName = skbtItemName;

            timer = setInterval(() => {
                const domUnskbtNameList = document.querySelectorAll(".unskbt-name");
                if (domUnskbtNameList.length > 0) {
                    clearInterval(timer);
                    const domUnskbtName = domUnskbtNameList[index];
                    domUnskbtName.focus();
                }
            }, 0);
        },
        onChangeUnskbtItem(e, skbtItem) {
            if (e.target.value !== "custom") {
                return;
            }

            this.isImportMode = this.isExportMode = false;
            this.editTargetItemName = "";

            const customName = prompt("未識別名を入力してください");
            if (customName === null || customName.trim() === "") {
                return;
            }
            skbtItem.unskbtName = customName;

            localStorage.setItem(skbtItem.name, skbtItem.unskbtName);
        },
        onBlurUnskbtItem(e, skbtItem) {
            if (e.target.value === "custom") {
                return;
            }
            
            this.isImportMode = this.isExportMode = false;
            this.editTargetItemName = "";
            skbtItem.unskbtName = e.target.value;

            localStorage.setItem(skbtItem.name, skbtItem.unskbtName);
        },

        onClickFloor(floor) {
            this.editTargetFloorName = floor.name;
            setTimeout(() => {
                this.$refs.floorMemo[floor.index].focus();
                this.$refs.floorMemo[floor.index].value = floor.memo;
                this.$refs.floorMemo[floor.index].setSelectionRange(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
            }, 0);
        },
        onBlurFloor(e, floor) {
            this.isImportMode = this.isExportMode = false;
            this.editTargetFloorName = "";
            floor.memo = e.target.value;

            localStorage.setItem(floor.name, floor.memo);
        },

        updateItemList(mode) {
            let target = null;
            switch (mode) {
                case "kusa": target = kusa; break;
                case "tue": target = tue; break;
                case "makimono": target = makimono; break;
                case "tubo": target = tubo; break;
                case "okou": target = okou; break;
                case "udewa": target = udewa; break;
                case "floor": {
                    setTimeout(() => {
                        scrollTo(0, floorScrollY);
                    }, 0);
                    return;
                }
            }
            this.unskbtNameList = [...target.unskbtNameList];
            this.skbtItemList = [...target.skbtItemList];

            floorScrollY = scrollY;
            scrollTo(0, 0);
        },

        isUnskbt(unskbtName) {
            for (const skbtItem of this.skbtItemList) {
                if (skbtItem.unskbtName === unskbtName) {
                    return false;
                }
            }
            return true;
        },
    }
};

Vue.createApp(vm).mount('#app');
