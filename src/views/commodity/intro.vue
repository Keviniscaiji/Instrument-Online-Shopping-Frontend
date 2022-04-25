<template>

  <div class="app-container">

    <h2 style="text-align: center;">Add Commodity</h2>

      <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="Basic Info"/>
      <el-step title="Introduction"/>
      <el-step title="Final Publish"/>
    </el-steps>

    <el-form label-width="120px">

        <!-- 课程简介 TODO -->
        <el-form-item label="Introduction">
            <tinymce :height="300" v-model="commodityIntro.intro"/>
        </el-form-item>
    </el-form>
    <div>
        <el-button @click="previous">{{ $t('button.Back') }}</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">{{ $t('button.Continue') }}</el-button>
    </div>

  </div>
</template>
<script>
import commodity from '@/api/commodity'
import Tinymce from '@/components/Tinymce'
export default {
    components: { Tinymce },
    data() {
        return {
            saveBtnDisabled:false,
            commodityIntro:{
                id: '',
                intro: '',
            },
            commodityId: '',
        }
    },
    created() {
        this.init()
        //初始化所有讲师
        // this.getListTeacher()
        // //初始化分类
        // this.getSubjectTree()
    },
    watch: {  //监听
        $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
            this.commodityId = {}
            this.init()
        }
    },
    methods: {
        // 初始化
        init(){
             // 获取路由id值
            if(this.$route.params && this.$route.params.id) {
                this.commodityId = this.$route.params.id
                // console.log(this.courseId)
                //调用根据id查询课程的方法
                // this.subjectLevelOneChanged()
                this.commodityIntro.id = this.commodityId
                this.getInfo()
            } else {
                this.commodityIntro = {                
                    intro: '',
                }
                this.commodityIntro.id = this.commodityId
            }
        },
        //添加课程
        addIntro() {
            commodity.addIntro(this.commodityIntro)
                .then(response => {
                    
                    //提示
                    this.$message({
                        type: 'success',
                        message: 'Added Successful!'
                    });
                    //跳转到第二步
                    this.$router.push({path:'/commodity/publish/'+this.commodityId})
                })
        },
        // 获取回显数据
        getInfo(){
            console.log(this.commodityIntro)
            commodity.getIntro(this.commodityId)
                .then(response => {
                    console.log(response.data)
                    this.commodityIntro = response.data.intro
                })
        },
        
        saveOrUpdate() {
           //判断添加还是修改
           this.addIntro()
        },
      
        previous() {
            this.$router.push({path:'/commodity/basic/'+this.commodityId})
        },
        next() {
            //跳转到第二步
            this.saveOrUpdate()
            // this.$router.push({path:'/commodity/publish/'+this.commodityId})
        },
    },
}
</script>
<style scoped>
    .tinymce-container{
        line-height: 29px;
    }
</style>