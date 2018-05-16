import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import Users from 'model/users';

@observer
class User extends Component {
  @observable user = null;
  @observable show = false;

  constructor(props) {
    super(props);
    this.user = new Users('huangstomach');
  }

  info () {
    if (this.show) {
      return (
        <div className="column">
          <h2>{this.user.name}</h2>
          <p>
            <a href={this.user.html_url}>{this.user.html_url}</a>
          </p>
        </div>
      );
    }
    return;
  }

  render() {
    return (
      <div className="columns">
        <div className="column is-1">
          <figure className="image is-64x64">
            <img src={this.user.avatar_url} alt={this.user.name} onClick={() => this.show = true}
            style={{cursor: 'pointer'}}/>
          </figure>
        </div>
        {this.info()}
      </div>
    );
  }
};

export default User;
