import request from '@/utils/request'

export default{
    // 1 生成统计数据
    createStaData(day){
        return request({
            url: `/statistics-daily/getCount/${day}`,
            method: 'post',
        })
    },
    // 2 获取统计数据
    getDataSta(searchObj){
        return request({
            url: `/statistics-daily/showData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
            method: 'get',
        })
    },
    // 3 获取饼状图统计数据
    getDataStaPie(searchObjPie){
        return request({
            url: `/statistics-daily/showPieData/${searchObjPie.day}`,
            method: 'get',
        })
    },
    // 4 获取柱状图统计数据
    getDataStaBar(searchObjBar){
        return request({
            url: `/statistics-daily/showBarData/${searchObjBar.begin}/${searchObjBar.end}`,
            method: 'get',
        })
    },
}
