
let timer = 0;

const vm = {
    data() {
        return {
            mode: "kusa",
            unskbtNameList: [],
            skbtItemList: [],
            editTargetItemName: "",
            floorMemoList: floorMemoList,
            editTargetFloorName: "",

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
            
            for (const importStr of importStrList) {
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
                    else {
                        memoList.push(importStr);
                    }
                }
                else {
                    let [skbtName, unskbtName] = importStr.split("\t");
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
        },

        onClickExportMode() {
            this.isExportMode = !this.isExportMode;
            this.isImportMode = false

            this.exportText = "";
            for (const target of [kusa, tue, makimono, tubo, okou, udewa]) {
                target.skbtItemList.forEach(item => {
                    if (item.unskbtName !== "") {
                        this.exportText += `${item.name}\t${item.unskbtName}\n`;
                    }
                });
            }
            this.floorMemoList.forEach(floor => {
                if (floor.memo.trim() !== "") {
                    this.exportText += `<[===]>\n${floor.name}\n${floor.memo}\n`;
                }
            });
            this.exportText += "<[===]>";
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
        onBlurUnskbtItem(e, skbtItem) {
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
                case "floor": return;
            }
            this.unskbtNameList = [...target.unskbtNameList];
            this.skbtItemList = [...target.skbtItemList];
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
