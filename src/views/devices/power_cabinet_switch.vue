<template>
<!-- 配电柜开关 -->
    <div class="power">
        <div class="power-list">
            <div class="item" v-for="(item, index) in dataList" :key="index">
                <span class="name">{{item.name}}</span>
                <van-tag :type="item.value ==='0' || item.value ==='0.0' ? 'success':'danger'">{{item.value === "0" || item.value === "0.0" ? "闭合" : "断开"}}</van-tag>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataList: []
        };
    },
    components: {
    },
    created() {
        this.queryParam = this.$router.currentRoute.query;
        this.getDataList();
    },
    activated() {
    },
    computed: {},
    methods: {
        getDataList() {
            let param = {
                deviId: this.queryParam.deviId // 设备类型编号"
            };
            this.get(`/ls_dcim/mobile/getDeviceDataByDeviId`, param).then(({data}) => {
                this.dataList = data.runParamList;
            })
        }
    }
};
</script>

<style scoped lang="scss">

.power {
    padding-bottom: 100px;
    padding-top: 21px;
}
.power-header {
    padding: 10px;
    background: #00A0E9;
    color: #fff;
    text-align: center;
}
.power-list {
    overflow: hidden;
    background: #fff;
}
.item {
    border-bottom: 1px solid #eee;
    padding: 10px;
    width: 50%;
    float: left;
    box-sizing: border-box;
    &.red {
        color: red;
    }
    .van-tag {
        margin: 0 0 0 5px;
        text-align: left;
    }
    .name {
        display: inline-block;
        text-align: right;
        width: 60%;
    }
    .unit {
        color: #999;
    }
}
</style>
