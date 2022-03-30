<template>

  <div class="app-container">

    <h2 style="text-align: center;">Post Comment Detail</h2>


    <el-form label-width="120px">
        <!-- 课程简介 TODO -->
        <el-form-item label="Introduction">
            <tinymce :height="300" v-model="detail.content"/>
        </el-form-item>
    </el-form>
    <div>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">Save</el-button>
        <el-button :disabled="saveBtnDisabled" type="warning" @click="back">Back</el-button>
    </div>

  </div>
</template>
<script>
import post from '@/api/post'
import Tinymce from '@/components/Tinymce'
export default {
    components: { Tinymce },
    data() {
        return {
            saveBtnDisabled:false,
            detail:{
                id: '',
                content: '',
                postId: '',
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
            post.editComment(this.detail)
                .then(response => {
                    //提示
                    this.$message({
                        type: 'success',
                        message: 'Added Successful!'
                    });
                    //跳转到第二步
                    this.$router.push({path:'/post/list/'})
                })
        },
        // 获取回显数据
        getInfo(){
            console.log(this.detail)
            post.getCommentDetail(this.id)
                .then(response => {
                    // console.log(response.data)
                    this.detail.postId = response.data.detail.postId
                    this.detail.id = response.data.detail.id
                    this.detail.content = response.data.detail.content
                })
        },
    
        next() {
            //跳转到第二步
            this.addIntro()
            // this.$router.push({path:'/commodity/publish/'+this.commodityId})
        },
          back() {
            //跳转到第二步
            this.$router.push({path:'/post/comment/' + this.detail.postId})
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