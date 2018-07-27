import React, { Component } from 'react';
import { autorun, computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Table, Button } from 'antd';

@inject('ServerStore')
@observer
class ServerList extends Component{
  @computed get servers() {
    return this.props.ServerStore.servers;
  }

  render() {
    const columns = [
      {title: '名称', dataIndex: 'name',width:'10vw'},
      {title: 'LAB', dataIndex: 'lab',width:'10vw'},
      {title: 'SITE', dataIndex: 'site',width:'10vw'},
      {title: 'FQDN', dataIndex: 'fqdn',width:'20vw'},
      {title: '地址', dataIndex: 'address',width:'20vw'},
      {title: '路径', dataIndex: 'path',width:'30vw'},
    ];

    const data = [];
    for (let i = 0; i < this.servers.length; i++) {
      data.push({
        key: i,
        name:this.servers[i].name,
        lab:this.servers[i].lab,
        site:this.servers[i].site,
        fqdn:this.servers[i].fqdn,
        address:this.servers[i].address,
        path:this.servers[i].path,
      });
    }

    return (
      <Table  columns={columns} dataSource={data} pagination={{ pageSize: 20 }} scroll={{ y: '60vh' }} size="middle"/>
    );
  }
}

export default ServerList;