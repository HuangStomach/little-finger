import React from "react";
import DashboardIndex from "@/Dashboard/Index";
import Routes from 'store/modules/routes';

class Dashboard extends React.Component {
  componentWillMount() {
    Routes.active('dashboard');
  }

  render() {
    return (
      <DashboardIndex/>
    );
  }
}

export default Dashboard;