<template>
    <div class="app-container">
        <h1>Commodity Like List</h1>

        <!-- 表格 -->
        <el-table
        :data="list"
        border
        fit
        highlight-current-row>

        <el-table-column
            label="Id"
            width="70"
            align="center">
            <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
            </template>
        </el-table-column>

       
        <el-table-column prop="userId" label="userId"  width="200"/>

         <el-table-column prop="commodityId" label="commodityId"  width="200"/>
      
        <el-table-column prop="gmtCreate" label="created Time" width="160"/>

        <el-table-column label="Operation" align="center">
            <template slot-scope="scope">
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">{{ $t('button.Delete') }}</el-button>
            </template>
        </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
        :current-page="page"
        :page-size="limit"
        :total="total"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        @current-change="getList"
        />
    </div>
</template>

<script>
// commodity.js文件
import commodity from '@/api/commodity'
export default{
    // 写核心代码位置
    data() { // 定义变量和初始值
        return {
            list: [],
            page: 1,// 当前页
            limit: 10,
            total: 0,
            id: ''
        }
    },
    created() { // 页面渲染之前执行，一般调用methods的方法
        // 调用
        this.id = this.$route.params.id
        this.getList()
    },
    methods: { // 创建具体的方法，调用teacher.js的方法
        getList(page = 1){
            this.page = page
            // console.log(this.page)
            commodity.getCommodityLikeList(this.id, this.page, this.limit)
                .then(response => {
                    // response接口返回的数据
                    // console.log(response)
                    this.list = response.data.rows
                    this.total = response.data.total
                    // console.log(this.list)
                    // console.log(this.total)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        removeDataById(id){ // 删除讲师的方法
            this.$confirm('This operation will permanently delete the file. Continue', 'warning', {
                confirmButtonText: 'confirm',
                cancelButtonText: 'cancel',
                type: 'warning'
            }).then(() => {
                commodity.deleteCommodityLike(id)
                .then(response => {
                    // 提示信息
                    this.$message({
                        type: 'success',
                        message: 'Deleted successfully!'
                    });
                   // 刷新页面
                   this.getList()
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: 'Service exceptions!'
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Cancelled delete'
                });          
            });
        }
    },
}
</script>

<style>

</style>