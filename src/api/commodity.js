import request from '@/utils/request'

export default{
    // 1 commodity列表
    pageCommodityListCondition(current, limit, commodityQueryVo){
        return request({
            url: `/commodity/pageCommodityListCondition/${current}/${limit}`,
            method: 'post',
            data: commodityQueryVo
        })
    },
    // 2 删除commodity
    deleteCommodityById(id){
        return request({
            url: `/commodity/deleteCommodity/${id}`,
            method: 'delete'
        })
    },
    // 3 添加commodity basic info
    addBasicInfo(commodityBasicInfoDto){
        return request({
            url: `/commodity/addBasicInfo`,
            method: 'post',
            data: commodityBasicInfoDto
        })
    },
    // 4 add Intro
    addIntro(intro){
        return request({
            url: `/commodity-introduction/addIntro`,
            method: 'post',
            data: intro
        })
    },
    // 5 getBasicInfo
    getBasicInfo(id){
        return request({
            url: `/commodity/getBasicInfo/${id}`,
            method: 'get',
        })
    },
    // 6 update Basic Info
    updateBasicInfo(commodityBasicInfoDto, id){
        return request({
            url: `/commodity/updateBasicInfo/${id}`,
            method: 'post',
            data: commodityBasicInfoDto
        })
    },
    // 7 get intro
    getIntro(id){
        return request({
            url: `/commodity-introduction/getIntro/${id}`,
            method: 'get',
        })
    },
}
