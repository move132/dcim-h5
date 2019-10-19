
<template>
<!-- 精密空调 -->
    <div class="cond">
        <van-tabs style="padding-top:0"
            type="card"
            title-active-color="#fff"
            color="#00A0E8"
            title-inactive-color="#333">
            <van-tab title="运行参数">
                <div class="d-box mgt10">
                    <Nodata v-if="runParamList.length === 0"></Nodata>
                    <div class="item" v-for="(item, index) in runParamList" :key="index">
                        <span class="name">{{item.name}}</span>
                        <van-tag type="primary">{{item.value}}</van-tag>
                        <span class="unit" v-if="item.unit">{{item.unit}}</span>
                    </div>
                </div>
            </van-tab>
            <van-tab title="部件状态">
                <div class="d-box mgt10">
                    <Nodata v-if="warnStatuList.length === 0"></Nodata>
                    <div :class="['item', {'red': item.value ==='1'}]" v-for="(item, index) in warnStatuList" :key="index">
                        <span class="name">{{item.name}}</span>
                        <van-tag :type="item.value ==='0' ?'success':'danger'">{{item.value === "0" ? "正常" : "故障"}}</van-tag>
                        <span class="unit" v-if="item.unit">{{item.unit}}</span>
                    </div>
                </div>
            </van-tab>
            <van-tab title="报警状态">
                <div class="d-box mgt10">
                    <Nodata v-if="warnStatuList.length === 0"></Nodata>
                    <div :class="['item', {'red': item.value ==='1'}]" v-for="(item, index) in warnStatuList" :key="index">
                        <span class="name">{{item.name}}</span>
                        <van-tag :type="item.value ==='0' ?'success':'danger'">{{item.value === "0" ? "正常" : "故障"}}</van-tag>
                        <span class="unit" v-if="item.unit">{{item.unit}}</span>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import Nodata from '@/components/Nodata';
export default {
    data() {
        return {
            runParamList: [],
            warnStatuList: []
        }
    },
    components: {
        Nodata
    },
    created() {
		this.queryParam = this.$router.currentRoute.query;

	},
  	activated() {
    	this.getDeviceListByParam();
  	},
    computed: {},
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        getDeviceListByParam() {

        }
    }
};
</script>

<style scoped lang="scss">
    .cond {
        padding-bottom: 100px;
        padding-top: 30px;
    }
    .drop-top {
        margin-top: 30px;
        height: 35px;
    }
    .d-box {
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
            width: 70%;
        }
        .unit {
            color: #999;
        }
    }

</style>
