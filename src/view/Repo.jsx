import React, { Component, Fragment }  from 'react';
import Loadable from 'react-loadable';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const Repos = Loadable({loader: () => import(/* webpackChunkName: "model" */  'model/repos'), loading: () => null});

@observer
class Repo extends Component {
  @observable repository = {};

  constructor(props) {
    super(props);
    this.repository = new Repos(`huangstomach/${props.match.params.name}`);
  }

  render() {
    return (
      <Fragment>
        <div className="content">
          <h4 style={{color: '#fff'}}>
            <strong style={{marginRight: '0.5rem'}}>{this.repository.name}</strong> 
            <small style={{marginRight: '0.5rem'}}>{this.repository.full_name}</small> 
            <small>{this.repository.size}</small>
          </h4>
          <p>{this.repository.description}</p>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            <div className="tags has-addons level-item">
              <span className="tag is-dark">stars</span>
              <span className="tag is-info">{this.repository.stars}</span>
            </div>
            <div className="tags has-addons level-item">
              <span className="tag is-dark">forks</span>
              <span className="tag is-info">{this.repository.forks}</span>
            </div>
            <div className="tags has-addons level-item" style={{marginBottom: 0}}>
              <span className="tag is-dark">watchers</span>
              <span className="tag is-info">{this.repository.watchers}</span>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
};

export default Repo;
