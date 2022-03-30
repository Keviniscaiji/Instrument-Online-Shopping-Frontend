import request from '@/utils/request'

export default{
    // 1 commodity列表
    pagePostListCondition(current, limit, postQueryVo){
        return request({
            url: `/post/pagePostListCondition/${current}/${limit}`,
            method: 'post',
            data: postQueryVo
        })
    },
    // 2 删除commodity
    deletePostById(id){
        return request({
            url: `/post/deletePost/${id}`,
            method: 'delete'
        })
    },
    // 3 save Info
    saveInfo(postInfo){
        return request({
            url: `/post/saveInfo`,
            method: 'post',
            data: postInfo
        })
    },
    // 4 get post by id 
    getInfo(id){
        return request({
            url: `/post/getInfo/${id}`,
            method: 'get',
        })
    },
    getCommentList(id, current, limit){
        return request({
            url: `/post-comment/getInfoList/${id}/${current}/${limit}`,
            method: 'get'
        })
    },
    deleteCommentById(id){
        return request({
            url: `/post-comment/delete/${id}`,
            method: 'delete'
        })
    },
    getCommentDetail(id){
        return request({
            url: `/post-comment/getDetail/${id}`,
            method: 'get'
        })
    },
    editComment(detail){
        return request({
            url: `/post-comment/editComment`,
            method: 'post',
            data: detail
        })
    },
    getLikeList(id, current, limit){
        return request({
            url: `/post-comment-like/getLikeList/${id}/${current}/${limit}`,
            method: 'get'
        })
    },
    deleteLike(id){
        return request({
            url: `/post-comment-like/deleteLikeById/${id}`,
            method: 'delete'
        })
    }
}
