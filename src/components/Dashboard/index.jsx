import React, { Component } from 'react';
import { observable, autorun, computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import Style from './index.css';

import echarts from 'echarts/lib/echarts';
// 引入Graph图
import 'echarts/lib/chart/heatmap';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/graphic';

// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/grid';

@inject('SiteStore')
@observer
class Station extends Component {
  disposer = null;
  chart = null;

  @observable list = [];

  @computed get sites() {
    return this.props.SiteStore.sites;
  }

  @computed get start() {
    return this.props.SiteStore.start;
  }

  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    this.chart = echarts.init(document.getElementById('main'));
    this.renderChart();
    
    this.disposer = autorun(() => this.renderChart());
    this.fetchServers();
  }

  fetchServers() {
    this.props.SiteStore.list().then(() => {
      if (this.props.SiteStore.total === this.sites.length) return;
      this.fetchServers();
    });
  }

  renderChart() {
    let unit = Math.ceil(Math.sqrt(this.sites.length)) + 2;
    const data = this.sites.map((item, index) => {
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
          return `name: ${content.name}<br/>
          fqdn: ${content.fqdn}<br/>
          address: ${content.address}<br/>
          update: ${content.update}<br/>
          level: ${content.level}<br/>`
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
        pieces: Object.values(this.props.SiteStore.status),
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

export default Station;