import React from "react";
import NagList from "../components/Nagios/NagList/index";

class PageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NagList/>
    );
  }
}

export default PageList;