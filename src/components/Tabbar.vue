
<template>
    <div class="tabbar">
        <van-tabbar route active-color="#00A0E8">
            <van-tabbar-item replace to="/home">
                <span>首页</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.active1 : icon.inactive1">
            </van-tabbar-item>
            <van-tabbar-item replace to="/warnrecord">
                <span>报警记录</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.active2 : icon.inactive2">
            </van-tabbar-item>

            <van-tabbar-item replace to="/my" >
                <span>我</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.active3 : icon.inactive3">
            </van-tabbar-item>

            <!-- <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item replace to="/warnrecord" icon="comment-o">报警记录</van-tabbar-item>
            <van-tabbar-item replace to="/my" icon="user-o">我</van-tabbar-item> -->
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            icon: {
                active1: require("../assets/icon-1-1.png"),
                inactive1: require("../assets/icon-1.png"),
                active2: require("../assets/icon-2-1.png"),
                inactive2: require("../assets/icon-2.png"),
                active3: require("../assets/icon-3-1.png"),
                inactive3: require("../assets/icon-3.png")
            }
        }
    },
    created() {},
    computed: {}
};
</script>
<style scoped lang="scss">
</style>
