<template>

  <div class="app-container">

    <h2 style="text-align: center;">Post Info</h2>

    <el-form label-width="120px">
        <el-form-item label="title"> 
            <el-input v-model="postInfo.title" placeholder="title"/>
        </el-form-item>
        <!-- 课程简介 TODO -->
        <el-form-item label="Introduction">
            <tinymce :height="300" v-model="postInfo.content"/>
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
            postInfo:{
                id: '',
                title: '',
                content: '',
            },
            postId: '',
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
            this.postId = {}
            this.init()
        }
    },
    methods: {
        // 初始化
        init(){
             // 获取路由id值
            if(this.$route.params && this.$route.params.id) {
                this.postId = this.$route.params.id
                // console.log(this.courseId)
                //调用根据id查询课程的方法
                // this.subjectLevelOneChanged()
                this.postInfo.id = this.postId
                this.getInfo()
            } else {
                this.postInfo = {                
                    content: '',
                }
                this.postInfo.id = this.postId
            }
        },
        //添加课程
        saveInfo() {
            post.saveInfo(this.postInfo)
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
            post.getInfo(this.postId)
                .then(response => {
                    console.log(response.data)
                    this.postInfo = response.data.info
                })
        },
        
        next() {
            //跳转到第二步
            this.saveInfo()()
            // this.$router.push({path:'/commodity/publish/'+this.commodityId})
        },
        back() {
            //跳转到第二步
            this.$router.push({path:'/post/list/'})
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