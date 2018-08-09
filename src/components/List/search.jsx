import React from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';

const FormItem = Form.Item;
class AdvancedSearchForm extends React.Component {
  //searchCondition = {name:'', lab:'', site:'', fqdn:'' };
  keyword = '';

  handleChange = e => {
    this.keyword = e.target.value.replace(/^\s+|\s+$/g,"");
    //Reflect.set(this.searchCondition, e.target.name, e.target.value.replace(/^\s+|\s+$/g,""));
  }
  //搜索服务器列表
  handleSearch = () => {
    this.props.onHandleSerach(this.keyword);
  }

  //清空表单域
  handleReset = () => {
    //this.searchCondition = {name:'', lab:'', site:'', fqdn:'' };
    this.keyword = '';
    this.props.form.resetFields();
    this.handleSearch();
  }

  //生成表单域
  // getFields() {
  //   const formItems = [
  //     { label: '名称', name:'name', fieldId: 'name', message: '请输入服务器名称'},
  //     { label: 'LAB', name:'lab', fieldId: 'lab', message: '请输入Lab'},
  //     { label: 'SITE', name:'site', fieldId: 'site', message: '请输入SITE'},
  //     { label: 'FQDN', name:'fqdn', fieldId: 'fqdn', message: '请输入FQDN'},
  //   ];
  //   const { getFieldDecorator } = this.props.form;
  //   const children = [];

  //   formItems.map(item => {
  //     children.push(
  //       <Col span={5} key={item.fieldId}>
  //         <FormItem label={item.label} style={{display:'flex'}}>
  //           {getFieldDecorator(item.fieldId, {
  //             rules: [{
  //               message: item.message,
  //             }],
  //           })(
  //             <Input name={item.name} placeholder={item.message} onChange={this.handleChange} onPressEnter={this.handleSearch}/>
  //           )}
  //         </FormItem>
  //       </Col>
  //     );
  //   })
  //   return children;
  // }

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