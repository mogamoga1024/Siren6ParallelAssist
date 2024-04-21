
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

            isInportMode: false,
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
            let target = null;
            switch (newVal) {
                case "kusa": target = kusa; break;
                case "tue": target = tue; break;
                case "makimono": target = makimono; break;
                case "tubo": target = tubo; break;
                case "okou": target = okou; break;
                case "udewa": target = udewa; break;
                case "floor": return;
            }
            this.unskbtNameList = target.unskbtNameList;
            this.skbtItemList = target.skbtItemList;
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

        onClickExport() {
            this.isExportMode = !this.isExportMode;
            this.isInportMode = false

            this.exportText = "";
            for (const target of [kusa, tue, makimono, tubo, okou, udewa]) {
                target.skbtItemList.forEach(item => {
                    this.exportText += `${item.name}\t${item.unskbtName}\n`;
                });
            }
            this.floorMemoList.forEach(floor => {
                this.exportText += `<[${floor.name}]>\n${floor.memo}\n`;
            });
        },

        onClickUnskbtItem(skbtItemName, index) {
            clearInterval(timer);

            this.editTargetItemName = skbtItemName;

            timer = setInterval(() => {
                // this.$refs.unskbtName[index].focus();
                const domUnskbtNameList = document.querySelectorAll(".unskbt-name");
                if (domUnskbtNameList.length > 0) {
                    clearInterval(timer);
                    const domUnskbtName = domUnskbtNameList[index];
                    domUnskbtName.focus();
                }
            }, 0);
        },
        onBlurUnskbtItem(e, skbtItem) {
            this.isInportMode = this.isExportMode = false;
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
            this.isInportMode = this.isExportMode = false;
            this.editTargetFloorName = "";
            floor.memo = e.target.value;

            localStorage.setItem(floor.name, floor.memo);
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
