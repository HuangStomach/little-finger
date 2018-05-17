import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './ServerItem.css';

//列表项
class ServerItem extends React.Component{
    render() {
        return (
            <div>    
                {this.props.data.map((item,index)=>
                    <div key={this.props.data.name} className="sitem">
                        <span>name:{item.name}</span>
                        <span>fqdn:{item.fqdn}</span>
                        <span>address:{item.address} </span>
                        <span>status:{item.status}</span>
                    </div>
               
                )}
            </div>
        )
    }
}
export default ServerItem;