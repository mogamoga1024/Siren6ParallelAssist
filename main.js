
const vm = {
    data() {
        return {
            mode: "kusa",
            unskbtItemList: [],
            skbtItemList: [],
        };
    },
    created() {
        this.unskbtItemList = kusaUnskbtItemList;
        this.skbtItemList = kusaSkbtItemList;
    },
    methods: {
        onBlurUnskbtItem(e, skbtItem) {
            const unskbtnName = e.target.value;
            if (unskbtnName === "") {
                return;
            }
            skbtItem.unskbtName = unskbtnName;
            const unskbtItem = this.findUnskbtItemByName(unskbtnName);
            unskbtItem.isSelected = true;
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
