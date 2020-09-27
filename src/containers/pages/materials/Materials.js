import React from "react";
import { connect } from "react-redux";
import ModalUser from "../../../components/Modals/ModalUser";
import {openModal} from "../../../store/actions/modal"

class Materials extends React.Component {

  toggleModal = () => {
    console.log('pressed')
    this.props.openModal()
  }

  
  
  render(){
  return (
    <div className="jumbotron jumbotron-fluid">
      Materials
      <button onClick={this.toggleModal}>open </button>
              {this.props.modalOpenState && 
              <ModalUser onClose={this.toggleModal}/>
               }
    </div>
  );
}
}

function mapStateToProps(state) {
  return {
    
    modalOpenState: state.modal.modalOpenState
  };
}

function mapDispatchToProps(dispatch) {
  return {
  
    openModal: () => dispatch(openModal())
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Materials)