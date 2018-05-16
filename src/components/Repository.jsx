import React, { Component }  from 'react';
import { observer } from 'mobx-react';
import { withRouter } from "react-router-dom";

@observer
class Repository extends Component {
  onClick(name) {
    const location = {
      pathname: `/repo/${name}`,
    }
    this.props.history.push(location)
  }

  render() {
    return (
      <ul>
        {this.props.repos.map(repo => 
        <li key={repo.id} className="level" style={{marginBottom: '0.5rem'}}>
          <div className="level-left">
            <div className="control level-item">
              <div className="tags has-addons">
                <span className="tag is-dark">stars</span>
                <span className="tag is-info">{repo.stars}</span>
              </div>
            </div>
            <span onClick={() => this.onClick(repo.name)} className="level-item"
              style={{cursor: 'pointer', marginRight: '5px'}}>{repo.name}</span>
            <a href={repo.url} className="level-item">{repo.url}</a>
          </div>
        </li>
        )}
      </ul>
    );
  }
};

export default withRouter(Repository);
