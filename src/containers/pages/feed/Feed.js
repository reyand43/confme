import classes from "./Feed.module.scss";
import React from "react";
import { connect } from "react-redux";
import { Card } from "../../../components/UI/Card/Card";
import { logout } from "../../../store/actions/auth";
import { clearUserName, loadUserNameFromServer } from "../../../store/actions/editProfile";

class Feed extends React.Component {


  // User name appears only when you go to the feed after log in

  componentDidMount() {
    if(this.props.isAuthenticated) {
      this.props.loadUserNameFromServer()
    }
    
  }

  render() {
    return (
      <div className={classes.Feed}>
        <Card type = 'FeedCard' title = 'BLACK LIVES MATTER'> 
          
        </Card>
      </div>
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
    logout: () => {
      dispatch(logout());
    },
    clearUserName: () => dispatch(clearUserName()),
    loadUserNameFromServer: () => dispatch(loadUserNameFromServer()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
