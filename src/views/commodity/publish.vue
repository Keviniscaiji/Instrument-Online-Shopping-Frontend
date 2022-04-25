<template>

  <div class="app-container">

    <h2 style="text-align: center;">Add Commodity</h2>

    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="Basic Info"/>
      <el-step title="Introduction"/>
      <el-step title="Final Publish"/>
    </el-steps>

    <div class="ccInfo">
      <img :src="commodityPublish.imageOss" />
      <div class="main">
        <h2>{{ commodityPublish.name }}</h2>
        <h3 class="red">￥{{ commodityPublish.price }}</h3>
      </div>
    </div>

    <div>
      <el-button @click="previous">{{ $t('button.BackToEdit') }}</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">{{ $t('button.Publish') }}</el-button>
    </div>
  </div>
</template>

<script>

import commodity from '@/api/commodity'
export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      commodityId: '',
      commodityPublish: {},
    }
    
  },

  created() {
    if(this.$route.params && this.$route.params.id){
      this.commodityId = this.$route.params.id
      this.getCommodityIdInfo()
    }
  },

  methods: {
    // 根绝课程id查询信息
    getCommodityIdInfo(){
        commodity.getBasicInfo(this.commodityId)
            .then(response => {
                this.commodityPublish = response.data.commodityBasicInfoDto
        })
    },
    previous() {
      this.$router.push({path:'/commodity/intro/'+this.commodityId})
    },

    publish() {
        this.$message({
              type: 'success',
              message: 'published successful!'
        });
        //跳转课程列表页面
        this.$router.push({ path: '/commodity/list' })  
    }
  }
}
</script>
<style scoped>
.ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
}
.ccInfo img {
    background: #d6d6d6;
    width: 400px;
    height: 300px;
    display: block;
    float: left;
    border: none;
}
.ccInfo .main {
    margin-left: 520px;
}

.ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}

.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
}
</style>