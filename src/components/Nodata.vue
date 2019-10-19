<template>
    <div :class="['nodata', {[classname]: classname}]">
        <img src="~/assets/no-data.png" alt />
        <p>暂无数据</p>
    </div>
</template>

<script>
export default {
    props: {
        classname: {
            type: String,
            default: ""
        }
    },
    created() {},
    computed: {}
};
</script>
<style scoped lang="scss">
.nodata {
    text-align: center;
    padding: 30px 10px;
    color: #999;
    width: 100%;
    box-sizing: border-box;
}
</style>
