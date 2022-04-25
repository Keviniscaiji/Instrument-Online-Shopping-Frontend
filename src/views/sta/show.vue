<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item>
        <el-select v-model="searchObj.type" clearable placeholder="select">
          <el-option label="Register Num" value="register_num"/>
          <el-option label="Commodity Visit Num" value="commodity_visit_num"/>
          <el-option label="Commodity Buy Num" value="commodity_buy_num"/>
          <el-option label="Post Num" value="post_num"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="start Date"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="end Date"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()">{{ $t('button.Search') }}</el-button>
    </el-form>

    <div class="chart-container1">
      <div id="chart1" class="chart" style="height:500px;width:100%" />
    </div>

     <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-date-picker
          v-model="searchObjPie.day"
          type="date"
          placeholder="Date"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-button
        :disabled="btnDisabledPie"
        type="primary"
        icon="el-icon-search"
        @click="showChartPie()">{{ $t('button.Search') }}</el-button>
    </el-form>
    <div class="chart-container2">
      <div id="chart2" class="chart" style="height:500px;width:100%" />
    </div>

    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item>
        <el-date-picker
          v-model="searchObjBar.begin"
          type="date"
          placeholder="start Date"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObjBar.end"
          type="date"
          placeholder="end Date"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-button
        :disabled="btnDisabledBar"
        type="primary"
        icon="el-icon-search"
        @click="showChartBar()">{{ $t('button.Search') }}</el-button>
    </el-form>

    <div class="chart-container3">
      <div id="chart3" class="chart" style="height:500px;width:100%" />
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import staApi from '@/api/sta'

export default {
    data() {
        return {
            searchObj:{},
            searchObjPie:{},
            searchObjBar:{},
            btnDisabled:false,
            btnDisabledPie:false,
            btnDisabledBar:false,
            xData:[],
            yData:[],
            dataPie:[],
            barXData: [],
            barY1Data: [],
            barY2Data: [],
            barY3Data: [],
            barY4Data: [],
            barY5Data: [],
            barY6Data: []
        }
    },
    methods:{
        showChart() {
            staApi.getDataSta(this.searchObj)
                .then(response => {
                    this.yData = response.data.numDataList
                    this.xData = response.data.date_calculatedList
                    // console.log(response.data)
                    //调用下面生成图表的方法，改变值
                    this.setChart()
                })
        },
        showChartPie() {
            staApi.getDataStaPie(this.searchObjPie)
                .then(response => {
                    var len = response.data.typeList.length
                    for(let i = 1; i < len; i++){
                        var Obj = new Object();
                        Obj.name = response.data.typeList[i];
                        Obj.value = response.data.dataList[i]
                        this.dataPie[i] = Obj;
                    }
                    // console.log(response.data)
                    //调用下面生成图表的方法，改变值
                    this.setChartPie()
                })
        },
        showChartBar() {
            staApi.getDataStaBar(this.searchObjBar)
                .then(response => {
                    this.barY1Data = response.data.type1DataList
                    this.barY2Data = response.data.type2DataList
                    this.barY3Data = response.data.type3DataList
                    this.barY4Data = response.data.type4DataList
                    this.barY5Data = response.data.type5DataList
                    this.barY6Data = response.data.type6DataList
                    this.barXData = response.data.date_calculatedList
                    // console.log(response.data)
                    //调用下面生成图表的方法，改变值
                    this.setChartBar()
                })
        },
        setChartBar() {
            // 基于准备好的dom，初始化echarts实例
            this.chart = echarts.init(document.getElementById('chart3'))
            // console.log(this.chart)
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: 'Visited Daily statistics'
                },
                legend: {
                    data: ["Pipes", "Electronic", "Percussion", "Piano", "Guitar", "Others"]
                },
               
                // x轴是类目轴（离散数据）,必须通过data设置类目数据
                xAxis: {
                    type: 'category',
                    data: this.barXData
                },
                // y轴是数据轴（连续数据）
                yAxis: {
                    type: 'value'
                },
                // 系列列表。每个系列通过 type 决定自己的图表类型
                series: [
                    {
                        // 系列中的数据内容数组
                        data: this.barY1Data,
                        name: "Pipes",
                        // 折线图
                        type: 'bar'
                    },
                    {
                        // 系列中的数据内容数组
                        data: this.barY2Data,
                        name: "Electronic",
                        // 折线图
                        type: 'bar'
                    },
                    {
                        // 系列中的数据内容数组
                        data: this.barY3Data,
                        name: "Percussion",
                        // 折线图
                        type: 'bar'
                    },
                    {
                        // 系列中的数据内容数组
                        data: this.barY4Data,
                        name: "Piano",
                        // 折线图
                        type: 'bar'
                    },
                    {
                        // 系列中的数据内容数组
                        data: this.barY5Data,
                        name: "Guitar",
                        // 折线图
                        type: 'bar'
                    },
                    {
                        // 系列中的数据内容数组
                        data: this.barY6Data,
                        name: "Others",
                        // 折线图
                        type: 'bar'
                    },
                ]
            }

            this.chart.setOption(option)
        },
        setChartPie(){
            this.chart = echarts.init(document.getElementById('chart2'))
             
            console.log(this.dataPie)
            var option = {
                title: {
                    text: 'Cart statistics',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: []
                },
                color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'],
                // 区域缩放
                // 系列列表。每个系列通过 type 决定自己的图表类型
                series: [{
                    // 系列中的数据内容数组
                    name: "Cart statistics",
                    data: this.dataPie,
                    // 折线图
                    type: 'pie',
                    // radius : '55%',
                    // center: ['50%', '60%'],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            }

            this.chart.setOption(option)
        },
        setChart() {
            // 基于准备好的dom，初始化echarts实例
            this.chart = echarts.init(document.getElementById('chart1'))
            // console.log(this.chart)
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: 'Data statistics'
                },
                tooltip: {
                    trigger: 'axis'
                },
                // 区域缩放
                dataZoom: [{
                    show: true,
                    height: 30,
                    xAxisIndex: [
                        0
                    ],
                    bottom: 30,
                    start: 10,
                    end: 80,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '110%',
                    handleStyle: {
                        color: '#d3dee5'

                    },
                    textStyle: {
                        color: '#fff'
                    },
                    borderColor: '#90979c'
                    },
                    {
                    type: 'inside',
                    show: true,
                    height: 15,
                    start: 1,
                    end: 35
                }],
                // x轴是类目轴（离散数据）,必须通过data设置类目数据
                xAxis: {
                    type: 'category',
                    data: this.xData
                },
                // y轴是数据轴（连续数据）
                yAxis: {
                    type: 'value'
                },
                // 系列列表。每个系列通过 type 决定自己的图表类型
                series: [{
                    // 系列中的数据内容数组
                    data: this.yData,
                    // 折线图
                    type: 'line'
                }]
            }

            this.chart.setOption(option)
        }
    }
}
</script>