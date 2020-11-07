import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserPhoto } from "../UI/UserPhoto/UserPhoto";

import classes from "./ModalWindow.module.scss";

class ModalWindow extends React.Component {
  state = {
    isModalOpen: true,
  };
  componentWillMount() {
    this.root = document.createElement("div");
    document.body.appendChild(this.root);
  }
  componentWillUnmount() {
    document.body.removeChild(this.root);
  }

  toggleModal = () => {
  
    this.setState((state) => ({ isModalOpen: !state.isModalOpen }));
  };


  render() {
    return ReactDOM.createPortal(
      <div className={classes.ModalWindow}>
          <div className={classes.ModalWindow__Card}>
              {this.props.success && <i class="fa fa-check" aria-hidden="true"></i>}
              {this.props.warning && <i class="fa fa-exclamation-circle" aria-hidden="true"></i>}
              {this.props.error && <i class="fa fa-times" aria-hidden="true"></i>}
          </div>
      </div>,
      this.root
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.modal.user,
  };
}

export default connect(mapStateToProps, null)(ModalUser);
