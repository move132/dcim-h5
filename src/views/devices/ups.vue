
<template>
    <div>
        <van-dropdown-menu class="drop-top">
            <van-dropdown-item v-model="devicevalue" :options="deviceList" @change="dropdownChange"/>
        </van-dropdown-menu>
        <van-tabs style="padding-top:0"
            type="card"
            title-active-color="#fff"
            color="#00A0E8"
            title-inactive-color="#333">
            <van-tab title="运行参数">
                <div class="d-box mgt10">
                    <Nodata v-if="runParamList.length === 0"></Nodata>
                    <div class="item" v-for="(item, index) in runParamList" :key="index">
                        <span class="name ellipsis">{{item.name}}</span>
                        <span class="value">
                            <van-tag type="primary">{{item.value}}</van-tag>
                            <span class="unit" v-if="item.unit">{{item.unit}}</span>
                        </span>
                    </div>
                </div>
            </van-tab>
            <van-tab title="报警状态">
                <div class="d-box mgt10">
                    <Nodata v-if="warnStatuList.length === 0"></Nodata>
                    <div :class="['item', {'red': item.value ==='1'}]" v-for="(item, index) in warnStatuList" :key="index">
                        <span class="name ellipsis">{{item.name}}</span>
                        <span class="value">
                            <van-tag :type="item.value ==='0' ?'success':'danger'">{{item.value === "0" ? "正常" : "故障"}}</van-tag>
                            <span class="unit" v-if="item.unit">{{item.unit}}</span>
                        </span>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import Nodata from '@/components/Nodata';
export default {
    data() {
        return {
            devicevalue: "",
            deviceList: [],
            warnStatuList: [], // 报警状态列表
            runParamList: [], // 运行参数列表
            unitStatuList: [], // 部件状态列表
            runStatuList: [], // 运行状态列表
            prefix: "", // 设备参数前缀,
            name: "", // 设备参数名,
            value: "" // 设备参数值
        }
    },
    components: {
        Tabbar, Nodata
    },
    created() {
		this.queryParam = this.$router.currentRoute.query;
		this.getDeviceListByParam().then(() => {
            let parm = {deviId: this.devicevalue};
            this.getDeviceData(parm)
        });
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
            let param = {
				macrId: this.queryParam.macrId, // 机房编号
				detyId: this.queryParam.detyId  // 设备类型编号"
			}
            return this.get(`/ls_dcim/mobile/getDeviceListByParam`, param).then(({data}) => {
                let list = [];
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    list.push({ text: element.deviName, value: element.deviId });
                }
                this.deviceList = list;
                this.devicevalue = list[0].value;
            })
        },
        getDeviceData(parm) {
           /*  "warnStatuList:报警状态列表
            runParamList:运行参数列表
            unitStatuList:部件状态列表
            runStatuList:运行状态列表
            prefix:设备参数前缀,
            name:设备参数名,
            value:设备参数值" */
            parm.isnoloading = true;
            this.get(`/ls_dcim/mobile/getDeviceDataByDeviId`, parm).then(({data}) => {
                this.warnStatuList = data.warnStatuList;
                this.runParamList = data.runParamList;
            })
        },
        dropdownChange(e) {
            let parm = { deviId: e};
            this.getDeviceData(parm);
        },
        refresh() {
            let parm = {deviId: this.devicevalue};
            this.getDeviceData(parm)
        }
    }
};
</script>

<style scoped lang="scss">
    .drop-top {
        margin-top: 10px;
        height: 35px;
    }
    .d-box {
        overflow: hidden;
        background: #fff;
    }
    .item {
        border-bottom: 1px solid #eee;
        padding: 10px 0;
        width: 50%;
        float: left;
        box-sizing: border-box;
        display: flex;
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
            width: 68%;
        }
        .value {
            display: inline-block;
            width: 32%;
        }
        .unit {
            color: #999;
            font-size: 12px;
        }
    }

</style>
