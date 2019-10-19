
<template>
    <div>
        <van-nav-bar fixed :title="title" left-arrow @click-left="onClickLeft" />
        <div class="device">
            <Nodata v-if="deviceList.length === 0"></Nodata>
            <div class="device-item" v-for="(item, index) in deviceList" :key="index" @click="deviceInfo(item)">
                <van-image fit="cover" :show-error="false" width="45" height="45" :src="item.detyIcon"></van-image>
                <p class="ellipsis">{{item.detyName}}</p>
            </div>
        </div>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import Nodata from '@/components/Nodata';
export default {
    data() {
        return {
            title: '',
            queryParam: {},
            deviceList: []
        }
    },
    components: {Tabbar, Nodata},
    created() {
        this.queryParam = this.$router.currentRoute.query;
        this.title = this.queryParam.macrName;
        this.getdevices();
    },
    computed: {

    },
    methods: {
        getdevices() {
            let param = {macrId: this.queryParam.macrId};
            this.get(`/ls_dcim/mobile/getDeviceByMacrId`, param).then(({data}) => {
                this.deviceList = data;
            })
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        deviceInfo(item) {
            this.$router.push({ name: "deviceinfo" ,query:{...item, macrName: this.queryParam.macrName}});
        }
    }
};
</script>

<style scoped lang="scss">
.device {
    padding-top: 70px;
    padding-bottom: 100px;
    display: flex;
    flex-wrap: wrap;
    .device-item {
        width: 25%;
        text-align: center;
        margin-bottom: 10px;
        p {
            margin: 5px 0;
        }
        img {
            width: 70%;
            vertical-align: middle;
        }
    }
}
</style>
