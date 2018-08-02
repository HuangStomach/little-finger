import React from "react";
import { Table } from "antd";
import Columns from "../../../config/list.config";
import _ from "lodash";
import {computed, observable, action } from "mobx";
import { inject, observer } from 'mobx-react';

@inject('ServerStore')
@observer
class NagList extends React.Component {

  @observable pagination = {};
  @observable loading = false;

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

  @action
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
    const columns = _.clone(Columns);
    return (
      <div>
        <Table
          style={{height:'55vh'}}
          columns={columns}
          dataSource={Array.from(this.servers)}
          size="middle"
          pagination={this.pagination}
          loading={this.loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default NagList;