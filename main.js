
const vm = {
    data() {
        return {
            mode: "kusa",
            unskbtNameList: [],
            skbtItemList: [],
            editTargetItemName: "",
            floorMemoList: floorMemoList,
            editTargetFloorName: "",
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

        onClickUnskbtItem(skbtItemName) {
            this.editTargetItemName = skbtItemName;
        },
        onBlurUnskbtItem(e, skbtItem) {
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
