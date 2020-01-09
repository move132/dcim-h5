<template>
    <!-- 漏水 -->
    <div class="power">
        <div class="power-list">
            <div class="device-box">
                <div class="deviceimg-wrap" :style="{'background-image': 'url('+macrMobileimg+')', zoom: zoom}">
                    <div v-for="(item, index) in dataList" :key="index"
                        :class="['point',{nomal: item.warn === '0' || item.warn === '0.0'},{warn: item.warn === '1' || item.warn === '1.0'}]"
                        :style="{left: item.deviX +'px', top: item.deviY +'px', transform: 'scale('+(1/zoom)+')'}">
                        <span>
                            <i>{{item.pointNum}}</i>
                            <img src="../../assets/device/humidity.png" alt />
                        </span>
                    </div>
                </div>
            </div>
            <div class="w-list">
                <div class="witem" v-for="(item, index) in dataList" :key="index">
                    <span  v-if="item.point > 0">
                        {{item.pointNum}}号漏水位置
                        <em class="dtag danger">{{item.point}}</em>M
                    </span>
                    <span v-else>
                        {{item.pointNum}}号漏水位置
                        <em class="dtag success">正常</em>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            macrMobileimg: "",
            dataList: []
        };
    },
    components: {},
    created() {
        this.queryParam = this.$router.currentRoute.query;
        this.getDataList();
    },
    activated() {},
    computed: {
        zoom() { // 获取相对屏幕大小的比率
            return document.body.clientWidth / 1000; // 后台按照1000排序尺寸计算的坐标
        }
    },
    methods: {
        getDataList() {
            let param = {
                macrId: this.queryParam.macrId, // 机房编号
                detyId: this.queryParam.detyId // 设备编号
            };
            this.get(`/ls_dcim/mobile/getWaterLeakage`, param).then(({ data }) => {
                if (data.length > 0) {
                    let macrMobileimg = "http://dcim.fengyingtech.com/ls_dcim/static/img/room/thumb/65c15b34f82f4a3bb2b3ee16a5e87411.png";// data[0].device.macrMobileimg;
                    let list = [];
                    data.forEach(item => {
                        list.push({
                            point: item.point,
                            deviX: item.x,
                            deviY: item.y,
                            pointNum: item.pointNum,
                        })
                    });
                    this.macrMobileimg = macrMobileimg;
                    this.dataList = list;
                }
            });
        }
    }
};
</script>

<style scoped lang="scss">
.power-header {
    padding: 10px;
    background: #00a0e9;
    color: #fff;
    text-align: center;
}
.power-list {
    overflow: hidden;
    background: #fff;
}
.tag {
    display: flex;
    justify-items: center;
    justify-content: flex-end;
    padding: 10px 0;
    div {
        display: flex;
        justify-items: center;
        line-height: 20px;
        margin-right: 20px;
    }
    img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-left: 5px;
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
            background: #03a9f5;
            border-radius: 50%;
        }
        &.warn {
            background: #EA4E3D;
            border-radius: 50%;
        }
        span {
            color: #fff;
            font-size: 0.5em;
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
        }
    }
}
.w-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .witem {
        padding: 6px 0;
        margin-bottom: 6px;
        text-align: center;
        border-bottom: 1px solid #ccc;
        .dtag {
            margin: 0 5px;
            padding: 3px 10px;
            font-style: normal;
            color: #fff;
            border-radius: 4px;
            &.danger {
                background-color: #f44;
            }
            &.success {
                background-color: #07c160
            }
        }
        &:last-of-type {
            border-bottom: none;
        }
    }
}
</style>
