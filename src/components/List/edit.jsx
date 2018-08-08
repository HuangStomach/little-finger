import React, { Component } from 'react';
import { computed, observable, action } from "mobx";
import { observer } from 'mobx-react';
import { Button, Drawer, Form, Input, Switch, Icon } from 'antd';
import Style from './index.css';
const FormItem = Form.Item;

@observer
class CollectionEditForm extends Component {
  @observable record = {
    name : '',
    lab : '',
    site : '',
    active : '0',
  };
  constructor(props) {
    super(props);
    Object.assign(this.record, props.record);
  }

  @computed get fieldItem() {
    return this.props.record;
  }

  @action
  handleChange = e => {
    Reflect.set(this.record, e.target.name, e.target.value);
  }

  @action
  handleChangeSwitch = (checked) => {
    this.record.active = checked ? '1' : '0';
  }
  
  @action
  onConfirm = () => {
    this.fieldItem.name = this.record.name;
    this.fieldItem.lab = this.record.lab;
    this.fieldItem.site = this.record.site;
    this.fieldItem.active = this.record.active;
    this.props.onHandleEdit();
  }

  render() {
    const { visible, onCancel } = this.props;
    return (
      <Drawer
        title="编辑服务器"
        width={520}
        placement="right"
        onClose={onCancel}
        maskClosable={false}
        visible={visible}
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
          <FormItem>
            <Switch name="active" checkedChildren={<Icon type="check" />} 
            unCheckedChildren={<Icon type="cross" />}
            defaultChecked={this.record.active === '0' ? false : true} 
            onChange={this.handleChangeSwitch} />
          </FormItem>
        </Form>
        <div className={Style.drawer_footer}>
          <Button style={{ marginRight: 8 }} onClick={onCancel}>
            取消
          </Button>
          <Button onClick={this.onConfirm} type="primary">确定</Button>
        </div>
      </Drawer>
    )
  }
}
export default CollectionEditForm;
