<template>
    <!-- 红外 -->
    <div class="power">
        <div class="power-list">
            <div class="tag">
                <div>正常<img src="../../assets/device/infrared_nomal.png" alt /></div>
                <div>报警<img src="../../assets/device/infrared_warn.png" alt /></div>
            </div>
            <div class="device-box">
                <div class="deviceimg-wrap" :style="{'background-image': 'url('+ macrMobileimg +')', zoom: zoom}">
                    <div v-for="(item, index) in dataList" :key="index"
                        :class="['point',{nomal: item.warn === '0' || item.warn === '0.0'},{warn: item.warn === '1' || item.warn === '1.0'}]"
                        :style="{left: item.deviX +'px', top: item.deviY +'px', transform: 'scale('+(1/zoom)+')'}">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            img: "http://211.149.155.20:8080/ls_dcim/static/img/room/3d/a005ea1e458f491c875e8334944d9a92.png",
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
            return document.body.clientWidth / 1000;
        }
    },
    methods: {
        getDataList() {
            let param = {
                macrId: this.queryParam.macrId, // 机房编号
                detyId: this.queryParam.detyId // 设备编号
            };
            this.get(`/ls_dcim/mobile/getDeviceDateByParam`, param).then(({ data }) => {
                if (data.length > 0) {
                    let macrMobileimg = data[0].device.macrMobileimg;
                    let list = [];

                    data.forEach(item => {
                        list.push({
                            warn: item.warn,
                            deviX: item.device.deviX,
                            deviY: item.device.deviY
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
    .point {
        position: absolute;
        width: 20px;
        height: 20px;
        margin-left: 20px;
        margin-top: 20px;
        &.nomal {
            background: url(../../assets/device/infrared_nomal.png) no-repeat;
            background-size: 100% 100%;
        }
        &.warn {
            background: url(../../assets/device/infrared_warn.png) no-repeat;
            background-size: 100% 100%;
        }
    }
}
</style>
