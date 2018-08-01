import React, { Component } from 'react';
import { observable, computed, action } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Table } from 'antd';
import {autorun} from "mobx/lib/mobx";

@inject('ServerStore')

@observer
class ServerList extends Component{

  constructor(props) {
    super(props);
    this.state = { pagination: {}, loading:false };
  }

  step  = 10;
  columns = [
    {title: '名称', dataIndex: 'name', width:'10%'},
    {title: 'LAB', dataIndex: 'lab', width:'10%'},
    {title: 'SITE', dataIndex: 'site', width:'10%'},
    {title: 'FQDN', dataIndex: 'fqdn', width:'10%'},
    {title: '地址', dataIndex: 'address', width:'30%'},
    {title: '路径', dataIndex: 'path', width:'30%'},
  ];
  @observable start = 0;
  @observable list  = [];

  @computed get servers() {
    return this.props.ServerStore.servers;
  }

  componentDidMount() {
    this.fetchServers();
  }


  fetchServers() {
    this.setState({ loading: true });
    this.props.ServerStore.list(this.start * this.step, this.step).then(items => {
      items.map(item => {
        this.list.push({key:item.id, ...item})
      });
      const pagination = { ...this.state.pagination };
      pagination.total = this.props.ServerStore.total;
      //pagination.showSizeChanger = true;
      //pagination.showQuickJumper = true;
      this.setState({
        loading: false,
        pagination,
      });
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });

    this.start = pagination.current - 1;
    this.list  = [];
    this.fetchServers();
  };

  render() {
    return (
      <div>
        <Table
          style={{height:'50vh'}}
          columns={this.columns}
          dataSource={Array.from(this.list)}
          scroll={{ y: '50vh' }}
          size="middle"
          bordered
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />

       {/* <Pagination
          style={{marginTop:24}}
          defaultCurrent={1}
          current={this.start + 1}
          pageSize={this.step}
          total={this.props.ServerStore.total}
          onChange={this.onChange}
        />*/}
      </div>
    );
  }
}

export default ServerList;