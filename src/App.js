import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Feed from "./containers/pages/feed/Feed";
import Users from "./containers/pages/users/Users"
import { Materials } from "./containers/pages/materials/Materials";
import Sidebar from "./components/Navigation/Sidebar/Sidebar";
import EditProfile from "./containers/pages/editProfile/EditProfile";
import { autoLogin } from "./store/actions/auth";

import Split from "./hoc/Split/Split";
import Auth from "./containers/pages/auth/Auth";
import Timetable from "./containers/pages/timetable/Timetable";
import { connect } from "react-redux";
import Navbar from "./components/Navigation/Navbar/Navbar";
import { updateUserName } from "./store/actions/editProfile";
import MainView from "./hoc/MainView/MainView";
import User from "./containers/pages/user/User";
import Dialog from "./containers/pages/dialog/Dialog";
import DialogList from "./containers/pages/dialogList/DialogList";

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/feed" component={Feed} />
        <Route path="/editProfile" component={EditProfile} />
        <Route path="/materials" component={Materials} />
        <Route path="/timetable" component={Timetable} />
        <Route path="/users/:id" component={User} />
        <Route path="/users" component={Users} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/feed" exact component={Feed} />
          <Route path="/editProfile" component={EditProfile} />
          <Route path="/materials" component={Materials} />
          <Route path="/timetable" component={Timetable} />
          <Route path="/users/:id" component={User} />
          <Route path="/dialogs/:id" component={Dialog} />
          <Route path="/dialogs" component={DialogList} />
          <Route path="/users" component={Users} />
          
          <Redirect to="/feed" />
        </Switch>
      );
    }

    return (
      <BrowserRouter>
      
          <MainView>
          
            <Split>

              <Sidebar isAuthenticated={this.props.isAuthenticated} />
              
              
              <Layout navbar={<Navbar isAuthenticated={this.props.isAuthenticated} />}>
              {routes}</Layout>
            
            </Split>
          </MainView>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
    userName: state.editProfile.name,
    userSurname: state.editProfile.surname,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
    updateUserName: (name, surname) => dispatch(updateUserName(name, surname)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
