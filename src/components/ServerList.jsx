import React, { Component } from 'react';
import ServerItem from '@/ServerItem';

//列表容器
class ServerList extends Component {
  constructor(props) {
    super(props);
    this.state={
      value:[  
        {name:'服务器一',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'1',active:'0',
        update:'0000-00-00 00:00:00',id:'184',_extra:''},//每一个服务器的数据
        {name:'服务器二',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'1',
        update:'0000-00-00 00:00:00',id:'185',_extra:''},
        {name:'服务器三',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'2',active:'0',
        update:'0000-00-00 00:00:00',id:'123',_extra:''},
        {name:'服务器四',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'1',
        update:'0000-00-00 00:00:00',id:'245',_extra:''},
        {name:'服务器五',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'3',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器六',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'4',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器七',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'1',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器八',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器九',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器十',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'1',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器十一',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务十二',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器十三',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器十四',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器一',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'1',active:'0',
        update:'0000-00-00 00:00:00',id:'184',_extra:''},//每一个服务器的数据
        {name:'服务器二',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'1',
        update:'0000-00-00 00:00:00',id:'185',_extra:''},
        {name:'服务器三',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'2',active:'0',
        update:'0000-00-00 00:00:00',id:'123',_extra:''},
        {name:'服务器四',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'1',
        update:'0000-00-00 00:00:00',id:'245',_extra:''},
        {name:'服务器五',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'3',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器六',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'4',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器七',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'1',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器八',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器九',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器十',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'1',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器十一',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务十二',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器十三',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器十四',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''}, 
        {name:'服务器一',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'1',active:'0',
        update:'0000-00-00 00:00:00',id:'184',_extra:''},//每一个服务器的数据
        {name:'服务器二',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'1',
        update:'0000-00-00 00:00:00',id:'185',_extra:''},
        {name:'服务器三',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'2',active:'0',
        update:'0000-00-00 00:00:00',id:'123',_extra:''},
        {name:'服务器四',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'1',
        update:'0000-00-00 00:00:00',id:'245',_extra:''},
        {name:'服务器五',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'3',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器六',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'4',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器七',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'1',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器八',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器九',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器十',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'1',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器十一',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务十二',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器十三',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器十四',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},      
        {name:'服务器一',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'1',active:'0',
        update:'0000-00-00 00:00:00',id:'184',_extra:''},//每一个服务器的数据
        {name:'服务器二',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'1',
        update:'0000-00-00 00:00:00',id:'185',_extra:''},
        {name:'服务器三',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'2',active:'0',
        update:'0000-00-00 00:00:00',id:'123',_extra:''},
        {name:'服务器四',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'1',
        update:'0000-00-00 00:00:00',id:'245',_extra:''},
        {name:'服务器五',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'3',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器六',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'4',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器七',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'1',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器八',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器九',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器十',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'1',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器十一',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务十二',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器十三',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},
        {name:'服务器十四',fqdn:'e160302.server.genee.cn',address:'127:0.0.1',status:'',free:'0',top:'0',level:'0',active:'0',
        update:'0000-00-00 00:00:00',id:'',_extra:''},                     
      ]
    }
  }
  render() {
    return (
      <React.Fragment>
        <ServerItem data={this.state.value}/>
      </React.Fragment>
    )
  }
}

export default ServerList;