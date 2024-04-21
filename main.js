
const vm = {
    data() {
        return {
            mode: "kusa",
            unskbtItemList: [],
            skbtItemList: [],
            editTargetItemName: "",
        };
    },
    created() {
        this.unskbtItemList = kusaUnskbtItemList;
        this.skbtItemList = kusaSkbtItemList;
    },
    methods: {
        onClickUnskbtItem(skbtItemName) {
            this.editTargetItemName = skbtItemName;
        },
        onBlurUnskbtItem(e, skbtItem) {
            this.editTargetItemName = "";

            const unskbtnName = e.target.value;
            if (unskbtnName !== "") {
                skbtItem.unskbtName = unskbtnName;
                const unskbtItem = this.findUnskbtItemByName(unskbtnName);
                unskbtItem.isSelected = true;
            }
            else if (skbtItem.unskbtName !== "") {
                const unskbtItem = this.findUnskbtItemByName(skbtItem.unskbtName);
                unskbtItem.isSelected = false;
                skbtItem.unskbtName = "";
            }
        },

        findUnskbtItemByName(name) {
            for (const unskbtItem of this.unskbtItemList) {
                if (unskbtItem.name === name) {
                    return unskbtItem;
                }
            }
            return null;
        }
    }
};

Vue.createApp(vm).mount('#app');
