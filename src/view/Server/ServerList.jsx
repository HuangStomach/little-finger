import React, { Component } from 'react';
import { autorun, computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import Style from './List.css';
import { Table, Button } from 'antd';


const columns = [
  {title: '名称', dataIndex: 'name',width:'10vw'},
  {title: 'LAB', dataIndex: 'lab',width:'10vw'},
  {title: 'SITE', dataIndex: 'site',width:'10vw'},
  {title: 'FQDN', dataIndex: 'fqdn',width:'20vw'},
  {title: '地址', dataIndex: 'address',width:'20vw'},
  {title: '路径', dataIndex: 'path',width:'30vw'},
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name:'name',
    lab:'lab',
    site:'site',
    fqdn: `Edward King ${i}`,
    address: `London, Park Lane no. ${i}`,
    path: `London, Park Lane no. ${i}`,
  });
}



class ServerList extends Component{
  render() {
    return (
      <Table  columns={columns} dataSource={data} pagination={{ pageSize: 20 }} scroll={{ y: '60vh' }} size="middle"/>
    );
  }
}

export default ServerList;