<template>
<!-- 门禁 -->
    <div class="control">
        <ul class="control-list">
            <li class="control-item" v-for="(item, index) in dataList" :key="index">
                <p>{{item.doreOpertime}}</p>
                <p>
                    <span>{{item.doreName}}</span>
                   {{item.doreOper}} {{item.doreDoorname}}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
             this.get(`/ls_dcim/mobile/getAllDoorRecode`, param).then(({ data }) => {
                this.dataList = data;
            });
        }
    }
};
</script>

<style scoped lang="scss">

.control {
    padding-top: 10px;
}
.control-item {
    background: #fff;
    padding: 10px;
    border-bottom: 1px solid #eee;
    p {
        margin: 5px 0;
    }
}
</style>
