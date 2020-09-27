import React from "react";
import classes from "./Users.module.scss";
import { UserItem } from "../../../components/UI/UserItem/UserItem";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUsers } from "../../../store/actions/users";
import {Tag} from '../../../components/UI/Tag/Tag'
import { openModal } from "../../../store/actions/modal";
import ModalUser from "../../../components/Modals/ModalUser";

class Users extends React.Component {

 toggleModal = () => {
    console.log('pressed')
    this.props.openModal()
  }


  renderUsers() {
    return this.props.users.map((user) => {
      console.log('user', this.props.users);
      
      return (
        <li onClick={this.toggleModal} key={user.id}>
          
            <UserItem name={user.name} surname={user.surname} accountType = {user.accountType}/>
            
        </li>
      );
    });
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div className={classes.Users}>
        <div className={classes.ListOfUsers}>
          <div className={classes.ListOfUsers__SearchBlock}>
          <i className="fa fa-search" aria-hidden="true"></i>
          <input placeholder='Введите имя, компанию, сферу деятельности или интересы...' />
          </div>
          <div className={classes.ListOfUsers__ListBlock}>
          <h1>Список пользователей</h1>

          {this.props.loading ? (
            <p>Loading</p>
          ) : (
            <ul>{this.renderUsers()}</ul>
          )}
          {this.props.modalOpenState && 
              <ModalUser onClose={this.toggleModal}/>
               }
        </div>
      </div>
      <div className={classes.Settings}>
        <div className={classes.Settings__ChooseUsers}>
          <p>Все участники</p>
          <hr/>
          <p>Гости</p>
          <p>Представители компании</p>
          <p>Спикеры</p>
        </div>
        <div className={classes.Settings__ChooseTags}>
          <div className={classes.Settings__ChooseTags__Title}>
            Выберете теги
            </div>
            <div className={classes.Settings__ChooseTags__SearchBlock}>
            
          <i className="fa fa-search" aria-hidden="true"></i>
          <input placeholder='Введите тег' />
          <i className="fa fa-chevron-down" aria-hidden="true"></i>
          </div>
            
            <div className={classes.Settings__ChooseTags__TagBlock}>
              <Tag text='Java' deleted='true'/>
              <Tag text='C++' deleted='true'/>
              </div>
            </div>
            <div className={classes.Settings__SearchSettings}>
              Расширенный поиск
              <i class="fa fa-sliders" aria-hidden="true"></i>
            </div>
        

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return{
      users: state.users.users,
      loading: state.users.loading,
      modalOpenState: state.modal.modalOpenState
    }
    }
    
function mapDispatchToProps(dispatch){
      return{
        fetchUsers: () => dispatch(fetchUsers()),
        openModal: () => dispatch(openModal())
      }
    }

export default connect(mapStateToProps, mapDispatchToProps)(Users);
