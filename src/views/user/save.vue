<template>
    <div class="app-container">
        <h1>Add User</h1>
        <el-form label-width="120px">
            <el-form-item label="username">
                <el-input v-model="user.username"/>
            </el-form-item>
              <el-form-item label="email">
                <el-input v-model="user.email"/>
            </el-form-item>
            <el-form-item label="avtive">
                <el-select v-model="user.isActive" clearable placeholder="please choice">
                    <el-option :value="false" label="notActive"/>
                    <el-option :value="true" label="isActive"/>
                </el-select>
            </el-form-item>
            <el-form-item label="password">
                <el-input v-model="user.password" type="password"/>
             </el-form-item>
            <el-form-item label="signature">
                <el-input v-model="user.signature" :rows="10" type="textarea"/>
            </el-form-item>

            <!-- 讲师头像：TODO -->
            <!-- 讲师头像 -->
        <el-form-item label="avatar">
            <!-- 头衔缩略图 -->
            <pan-thumb :image="user.avatar"/>
            <!-- 文件上传按钮 -->
            <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true"> {{ $t('button.ChangeAvatar') }}
            </el-button>
            <!--
            v-show：是否显示上传组件
            :key：类似于id，如果一个页面多个图片上传控件，可以做区分
            :url：后台上传的url地址
            @close：关闭上传组件
            @crop-upload-success：上传成功后的回调 
                <input type="file" name="file"/>
            -->
            <image-cropper
                    v-show="imagecropperShow"
                    :width="300"
                    :height="300"
                    :key="imagecropperKey"
                    :url="BASE_API+'/oss/fileoss'"
                    field="file"
                    @close="close"
                    @crop-upload-success="cropSuccess"/>
        </el-form-item>


            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate"> {{ $t('button.Save') }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import user from '@/api/user';
    import ImageCropper from '@/components/ImageCropper'
    import PanThumb from '@/components/PanThumb'

    export default{
        components: { ImageCropper, PanThumb },
        data() {
            return {
                user:{
                    // 属性，不加也可以，可以设置默认值
                    name: '',
                    sort: 0,
                    level: 1,
                    career: '',
                    intro: '',
                    avatar: ''
                },
                // 上传弹框组件是否显示
                imagecropperShow: false,
                imagecropperKey: 0, // 上传组件key值
                BASE_API: process.env.BASE_API, //获取dev.env的端口号
                saveBtnDisabled: false  // 保存按钮是否禁用,
            }
        },
        created() { //页面渲染之前执行
            this.init()
        },
        watch: {  //监听
            $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
                this.init()
            }
        },
        methods: {
            close(){ // 关闭上传框的方法
                this.imagecropperShow = false
                // 上传组件初始化
                this.imagecropperKey = this.imagecropperKey + 1
            },
            cropSuccess(data){ // 成功上传方法
                this.imagecropperShow = false
                // 上传成功后返回地址
                console.log(data.url)
                this.user.avatar = data.url
                this.imagecropperKey = this.imagecropperKey + 1
            }, 
            init(){
                if(this.$route.params && this.$route.params.id) {
                    //从路径获取id值
                    const id = this.$route.params.id
                    //调用根据id查询的方法
                    this.getInfo(id)
                } else { //路径没有id值，做添加
                    //清空表单
                    this.user = {}
                    this.user.avatar = ""
                }
            },
            // 根据userid查询的方法
            getInfo(id){
                user.getUserInfo(id)
                    .then(response => {
                        this.user = response.data.user
                    })
                    .catch(error => {
                        this.$message({
                            type: "error",
                            message: "Service exceptions"
                        })
                    })
            },
            saveOrUpdate(){
                // 判断是修改还是添加
                if (this.user.id){
                    // 修改
                    this.updateUser()
                }else{
                    // 添加
                    this.saveUser()
                }
            },
            // 修改user的方法
            updateUser(){
                console.log(this.user)
                user.updateUser(this.user)
                    .then(response => {
                        // 修改成功
                        this.$message({
                            type: "success",
                            message: "Successfully changed!"
                        })
                        // 返回列表页面 路由跳转
                        this.$router.push({path:'/user/list'})
                    }).catch(error => {
                        this.$message({
                            type: "error",
                            message: "Failure to modify"
                        })
                    })
            },
            // 添加user的方法
            saveUser(){
                user.addUser(this.user)
                    .then(response => {
                        // 添加成功
                        this.$message({
                            type: "success",
                            message: "添加成功!"
                        })
                        // 返回列表页面 路由跳转
                        this.$router.push({path:'/user/list'})
                    })
                    .catch(error => {
                        this.$message({
                            type: "error",
                            message: "添加失败"
                        })
                    })
            }
        },
    }
</script>

<style>

</style>