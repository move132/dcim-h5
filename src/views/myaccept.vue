
<template>
    <div>
        <van-nav-bar class="dc-topbar" title="我受理的报警" fixed left-arrow @click-left="onClickLeft" />
        <div class="wrap">
            <Nodata v-if="warnList.length === 0"></Nodata>
            <div class="warn-list" v-if="!isnodata">
                <div class="item" v-for="(item, index) in warnList" :key="index">
                    <div class="name">{{item.workDevice}}</div>
                    <div class="value">
                        <span class="label">报警值：</span>{{item.workValue}}
                    </div>
                    <div class="type">
                        <span class="label">报警类型：</span>{{item.workType}}
                    </div>
                    <div class="lv">
                        <span class="label">报警等级：</span>{{item.workLevel}}
                    </div>
                    <div class="date">
                        <span class="label">报警时间：</span>{{item.workWartime}}
                    </div>
                    <div class="solve-wrap">
                        <div>
                            <span class="label">受理人：</span>{{item.workAccuser}}
                        </div>
                        <div>
                            <span class="label">受理时间：</span>{{item.workAcctime}}
                        </div>
                    </div>
                    <div class="btn-wrap tar">
                        <!-- <van-button
                            @click="cancelHandler(item)"
                            style="margin-right: 15px;"
                            type="info"
                            size="small"
                        >取消受理</van-button>
                        <van-button :disabled="item.workState === '转厂商' ? true : false" style="margin-right: 15px;" type="info" size="small" @click="vendorHandler(item)">转厂商</van-button>
                        <van-button @click="solveHandler(item)" type="info" size="small">已解决</van-button> -->

                        <van-button
                            v-if="user.cancel"
                            @click="cancelHandler(item)"
                            style="margin-right: 15px;"
                            type="info"
                            size="small"
                        >取消受理</van-button>
                        <van-button
                            v-if="user.turn"
                            :disabled="item.workState === '转厂商' ? true : false"
                            style="margin-right: 15px;"
                            type="info"
                            size="small"
                            @click="vendorHandler(item)">转厂商</van-button>
                        <van-button
                            v-if="user.solve"
                            @click="solveHandler(item)"
                            type="info"
                            size="small">已解决</van-button>
                    </div>
                </div>
            </div>
        </div>


        <van-dialog
            v-if="cancelshow"
            v-model="cancelshow"
            title="取消受理"
            @confirm="caseConfirm"
            @cancel="cancelshow=!cancelshow"
            :before-close="beforeClose"
            show-cancel-button
        >
            <div class="fild-lable">未解决原因</div>
            <div class="reset-panel">
                <van-field v-model="cancelmessage" type="textarea" placeholder="请输入" rows="2" />
            </div>
        </van-dialog>
        <van-dialog
            v-if="solveshow"
            v-model="solveshow"
            title="已解决"
            @confirm="solveConfirm"
            @cancel="solveshow=!solveshow"
            :before-close="beforeClose"
            show-cancel-button
        >
            <div class="fild-lable">报警原因</div>
            <div class="reset-panel">
                <van-field v-model="solvemessage" :readonly="true" type="textarea" placeholder="请输入" rows="2" />
            </div>
            <div class="fild-lable">处理办法</div>
            <div class="reset-panel">
                <van-field v-model="workPattem" type="textarea" placeholder="请输入" rows="2" />
            </div>
            <div class="fild-lable">上传图片</div>
            <div class="file-wrap">
                <van-uploader v-model="fileList" :before-read="beforeRead" multiple :max-count="3" />
            </div>
        </van-dialog>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import Nodata from '@/components/Nodata';
