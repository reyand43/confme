import React from "react";
import { connect } from "react-redux";
import { logout } from "../../../store/actions/auth";
import { clearUserName } from "../../../store/actions/editProfile";

class Feed extends React.Component {
  render() {
    return (
      <div className="jumbotron jumbotron-fluid">
        Feed
        <button
          onClick={() => {
            console.log(this.props);
            this.props.clearUserName();
            this.props.logout();
          }}
        >
          log out
        </button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logout());
    },
    clearUserName: () => dispatch(clearUserName()),
  };
}

export default connect(null, mapDispatchToProps)(Feed);
