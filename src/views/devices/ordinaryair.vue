<template>
    <!-- 普通空调 -->
    <div class="power">
        <div class="power-header">运行参数</div>
        <div class="power-list">
            <div class="item" v-for="(item, index) in dataList" :key="index">
                <span class="name">{{item.name}}</span>
                <van-tag type="primary">运行</van-tag>
                <span v-if="item.unit">{{item.unit}}</span>
            </div>
        </div>
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
                deviId: this.queryParam.deviId // 设备编号
            };
            this.get(`/ls_dcim/mobile/getDeviceDataByDeviId`, param).then(({data}) => {
                this.dataList = data.runParamList;
            })
        }
    }
};
/* "{
 ""msg"":""获取数据成功"",
 ""code"":200,
 ""data"":{
  ""warnStatuList"":[
   {
    ""unit"":"""",
    ""vname"":""K725"",
    ""prefix"":"""",
    ""name"":""加热器过热报警 "",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K726"",
    ""prefix"":"""",
    ""name"":""加湿淤塞报警 "",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K727"",
    ""prefix"":"""",
    ""name"":""漏水报警"",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K728"",
    ""prefix"":"""",
    ""name"":""火灾报警"",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K729"",
    ""prefix"":"""",
    ""name"":""水流报警 "",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K730"",
    ""prefix"":"""",
    ""name"":""风机过载报警"",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K731"",
    ""prefix"":"""",
    ""name"":""空气流量低报警"",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K732"",
    ""prefix"":"""",
    ""name"":""过滤网堵报警 "",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K733"",
    ""prefix"":"""",
    ""name"":""压缩机低压报警"",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K734"",
    ""prefix"":"""",
    ""name"":""压缩机高压报警"",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K735"",
    ""prefix"":"""",
    ""name"":""压缩机过载"",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K737"",
    ""prefix"":"""",
    ""name"":""风机过载报警"",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K738"",
    ""prefix"":"""",
    ""name"":""氟泵低压报警"",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K739"",
    ""prefix"":"""",
    ""name"":""氟泵过流报警"",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K736"",
    ""prefix"":"""",
    ""name"":""氟泵过热报警"",
    ""suffix"":"""",
    ""value"":""0""
   }
  ],
  ""branchParamList"":[],
  ""runParamList"":[
   {
    ""unit"":""℃"",
    ""vname"":""K701"",
    ""prefix"":"""",
    ""name"":""回风温度"",
    ""suffix"":"""",
    ""value"":""24.89""
   },
   {
    ""unit"":""%"",
    ""vname"":""K702"",
    ""prefix"":"""",
    ""name"":""回风湿度"",
    ""suffix"":"""",
    ""value"":""49.76""
   },
   {
    ""unit"":"""",
    ""vname"":""K703"",
    ""prefix"":"""",
    ""name"":""温度高限"",
    ""suffix"":"""",
    ""value"":""30.00""
   },
   {
    ""unit"":"""",
    ""vname"":""K704"",
    ""prefix"":"""",
    ""name"":""温度低限"",
    ""suffix"":"""",
    ""value"":""15.00""
   },
   {
    ""unit"":"""",
    ""vname"":""K705"",
    ""prefix"":"""",
    ""name"":""湿度高限"",
    ""suffix"":"""",
    ""value"":""80.00""
   },
   {
    ""unit"":"""",
    ""vname"":""K706"",
    ""prefix"":"""",
    ""name"":""湿度低限"",
    ""suffix"":"""",
    ""value"":""30.00""
   },
   {
    ""unit"":""℃"",
    ""vname"":""K707"",
    ""prefix"":"""",
    ""name"":""温度设定值"",
    ""suffix"":"""",
    ""value"":""20.00""
   },
   {
    ""unit"":""%"",
    ""vname"":""K708"",
    ""prefix"":"""",
    ""name"":""湿度设定值"",
    ""suffix"":"""",
    ""value"":""50.00""
   }
  ],
  ""unitStatuList"":[
   {
    ""unit"":""%"",
    ""vname"":""K709"",
    ""prefix"":"""",
    ""name"":""风机输出"",
    ""suffix"":"""",
    ""value"":""66.07""
   },
   {
    ""unit"":""%"",
    ""vname"":""K710"",
    ""prefix"":"""",
    ""name"":""制冷输出"",
    ""suffix"":"""",
    ""value"":""72.00""
   },
   {
    ""unit"":""%"",
    ""vname"":""K711"",
    ""prefix"":"""",
    ""name"":""制热输出"",
    ""suffix"":"""",
    ""value"":""22.80""
   },
   {
    ""unit"":""%"",
    ""vname"":""K712"",
    ""prefix"":"""",
    ""name"":""加湿输出 "",
    ""suffix"":"""",
    ""value"":""68.95""
   },
   {
    ""unit"":"""",
    ""vname"":""K716"",
    ""prefix"":"""",
    ""name"":""加湿阀"",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K717"",
    ""prefix"":"""",
    ""name"":""加热器一"",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K718"",
    ""prefix"":"""",
    ""name"":""加热器二"",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K719"",
    ""prefix"":"""",
    ""name"":""加热器三"",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K720"",
    ""prefix"":"""",
    ""name"":""除湿模式"",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K721"",
    ""prefix"":"""",
    ""name"":""压缩机"",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K723"",
    ""prefix"":"""",
    ""name"":""室外风机"",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K724"",
    ""prefix"":"""",
    ""name"":""压缩机阀"",
    ""suffix"":"""",
    ""value"":""0""
   }
  ],
  ""runStatuList"":[
   {
    ""unit"":"""",
    ""vname"":""K713"",
    ""prefix"":"""",
    ""name"":""开关机状态  "",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K714"",
    ""prefix"":"""",
    ""name"":""风机状态 "",
    ""suffix"":"""",
    ""value"":""0""
   },
   {
    ""unit"":"""",
    ""vname"":""K722"",
    ""prefix"":"""",
    ""name"":""除湿"",
    ""suffix"":"""",
    ""value"":""0""
   }
  ]
 }
}" */

/* "warnStatuList:报警状态参数列表
 unit:参数单位
 vname:参数变量名称
 prefix:参数前缀
 name:参数名
 suffix:参数后缀
 value:参数值(1 或者 1.0为断开  0 或者 0.0为闭合)
branchParamList:支路参数(你用不到的字段)
runParamList:运行参数列表
 unit:参数单位
 vname:参数变量名称
 prefix:参数前缀
 name:参数名
 suffix:参数后缀
 value:参数值(设备类型为配电柜开关时 (1 或者 1.0为断开 0 或者 0.0为闭合))
unitStatuList:部件状态参数列表
 unit:参数单位
 vname:参数变量名称
 prefix:参数前缀
 name:参数名
 suffix:参数后缀
 value:参数值(1 或者 1.0为断开  0 或者 0.0为闭合)
runStatuList:运行状态参数列表
 unit:参数单位
 vname:参数变量名称
 prefix:参数前缀
 name:参数名
 suffix:参数后缀
 value:参数值(1 或者 1.0为断开  0 或者 0.0为闭合)"
 */
</script>

<style scoped lang="scss">

.power {
    padding-bottom: 100px;
    padding-top: 21px;
}
.power-header {
    padding: 10px;
    background: #00A0E9;
    color: #fff;
    text-align: center;
}
.power-list {
    overflow: hidden;
    background: #fff;
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
        width: 60%;
    }
    .unit {
        color: #999;
    }
}
</style>
