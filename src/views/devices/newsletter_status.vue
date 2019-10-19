<template>
    <!-- 通讯状态 -->
    <div class="letter">
        <div class="letter-list">
            <div class="item" v-for="(item, index) in dataList" :key="index">
                <span class="name">{{item.name}}</span>
                <van-tag type="primary" v-if="item.value==='1'">{{status(item.value)}}</van-tag>
                <van-tag type="success" v-if="item.value==='2'">{{status(item.value)}}</van-tag>
                <van-tag type="danger" v-if="item.value==='3'">{{status(item.value)}}</van-tag>
                <van-tag type="warning" v-if="item.value==='4'">{{status(item.value)}}</van-tag>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataList: []
        }
    },
    computed: {

    },
    components: {
    },
    created() {
        this.queryParam = this.$router.currentRoute.query;
        this.getDataList();
    },
    activated() {
        this.getDataList();
    },
    computed: {},
    methods: {
        getDataList() {
            let param = {
                macrId: this.queryParam.macrId, // 机房编号
                detyId: this.queryParam.detyId // 设备类型编号"
            };

            this.get(`/ls_dcim/mobile/getCommunicationState`, param).then(({ data }) => {
                this.dataList = data;
            })
        },
        status(e) {
            let o = {'1': '停止', '2': '运行', '3': '连接', '4': '断开'};
            return o[e];
        }
    }
};
</script>

<style scoped lang="scss">
.letter {
    padding-bottom: 100px;
    padding-top: 21px;
}
.letter-list {
    overflow: hidden;
    background: #fff;
}
.van-tag--warning {
    background-color: #ff976a;
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
