
const vm = {
    data() {
        return {
            mode: "kusa",
            unskbtNameList: [],
            skbtNameList: [],
        };
    },
    created() {
        this.unskbtNameList = kusaUnskbtNameList;
        this.skbtNameList = kusaSkbtNameList;
    },
    methods: {

    }
};

Vue.createApp(vm).mount('#app');
