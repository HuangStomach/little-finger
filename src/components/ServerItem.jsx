import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
// 引入Graph图
import 'echarts/lib/chart/heatmap';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
import style from './ServerItem.css';

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
      if(x>=20) {
        y++;
        x=0;
       }     
    });
    const data = this.props.data.map(function(item) {
      return {
        value: [item.x, item.y, item.level, item.name, item.fqdn, item.address, item.update],
        itemStyle: {
        normal: {
          color: item.level === '1'?'red':(item.level === '2'?'orange':(item.level === '3'?'yellow':(item.level === '4'?'green':'gray'))),
          borderColor: '#fff', //背景颜色
          borderWidth: 5,
          borderType: 'solid'
         }
        }
      }
    });
    //xAxis与yAxis参数设置需优化，暂时注释公共方法
    // let axisType = {
    //   name: '',
    //   type: 'category',
    //   data: new Array(20).fill(0),
    //   axisLine: {
    //     show: false
    //   },
    //   axisTick: {
    //     show: false
    //   },
    //   axisLabel: {
    //     show: false
    //   }
      
    // };

    myChart.setOption({
      title: {
        text: ''
      },
      tooltip: {
        formatter: function(data) {
          return `name: ${data.value[3]}<br/>fqdn: ${data.value[4]}<br>address: ${data.value[5]}<br>update: ${data.value[6]}`  
        }
      },
      grid: {
        top: '15%',
        height: '20%',
        width: '100%',
        left: ''
      },
      xAxis: {
        name: '',
        type: 'category',
        data: new Array(20).fill(0),
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        }
        
      },
      yAxis:{
        name: '',
        type: 'category',
        //data: new Array(20).fill(0),
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        inverse: true
        
      },
     
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
      <div id="main" className={style.container}></div>
    );    
  }    
}
export default ServerItem;