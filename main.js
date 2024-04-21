
const vm = {
    data() {
        return {
            mode: "kusa",
            unskbtNameList: [],
            skbtItemList: [],
            editTargetItemName: "",
        };
    },
    created() {
        this.unskbtNameList = kusaUnskbtNameList;
        this.skbtItemList = kusaSkbtItemList;
    },
    methods: {
        onClickUnskbtItem(skbtItemName) {
            this.editTargetItemName = skbtItemName;
        },
        onBlurUnskbtItem(e, skbtItem) {
            this.editTargetItemName = "";
            skbtItem.unskbtName = e.target.value;
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
