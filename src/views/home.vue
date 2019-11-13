<template>
    <div class="home">
        <van-nav-bar fixed title="首页" />
        <div class="center-list">
            <div class="center-header">
                <van-row class="row">
                    <van-col span="12" class="label">IDC数据中心</van-col>
                    <van-col span="4"></van-col>
                    <van-col span="8">
                        <van-dropdown-menu v-if="areaList.length > 0">
                            <van-dropdown-item v-model="areavalue" :options="areaList" @change="dropdownChange"/>
                        </van-dropdown-menu>
                    </van-col>
                </van-row>
            </div>
            <div class="center-content">
                <Nodata v-if="engineList.length === 0"></Nodata>
                <div class="data-center-list">
                    <div
                        v-for="(item, index) in engineList"
                        :key="''+index"
                        class="data-center-list-item"
                        @click="goDevice(item)"
                    >
                        <van-image fit="cover" height="68" width="100%" :src="item.macrMobileimg"></van-image>
                        <p>{{item.macrName}}</p>
                    </div>
                </div>
            </div>
            <div class="center-notice">
                <div class="ellipsis">
                    待处理警报:<span class="notice-number">{{count}}</span>条
                </div>
                <div class="line">|</div>
                <div class="tips ellipsis">{{warn(workorders) }}</div>
            </div>
            <Tabbar></Tabbar>
        </div>
    </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import Nodata from '@/components/Nodata';
export default {
    name: "home",
    data() {
        return {
            areavalue: "",
            areaList: [], // 区域
            engineList: [], // 机房
            count: 0,
            workorders: [] // 待处理列表
        };
    },
    components: { Tabbar, Nodata },
    created() {
        this.getAreaList().then(() => {
            let parm = { areaId: this.areavalue};
            this.getMacroom(parm);
            this.getPendingWarn();
        });
    },
    computed: {
        warn() {
            return (e) => {
                if (e.length !==0) {
                   return e[0].workRoom + e[0].workDevice + e[0].workParam;
                }
            }
        }
    },
    mounted() {},
    methods: {
        goDevice(item) {
            this.router.push({ name: "motorroom", query: {macrId: item.macrId, macrName: item.macrName}});
        },
        getAreaList() { // 区域
            let userId = this.$store.getters['login/userId'];
            return this.get(`/ls_dcim/mobile/getAreaList`, {userId: userId}).then(({data})=> {
                let list = [];
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    list.push({ text: element.areaName, value: element.areaId });
                }
                this.areaList = list;
                this.areavalue = list[0].value;
            })
        },
        getMacroom(param) {
            let userId = this.$store.getters['login/userId'];
            param.userId = userId;
            this.get(`/ls_dcim/mobile/getMacroomByAreaId`, param).then(({data})=> {
                this.engineList = data;
            }).catch(({data}) => {
                this.engineList = []
            });
        },
        getPendingWarn() { // 获取待处理报警
            let userId = this.$store.getters['login/userId'];
            this.get(`/ls_dcim/mobile/getPendingWarn`, {userId: userId}).then(({data})=> {
                this.count = data.count;
                this.workorders = data.workorders;
            })
        },
        dropdownChange(e) {
            let parm = { areaId: e};
            this.getMacroom(parm);
        },
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1);
                }
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if (this.list.length >= 1140) {
                    this.finished = true;
                }
            }, 1500);
        }
    }
};
</script>
<style scoped lang="scss">
.center-header {
    font-size: 16px;
    .row {
        .label {
            line-height: 50px;
            padding-left: 20px;
        }
        .van-dropdown-menu {
            background: transparent;
            margin-right: 15px;
        }
    }
}
.center-list {
    padding-top: 50px;
    padding-bottom: 140px;
}
.data-center-list {
    margin-left: 10px;
    overflow: hidden;
    .data-center-list-item {
        width: calc(50% - 10px);
        margin: 0 10px 10px 0;
        padding: 10px;
        box-sizing: border-box;
        background: #fff;
        text-align: center;
        float: left;
        p {
            margin: 8px 0 0 0;
        }
        img {
            height: 68px;
            width: 100%;
            vertical-align: middle;
        }
    }
}
.center-notice {
    display: flex;
    background: #fff;
    padding: 15px 15px;
    box-sizing: border-box;
    position: fixed;
    bottom: 52px;
    left: 0;
    width: 100%;
    font-size: 12px;
    .notice-number {
        color: #f44;
    }
    .line {
        margin: 0 10px;
    }
    .tips {
        color: #999;
    }
}
</style>
