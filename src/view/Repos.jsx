import React, { Component }  from 'react';
import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import Repository from '@/Repository.jsx';
import Users from 'model/users';

@inject('repoStore') @observer
class Repos extends Component {
  @observable user = null;

  @computed get repos() {
    return this.props.repoStore.repos;
  }

  constructor(props) {
    super(props);
    this.props.repoStore.myRepos();
    this.user = new Users('huangstomach');
  }

  render() {
    return (
      <div>
        <p className="title is-5 is-spaced">{this.user.name}</p>
        <Repository repos={this.repos}/>
      </div>
    );
  }
};

export default Repos;
