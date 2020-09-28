import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UserPhoto } from '../UI/UserPhoto/UserPhoto';

import classes from './ModalUser.module.scss'

class ModalUser extends React.Component{
    state = {
        isModalOpen: true
      }
    componentWillMount(){
        this.root = document.createElement('div');
        document.body.appendChild(this.root)
    }
    componentWillUnmount(){
        document.body.removeChild(this.root)
    }

   
    toggleModal = () => {
        console.log('pressed')
        this.setState(state => ({isModalOpen: !state.isModalOpen}))
      }

    render(){
        return ReactDOM.createPortal(
            <div  className={classes.ModalUser}>
                <div className={classes.UserCard}>
                <i className="fa fa-times" aria-hidden="true"  onClick={this.props.onClose}></i>
                <div className={classes.UserCard__UserPhoto}/>
                <p>{this.props.user.name}&nbsp;{this.props.user.surname}</p>
                    </div>
                    <NavLink to={"/user/" + this.props.user.id}>
                    <button>Send message</button></NavLink>
                    send
                    <p>{this.props.user.age}</p>
                
                
            </div>,
            this.root
        )
    }
}

function mapStateToProps(state) {
    return {
      user: state.modal.user,
      
    };
  }

export default connect(mapStateToProps, null)(ModalUser)