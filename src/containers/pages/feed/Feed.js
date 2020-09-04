import React from "react";
import { auth } from "../../../services/firebase";
import { render } from "@testing-library/react";

import { connect } from "react-redux";
import { logout } from "../../../store/actions/auth";

class Feed extends React.Component {
  render() {
    return (
      <div className="jumbotron jumbotron-fluid">
        Feed
        <button
          onClick={() => {
            console.log(this.props);
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
  };
}

export default connect(null, mapDispatchToProps)(Feed);
