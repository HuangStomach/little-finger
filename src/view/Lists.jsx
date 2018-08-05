import React from "react";
import List from "../components/List/index";
import Routes from 'store/modules/routes';

class Lists extends React.Component {
  componentWillMount() {
    Routes.active('lists');
  }

  render() {
    return (
      <List/>
    );
  }
}

export default Lists;