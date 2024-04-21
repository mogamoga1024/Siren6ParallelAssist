
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
        this.unskbtNameList = kusa.unskbtNameList;
        this.skbtItemList = kusa.skbtItemList;
    },
    watch: {
        mode(newVal) {
            this.editTargetItemName = "";
            let target = null;
            switch (newVal) {
                case "kusa": target = kusa; break;
                case "tue": target = tue; break;
                case "makimono": target = makimono; break;
                case "tubo": target = tubo; break;
                case "okou": target = okou; break;
                case "udewa": target = udewa; break;
                case "floor": return; // todo
            }
            this.unskbtNameList = target.unskbtNameList;
            this.skbtItemList = target.skbtItemList;
        },
    },
    methods: {
        onClickUnskbtItem(skbtItemName) {
            this.editTargetItemName = skbtItemName;
        },
        onBlurUnskbtItem(e, skbtItem) {
            this.editTargetItemName = "";
            skbtItem.unskbtName = e.target.value;

            localStorage.setItem(skbtItem.name, skbtItem.unskbtName);
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
