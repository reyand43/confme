import React from "react";
import { connect } from "react-redux";
import { logout } from "../../../store/actions/auth";
import { clearUserName, loadUserNameFromServer } from "../../../store/actions/editProfile";

class Feed extends React.Component {


  // User name appears only when you go to the feed after log in
  componentDidMount(){
    if(this.props.isAuthenticated){
      this.props.loadUserNameFromServer()
    }
  }

  render() {
    return (
      <div className="jumbotron jumbotron-fluid">
        Feed
        {/* <button
          onClick={() => {
            console.log(this.props);
            this.props.clearUserName();
            this.props.logout();
          }}
        >
          log out
        </button> */}
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
