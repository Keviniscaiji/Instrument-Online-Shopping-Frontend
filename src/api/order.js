import request from '@/utils/request'

export default{
    // 1 order列表
    pageOrderListCondition(current, limit, orderQueryVo){
        return request({
            url: `/order/pageOrderListCondition/${current}/${limit}`,
            method: 'post',
            data: orderQueryVo
        })
    },
    // 2 删除user
    deleteOrderById(id){
        return request({
            url: `/order/deleteOrder/${id}`,
            method: 'post'
        })
    },
    // 3 select Address By id
    selectById(id){
        return request({
            url: `/address/selectById/${id}`,
            method: 'get',
        })
    },
    // 4 修改并创建新地址
    addAddress(address, id){
        return request({
            url: `/address/newAddress/${id}`,
            method: 'post',
            data: address
        })
    },
    // 5 next step
    nextStep(id){
        return request({
            url: `/order/nextStep/${id}`,
            method: 'post',
        })
    }

}
