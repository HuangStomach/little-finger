import React, { Component, Fragment } from 'react';
import { computed, observable } from "mobx";
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom' ;
import Site from 'model/site';
import { Form, Button, Row, Col, Input, Card, Switch, Icon, Tag, Divider, message } from 'antd';
import Style from './index.css';
import Routes from 'store/modules/routes';

const FormItem = Form.Item;

@inject('SiteStore')
@observer
class Detail extends Component {
  @observable editStatus = false;
  @observable site = {};
  @observable record = {name:'', lab:'', site:'', fqdn:'', address:'', active:0, path:'', level:0, free:0, top:0 };

  //获取服务器的状态
  @computed get status() {
    let item = Reflect.get(this.props.SiteStore.status, this.record.level);
    return (
      <Tag color={item.color}>{item.label}</Tag>
    );
  }

  @computed get recordId() {
    return this.props.location.pathname.split('/')[3];
  }

  componentWillMount() {
    Routes.active('list');
  }

  componentDidMount() {
    this.getRecord(this.recordId);
  }

  //获取服务器信息
  getRecord = id => {
    new Site(id).then(record => {
      this.site = record;
      Object.assign(this.record,record);      
    });
  }

  handleChange = e => {
    Reflect.set(this.record, e.target.name, e.target.value);
  }

  handleChangeSwitch = (checked) => {
    this.record.active = checked ? 1 : 0;
  }

  //编辑服务器信息
  onEdit = () => {
    this.editStatus = true;
  }

  //保存编辑的服务器信息
  onSave = () => {
    Object.assign(this.site, this.record);
    this.site.save().then(data => {
      if (data) {
        this.editStatus = false;
        this.props.SiteStore.clearData();
        message.success('编辑成功！',2);
      } else {
        message.error('编辑失败！',2);
      }
    });
  }

  //取消编辑操作
  onCancel = () => {
    this.editStatus = false;
    this.getRecord(this.recordId);
  }

  //渲染基本信息的操作按钮
  renderCardActions = () => {
    if(this.editStatus) {
      return <Fragment><a href="#" onClick={this.onCancel}>取消</a> <Divider type="vertical"/> <a href="#" onClick={this.onSave}>保存</a></Fragment>;
    } else {
      return <a href="#" onClick={this.onEdit}>编辑</a>;
    }
  }
  renderChart = () => {
    alert(323)
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    };
    const gridStyle = {
      width: '50%',
      textAlign: 'center',
      cursor: 'pointer',
    };
      
    return (
      <Fragment>
        <Row gutter={16}>
          <Col span={16}>
            <Card title="基础信息" bordered={true} extra={this.renderCardActions()}> 
              <Row type='flex'>
                <Col span={12}>
                <FormItem label="名称" {...formItemLayout}>
                  {
                    this.editStatus ? 
                    <Input type="text" name="name"  value={this.record.name} placeholder="请输入名称"
                      onChange={this.handleChange}
                      onPressEnter={this.onSave}
                    />
                    : <span>{this.record.name}</span>
                  }
                </FormItem>
                </Col>
                <Col span={12}>
                <FormItem label="Lab" {...formItemLayout}>
                  {
                    this.editStatus ? 
                    <Input type="text" name="lab"  value={this.record.lab} placeholder="请输入lab"
                      onChange={this.handleChange}
                      onPressEnter={this.onSave}
                    /> 
                    : <span>{this.record.lab}</span> 
                  }
                </FormItem>
                </Col>
              </Row>

              <Row type='flex'>
                <Col span={12}>
                <FormItem label="Fqdn" {...formItemLayout}>
                {this.record.fqdn}
                </FormItem>
                </Col>
                <Col span={12}>
                <FormItem label="Address" {...formItemLayout}>
                {this.record.address}
                </FormItem>
                </Col>
              </Row>

              <Row type='flex'>
                <Col span={12}>
                <FormItem label="Site" {...formItemLayout}>
                  {
                    this.editStatus ? 
                    <Input type="text" name="site" value={this.record.site} placeholder="请输入site"
                    onChange={this.handleChange}
                    onPressEnter={this.onSave}
                    />
                    : <span>{this.record.site}</span> 
                  }
                </FormItem>
                </Col>
                <Col span={12}>
                <FormItem label="Path" {...formItemLayout}>
                  {
                    this.editStatus ? 
                    <Input type="text" name="path" value={this.record.path} placeholder="请输入path"
                    onChange={this.handleChange}
                    onPressEnter={this.onSave}
                    />
                    : <span>{this.record.path}</span> 
                  }
                </FormItem>
                </Col>
              </Row>
              
              <Row type='flex'>
                <Col span={12}>
                <FormItem label="激活"  {...formItemLayout}>
                  {
                    this.editStatus ? 
                     <Switch name="active" checkedChildren={<Icon type="check" />} 
                     unCheckedChildren={<Icon type="cross" />}
                     checked={this.record.active === 0 ? false : true}
                     onChange={this.handleChangeSwitch} />
                     : <span>{this.record.active === 0 ? '未激活' : '已激活'}</span> 
                  }
                </FormItem>
                </Col>
                <Col span={12}>
                <FormItem label="状态" {...formItemLayout}>
                 {this.status}
                </FormItem>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col span={8}>
            <Card title="参数分析" bordered={false}>
              <Card.Grid style={gridStyle} onClick={this.renderChart}><h4>负载</h4><p>{this.record.top}</p></Card.Grid>
              <Card.Grid style={gridStyle}><h4>磁盘剩余容量</h4><p>{this.record.free}%</p></Card.Grid>
              <Card.Grid style={gridStyle}><h4>报警等级</h4><p>{this.record.level}</p></Card.Grid>
            </Card>
          </Col>
      </Row>

      <Row>
        <Col span={24}>
            <Card title="Card title" bordered={false}>Card content</Card>
        </Col>
      </Row>
      
      </Fragment>
    )
  }
}
export default withRouter(Detail);