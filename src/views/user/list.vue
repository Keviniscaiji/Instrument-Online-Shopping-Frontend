<template>
    <div class="app-container">
        <h1>{{ $t('text.UserList') }}</h1>
        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
            <el-input v-model="userQuery.username" :placeholder="$t('text.UserName')"/>
        </el-form-item>

        <el-form-item>
            <el-select v-model="userQuery.isActive" clearable :placeholder="$t('text.Active')">
            <el-option :value="true" :label="$t('text.isActive')"/>
            <el-option :value="false" :label="$t('text.notActive')"/>
            </el-select>
        </el-form-item>

        <el-form-item :label="$t('text.CreateTime')">
            <el-date-picker
            v-model="userQuery.begin"
            type="datetime"
            :placeholder="$t('text.ChooseStartTime')"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
            />
        </el-form-item>
        <el-form-item>
            <el-date-picker
            v-model="userQuery.end"
            type="datetime"
            :placeholder="$t('text.ChooseEndTime')"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
            />
        </el-form-item>

        <el-button type="primary" icon="el-icon-search" @click="getList()"> {{ $t('button.Search') }}</el-button>
        <el-button type="default" @click="resetData()"> {{ $t('button.Clear') }}</el-button>
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
         <el-table-column prop="id" :label="$t('text.UserId')" width="200" />

        <el-table-column prop="username" :label="$t('text.Name')" width="80" />

        <el-table-column :label="$t('text.Active')" width="120">
            <template slot-scope="scope">
            {{ scope.row.isActive===true?$t('text.isActive'):$t('text.notActive') }}
            </template>
        </el-table-column>

        <el-table-column prop="email" :label="$t('text.Email')"  width="200"/>
        <el-table-column prop="signature" :label="$t('text.Signature')" />

        <el-table-column prop="gmtCreate" :label="$t('text.CreateTime')" width="160"/>


        <el-table-column :label="$t('text.Operation')" width="200" align="center">
            <template slot-scope="scope">
            <router-link :to="'/user/edit/'+scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit"> {{ $t('button.Edit') }}</el-button>
            </router-link>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)"> {{ $t('button.Delete') }}</el-button>
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
import user from '@/api/user'
export default{
    // 写核心代码位置
    data() { // 定义变量和初始值
        return {
            list: [],
            page: 1,// 当前页
            limit: 10,
            total: 0,
            userQuery: {}
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
            user.pageUserListCondition(this.page, this.limit, this.userQuery)
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
            this.userQuery = {}
            // 2 查询所有
            this.getList()
        },
        removeDataById(id){ // 删除讲师的方法
            this.$confirm('This operation will permanently delete the file. Continue', 'warning', {
                confirmButtonText: 'confirm',
                cancelButtonText: 'cancel',
                type: 'warning'
            }).then(() => {
                user.deleteUserById(id)
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