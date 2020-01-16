
<template>
    <div>
        <van-nav-bar class="dc-topbar" :title="macrName + '-' + title" fixed left-arrow @click-left="onClickLeft" >
        </van-nav-bar>
        <div class="wrap">
            <ups v-if="queryParam.detyName === 'UPS'" ref="ups"></ups>
            <humidity v-else-if="queryParam.detyName === '温湿度'" ref="wsd"></humidity>

            <Infrared v-else-if="queryParam.detyName === '红外'" ref="hw"></Infrared>

            <leaking-water v-else-if="queryParam.detyName === '漏水'" ref="ls"></leaking-water>

            <illumine v-else-if="queryParam.detyName === '照明'" ref="zm"></illumine>
            <battery v-else-if="queryParam.detyName === '电池'" ref="dc"></battery>
            <firefighting v-else-if="queryParam.detyName === '烟感'" ref="xf"></firefighting> <!-- 消防 -->
            <accesscontrol v-else-if="queryParam.detyName === '门禁'"  ref="mj"></accesscontrol>
            <newsletter-status v-else-if="queryParam.detyName === '通讯状态'"  ref="txzt" ></newsletter-status>

            <ordinaryair v-else-if="queryParam.detyName === '普通空调'" ref="ptkt"></ordinaryair>  <!-- 普通空调 -->
            <correctcond v-else-if="queryParam.detyName === '空调'" ref="jmkt"></correctcond>  <!-- 精密空调 -->
            <powercabinet v-else-if="queryParam.detyName === '配电柜'" ref="pdg"></powercabinet>  <!-- 配电柜 -->
            <powercabinetswitch v-else-if="queryParam.detyName === '配电柜开关'" ref="pdgkg"></powercabinetswitch>  <!-- 配电柜开关 -->
            <monitorvideo v-else-if="queryParam.detyName === '视频'" ref="sp"></monitorvideo> <!-- 视频 -->

            <Nodata v-else></Nodata>
            <Tabbar></Tabbar>
        </div>
    </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import Nodata from '@/components/Nodata';
import humidity from "./devices/humidity";
import ups from "./devices/ups"
import Infrared from "./devices/Infrared";
import leakingWater from "./devices/leaking_water";
import illumine from "./devices/illumine";
import battery from "./devices/battery";
import accesscontrol from "./devices/access_control";
import correctcond from "./devices/correct_cond";
import powercabinet from "./devices/power_cabinet";
import newsletterStatus from "./devices/newsletter_status";
import ordinaryair from "./devices/ordinaryair";
import powercabinetswitch from "./devices/power_cabinet_switch"
import firefighting from "./devices/firefighting"
import monitorvideo from "./devices/monitorvideo"
export default {
    data() {
        return {
            queryParam: {},
            macrName: '',
            title: ""
        };
    },
    components: {
        Tabbar,
        Nodata,
        humidity,
        ups,
        Infrared,
        leakingWater,
        illumine,
        battery,
        accesscontrol,
        correctcond,
        powercabinet,
        newsletterStatus,
        ordinaryair,
        powercabinetswitch,
        firefighting,
        monitorvideo
    },
    activated() {

    },
    destroyed: function() {
        // 页面销毁时关闭长连接
        this.websock.close();
    },
    created() {
        this.queryParam = this.$router.currentRoute.query;
        this.macrName = this.queryParam.macrName;
        this.title = this.queryParam.detyName;
        this.initWebSocket()
    },
    computed: {},
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        initWebSocket() {
            // 初始化weosocket
            let path = process.env.NODE_ENV === 'production' ? window.VUE_APP_WEBSOCKET_API : process.env.VUE_APP_WEBSOCKET_API;
            const wsuri = path + "/ls_dcim/websocket";
            this.websock = new WebSocket(wsuri);
            this.websock.onopen = this.websocketonopen;
            this.websock.onerror = this.websocketonerror;
            this.websock.onmessage = this.websocketonmessage;
            this.websock.onclose = this.websocketclose;
        },
        websocketonopen() {
            console.log("WebSocket连接成功");
        },
        websocketonerror(e) {
            console.log("WebSocket连接发生错误");
        },
        websocketonmessage(e) {
            console.log("type: "+ e.data);
            if (e.data) {
                if (this.$refs[e.data]) {
                    this.$refs[e.data].refresh();
                }
            }
            // const redata = JSON.parse(e.data);
            //  数据接收console.log(redata.value);
        },
        websocketsend(agentData) { // 数据发送
            this.websock.send(agentData);
        },
        websocketclose(e) { // 关闭
            console.log("connection closed ");
        }
    }
};
</script>

<style scoped lang="scss">
.wrap {
    padding-top: 46px;
    padding-bottom: 140px;
    overflow: hidden;
    .row {
        border-bottom: 1px solid #eee;
    }
    .item {
        text-align: center;
        padding: 10px;
        background: #fff;
        .van-tag {
            margin: 0 5px;
        }
        .unit {
            color: #999;
        }
    }
}
</style>
