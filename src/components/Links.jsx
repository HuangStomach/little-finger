import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Links extends Component {
  render() {
    return (
      <nav className="breadcrumb has-bullet-separator" aria-label="breadcrumbs">
        <ul>
          <li><Link to={{ pathname: '/user' }}>我</Link></li>
          <li><Link to={{ pathname: '/repos' }}>仓库</Link></li>
          <li><Link to={{ pathname: '/orgs' }}>组织</Link></li>
        </ul>
      </nav>
    );
  }
};

export default Links;