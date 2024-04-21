
const vm = {
    data() {
        return {
            mode: "kusa",
            unskbtItemList: [],
            skbtNameList: [],
        };
    },
    created() {
        this.unskbtItemList = kusaUnskbtItemList;
        this.skbtNameList = kusaSkbtNameList;
    },
    methods: {

    }
};

Vue.createApp(vm).mount('#app');
