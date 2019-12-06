<template>
<!-- 蓄电池 -->
    <div>
        <div class="battery">
            <template v-if="dataList.length > 0">
                <div class="info">
                    <div class="fild">
                        <div>
                            <span class="label">总电压：</span>
                            <span class="val">{{dataList[0].zdy+dataList[0].zdyUnit}}</span>
                        </div>
                        <div>
                            <span class="label">总电流：</span>
                            <span class="val">{{dataList[0].zdl+dataList[0].zdlUnit}}</span>
                        </div>
                    </div>
                    <div class="fild">
                        <div>
                            <span class="label">报警状态：</span>
                            <span class="val">
                                <van-tag :type="dataList[0].dcbj ==='0' || dataList[0].dcbj ==='0.0' ?'success':'danger'">{{dataList[0].dcbj==="1"|| dataList[0].dcbj==="1.0"?'报警':'正常'}}</van-tag>
                            </span>
                        </div>
                    </div>
                </div>
                <van-collapse v-model="activeNames">
                    <van-collapse-item :title="item.name" :name="index + 1" v-for="(item, index) in dataList" :key="index">
                        <div class="coll-list">
                            <template v-if="item.type === '1'">
                                <div class="item" v-for="(subitem, num) in item.singleData" :key="num">
                                    <span class="name">{{subitem.depaVname}}</span>
                                    <van-tag type="primary">{{subitem.value}}</van-tag>
                                    <span class="unit" v-if="subitem.unit">V</span>
                                </div>
                            </template>
                            <template>
                                <template v-for="(subitem, num) in item.multiData">
                                    <div class="item" :key="num+'dy'" >
                                        <span class="name">{{subitem.depaVname}}电压</span>
                                        <van-tag type="primary">{{subitem.dy}}</van-tag>
                                        <span class="unit" v-if="item.dyUnit">{{item.dyUnit}}</span>
                                    </div>
                                    <div class="item" :key="num+'nz'">
                                        <span class="name">{{subitem.depaVname}}内阻</span>
                                        <van-tag type="primary">{{subitem.nz}}</van-tag>
                                        <span class="unit" v-if="subitem.nzUnit">{{item.nzUnit}}</span>
                                    </div>
                                    <div class="item" :key="num+'wd'">
                                        <span class="name">{{subitem.depaVname}}温度</span>
                                        <van-tag type="primary">{{subitem.wd}}</van-tag>
                                        <span class="unit" v-if="subitem.wdUnit">{{item.wdUnit}}</span>
                                    </div>
                                </template>

                            </template>
                        </div>
                    </van-collapse-item>
                </van-collapse>
            </template>
            <Nodata v-else></Nodata>
        </div>
    </div>
</template>

<script>
import Nodata from '@/components/Nodata';
export default {
    data() {
        return {
            activeNames: [1],
            dataList: []
        };
    },
    components: {
        Nodata
    },
    created() {
        this.queryParam = this.$router.currentRoute.query;
        this.getDataList();
    },
    activated() {
    },
    computed: {},
    methods: {
        getDataList() {
            let param = {
                isnoloading: true,
                macrId: this.queryParam.macrId, // 机房编号
                detyId: this.queryParam.detyId // 设备类型编号"
            };
            this.get(`/ls_dcim/mobile/getDCByParam`, param).then(({ data }) => {
                this.dataList = data;
            });
        }
    }
};
</script>

<style scoped lang="scss">

.battery {
    padding-top: 10px;
}
.coll-list {
    padding: 10px 0;
    overflow: hidden;
}
.info {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    background: #fff;
    .fild {
        width: 50%;
        > div {
            display: flex;
            margin: 10px 0;
        }
        span.label {
            width: 100px;
            text-align: right;
        }
        span.val {
            flex: 1;
        }
    }
}
/deep/ {
    .van-cell {
        background: #03A9F5;
        color: #fff;
    }
    .van-cell__right-icon  {
        color: #fff;
    }
    .van-collapse-item__content {
        padding: 0;
        overflow: hidden;
    }
}
.item {
    border-bottom: 1px solid #eee;
    padding: 10px;
    width: 50%;
    float: left;
    box-sizing: border-box;
    &.red {
        color: red;
    }
    .van-tag {
        margin: 0 0 0 5px;
        text-align: left;
    }
    .name {
        display: inline-block;
        text-align: right;
        width: 50%;
    }
    .unit {
        color: #999;
    }
}
</style>
