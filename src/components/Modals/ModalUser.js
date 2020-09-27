import React from 'react'
import ReactDOM from 'react-dom'
import { UserPhoto } from '../UI/UserPhoto/UserPhoto';

import classes from './ModalUser.module.scss'

export default class ModalUser extends React.Component{
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
                <p>NameSurname</p>
                    </div>
                
                
            </div>,
            this.root
        )
    }
}