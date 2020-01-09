<template>
    <!-- 普通空调 -->
    <div class="power">
        <van-dropdown-menu class="drop-top mgt0">
            <van-dropdown-item v-model="devicevalue" :options="deviceList" @change="dropdownChange"/>
        </van-dropdown-menu>
        <div class="power-header">运行参数</div>
        <div class="power-list">
            <div class="item" v-for="(item, index) in dataList" :key="index">
                <span class="name">{{item.name}}</span>
                <van-tag type="primary">运行</van-tag>
                <span v-if="item.unit">{{item.unit}}</span>
            </div>
            <Nodata v-if="dataList.length === 0"></Nodata>
        </div>
    </div>
</template>

<script>
import Nodata from '@/components/Nodata';
export default {
    data() {
        return {
            devicevalue: "",
            deviceList: [],
            dataList: []
        };
    },
    components: {
        Nodata
    },
    created() {
        this.queryParam = this.$router.currentRoute.query;
        this.getDeviceListByParam().then(() => {
            let parm = {deviId: this.devicevalue};
            this.getDataList(parm);
        })
    },
    activated() {
    },
    computed: {},
    methods: {
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
        dropdownChange(e) {
            let parm = { deviId: e};
            this.getDataList(parm);
        },
        getDataList(parm) {
            parm.isnoloading = true;
            this.get(`/ls_dcim/mobile/getDeviceDataByDeviId`, parm).then(({data}) => {
                this.dataList = data.runParamList;
            })
        }
    }
};
</script>

<style scoped lang="scss">
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
