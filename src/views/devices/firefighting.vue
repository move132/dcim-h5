<template>
    <!-- 消防 -->
    <div class="power">
        <div class="power-list">
            <div class="tag">
                <div>正常<img src="../../assets/device/fire_nomal.png" alt /></div>
                <div>报警<img src="../../assets/device/fire_warn.png" alt /></div>
            </div>
            <div class="device-img">
                <img src="http://211.149.155.20:8080/ls_dcim/static/img/room/thumb/36bec2150bce47a0b72294216c3b3dbd.png" alt="">
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
    components: {},
    created() {
        this.queryParam = this.$router.currentRoute.query;
        this.getDataList();
    },
    activated() {},
    computed: {},
    methods: {
        getDataList() {
            let param = {
                macrId: this.queryParam.macrId, // 机房编号
                detyId: this.queryParam.detyId // 设备编号
            };
            this.get(`/ls_dcim/mobile/getDeviceDateByParam`, param).then(
                ({ data }) => {
                    this.dataList = data.runParamList;
                }
            );
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
.device-img {
    text-align: center;
    img {
        width: 100%;
    }
}
</style>
