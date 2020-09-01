import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Messages } from "./containers/pages/messages/Messages";
import { Feed } from "./containers/pages/feed/Feed";
import { Materials } from "./containers/pages/materials/Materials";
import { Sidebar } from "./components/Navigation/Sidebar/Sidebar";
import { autoLogin } from "./store/actions/auth";

import Split from "./hoc/Split/Split";
import Auth from "./containers/pages/auth/Auth";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    return (
      <BrowserRouter>
        <Split
          left={<Sidebar />}
          right={
            <React.Fragment>
              <Layout>
                <div>
                  <Switch>
                    <Route path="/" exact component={Auth} />
                    <Route path="/feed" component={Feed} />
                    <Route path="/messages" component={Messages} />
                    <Route path="/materials" component={Materials} />
                  </Switch>
                </div>
              </Layout>
            </React.Fragment>
          }
        />
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
