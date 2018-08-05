import React from "react";
import { Table } from "antd";
import { computed, observable } from "mobx";
import { inject, observer } from 'mobx-react';

@inject('ServerStore')
@observer
class List extends React.Component {
  @observable pagination = { size: 'big', pageSize: 20 };
  @observable loading = false;
  columns = [
    { title: '名称', dataIndex: 'name', key: "name" }, 
    { title: 'LAB', dataIndex: 'lab', key: 'lab' }, 
    { title: 'SITE', dataIndex: 'site', key: 'site' }, 
    { title: 'FQDN', dataIndex: 'fqdn', key: "fqdn" }, 
    { title: '地址', dataIndex: 'address', key: "address" }, 
    { title: '路径', dataIndex: 'path', key: "path" }
  ];

  @computed get servers() {
    return this.props.ServerStore.servers;
  }

  @computed get start() {
    return this.props.ServerStore.start;
  }

  constructor(props) {
    super(props);
    this.loading = true;

    this.props.ServerStore.list().then(() => {
      this.pagination.total = this.props.ServerStore.total;
      this.loading = false
    });
  }

  tableChange = pagination => {
    this.loading = true;
    let step = pagination.current * 20 - this.servers.length; // 额外需要获取的行数
    if (step <= 0) {
      this.loading = false
      return; // 如果已经缓存了该数目的行数则不做请求
    }

    let excpet = this.servers.length + step; // 记录预期获取行数
    let fetch = () => {
      // 每次请求最大限制在50行
      this.props.ServerStore.list(Math.min(50, step)).then(() => {
        // 当请求达到了预期或请求已经完成时则不再发起请求
        if (this.servers.length >= excpet 
        || this.servers.length == this.props.ServerStore.total) {
          this.loading = false
          return;
        }
        fetch();
      });
    }
    fetch();
  };

  render() {
    return (
      <Table
        style={{height:'55vh'}}
        columns={this.columns}
        dataSource={Array.from(this.servers)}
        rowKey='id'
        size="middle"
        pagination={this.pagination}
        loading={this.loading}
        onChange={this.tableChange}
      />
    );
  }
}

export default List;