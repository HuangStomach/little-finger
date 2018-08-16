import React, { Fragment } from "react";
import { Table, Tag, Tooltip, Switch, Icon, Divider } from "antd";
import { computed, observable } from "mobx";
import { inject, observer,  } from 'mobx-react';
import CollectionEditForm from './Edit';
import AdvancedSearchForm from './Search';
import Detail from './Detail';
import { Link } from 'react-router-dom';
import Style from './index.css';

@inject('SiteStore')
@observer
class List extends React.Component {

  @observable condition = '';
  @observable record = {};
  @observable pagination = { size: 'big', pageSize: 20, total: 0 };
  @observable editComponent = {};//编辑服务器组件的实例

  //渲染服务器的状态列
  renderTag = record => {
    let item = Reflect.get(this.props.SiteStore.status, record.level);
    return (
      <Tag color={item.color}>{item.label}</Tag>
    );
  }

  @observable columns = [
    { 
      title: '状态', dataIndex: 'level', width:'8%', 
      render: (text, record) => (this.renderTag(record)) 
    }, 
    { 
      title: '名称', dataIndex: 'name', width:'20%', 
      render: (text) => <Tooltip placement="topRight" title={text} arrowPointAtCenter>
      <span className={Style.text_break} >{text}</span></Tooltip>,
      sorter: (a, b) => a.name.length - b.name.length,
    }, 
    { 
      title: 'LAB', dataIndex: 'lab', width:'10%',
    }, 
    { 
      title: 'FQDN', dataIndex: 'fqdn',
      render: (text) => <Tooltip placement="topRight" title={text} arrowPointAtCenter>
      <span className={Style.text_break} >{text}</span></Tooltip>,
    }, 
    { 
      title: '地址', dataIndex: 'address', width: '20%',
    }, 
    { 
      title: '激活', dataIndex: 'active', width: '10%', 
      render: (text, record) => <Switch disabled={true} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} checked={record.active === 1 ? true : false} />
    }, 
    { 
      title: '操作', dataIndex: 'handle', width: '10%',align: 'center', 
      render: (text, record) => (<span><Link to={{pathname: '/list/detail/'+record.id}}>详情</Link><Divider type="vertical" /><a onClick={(e) => this.onEdit(e,record)}>编辑</a></span>),
    }
  ];

  @computed get sites() {
    if(this.condition) {
      return this.props.SiteStore.sites.filter(site => {
        return (
          site.name.indexOf(this.condition) > -1 || 
          site.lab.indexOf(this.condition) > -1 || 
          site.site.indexOf(this.condition) > -1 || 
          site.fqdn.indexOf(this.condition) > -1
        )
      });
    } else {
      return this.props.SiteStore.sites;
    }
  }

  constructor(props) {
    super(props);
    this.fetchServers();
  }

  fetchServers = () => {
    this.props.SiteStore.list().then(() => {
      if (this.props.SiteStore.total === this.sites.length) return ;
      this.fetchServers(); 
      this.pagination.total = this.props.SiteStore.total;
    });
  }

  //弹出编辑服务器的界面
  onEdit = record => {
    this.record = record;
    this.editComponent.visible = true;
    this.editComponent.setRecord(record);
  };

  //搜索服务器列表
  handeleSearch = (condition) => {
    this.condition = condition;
    this.pagination.total = this.sites.length;
  }

  //将子组件CollectionEditForm的实例赋值给editComponent，以便在父组件操作子组件的属性和方法
  handeleVisible = (editForm) => {
    this.editComponent = editForm;
  }

  render() {
    return (
      <Fragment>
        <AdvancedSearchForm onHandleSerach={this.handeleSearch}/>
        <Table
          columns={Array.from(this.columns)}
          dataSource={Array.from(this.sites)}
          rowKey='id'
          size="middle"
          scroll={{ y: window.innerHeight - 328 }}
          pagination={this.pagination}
        />
        <CollectionEditForm
          record={this.record}
          ref={this.handeleVisible}
          update={() => this.forceUpdate()}//数据改变后，强制刷新父组件
        />
      </Fragment>
    );
  }
}

export default List;
