import React, { Component } from 'react';
import { computed, observable } from "mobx";
import { observer } from 'mobx-react';
import { Button, Drawer, Form, Input, Switch, Icon, message } from 'antd';
import Style from './index.css';
const FormItem = Form.Item;
@observer
class CollectionEditForm extends Component {
  @observable record = { name : '',lab : '',site : '',active : 0 };
  @observable visible = false;

  @computed get fieldItem() {
    return this.props.record;
  }

  handleChange = e => {
    Reflect.set(this.record, e.target.name, e.target.value);
  }

  setRecord(record) {
    this.record.name = record.name;
    this.record.lab = record.lab;
    this.record.site = record.site;
    this.record.active = record.active;
  }

  handleChangeSwitch = (checked) => {
    this.record.active = checked ? 1 : 0;
  }

  onConfirm = () => {
    this.fieldItem.name = this.record.name;
    this.fieldItem.lab = this.record.lab;
    this.fieldItem.site = this.record.site;
    this.fieldItem.active = this.record.active;
    this.fieldItem.save().then(data => {
      if (data) {
        this.visible = false;
        this.props.update();
        message.success('编辑成功！',2);
      } else {
        message.error('编辑失败！',2);
      }
    });
  }

  onCancel = () => this.visible = false;

  render() {
    return (
      <Drawer
        title="编辑服务器"
        width={520}
        placement="right"
        onClose={this.onCancel}
        maskClosable={false}
        visible={this.visible}
        className={Style.drawer}
      >
        <Form layout="vertical">
          <FormItem label="名称">
            <Input type="text" name="name" value={this.record.name} placeholder="请输入服务器名称"
             onChange={this.handleChange}
             onPressEnter={this.onConfirm}
            />
          </FormItem>
          <FormItem label="Lab">
            <Input type="text" name="lab"  value={this.record.lab} placeholder="请输入Lab" 
            onChange={this.handleChange}
            onPressEnter={this.onConfirm}
            />
          </FormItem>
          <FormItem label="Site">
            <Input type="text" name="site" value={this.record.site} placeholder="请输入Site" 
            onChange={this.handleChange}
            onPressEnter={this.onConfirm}
            />
          </FormItem>
          <FormItem label="激活">
            <Switch name="active" checkedChildren={<Icon type="check" />} 
            unCheckedChildren={<Icon type="cross" />}
            checked={this.record.active === 0 ? false : true}
            onChange={this.handleChangeSwitch} />
          </FormItem>
        </Form>
        <div className={Style.drawer_footer}>
          <Button style={{ marginRight: 8 }} onClick={this.onCancel}>
            取消
          </Button>
          <Button onClick={this.onConfirm} type="primary">确定</Button>
        </div>
      </Drawer>
    )
  }
}
export default CollectionEditForm;
