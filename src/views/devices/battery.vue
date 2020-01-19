<template>
<!-- 蓄电池 -->
    <div>
        <div class="battery">
            <template v-if="dataList.length > 0">
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
                                    <div class="bg-iitem" :key='num'>
                                        <div class="content-flex">
                                            <div class="number">{{subitem.depaVname}}</div>
                                            <div>电压: {{subitem.dy}}{{item.dyUnit}}</div>
                                            <div>内阻: {{subitem.nz}}{{item.nzUnit}}</div>
                                            <div>温度: {{subitem.wd}}{{item.wdUnit}}</div>
                                        </div>
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
    padding: 10px;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    .bg-iitem {
        width: 33.333%;
        color: #fff;
        margin: 10px 0;
        &:nth-child(3n) {
            .content-flex {
                margin-right: 0;
            }
        }
        .content-flex {
            position: relative;
            padding: 30px 10px 10px 15px;
            margin-right: 10px;
            background: url(../../assets/device/battery.png) no-repeat;
            background-size: 100% 100%;
            .number {
                position: absolute;
                background: #fff;
                color: #03A9F4;
                padding: 0 10px;
                top: 7px;
                left: 50%;
                transform: translate(-50%, 0);
                border-radius: 5px;
                font-size: 12px;
                line-height: 15px;
            }
        }
    }
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
