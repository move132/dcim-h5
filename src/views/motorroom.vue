
<template>
    <div class="roombox">
        <van-nav-bar class="dc-topbar" fixed :title="title" left-arrow @click-left="onClickLeft" />
        <div class="device">
            <Nodata v-if="deviceList.length === 0"></Nodata>
            <div class="device-item" v-for="(item, index) in deviceList" :key="index" @click="deviceInfo(item)">
                <van-image fit="cover" :show-error="false" width="45" height="45" :src="item.detyIcon"></van-image>
                <p class="ellipsis">{{item.detyName}}</p>
                <van-tag class="rod" round type="danger" v-if="item.warnNum > 0">{{item.warnNum}}</van-tag>
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
.roombox {
    margin-top: 10px;
}
.device {
    padding-top: 56px;
    padding-bottom: 100px;
    display: flex;
    flex-wrap: wrap;
    .device-item {
        width: 25%;
        text-align: center;
        margin-bottom: 10px;
        position: relative;
        .rod {
            position: absolute;
            top: 0;
            right: 0;
        }
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
