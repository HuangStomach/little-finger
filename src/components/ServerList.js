import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ServerItem from '@/ServerItem';

//列表容器
class ServerList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            value:[   
                {name:'服务器一',fqdn:'124',fqdn:'这是啥1',address:'127:0.0.1'},//每一个服务器的数据
                {name:'服务器二',fqdn:'124',fqdn:'这是啥2',address:'127:0.0.1'},
                {name:'服务器三',fqdn:'124',fqdn:'这是啥3',address:'127:0.0.1'},
                {name:'服务器四',fqdn:'124',fqdn:'这是啥4',address:'127:0.0.1'},
                {name:'服务器五',fqdn:'124',fqdn:'这是啥5',address:'127:0.0.1'},
            ]
        }
        
    }

    render() {
        return (
            <div>
                <ServerItem data={this.state.value}/>
            </div>
        )
    }
}

export default ServerList;