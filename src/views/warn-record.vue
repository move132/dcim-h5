
<template>
  <div>
    <van-nav-bar class="dc-topbar" fixed title="报警记录" />
    <div class="wrap">
        <van-tabs v-model="active" title-active-color="#00A0E8" color="#00A0E8" title-inactive-color="#333">
            <van-tab :title="noAcceptTotal">
                <Nodata v-if="noAcceptList.length ===0"></Nodata>
                <div class="warn-list" v-if="noAcceptList.length > 0">
                    <div class="item" v-for="(item, index) in noAcceptList" :key="index">
                        <div class="name">{{item.workDevice}}</div>
                        <div class="value"><span class="label">报警值：</span>{{item.workValue}}</div>
                        <div class="type"><span class="label">报警类型：</span>{{item.workType}}</div>
                        <div class="lv"><span class="label">报警等级：</span>{{item.workLevel}}</div>
                        <div class="date"><span class="label">报警时间：</span>{{item.workWartime}}</div>
                        <div class="btn-wrap tar">
                            <van-button v-if="user.accept" type="info" size="small" @click="acceptHandler(item)">受理</van-button>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab :title="acceptTotal">
                <Nodata v-if="acceptList.length ===0"></Nodata>
                <div class="warn-list" v-if="acceptList.length > 0">
                    <div class="item" v-for="(item, index) in acceptList" :key="index">
                        <div class="name">{{item.workDevice}}</div>
                        <div class="value"><span class="label">报警值：</span>{{item.workValue}}</div>
                        <div class="type"><span class="label">报警类型：</span>{{item.workType}}</div>
                        <div class="lv"><span class="label">报警等级：</span>{{item.workLevel}}</div>
                        <div class="date"><span class="label">报警时间：</span>{{item.workWartime}}</div>

                        <div class="solve-wrap">
                            <div><span class="label">受理人：</span>{{item.workAccuser}}</div>
                            <div><span class="label">受理时间：</span>{{item.workAcctime}}</div>
                        </div>

                        <div class="btn-wrap tar">
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
            </van-tab>
            <van-tab :title="solveTotal">
                <Nodata v-if="solveList.length ===0"></Nodata>
                <div class="warn-list" v-if="solveList.length > 0">
                    <div class="item" v-for="(item, index) in solveList" :key="index">
                        <div class="name">{{item.workDevice}}</div>
                        <div class="value"><span class="label">报警值：</span>{{item.workValue}}</div>
                        <div class="type"><span class="label">报警类型：</span>{{item.workType}}</div>
                        <div class="lv"><span class="label">报警等级：</span>{{item.workLevel}}</div>
                        <div class="date"><span class="label">报警时间：</span>{{item.workWartime}}</div>

                        <div class="solve-wrap">
                            <div><span class="label">受理人：</span>{{item.workAccuser}}</div>
                            <div><span class="label">受理时间：</span>{{item.workAcctime}}</div>
                            <div><span class="label">报警原因：</span>{{item.workCause}}</div>
                            <div><span class="label">处理办法：</span>{{item.workPattem}}</div>
                            <div class="solve-img" v-if="item.workAccimg">
                                <van-image class="van-img" fit="contain" :src="item.workAccimg" @click="imagePreview(item.workAccimg)"/>
                                <!-- <img :src="item.workAccimg" alt="" @click="imagePreview(item.workAccimg)"/> -->
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
     </div>
    <Tabbar></Tabbar>

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
            <van-uploader v-model="fileList" :before-read="beforeRead" multiple :max-count="1" />
        </div>
    </van-dialog>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar';
import Nodata from '@/components/Nodata';
import { ImagePreview } from 'vant';
export default {
    data() {
        return {
            user: {},
            active: 0,

            acceptTotal: "已受理(0)",
            solveTotal: "已解决(0)",
            noAcceptTotal: "待受理(0)",
            acceptList: [],
            noAcceptList:  [],
            solveList:  [],
           /*  列表字段解释:
            workAcctime:受理时间,
            workAccuser:受理人,
            workAccuserid:受理人编号,
            workCause:报警原因,
            workCode:工单标识号,
            workDepaid:参数编号,
            workDevice:设备名称,
            workDeviid:设备编号,
            workFirtime:首次报警时间,
            workId:工单编号,
            workLevel:报警等级,
            workMacrid:机房编号,
            workParam:参数名称,
            workRoom:机房名称,
            workState:处理状态,
            workType:报警类型,
            workValue:报警值,
            workWartime:报警时间" */

            cancelshow: false,
            solveshow: false,
            workCode: "",
            cancelmessage: "",
            solvemessage: "",
            workPattem: "",
            fileList: []
        };
    },
    components: {
        Tabbar,
        Nodata
    },
    created() {
        this.getWarnData();
    },
    computed: {

    },
    mounted() {
        let user = JSON.parse(localStorage.getItem("userDate"));
        this.user = user;
    },
    methods: {
        acceptHandler(item) {
            let user = JSON.parse(localStorage.getItem("userDate"));
            let param = {
                workCode: item.workCode,// 工单号标识
                workAccuserid: user.userId//  受理人编号(也是userId)
            }
            this.$dialog.confirm({
                message: '您是否确认受理本工单？'
            }).then(() => {
                this.post(`/ls_dcim/mobile/acceptWarnorder`, param).then(({data}) => {
                    this.$toast({
                        message: "受理成功",
                        duration: 400,
                        onClose: () => {
                            this.getWarnData();
                        }
                    })
                })
            }).catch(() => {

            });

        },
        getWarnData() { // 初始化数据
            let userId = this.$store.getters['login/userId'];
            this.get(`/ls_dcim/mobile/getAllWarnorder`, {userId: userId}).then(({data}) => {
                this.acceptTotal = "已受理("+data.acceptTotal+")";
                this.solveTotal = "已解决("+data.solveTotal+")";
                this.noAcceptTotal = "待受理("+data.noAcceptTotal+")";

                this.acceptList = data.acceptList;
                this.noAcceptList = data.noAcceptList;
                this.solveList = data.solveList;
            })
        },
        beforeClose(action, done) {
            // 阻止关闭弹框
            done(false);
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
                        this.getWarnData();
                    }
                })
            });
        },
        beforeRead(file) { // 图片格式处理
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
                            this.getWarnData();
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
                            this.getWarnData();
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
        },
        imagePreview(src) {
            ImagePreview([src]);
        }
    }
};
</script>

<style scoped lang="scss">
    .nodata {
        text-align: center;
        padding:30px 10px;
        color: #999;
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
    .warn-list{
        color:#333;
        .item {
            padding: 20px 20px 15px 20px;
            margin: 10px;
            border-radius: 4px;
            margin-bottom: 5px;
            background: #fff;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
            .name {
                margin-bottom: 5px;
            }
            div {
                margin-bottom: 4px;
                .label{

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
    .solve-img {
        img, .van-img {
            width: 50px;
            height: 50px;
            margin: 0 10px 5px 0;
        }
    }
</style>
