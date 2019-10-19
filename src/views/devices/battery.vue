<template>
<!-- 蓄电池 -->
    <div>
        <div class="battery">
            <div class="info">
                <div class="fild">
                    <div>
                        <span class="label">电池电压：</span>
                        <span class="val">220v</span>
                    </div>
                    <div>
                        <span class="label">温度1：</span>
                        <span class="val">100</span>
                    </div>
                </div>
                <div class="fild">
                    <div>
                        <span class="label">电池电流：</span>
                        <span class="val">20v</span>
                    </div>
                    <div>
                        <span class="label">温度2：</span>
                        <span class="val">80</span>
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
                                <div class="item" >
                                    <span class="name">电压{{num+1}}</span>
                                    <van-tag type="primary">{{subitem.dy}}</van-tag>
                                    <span class="unit" v-if="subitem.unit">V</span>
                                </div>
                                <div class="item">
                                    <span class="name">内阻{{num+1}}</span>
                                    <van-tag type="primary">{{subitem.nz}}</van-tag>
                                    <span class="unit" v-if="subitem.unit">V</span>
                                </div>
                                <div class="item">
                                    <span class="name">温度{{num+1}}</span>
                                    <van-tag type="primary">{{subitem.wd}}</van-tag>
                                    <span class="unit" v-if="subitem.unit">V</span>
                                </div>
                            </template>

                        </template>
                    </div>
                </van-collapse-item>
               <!--  <van-collapse-item title="2号电池组" name="2">
                    <div class="coll-list">
                        <div class="item" v-for="(item, index) in [1,2,3,4,5,6]" :key="index">
                            <span class="name">第{{item}}节电池电压</span>
                            <van-tag type="primary">22.3</van-tag>
                            <span class="unit" v-if="item">V</span>
                        </div>
                    </div>
                </van-collapse-item>
                <van-collapse-item title="3号电池组" name="3">
                    <div class="coll-list">
                        <div class="item" v-for="(item, index) in [1,2,3,4,5,6]" :key="index">
                            <span class="name">第{{item}}节电池电压</span>
                            <van-tag type="primary">82.3</van-tag>
                            <span class="unit" v-if="item">V</span>
                        </div>
                    </div>
                </van-collapse-item>
                <van-collapse-item title="4号电池组" name="4">
                    <div class="coll-list">
                        <div class="item" v-for="(item, index) in [1,2,3,4,5,6]" :key="index">
                            <span class="name">第{{item}}节电池电压</span>
                            <van-tag type="primary">12.3</van-tag>
                            <span class="unit" v-if="item">V</span>
                        </div>
                    </div>
                </van-collapse-item> -->
            </van-collapse>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeNames: ['1'],
            dataList: []
        };
    },
    components: {
    },
    created() {
        this.queryParam = this.$router.currentRoute.query;
        this.getDataList();
    },
    activated() {
        this.getDataList();
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
        },
        refresh() {
            this.getDataList();
        }
    }
};
</script>

<style scoped lang="scss">

.battery {
    padding-bottom: 100px;
    padding-top: 30px;
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
