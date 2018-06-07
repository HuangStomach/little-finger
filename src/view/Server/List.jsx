import React, { Component } from 'react';
import { autorun, computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import Style from './List.css';

import echarts from 'echarts/lib/echarts';
// 引入Graph图
import 'echarts/lib/chart/heatmap';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';

@inject('ServerStore') @observer
class List extends Component {
  disposer = null;
  chart = null;
  start = 0;
  step = 20;

  @computed get servers() {
    return this.props.ServerStore.servers;
  }

  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    this.chart = echarts.init(document.getElementById('main'));
    this.disposer = autorun(() => this.renderChart());
    this.fetchServers();
  }

  fetchServers() {
    this.props.ServerStore.list(this.start * this.step, this.step).then(servers => {
      console.log(servers.length)
      if (servers.length >= (this.start + 1) * this.step) {
        this.start++
        this.fetchServers();
      }
    })
  }

  renderChart() {
    let unit = Math.ceil(Math.sqrt(this.servers.length)) + 2;
    const data = this.servers.map((item, index) => {
      return {
        value: [
          index % unit , parseInt(index / unit, 10), item.level,
          item.name, item.fqdn, item.address, item.update
        ],
        itemStyle: {
        normal: {
          color: item.level === '1'?'red':(item.level === '2'?'orange':(item.level === '3'?'yellow':(item.level === '4'?'green':'gray'))),
         }
        }
      };
    });

    this.chart.setOption({
      title: { text: '' },
      tooltip: {
        formatter(data) {
          return `name: ${data.value[3]}<br/>fqdn: ${data.value[4]}<br>address: ${data.value[5]}<br>update: ${data.value[6]}`  
        }
      },
      grid: {
        height: 'auto',
        width: '100%',
        left: 0,
        right: 0
      },
      xAxis: {
        name: '',
        type: 'category',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false }
      },
      yAxis:{
        name: '',
        type: 'category',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        inverse: true // 服务器从上向下渲染, 符合观看习惯
      },
      series: { 
        name: 'servers',
        type: 'heatmap',
        data,
        itemStyle: {
          normal: {
            borderColor: '#ffffff', //背景颜色
            borderWidth: 5,
            borderType: 'solid'
          }
        },
      }
    });
  }

  render() {
    return (
      <div id="main" className={Style.container}></div>
    )
  }
}

export default List;