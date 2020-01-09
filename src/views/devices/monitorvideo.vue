<template>
    <!-- 照明 -->
    <div class="video">
        <div class="video-list">
            <!-- <div class="video-item" v-for="(item ,index) in 'dataLis'" :key="index"></div> -->
            <div class="video-item" v-for="(item ,index) in dataList" :key="index">
                <!-- <video src="https://open.ys7.com/ezopen/h5/live?autoplay=1&audio=1&accessToken=at.8fdi08no85t2bfkw493l6im6bg7ilwy2-9guiyp58c1-18m751o-g9ndqalhs&hd=1&deviceSerial=203751922&channelNo=1" controls="controls" webkit-playsinline="" id="videoPlay" style="width:100%; height: 260px;"></video> -->
                <iframe  :src="item.deviUrl+'?autoplay=1'"  width="100%"  height="300"  id="ysOpenDevice"  allowfullscreen></iframe>
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
    margin-left: 1%;
    .video-item {
        height: 100px;
        width: 49%;
        background: #666;
        margin: 1% 1% 0 0;
    }
 }
</style>
