import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { BrowserRouter, Switch, Route, Redirect, withRouter } from "react-router-dom";
import Users from "./containers/pages/users/Users";
import Materials from "./containers/pages/materials/Materials";
import Sidebar from "./components/Navigation/Sidebar/Sidebar";
import EditProfile from "./containers/pages/editProfile/EditProfile";
import { autoLogin } from "./store/actions/auth";
import Split from "./hoc/Split/Split";
import Auth from "./containers/pages/auth/Auth";
import Timetable from "./containers/pages/timetable/Timetable";
import { connect } from "react-redux";
import Navbar from "./components/Navigation/Navbar/Navbar";
import DialogList from "./containers/pages/dialogList/DialogList";
import WelcomePage from "./containers/pages/welcomePage/WelcomePage";
import Broadcast from "./containers/pages/broadcast/Broadcast";
import Agenda from "./containers/pages/agenda/Agenda"; //correct now
import Sponsors from "./containers/pages/sponsors/Sponsors";
import SponsorMain from "./containers/pages/sponsorMain/SponsorMain";
import Webinar from "./containers/pages/webinar/Webinar"
import Quizes from "./containers/pages/quizes/quizes"
import Quiz from './containers/pages/quizes/Quiz/Quiz'
import PropTypes from 'prop-types'
import { string } from "is_js";

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
    
  }

  render() {
    let routes
    if (!!localStorage.getItem('token')===true) {
      routes = (
        <Switch>

          <Route path="/editProfile" component={EditProfile} />
          <Route path="/broadcast" component={Broadcast} />
          <Route path="/materials" component={Materials} />
          <Route path="/timetable" component={Timetable} />
          <Route path="/sponsors/:id" component={SponsorMain} />

          <Route path="/sponsors" component={Sponsors} />
          <Route path="/webinar/:id" component={Webinar}/>

          <Route path="/dialogs/:id" component={DialogList} />
          <Route path="/dialogs" component={DialogList} />
          <Route path="/users" component={Users} />
          <Route path="/agenda" component={Agenda} />
          <Route path="/welcomePage" component={WelcomePage} />
          <Route path="/quizes" component={Quizes} />
          <Route path="/quiz/:id" component={Quiz} />
          <Redirect to="/welcomePage" />
        </Switch>
      );
    }


    return (
      <BrowserRouter>
      {!!localStorage.getItem('token')===false &&
        <Switch>
          <Route path="/" exact component={Auth} />
          <Redirect to="/"/>
        </Switch>}
        {!!localStorage.getItem('token')===true &&
            <Split>
            <Navbar isAuthenticated={!!localStorage.getItem('token')} />
            <Layout
              sidebar={<Sidebar isAuthenticated={!!localStorage.getItem('token')} />}
            >
              {routes}
            </Layout>
          </Split>

        }

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

  };
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
