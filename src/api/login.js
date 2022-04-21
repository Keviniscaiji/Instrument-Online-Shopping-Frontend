import request from '@/utils/request'

export function loginByUserName(username) {
    return request({
        url: `/staff/loginByUserName/${username}`,
        method: 'get',
    })
}

export function getInfo(token) {
    return request({
        url: '/admin/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/admin/user/logout',
        method: 'post'
    })
}

export function pugeInfo(token) {
    return request({
        url: '/staff/getMemberInfo',
        method: 'get',
        params: { token }
    })
}