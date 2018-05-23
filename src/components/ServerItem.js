import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
// 引入Graph图
import 'echarts/lib/chart/graph';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

//列表项
class ServerItem extends Component {
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));
    const dataNode = [];
    this.props.data.map((item, index) => {
      const opt = {};
      const x = Math.random()*(600-300+1)+300;
      const y = Math.random()*(600-300+1)+300;
      opt.name = item.name;
      opt.x = x;
      opt.y = y;
      opt.symbolSize = '35';
      opt.fqdn = item.fqdn;
      opt.address = item.address;
      opt.update = item.update;
      
      return dataNode.push(opt);
    });
    // 绘制图表
      myChart.setOption({
        title: {
          text: '服务器状态显示'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (dataNode) {
            return (
              `name: ${dataNode.data.name}
               <br/> fqdn: ${dataNode.data.fqdn} 
               <br/> address: ${dataNode.data.address} 
               <br/> update: ${dataNode.data.update}
              `
            )   
          }
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series : [
          {
            type: 'graph',
            layout: 'force',
            roam: false,
            label: {
              normal: {
                show: true
              }
            },        
            force: {
              repulsion: 27,
              edgeLength: 0,
              gravity: .8
            },    
            data: dataNode, 
          }
        ]                    
      });
      myChart.on('click',function(params) {
        if (params.seriesType === 'graph') {
          if (params.dataType === 'edge') {
                // 点击到了 graph 的 edge（边）上。
          } 
          else {
                // 点击到了 graph 的 node（节点）上。
          }
        }
      })
    }
    render() {
      return (
        <div id="main" style={{ width: 800, height: 800 }}></div>
      );    
    }
  }
export default ServerItem;