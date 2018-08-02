import React from "react";
import NagStation from "../components/Nagios/NagStation/index";

class PageStation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NagStation/>
    );
  }
}

export default PageStation;