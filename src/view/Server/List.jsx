import React, { Component } from 'react';
import { autorun, computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import Style from './List.css';

import echarts from 'echarts/lib/echarts';
// 引入Graph图
import 'echarts/lib/chart/heatmap';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/graphic';

// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
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
          index % unit, parseInt(index / unit, 10), parseInt(item.level, 10)
        ],
        content: item
      };
    });

    this.chart.setOption({
      tooltip: {
        formatter(data) {
          let content = data.data.content;
          return `name: ${content.name}<br />
          fqdn: ${content.fqdn}<br />
          address: ${content.address}<br />
          update: ${content.update}<br />
          level: ${content.level}<br />`
        }
      },
      grid: {
        top: 0,
        height: 'auto',
        width: '90%',
        left: '10%',
        right: '0%'
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
      visualMap: {
        type: 'piecewise',
        pieces: [
          { value: 0, color: '#999999', label: '休眠' },
          { value: 10, color: '#333333', label: '待机' },
          { value: 20, color: '#00CC00', label: '正常' },
          { value: 30, color: '#0099FF', label: '信息' },
          { value: 40, color: '#FFCC00', label: '警告' },
          { value: 50, color: '#FF0000', label: '错误' },
          { value: 60, color: '#CC00FF', label: 'GG' },
        ],
        top: 0,
        left: 0,
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