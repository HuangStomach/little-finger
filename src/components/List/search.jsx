import React from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';

const FormItem = Form.Item;
class AdvancedSearchForm extends React.Component {
  keyword = '';
  
  handleChange = e => {
    this.keyword = e.target.value.replace(/^\s+|\s+$/g,"");
  }

  //搜索服务器列表
  handleSearch = () => {
    this.props.onHandleSerach(this.keyword);
  }

  //清空表单域
  handleReset = () => {
    this.keyword = '';
    this.props.form.resetFields();
    this.handleSearch();
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Row gutter={24} type="flex">
        <Col>
          <FormItem label="关键字" style={{display:'flex'}}>
          {getFieldDecorator('keyword')(<Input name='keyword' placeholder="请输入关键字..." onChange={this.handleChange} onPressEnter={this.handleSearch}/>) }
          </FormItem>
        </Col>
        <Col>
          <FormItem>
          <Button type="primary" onClick={this.handleSearch} style={{marginRight:5}}>
          <Icon type="search" />搜索
          </Button>
          <Button onClick={this.handleReset}>重置</Button>
          </FormItem> 
        </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default WrappedAdvancedSearchForm;