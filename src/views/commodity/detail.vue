<template>

  <div class="app-container">

    <h2 style="text-align: center;">Comment Detail</h2>


    <el-form label-width="120px">
        <!-- 课程简介 TODO -->
        <el-form-item label="Introduction">
            <tinymce :height="300" v-model="detail.content"/>
        </el-form-item>
    </el-form>
    <div>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">Save</el-button>
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
            detail:{
                id: '',
                content: '',
            },
            id: ''
        }
    },
    created() {
        this.init()
        //初始化所有讲师
        // this.getListTeacher()
        // //初始化分类
        // this.getSubjectTree()
    },
    methods: {
        // 初始化
        init(){
            this.id = this.$route.params.id
            // console.log(this.courseId)
            //调用根据id查询课程的方法
            // this.subjectLevelOneChanged()
            this.getInfo()
        },
        //添加课程
        addIntro() {
            commodity.editComment(this.detail)
                .then(response => {
                    //提示
                    this.$message({
                        type: 'success',
                        message: 'Added Successful!'
                    });
                    //跳转到第二步
                    this.$router.push({path:'/commodity/list/'})
                })
        },
        // 获取回显数据
        getInfo(){
            console.log(this.detail)
            commodity.getCommentDetail(this.id)
                .then(response => {
                    // console.log(response.data)
                    this.detail.id = response.data.detail.id
                    this.detail.content = response.data.detail.content
                })
        },
        
        saveOrUpdate() {
           //判断添加还是修改
           this.addIntro()
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