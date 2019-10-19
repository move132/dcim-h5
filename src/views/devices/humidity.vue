
<template>
    <div>
        <div class="humidity">
            <div class="humidity-list">
                <div
                    v-for="(item, index) in datalist"
                    :key="index"
                    :class="['item', {'error': item.warn === '1'}]"
                >
                    <div class="header">{{item.device.deviName}}</div>
                    <div class="info">
                        <span
                            v-for="(e, i) in item.dataList"
                            :key="i"
                            :class="[{'wsd': e.warn === '1'}]"
                        >{{e.name}}:{{e.value}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
export default {
    data() {
        return {
            datalist: []
        };
    },
    components: {
        Tabbar
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
        onClickLeft() {
            this.$router.go(-1);
        },
        getDataList() {
            let param = {
                isnoloading: true,
                macrId: this.queryParam.macrId, // 机房编号
                detyId: this.queryParam.detyId // 设备类型编号"
            };
            this.get(`/ls_dcim/mobile/getDeviceDateByParam`, param).then(
                ({ data }) => {
                    let tempdata = [];
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];
                        /* element.dataList =  [{
						"warn":"1",
						"prefix":"WD",
						"name":"温度",
						"value":"28.87"
					},
					{
						"warn":"0",
						"prefix":"SD",
						"name":"湿度",
						"value":"51.89"
					}] */
                        tempdata.push(element);
                    }
                    this.datalist = tempdata;
                }
            );
        },
        refresh() {
            this.getDataList();
        }
    }
};
</script>

<style scoped lang="scss">
.humidity {
    padding-bottom: 100px;
    padding-top: 30px;
}
.humidity-list {
    display: flex;
    flex-flow: wrap;
    .item {
        border-bottom: 1px solid #eee;
        text-align: center;
        margin: 5px;
        background: #fff;
        width: calc(50% - 10px);
        box-sizing: border-box;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        .header {
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            text-align: left;
            color: #fff;
            background: #03a9f5;
            padding: 7px;
        }
        .info {
            display: flex;
            padding: 15px 6px;
            justify-content: space-between;
        }
        .wsd {
            color: #e82f2f;
        }
        &.error {
            .header {
                color: #e82f2f;
                background: #eedadb;
            }
        }
    }
}
</style>
