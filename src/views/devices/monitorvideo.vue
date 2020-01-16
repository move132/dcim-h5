<template>
    <!-- 照明 -->
    <div class="video">
        <div class="video-list">
            <!-- <div class="video-item" v-for="(item ,index) in 'dataLis'" :key="index"></div> -->
            <div class="video-item" v-for="(item ,index) in dataList" :key="index">
                <!-- <video src="http://hls01open.ys7.com/openlive/2c0641b9fe0d47ea93ebc2e381869b80.hd.m3u8" controls="controls" webkit-playsinline="" id="videoPlay" style="width:100%; height: 260px;"></video> -->
                <iframe  :src="item.deviUrl+'?autoplay=1'"  style="height:200px; width: 100%;"  id="ysOpenDevice" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" allowfullscreen></iframe>
            </div>
            <div class="video-item" v-for="(item ,index) in dataList" :key="index">
                <!-- <video src="http://hls01open.ys7.com/openlive/2c0641b9fe0d47ea93ebc2e381869b80.hd.m3u8" controls="controls" webkit-playsinline="" id="videoPlay" style="width:100%; height: 260px;"></video> -->
                <iframe  :src="item.deviUrl+'?autoplay=1'"  style="height:200px; width: 100%;"  id="ysOpenDevice" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" allowfullscreen></iframe>
            </div>
            <div class="video-item" v-for="(item ,index) in dataList" :key="index">
                <!-- <video src="http://hls01open.ys7.com/openlive/2c0641b9fe0d47ea93ebc2e381869b80.hd.m3u8" controls="controls" webkit-playsinline="" id="videoPlay" style="width:100%; height: 260px;"></video> -->
                <iframe  :src="item.deviUrl+'?autoplay=1'"  style="height:200px; width: 100%;"  id="ysOpenDevice" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" allowfullscreen></iframe>
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
    computed: {

    },
    methods: {
        getDataList() {
            let param = {
                macrId: this.queryParam.macrId, // 机房编号
                detyId: this.queryParam.detyId // 设备编号
            };
            this.get(`/ls_dcim/mobile/getVideoListByParam`, param).then(({ data }) => {
                if (data.length > 0) {
                    this.dataList = data;
                }
            });
        }
    }
};
</script>

<style scoped lang="scss">
 .video-list {
    display: flex;
    flex-wrap: wrap;
    /* margin-left: 1%; */
    .video-item {
        height: 200px;
        width: 100%;
        background: #666;
    }
 }
</style>
