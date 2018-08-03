import React from "react";
import { Table } from "antd";
import {computed, observable } from "mobx";
import { inject, observer } from 'mobx-react';

@inject('ServerStore')
@observer
class List extends React.Component {

  @observable pagination = {size:'big'};
  @observable loading = false;
  @observable columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: "name",
    }, {
      title: 'LAB',
      dataIndex: 'lab',
      key: "lab"
    }, {
      title: 'SITE',
      dataIndex: 'site',
      key: "site",
    }, {
      title: 'FQDN',
      dataIndex: 'fqdn',
      key: "fqdn",
    }, {
      title: '地址',
      dataIndex: 'address',
      key: "address",
    }, {
      title: '路径',
      dataIndex: 'path',
      key: "path",
    }
  ];

  @computed get servers() {
    return this.props.ServerStore.servers;
  }

  @computed get start() {
    return this.props.ServerStore.start;
  }

  @computed get pages() {
    return this.props.ServerStore.pages;
  }

  componentDidMount() {
    this.fetchServers();
  }

  fetchServers() {
    this.loading = true;
    this.props.ServerStore.list(this.start).then(() => {
      this.pagination.total = this.props.ServerStore.total;
      this.pagination.pageSize = this.props.ServerStore.step;
      this.loading = false;
    });
  }

  handleTableChange = pagination => {
    this.props.ServerStore.handleStart(pagination.current - 1);
    this.fetchServers();
  };

  render() {
    return (
      <React.Fragment>
        <Table
          style={{height:'55vh'}}
          columns={this.columns}
          dataSource={Array.from(this.servers)}
          size="middle"
          pagination={this.pagination}
          loading={this.loading}
          onChange={this.handleTableChange}
        />
      </React.Fragment>
    );
  }
}

export default List;