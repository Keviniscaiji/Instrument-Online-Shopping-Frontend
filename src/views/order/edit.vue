<template>
    <div class="app-container">
        <h1>Edit Address</h1>
        <el-form label-width="120px">
            <el-form-item label="username">
                <el-input v-model="address.userId" readonly=""/>
            </el-form-item>
              <el-form-item label="address1">
                <el-input v-model="address.address1"/>
            </el-form-item>
            <el-form-item label="address2">
                <el-input v-model="address.address2"/>
             </el-form-item>
            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="changeAddress">{{ $t('button.Confirm') }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import order from '@/api/order';
    export default{
        data() {
            return {
                address:{
                    // 属性，不加也可以，可以设置默认值
                    id: '',
                    userId: '',
                    nationId: '',
                    address1: '',
                    address1: '',
                },
                id: '',
                saveBtnDisabled: false  // 保存按钮是否禁用,
            }
        },
        created() { //页面渲染之前执行
            // console.log('111')
            this.init()
        },
        methods: {
            init(){
                if(this.$route.params && this.$route.params.id) {
                    //从路径获取id值
                    // const id = this.$route.params.id
                    this.id = this.$route.params.id
                    //调用根据id查询的方法
                    // console.log('222')
                    this.getInfo(this.id)
                } else { //路径没有id值，做添加
                    //清空表单
                    this.address = {}
                }
            },
            // 根据userid查询的方法
            getInfo(id){
                order.selectById(id)
                    .then(response => {
                        this.address = response.data.address
                    })
                    .catch(error => {
                        this.$message({
                            type: "error",
                            message: "Service exceptions"
                        })
                    })
            },
            changeAddress(){
                order.addAddress(this.address, this.id)
                    .then(response => {
                        // 添加成功
                        this.$message({
                            type: "success",
                            message: "添加成功!"
                        })
                        // 返回列表页面 路由跳转
                        this.$router.push({path:'/order/list'})
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