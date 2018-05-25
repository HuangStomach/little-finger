import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
// 引入Graph图
import 'echarts/lib/chart/heatmap';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';

//列表项
class ServerItem extends Component {
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));
    //console.log(this.props.data);
    var x = 0,y = 0;
    this.props.data.forEach((element,index)=> {
      element.x = x;
      element.y = y;
      x++;
      if(x>=10) {
        y++;
        x=0;
       }     
    });
    const data = this.props.data.map(function(item) {
      return {
        value: [item.x, item.y, item.level],
        itemStyle: {
        normal: {
          color: 'rgb(255, 0, 0)',
          borderColor: '#fff', //背景颜色
          borderWidth: 5,
          borderType: 'solid'
         }
        }
      }
    });
    let axisType = {
      name: '',
      type: 'category',
      data: ['0', '1', '2', '3','4'],
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
        axisLabel: {
          show: false
        }
    };
    myChart.setOption({
      title: {
        text: 'Awesome Chart'
      },
      tooltip: {
        formatter: function(data) {
          return `警报等级：${data.value[2]}`  
        }
      },
      grid: {
        top: '20',
        height: '50%',
        width: '40%'
      },
      xAxis: axisType,
      yAxis: axisType,
      series: { 
        name: '2048',
        type: 'heatmap',
        data: data,
        itemStyle: {
          normal: {
            borderColor: '#ffffff', //背景颜色
            borderWidth: 5,
            borderType: 'solid'
          }
        }, 
        label: {
          normal: {
            //这里是去除模块上显示的数值，如果需要请自行设置
            show: true
          }
        },
      }
    });    
  }   
  render() {
    return (
      <div id="main" style={{ width: 800, height: 800 }}></div>
    );    
  }    
}
export default ServerItem;