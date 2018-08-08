import React from 'react';

import { Button, Drawer, Form, Input,Row, Col, Switch, Icon } from 'antd';
import Style from './index.css';


const FormItem = Form.Item;
const CollectionEditForm = Form.create(
  {
    onFieldsChange(props, changedFields) {
      props.onChange(changedFields);
    },
    mapPropsToFields(props){
      let record = props.record;
      return {
        name: Form.createFormField({
          value: record.name,
        }),
        lab: Form.createFormField({
          value: record.lab,
        }),
        site: Form.createFormField({
          value: record.site,
        }),
        active: Form.createFormField({
          value: record.active,
        }),
      };
    }
  }
)(

  class extends React.Component {

    render() {
      const { visible, onCancel, onEdit, form } = this.props;
      const { getFieldDecorator } = form;

      const formItems = [
        { label: '名称', fieldId: 'name', required: true, message: '请输入服务器名称'},
        { label: 'Lab', fieldId: 'lab', required: true, message: '请输入Lab'},
        { label: 'Site', fieldId: 'site', required: true, message: '请输入Site'},
        { label: '激活', fieldId: 'active', required: true,},
      ];

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
          <Form layout="vertical" hideRequiredMark>
            {
              formItems.map(item =>
                <Row key={item.fieldId}>
                  <Col>
                    <FormItem label={item.label}>
                      {
                        getFieldDecorator(item.fieldId, {
                          rules: [{required: item.required, message: item.message}]
                        })
                        (item.fieldId === 'active' ? <Switch
                          checkedChildren={<Icon type="check" />}
                          unCheckedChildren={<Icon type="cross"/>}
                          defaultChecked={this.props.active === '0' ? false : true}
                        /> : <Input placeholder={item.placeholder}/>)
                      }
                    </FormItem>
                  </Col>
                </Row>
              )
            }
          </Form>
          <div className={Style.drawer_footer}>
            <Button style={{marginRight: 8,}} onClick={onCancel}>
              取消
            </Button>
            <Button onClick={onEdit} type="primary">确定</Button>
          </div>
        </Drawer>
      );
    }
  }
);

export default CollectionEditForm;