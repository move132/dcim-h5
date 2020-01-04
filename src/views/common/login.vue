<template>
    <section class="login cont_1" id="page1">
        <div class="top">
            <div class="top-text">
                <!-- <img src="~assets/logo.png" alt /> -->
                <img :src="logoUrl" alt />
                <!-- <p class="h1">数据中心综合管理平台</p> -->
            </div>
           <!--  <div class="h2">机房监控、容量管理、资产管理、运维管理</div> -->
           <div class="h2">数据中心综合管理平台</div>
           <div class="version">DCMS V2.0</div>
        </div>
        <div class="login-wrap">
            <!-- <div class="login-title">
                <div class="sysname">FY-DCIM 监控平台</div>
                <div class="title">登录账号</div>
            </div> -->
            <div class="list userNameBox">
                <i></i>
                <input class="username" type="text" placeholder="请输入用户名" v-model="username" autocomplete="off"/>
            </div>
            <div class="list passwordBox">
                <i></i>
                <input class="password" type="password" placeholder="请输入密码" v-model="password" autocomplete="off"/>
            </div>
           
            <div class="btnBox">
                <van-button color="#4D69F6" @click="loginBtn" size="small" style="width: 60%">登录</van-button>
            </div>
        </div>
        <div class="copyright">©上海锋盁信息技术有限公司版权所有</div>
    </section>
</template>

<script>
import { getUUID } from "@/utils/"
import logoUrl from "@/assets/logo.png"
export default {
    name: "login",
    data() {
        return {
            logoUrl: logoUrl,
            username: "",
            password: ""
        };
    },
    components: {},
    created() {
        // this.getLogo();
    },
    mounted() {},
    methods: {
        getLogo() {
            this.get("/ls_dcim/mobile/getLogo", {isnoloading: true}).then((data) => {
                this.logoUrl = data.data;
            });
        },
        loginBtn() {
            if (this.username === "" || this.password === "") {
                this.$toast("请输入账号或密码");
            } else {
                this.post("/ls_dcim/mobile/onLogin", {
                    userName: this.username,
                    password: this.password
                }).then(({data}) => {
                    data["token"] = getUUID();
                    data["userId"] = data.userId;
                    this.$store.commit("login/LOGIN", data);
                    const redirect = this.$route.query.redirect || "/home";
                    this.router.replace({ path: redirect });
                });
            }
        }
    }
};
</script>
<style scoped lang="scss">
.login {
    background: #191c2c url(~assets/login_bg.png) no-repeat center bottom;
    background-size: 100%;
    color: #fff;
    height: 100vh;
    .login-title {
        .sysname {
            font-size: 16px;
        }
        .title {
            font-size: 18px;
            margin: 10px 0 20px 0;
        }
    }
    .login-wrap {
        background: #fff;
        width: 70%;
        margin: 0 auto;
        padding: 40px 20px 30px 20px;
        border-radius: 5px;
    }
    .top {
        /* width: 90%; */
        margin: 0 auto;
        padding: 30px;
        box-sizing: border-box;
        .top-text {
            font-size: 18px;
            display: flex;
            justify-content: center;
            margin-bottom: 15px;
            .h1 {
                font-size: 18px;
                color: #019fe7;
                margin-bottom: 10px;
                margin-left: 15px;
            }
        }
        .h2 {
            font-size: 18px;
            color: #fff;
            text-align: center;
             margin-bottom: 10px;
        }
        .version {
            font-size: 12px;
            color: #fff;
            text-align: center;
        }
        img {
            width: 60px;
            vertical-align: middle;
        }
        p {
            margin: 0;
            font-size: 12px;
        }
    }
    .list {
        position: relative;
        margin-bottom: 18px;
        &.noborder {
            border: none;
            color: #999;
            margin-bottom: 15px;
            input {
                vertical-align: middle;
                margin-right: 4px;
            }
        }
        input.username,
        input.password {
            width: 100%;
            display: block;
            box-sizing: border-box;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 2px;
            padding: 10px;
            padding-right: 60px;
            color: #444;
        }
        i {
            position: absolute;
            display: block;
        }
    }
    .userNameBox {
        i {
            width: 16px;
            height: 18px;
            top: 50%;
            right: 10px;
            transform: translate(0, -50%);
            background: url("~assets/icon_user.png") no-repeat left center;
            background-size: contain;
        }
    }
    .passwordBox {
        i {
            width: 16px;
            height: 18px;
            top: 50%;
            right: 10px;
            transform: translate(0, -50%);
            background: url("~assets/icon_pass.png") no-repeat left center;
            background-size: contain;
        }
    }
    .btnBox {
        margin-top: 28px;
        text-align: center;
        .van-button--small {
            height: 40px;
            line-height: 38px;
        }
    }
}

.copyright {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
    color: #ddd;
}


</style>
