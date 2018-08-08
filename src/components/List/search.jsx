import React from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';

const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {
  // To generate mock Form.Item
  getFields() {
    const formItems = [
      { label: '名称', fieldId: 'name', required: true, message: '请输入服务器名称'},
      { label: 'Lab', fieldId: 'lab', required: true, message: '请输入Lab'},
      { label: 'Site', fieldId: 'site', required: true, message: '请输入Site'},
      { label: 'FQDN', fieldId: 'fqdn', required: true, message: '请输入fqdn'},
    ];
    const { getFieldDecorator } = this.props.form;
    const children = [];

    formItems.map(item => {
      children.push(
        <Col span={5} key={item.fieldId}>
          <FormItem label={item.label} style={{display:'flex'}}>
            {getFieldDecorator(item.fieldId, {
              rules: [{
                message: item.message,
              }],
            })(
              <Input placeholder={item.message} />
            )}
          </FormItem>
        </Col>
      );
    })
    return children;
  }

  render() {
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={16} type="flex">
        {this.getFields()}
        <Col span={4}>
          <FormItem>
          <Button type="primary" htmlType="submit">
          <Icon type="search" />搜索
          </Button>
          </FormItem> 
        </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default WrappedAdvancedSearchForm;