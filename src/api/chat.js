import request from '@/utils/request'

export default{
    // 1 生成统计数据
    getChatList(staffId){
        return request({
            url: `/chat/getChatList/${staffId}`,
            method: 'post',
        })
    },
    // 2 获取user信息
    getUserInfo(id){
        return request({
            url: `/user/getUser/${id}`,
            method: 'get'
        })
    },
    // 3 获取饼状图统计数据
    getChatInfo(staffId, userId){
        return request({
            url: `/chat/getChatInfo/${staffId}/${userId}`,
            method: 'post',
        })
    },
    // 4 send
    sendChat(Obj){
        return request({
            url: `/chat/sendChat`,
            method: 'post',
            data: Obj
        })
    },
}
