
<template>
    <div>
        <div class="user-wrap">
            <div class="img">
                <!-- <img src="../assets/user.jpg" alt /> -->
                <img :src="userimg" alt="头像" />
                <!-- <van-image style="width: 56px; height: 56px;" fit="contain"  :src="userimg" /> -->
            </div>
            <div class="user-info">
                <div class="user-name">{{user.userName}}</div>
                <div>
                    <!-- <span class="usernumber">{{userRoleids}}</span> -->
                    <span class="usernumber">{{user.userLoginname}}</span>
                </div>
            </div>
        </div>

        <van-cell-group class="mgb512">
            <van-cell is-link @click="myAccept">
                <template slot="title">
                    <span class="custom-title">我受理的警报</span>
                    <van-tag type="danger" round v-if="orderNum > 0">{{orderNum}}</van-tag>
                </template>
            </van-cell>
        </van-cell-group>
        <van-cell-group class="mgb512">
            <van-cell title="切换用户" clickable @click="toggleUser" />
        </van-cell-group>
        <van-cell-group>
            <van-cell title="退出登录" clickable @click="logout" />
        </van-cell-group>

        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
export default {
    name: "my",
    data() {
        return {
            user: {},
            userLoginname: "",
            userRoleids: "",
            userimg: "",
            orderNum: 0
        }
    },
    components: {
        Tabbar
    },
    created() {
        this.getUserinfo();
    },
    computed: {},
    methods: {
        getUserinfo() {
            let user = JSON.parse(localStorage.getItem("userDate"));
            this.get(`/ls_dcim/mobile/getUsersInfo`,{userId: user.userId}).then(({data}) => {
                this.user = data.user;
                this.userimg = data.user.headPath;
                this.orderNum = data.orderNum;
                this.userLoginname = data.user.userLoginname;
                this.userRoleids = data.user.userRoleids
            })
        },
        myAccept() {
            this.$router.push({ name: "myaccept" });
        },
        toggleUser() {
            this.$toast.loading({
                className: "http-toast",
                duration: 1000, // 持续展示 t
                forbidClick: true // 禁用背景点击
            });
            localStorage.removeItem("token")
            localStorage.removeItem("userDate")
            setTimeout(() =>{
                this.$router.push({ name: "login" });
            } ,1500)
        },
        logout() {
            this.$dialog.confirm({
                message: '您是否确认要退出?'
            }).then(() => {
                this.$toast.loading({
                    className: "http-toast",
                    duration: 1000, // 持续展示 t
                    forbidClick: true // 禁用背景点击
                });
                localStorage.removeItem("token")
                localStorage.removeItem("userDate")
                setTimeout(() =>{
                    this.$router.push({ name: "login" });
                } ,1500)
            })
        }
    }
};
</script>

<style scoped lang="scss">
.user-wrap {
    display: flex;
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 15px;
    align-items: center;
    .img {
        width: 56px;
        height: 56px;
        line-height: 56px;
        overflow: hidden;
        border-radius: 50%;
        img {
            width: 56px;
            height: 56px;
            vertical-align: middle;
        }
    }
    .user-info {
        margin-left: 15px;
        justify-content: center;
        display: flex;
        flex-direction: column;
        .user-name {
            margin-bottom: 5px;
        }
        .usernumber {
            margin-right: 8px;
        }
    }
}
.custom-title {
    margin-right: 10px;
}
</style>
