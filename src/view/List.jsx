import React from "react";
import ListIndex from "@/List/Index";
import Routes from 'store/modules/routes';

class List extends React.Component {
  componentWillMount() {
    Routes.active('list');
  }
  render() {
    return (
      <ListIndex/>
    );
  }
}

export default List;