import React, {Fragment} from "react";
import { Table, message, Tag } from "antd";
import { computed, observable, trace } from "mobx";
import { inject, observer,  } from 'mobx-react';
import CollectionEditForm from './edit';
import AdvancedSearchForm from './search';


@inject('SiteStore')
@observer
class List extends React.Component {

  @observable record = {};
  @observable visible = false;
  @observable pagination = { size: 'big', pageSize: 20 };
  @observable loading = false;

  renderTag = record => {
    let item = Reflect.get(this.props.SiteStore.status, record.level);
    return (
      <Tag color={item.color}>{item.label}</Tag>
    );
  }

  columns = [
    { title: '状态', dataIndex: 'level', width:'10%', render: (text, record) => (this.renderTag(record)) }, 
    { title: '名称', dataIndex: 'name', width:'10%'}, 
    { title: 'LAB', dataIndex: 'lab', width:'10%'}, 
    { title: 'SITE', dataIndex: 'site', width:'10%'},
    { title: 'FQDN', dataIndex: 'fqdn', width:'30%'}, 
    { title: '地址', dataIndex: 'address',width:'15%'}, 
    { title: '操作', dataIndex: 'handle', width:'15%',align:'right',
      render: (text, record) => (
        <span>
          <a onClick={() => this.onEdit(record)}>编辑</a>
        </span>
      ),
    }
  ];

  @computed get sites() {
    return this.props.SiteStore.sites;
  }

  @computed get start() {
    return this.props.SiteStore.start;
  }

  constructor(props) {
    super(props);
    this.loading = true;
    this.props.SiteStore.list().then(() => {
      this.pagination.total = this.props.SiteStore.total;
      this.loading = false
    });
  }

  tableChange = pagination => {
    this.loading = true;
    let step = pagination.current * 20 - this.sites.length; // 额外需要获取的行数
    if (step <= 0) {
      this.loading = false;
      return; // 如果已经缓存了该数目的行数则不做请求
    }

    let except = this.sites.length + step; // 记录预期获取行数
    let fetch = () => {
      // 每次请求最大限制在50行
      this.props.SiteStore.list(Math.min(50, step)).then(() => {
        // 当请求达到了预期或请求已经完成时则不再发起请求
        if (this.sites.length >= except || this.sites.length === this.props.SiteStore.total) {
          this.loading = false;
          return;
        }
        fetch();
      });
    };
    fetch();
  };
  //编辑服务器
  onEdit = record => {
    this.visible = true;
    this.record = record;
  };

  handleCancel = () => this.visible = false;

  //表单数据发生变化
  // handleFormChange = (changedFields) => {
  //   let fieldName = Object.keys(changedFields)[0];
  //   Object.keys(this.record).map(key => {
  //     if(key === fieldName){
  //       this.record[key] = changedFields[fieldName].value;
  //     }
  //   });
  // };

  //确认编辑
  handleEdit = () => {
    let result = this.record.save();
    if (result) {
      this.visible = false;
      message.success('编辑成功！',2);
    } else {
      message.error('编辑失败！',2);
    }
  };

  render() {
    return (
      <Fragment>
        <AdvancedSearchForm/>
        <Table
          style={{height:'55vh'}}
          columns={this.columns}
          dataSource={Array.from(this.sites)}
          rowKey='id'
          size="middle"
          scroll={{ y: 300 }}
          pagination={this.pagination}
          loading={this.loading}
          onChange={this.tableChange}
        />
        {this.visible ? <CollectionEditForm
          record={this.record}
          visible={this.visible}
          onCancel={this.handleCancel}
          onHandleEdit={this.handleEdit}
          onChange={this.handleFormChange}
        /> : ''}
      </Fragment>
    );
  }
}

export default List;