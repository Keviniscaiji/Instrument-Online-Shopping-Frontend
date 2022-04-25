<template>
    <div class="app-container">
        <h1>Order List</h1>
        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="User Id">
            <el-input v-model="orderQuery.userId" placeholder="userId"/>
        </el-form-item>
        <br/>

        <el-form-item label="Method">
            <el-select v-model="orderQuery.method" clearable placeholder="method">
            <el-option :value="0" label="PickUp"/>
            <el-option :value="1" label="Delivery"/>
            </el-select>
        </el-form-item>
        <br/>

        <el-form-item label="Status">
            <el-select v-model="orderQuery.status" clearable placeholder="status">
                <el-option :value="0" label="Normal"/>
                <el-option :value="1" label="Refound"/>
                <el-option :value="2" label="Change"/>
            </el-select>
        </el-form-item>
        <br/>

        <el-form-item label="Created Time">
            <el-date-picker
            v-model="orderQuery.begin"
            type="datetime"
            placeholder="choice startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
            />
        </el-form-item>
        <el-form-item>
            <el-date-picker
            v-model="orderQuery.end"
            type="datetime"
            placeholder="choice endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
            />
        </el-form-item>

        <el-button type="primary" icon="el-icon-search" @click="getList()">Search</el-button>
        <el-button type="default" @click="resetData()">Clear</el-button>
        </el-form>

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
         <el-table-column prop="id" label="orderId" width="200" />

        <el-table-column prop="addressId" label="addressId" width="200" />

        <el-table-column prop="userId" label="userId" width="200" />

        <el-table-column label="method" width="80">
            <template slot-scope="scope">
            {{ scope.row.method===1?'PickUp':'Delivery' }}
            </template>
        </el-table-column>
         <el-table-column label="status" width="80">
            <template slot-scope="scope">    
                <div v-if="scope.row.status === 0">Normal</div>
                <div v-if="scope.row.status === 1">Refound</div>
                <div v-if="scope.row.status === 2">Change</div>

            </template>
        </el-table-column>

        <el-table-column prop="gmtCreate" label="created Time" width="160"/>

        <el-table-column label="Operation" align="center">
            <template slot-scope="scope">
            <router-link :to="'/order/edit/'+scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit">{{ $t('button.ChangeAddress') }}</el-button>
            </router-link>
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
// user.js文件
import order from '@/api/order'
export default{
    // 写核心代码位置
    data() { // 定义变量和初始值
        return {
            list: [],
            page: 1,// 当前页
            limit: 10,
            total: 0,
            orderQuery: {}
        }
    },
    created() { // 页面渲染之前执行，一般调用methods的方法
        // 调用
        this.getList()
    },
    methods: { // 创建具体的方法，调用teacher.js的方法
        getList(page = 1){
            this.page = page
            // console.log(this.page)
            order.pageOrderListCondition(this.page, this.limit, this.orderQuery)
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
        resetData(){ // 清空
            // 1 清空表单输入项
            this.orderQuery = {}
            // 2 查询所有
            this.getList()
        },
        removeDataById(id){ 
            this.$confirm('This operation will permanently delete the file. Continue', 'warning', {
                confirmButtonText: 'confirm',
                cancelButtonText: 'cancel',
                type: 'warning'
            }).then(() => {
                order.deleteOrderById(id)
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