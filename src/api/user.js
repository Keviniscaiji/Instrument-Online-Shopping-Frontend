import request from '@/utils/request'

export default{
    // 1 user列表
    pageUserListCondition(current, limit, userQueryVo){
        return request({
            url: `/user/pageUserListCondition/${current}/${limit}`,
            method: 'post',
            data: userQueryVo
        })
    },
    // 2 删除user
    deleteUserById(id){
        return request({
            url: `/user/deleteUser/${id}`,
            method: 'delete'
        })
    },
    // 3 添加user
    addUser(user){
        return request({
            url: `/user/addUser`,
            method: 'post',
            data: user
        })
    },
    // 4 获取user信息
    getUserInfo(id){
        return request({
            url: `/user/getUser/${id}`,
            method: 'get'
        })
    },
    // 5 修改user
    updateUser(user){
        return request({
            url: `/user/updateUser`,
            method: 'put',
            data: user
        })
    }

}
