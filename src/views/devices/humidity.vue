
<template>
    <div>
        <div class="humidity">
            <div class="device-box">
                <div class="deviceimg-wrap" :style="{'background-image': 'url('+macrMobileimg+')', zoom: zoom}">
                    <div v-for="(item, index) in dataPointList" :key="index"
                        :class="['point',{nomal: item.warn === '0' || item.warn === '0.0'},{warn: item.warn === '1' || item.warn === '1.0'}]"
                        :style="{left: item.deviX +'px', top: item.deviY +'px', transform: 'scale('+(1/zoom)+')'}">
                        <span>
                            <i>{{getName(item.deviCode)}}</i>
                            <img src="../../assets/device/humidity.png" alt />
                        </span>
                    </div>
                </div>
            </div>
            <div class="humidity-list">
                <div
                    v-for="(item, index) in datalist"
                    :key="index"
                    :class="['item', {'error': item.warn === '1'}]"
                >
                    <div class="header">{{item.device.deviName}}</div>
                    <div class="info">
                        <span
                            v-for="(e, i) in item.dataList"
                            :key="i"
                            :class="[{'wsd': e.warn === '1'}]"
                        >{{e.name}}:{{e.value}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
export default {
    data() {
        return {
            macrMobileimg: "",
            dataPointList: [],
            datalist: []
        };
    },
    components: {
        Tabbar
    },
    created() {
        this.queryParam = this.$router.currentRoute.query;
        this.getDataList();
    },
    activated() {
        this.getDataList();
    },
    computed: {
        getName() {
            return (e) => {
                return e.split('_')[1]
            }
        },
        zoom() { // 获取相对屏幕大小的比率
            return document.body.clientWidth / 1000; // 后台按照1000排序尺寸计算的坐标
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        getDataList() {
            let param = {
                isnoloading: true,
                macrId: this.queryParam.macrId, // 机房编号
                detyId: this.queryParam.detyId // 设备类型编号"
            };
            this.get(`/ls_dcim/mobile/getDeviceDateByParam`, param).then(({ data }) => {
                if (data.length > 0) {
                    let macrMobileimg = data[0].device.macrMobileimg;
                    let list = [];
                    let tempdata = [];
                    data.forEach(item => {
                        list.push({
                            warn: item.warn,
                            deviCode: item.device.deviCode,
                            deviX: item.device.deviX,
                            deviY: item.device.deviY,
                            deviName: item.device.deviName
                        })
                        tempdata.push(item);
                    });
                    this.macrMobileimg = macrMobileimg;
                    this.dataPointList = list;
                    this.datalist = tempdata
                }
            });
        },
        refresh() {
            this.getDataList();
        }
    }
};
</script>

<style scoped lang="scss">
.humidity {
    margin-top: 10px;
}
.humidity-list {
    display: flex;
    flex-flow: wrap;
    .item {
        border-bottom: 1px solid #eee;
        text-align: center;
        margin: 5px;
        background: #fff;
        width: calc(50% - 10px);
        box-sizing: border-box;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        .header {
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            text-align: left;
            color: #fff;
            background: #03a9f5;
            padding: 7px;
        }
        .info {
            display: flex;
            padding: 15px 6px;
            justify-content: space-between;
        }
        .wsd {
            color: #e82f2f;
        }
        &.error {
            .header {
                color: #e82f2f;
                background: #eedadb;
            }
        }
    }
}
.deviceimg-wrap {
    position: relative;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    width: 1000px;
    height: 600px;
    transform-origin: left top;
    .point {
        position: absolute;
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-left: 20px;
        margin-top: 20px;
        text-align: center;
        &.nomal {
            /* background: url(../../assets/device/lighting_open.png) no-repeat;
            background-size: 100% 100%; */
            background: #03a9f5;
            border-radius: 50%;
        }
        &.warn {
            /* background: url(../../assets/device/lighting_close.png) no-repeat;
            background-size: 100% 100%; */
            background: #EA4E3D;
            border-radius: 50%;
        }
        span {
            color: #fff; 
            font-size: 10px;
            i {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #fff;
                font-style: normal;
                width: 26px;
                height: 26px;
                line-height: 25px;
                text-align: center;
                top: -13px;
                left: -13px;
                background: #03a9f5;
                border-radius: 50%;
                color: #fff;
                transform: scale(.5);
            }
            img {
                width: 26px;
                height: 26px;
            }
            /* width: 150px;
            position: absolute;
            top: -8px;
            left: -30px;
            font-size: 12px;
            display: inline-block;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: keep-all;
            word-wrap: normal */
        }
    }
}
</style>
