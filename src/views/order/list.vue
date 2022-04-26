<template>
    <div class="app-container">
        <h1>{{$t('text.OrderList')}}</h1>
        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
        <el-form-item :label="$t('text.UserId')">
            <el-input v-model="orderQuery.userId" :placeholder="$t('text.UserId')"/>
        </el-form-item>
        <br/>

        <el-form-item :label="$t('text.Method')">
            <el-select v-model="orderQuery.method" clearable :placeholder="$t('text.Method')">
            <el-option :value="0" :label="$t('text.Method1')"/>
            <el-option :value="1" :label="$t('text.Method2')"/>
            </el-select>
        </el-form-item>
        <br/>

        <el-form-item :label="$t('text.Status')">
            <el-select v-model="orderQuery.status" clearable :placeholder="$t('text.Status')">
                <el-option :value="0" :label="$t('text.Status1')"/>
                <el-option :value="1" :label="$t('text.Status2')"/>
                <el-option :value="2" :label="$t('text.Status3')"/>
            </el-select>
        </el-form-item>
        <br/>

        <el-form-item :label="$t('text.CreateTime')">
            <el-date-picker
            v-model="orderQuery.begin"
            type="datetime"
            :placeholder="$t('text.ChooseStartTime')"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
            />
        </el-form-item>
        <el-form-item>
            <el-date-picker
            v-model="orderQuery.end"
            type="datetime"
            :placeholder="$t('text.ChooseEndTime')"
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
            :label="$t('text.Id')"
            width="70"
            align="center">
            <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
            </template>
        </el-table-column>
         <el-table-column prop="id" :label="$t('text.OrderId')" width="200" />

        <el-table-column prop="addressId" :label="$t('text.AddressId')" width="200" />

        <el-table-column prop="userId" :label="$t('text.UserId')" width="200" />

        <el-table-column :label="$t('text.Method')" width="80">
            <template slot-scope="scope">
            {{ scope.row.method===1?$t('text.Method1'):$t('text.Method2') }}
            </template>
        </el-table-column>
         <el-table-column :label="$t('text.Status')" width="80">
            <template slot-scope="scope">    
                <div v-if="scope.row.status === 0">{{$t('text.Status1')}}</div>
                <div v-if="scope.row.status === 1">{{$t('text.Status2')}}</div>
                <div v-if="scope.row.status === 2">{{$t('text.Status3')}}</div>

            </template>
        </el-table-column>

        <el-table-column prop="gmtCreate" :label="$t('text.CreateTime')" width="160"/>

        <el-table-column :label="$t('text.Operation')" align="center">
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