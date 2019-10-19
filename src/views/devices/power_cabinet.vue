<template>
<!-- 门禁 -->
    <div class="power">
        <div class="power-header">运行参数</div>
        <div class="power-list">
            <div class="item" v-for="(item, index) in [1,2,3,4,5,6]" :key="index">
                <span class="name">第{{item}}节电</span>
                <van-tag type="primary">22.3</van-tag>
                <span class="unit" v-if="item">V</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataList: ['1']
        };
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
                isnoloading: true,
                macrId: this.queryParam.macrId, // 机房编号
                detyId: this.queryParam.detyId // 设备类型编号"
            };
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
