<template>

  <div class="app-container">

    <h2 style="text-align: center;">Add Commodity</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="Basic Info"/>
      <el-step title="Introduction"/>
      <el-step title="Final Publish"/>
    </el-steps>

    <el-form label-width="120px">

        <el-form-item label="name">
            <el-input v-model="commodityBasicInfoDto.name" placeholder=" eg: Yamaha spruce guitar"/>
        </el-form-item>



          <el-form-item label="Type">
            <el-select v-model="commodityBasicInfoDto.type" clearable placeholder="type">
            <el-option :value="0" label="Pipes"/>
            <el-option :value="1" label="Electronic"/>
            <el-option :value="2" label="Precussion"/>
            <el-option :value="3" label="Piano"/>
            <el-option :value="4" label="Guitar"/>
            <el-option :value="5" label="Others"/>
            </el-select>
        </el-form-item>


        <!-- 课程封面-->
        <el-form-item label="Cover">

            <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :action="BASE_API+'/oss/fileoss'"
                class="avatar-uploader">
                <img :src="commodityBasicInfoDto.imageOss">
            </el-upload>

        </el-form-item>

        <el-form-item label="price">
            <el-input-number :min="0" v-model="commodityBasicInfoDto.price" controls-position="right" placeholder="price"/> $
        </el-form-item>

        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">Save And Next</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import commodity from '@/api/commodity'
export default {
    // components: { Tinymce },
    data() {
        return {
            saveBtnDisabled:false,
            commodityBasicInfoDto:{
                id: '',
                name: '',
                price: 0,
                amount: 0,
                type: 0,
                imageOss: "https://qintong-edu.oss-cn-beijing.aliyuncs.com/icon/%E5%B1%81%E5%8F%AF%E7%8C%AA1.jpg",
            },
            // description:'',
            commodityId: '',
            BASE_API: process.env.BASE_API, // 接口API地址   
        }
    },
    created() {
        this.init()
    },
    watch: {  //监听
        $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
            this.commodityBasicInfoDto = {}
            this.init()
        }
    },
    methods: {
        // 初始化
        init(){
             // 获取路由id值
            if(this.$route.params && this.$route.params.id) {
                this.commodityId = this.$route.params.id
                this.getInfo()
            } else {
                this.commodityBasicInfoDto = {
                    name: '',
                    price: 0,
                    amount: 0,
                    type: 0,
                    imageOss: "https://qintong-edu.oss-cn-beijing.aliyuncs.com/icon/%E5%B1%81%E5%8F%AF%E7%8C%AA1.jpg"
                }
            }
        },
        //添加商品
        addCommodity() {
            commodity.addBasicInfo(this.commodityBasicInfoDto)
                .then(response => {
                    //提示
                    this.$message({
                        type: 'success',
                        message: 'Added Successful!'
                    });
                    //跳转到第二步
                    console.log(response)
                    this.$router.push({path:'/commodity/intro/'+response.data.commodityId})
                })
        },
        // 获取回显数据
        getInfo(){
            commodity.getBasicInfo(this.commodityId)
                .then(response => {
                    // console.log(response)
                    this.commodityBasicInfoDto = response.data.commodityBasicInfoDto
                })
        },
        //修改课程
        updateCommodity() {
            commodity.updateBasicInfo(this.commodityBasicInfoDto, this.commodityId)
                .then(response => {
                     //提示
                    this.$message({
                        type: 'success',
                        message: 'Edit successful!'
                    });
                    //跳转到第二步
                    this.$router.push({path:'/commodity/intro/'+this.commodityId})
                })
        },
        saveOrUpdate() {
           //判断添加还是修改
           if(!this.commodityId) {
               //添加
               this.addCommodity()
           } else {
               this.updateCommodity()
           }
        },
        // 上传页面成功调用的方法
        handleAvatarSuccess(res, file){
            this.commodityBasicInfoDto.imageOss = res.data.url
        },
        // 上传之前调用的方法
        beforeAvatarUpload(file){
            let type = file.type.substring(0, file.type.lastIndexOf('/'))
            // console.log(type)
            // const isJPG = file.type === 'image/jpg'
            const isPic = type === 'image'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isPic) {
                this.$message.error('上传头像图片只能是 图片 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isPic && isLt2M
        }
    },
}
</script>
<style scoped>
    .tinymce-container{
        line-height: 29px;
    }
</style>