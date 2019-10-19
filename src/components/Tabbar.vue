<template>
    <div class="tabbar">
        <van-tabbar route active-color="#00A0E8">
            <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item replace to="/warnrecord" icon="comment-o">报警记录</van-tabbar-item>
            <van-tabbar-item replace to="/my" icon="user-o">我</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    created() {},
    computed: {}
};
</script>
<style scoped lang="scss">
</style>
