<template>
<!-- 配电柜 -->
    <div class="power">
        <van-dropdown-menu class="drop-top mgt0">
            <van-dropdown-item v-model="devicevalue" :options="deviceList" @change="dropdownChange"/>
        </van-dropdown-menu>
        <!-- <div class="power-header">运行参数</div>
        <div class="power-list">
            <div class="item" v-for="(item, index) in dataList" :key="index">
                <span class="name">{{item.name}}</span>
                <van-tag type="primary">运行</van-tag>
                <span v-if="item.unit">{{item.unit}}</span>
            </div>
            <Nodata v-if="dataList.length === 0"></Nodata>
        </div> -->
        <template v-if="dlyListData.length > 0">
            <van-collapse v-model="activeNames" :accordion="true" class="power-list" >
                <van-collapse-item :title="item.deviName" :name="index + 1" v-for="(item, index) in dlyListData" :key="index">
                    <div v-if="dataList.length > 0">
                        <div class="item" v-for="(item, index) in dataList" :key="index">
                            <span class="name">{{item.name}}</span>
                            <span class="value">
                                <van-tag type="primary">{{item.value}}</van-tag>
                                <span class="unit" v-if="item.unit">{{item.unit}}</span>
                            </span>
                        </div>
                    </div>
                    <!-- <Nodata v-else></Nodata> -->
                </van-collapse-item>
            </van-collapse>
        </template>
        <Nodata v-else></Nodata>
    </div>
</template>

<script>
import Nodata from '@/components/Nodata';
export default {
    data() {
        return {
            devicevalue: "",
            deviceList: [],
            dataList: [],
            activeNames: 1,
            dlyListData: []
        };
    },
    components: {
        Nodata
    },
    created() {
        this.queryParam = this.$router.currentRoute.query;
        this.getDeviceListByParam().then(() => {
            let parm = {dlyList: this.devicevalue};
            this.getDlyList(parm).then((e) => {
                this.getDataList({deviId: e})
            });
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
                    list.push({ text: element.deviName, value: element.deviDlyid });
                }
                this.deviceList = list;
                this.devicevalue = list[0].value;
            })
        },
        dropdownChange(e) {
            let parm = { dlyList: e};
            this.getDlyList(parm).then((e) => {
                this.getDataList({deviId: e})
            });
        },
        getDlyList(parm) {
            // parm.isnoloading = true;
            return this.get(`/ls_dcim/mobile/getDlyList`, parm).then(({data}) => {
                let list = [];
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    list.push({...element.device});
                }
                this.dlyListData = list;
                return list[0].deviId;
            })
        },
        getDataList(parm) {
            // parm.isnoloading = true;
            this.get(`/ls_dcim/mobile/getDeviceDataByDeviId`, parm).then(({data}) => {
                this.dataList = data.runParamList;
            })
        }
    }
};
</script>

<style scoped lang="scss">
.power {
    background: #fff;
}
.power-header {
    padding: 10px;
    background: #00A0E9;
    color: #fff;
    text-align: center;
}
/deep/ .power-list{
    .van-cell {
        background: #03A9F5;
        color: #fff;
    }
    .van-cell__right-icon  {
        color: #fff;
    }
    .van-collapse-item__content {
        padding: 0;
        overflow: hidden;
    }
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
