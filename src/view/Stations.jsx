import React from "react";
import Station from "../components/Station/index";
import Routes from 'store/modules/routes';

class Stations extends React.Component {
  componentWillMount() {
    Routes.active('stations');
  }

  render() {
    return (
      <Station/>
    );
  }
}

export default Stations;