<template>
    <div class="app-container">
        <h1>Commodity List</h1>
        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="Name">
            <el-input v-model="commodityQuery.name" placeholder="UserName"/>
        </el-form-item>

        <br/>

        <el-form-item label="Price"> 
            <el-input v-model="commodityQuery.minPrice" placeholder="minPrice"/>
        </el-form-item>
         <el-form-item>
            <el-input v-model="commodityQuery.maxPrice" placeholder="maxPrice"/>
        </el-form-item>

        <br/>
        <el-form-item label="Sort">
            <el-select v-model="commodityQuery.sortBy" clearable placeholder="sortedBy">
            <el-option :value="1" label="buyAmount"/>
            <el-option :value="2" label="collectAmount"/>
            <el-option :value="3" label="visitAmount"/>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-select v-model="commodityQuery.sortAsc" clearable placeholder="isAsc">
            <el-option :value="true" label="Asc"/>
            <el-option :value="false" label="Desc"/>
            </el-select>
        </el-form-item>

        <br/>
        <el-form-item label="Created Time">
            <el-date-picker
            v-model="commodityQuery.begin"
            type="datetime"
            placeholder="choice startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
            />
        </el-form-item>
        <el-form-item>
            <el-date-picker
            v-model="commodityQuery.end"
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

        <el-table-column prop="name" label="name" width="80" />

        <el-table-column label="type" width="80">
            <template slot-scope="scope">
            {{ scope.row.type===0?'piano':'guitar' }}
            </template>
        </el-table-column>

        <el-table-column prop="price" label="price"  width="80"/>

        <el-table-column prop="amount" label="amount"  width="80"/>

        <el-table-column prop="buyAmount" label="buy"  width="80"/>
        <el-table-column prop="collectAmount" label="collect"  width="80"/>
        <el-table-column prop="visitAmount" label="visit"  width="80"/>

        <el-table-column prop="gmtCreate" label="created Time" width="160"/>

        <el-table-column label="Operation" align="center">
            <template slot-scope="scope">
            <router-link :to="'/commodity/basic/'+scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit">EditBasic</el-button>
            </router-link>
            <router-link :to="'/commodity/intro/'+scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit">EditIntro</el-button>
            </router-link>
            <router-link :to="'/commodity/comment/'+scope.row.id">
                <el-button type="info" size="mini" icon="el-icon-message">Manage</el-button>
            </router-link>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">Delete</el-button>
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
            commodityQuery: {}
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
            commodity.pageCommodityListCondition(this.page, this.limit, this.commodityQuery)
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
            this.commodityQuery = {}
            // 2 查询所有
            this.getList()
        },
        removeDataById(id){ // 删除讲师的方法
            this.$confirm('This operation will permanently delete the file. Continue', 'warning', {
                confirmButtonText: 'confirm',
                cancelButtonText: 'cancel',
                type: 'warning'
            }).then(() => {
                commodity.deleteCommodityById(id)
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