export default {
    data() {
        return {
            active: 0,
            cancelshow: false,
            solveshow: false,
            workCode: "",
            cancelmessage: "",
            solvemessage: "",
            workPattem: "",
            fileList: [],
            isnodata: false,
            warnList: []
        };
    },
    components: {
        Tabbar,
        Nodata
    },
    created() {
        this.getWarnorder();
    },
    computed: {},
    mounted() {
        let user = JSON.parse(localStorage.getItem("userDate"));
        this.user = user;
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        getWarnorder() {
            var param = {
                userId: JSON.parse(localStorage.getItem("userDate")||{}).userId
            }

            this.get(`/ls_dcim/mobile/getUsersInfo`,param).then(({data}) => {
                this.warnList = data.orderList;
            }).catch(({data}) => {
                this.isnodata = true;
            });
        },
        beforeClose(action, done) {
            // 阻止关闭弹框
            done(false);
        },
        caseConfirm(e) {
            this.post("/mock/5cb48c7ed491cd741c54456f/base/login", {
                username: 222,
                password: 333
            }).then(data => {
                if (data.code === 0) {
                    this.cancelshow = false;
                }
            });
        },
        solveConfirm() {  // 已解决
            if (this.workPattem === "") {
                this.$toast("请填写处理办法");
                return;
            }
            let user = JSON.parse(localStorage.getItem("userDate"));
            let param = {
                workCode: this.workCode,// 工单号标识
                workAccuserid: user.userId,//  受理人编号(也是userId)
                workPattem: this.workPattem,
                fileName: this.fileList[0] && this.fileList[0].file.name,
                base64Data: this.fileList[0] && this.fileList[0].content
                /* fileList: this.fileList */
            }
            this.post("/ls_dcim/mobile/resolveWarnorder", param).then(data => {
                this.solveshow = false;
                this.$toast({
                    message: "已解决成功",
                    duration: 400,
                    onClose: () => {
                        this.getWarnorder();
                    }
                })
            });
        },
        beforeRead(file) {
            let filetype = ["image/png", "image/jpeg"]
            if (filetype.indexOf(file.type) == -1) {
                this.$toast("请上传 jpg、png 格式图片");
                return false;
            }
            console.log(file)
            return true;
        },
        cancelHandler(item) { // 取消受理
            let user = JSON.parse(localStorage.getItem("userDate"));
            let param = {
                workCode: item.workCode,// 工单号标识
                workAccuserid: user.userId//  受理人编号(也是userId)
            }
            this.$dialog.confirm({
                message: '您是否确认取消受理本工单?'
            }).then(() => {
                this.post(`/ls_dcim/mobile/cancelWarnorder`, param).then(({data}) => {
                    this.$toast({
                        message: "取消成功",
                        duration: 400,
                        onClose: () => {
                            this.getWarnorder();
                        }
                    })
                })
            })
        },
        vendorHandler(item) { // 转厂商
            let user = JSON.parse(localStorage.getItem("userDate"));
            let param = {
                workCode: item.workCode,// 工单号标识
                workAccuserid: user.userId//  受理人编号(也是userId)
            }
            this.$dialog.confirm({
                message: '您是否确认转厂商？'
            }).then(() => {
                this.post(`/ls_dcim/mobile/turnWarnorder`, param).then(({data}) => {
                    this.$toast({
                        message: "转厂商成功",
                        duration: 400,
                        onClose: () => {
                            this.getWarnorder();
                        }
                    })
                })
            })
        },
        solveHandler(item) {
            this.solvemessage = "";
            this.workPattem = "";
            this.fileList = [];
            this.solveshow = !this.solveshow;
            this.workCode = item.workCode;
            this.$nextTick(()=>{
                this.solvemessage = item.workCause;
            })
        }
    }
};
</script>

<style scoped lang="scss">
.nodata {
    text-align: center;
    padding: 30px 10px;
    color: #999;
}
.border {
    border: 1px solid red !important;
}
.fild-lable {
    padding-left: 15px;
    margin: 10px 0 0 0;
    font-size: 14px;
    color: #333;
}
.file-wrap {
    padding-left: 16px;
    margin-top: 10px;
}
.wrap {
    padding-top: 50px;
    padding-bottom: 100px;
}
.warn-list {
    color: #333;
    .item {
        padding: 20px 20px 15px 20px;
        margin-bottom: 5px;
        background: #fff;
        .name {
            margin-bottom: 5px;
        }
        div {
            margin-bottom: 4px;
            .label {
            }
        }
        .btn-wrap {
            margin: 10px 0 0 0;
        }
        .solve-wrap {
            margin-top: 20px;
            color: #999;
        }
        .detaillink {
            margin-top: 10px;
            a {
                color: #999;
                text-decoration: underline;
            }
        }
    }
}
</style>
