import React from "react";
import classes from "./Users.module.scss";
import { UserItem } from "../../../components/UI/UserItem/UserItem";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUsers } from "../../../store/actions/users";
import { Tag } from "../../../components/UI/Tag/Tag";
import { toggleModal } from "../../../store/actions/modal";
import ModalUser from "../../../components/Modals/ModalUser";
import { BGMain } from "../../../components/UI/BGMain/BGMain";
import { BGSide } from "../../../components/UI/BGSide/BGSide";
import SearchInput from "../../../components/UI/Input/SearchInput/SearchInput";
import { UserCard } from "../../../components/UI/UserCard/UserCard";
import { openUserCard, closeUserCard } from "../../../store/actions/openUserCard";


class Users extends React.Component {



  openSideCard = (user) => {
    this.props.openUserCard(user)
  };


//     return(
// <UserCard name="Арина Грозных" city="Санкт-Петербург" country="Россия" role="Участник"/>
//     )
// }

  renderUsers() {
    return this.props.users.map((user) => {
      return (
        <li onClick={this.openSideCard.bind(this, user)} key={user.id}>
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
      <>
      <BGMain>
        <div className={classes.UserList}>
        <SearchInput placeholder="Введите имя, компанию, сферу деятельности или интересы..."/>
        <div className={classes.UserList__FindLabel}>
          <span>Найдено 1763 человека</span>
        </div>
        <div className={classes.UserList__List}>
        {this.props.loading ? (
              <p>Loading</p>
            ) : (
              <ul>{this.renderUsers()}</ul>
            )}
        </div>
        </div>
      </BGMain>
      <BGSide>
      <div className={classes.Aside}>
              {this.props.user != null && 
              <>
                
            <i onClick={this.props.closeUserCard} className="fa fa-times"></i>
            
              <UserCard 
              name={this.props.user.name} 
              surname={this.props.user.surname} 
              city={this.props.user.city} 
              country={this.props.user.country} 
              role={this.props.user.accountType}
              id={this.props.user.id}/>
              </>
              }
              </div>
      </BGSide>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.users,
    loading: state.users.loading,
    modalOpenState: state.modal.modalOpenState,
    user: state.openUserCard.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openUserCard: (user)=> dispatch(openUserCard(user)),
    closeUserCard: ()=>dispatch(closeUserCard()),
    fetchUsers: () => dispatch(fetchUsers()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);


{/* <div className={classes.Users}>
        <div className={classes.ListOfUsers}>
          <div className={classes.ListOfUsers__SearchBlock}>
            <i className="fa fa-search" aria-hidden="true"></i>
            <input placeholder="Введите имя, компанию, сферу деятельности или интересы..." />
          </div>
          <div className={classes.ListOfUsers__ListBlock}>
            <h1>Список пользователей</h1>

            {this.props.loading ? (
              <p>Loading</p>
            ) : (
              <ul>{this.renderUsers()}</ul>
            )}
            {this.props.modalOpenState && (
              <ModalUser
                onClose={this.toggleModal}
                user={this.props.user}
                accountType={this.props.user.accountType}
              />
            )}
          </div>
        </div>
        <div className={classes.Settings}>
          <div className={classes.Settings__ChooseUsers}>
            <p>Все участники</p>
            <hr />
            <p>Гости</p>
            <p>Представители компании</p>
            <p>Спикеры</p>
          </div>

          <div className={classes.Settings__ChooseTags}>
            <div className={classes.Settings__ChooseTags__Title}>
              Выберете теги
            </div>
            <div className={classes.Settings__SearchSettings}>
              Расширенный поиск
              <i className="fa fa-sliders" aria-hidden="true"></i>
            </div>

            <div className={classes.Settings__ChooseTags__TagBlock}>
              <Tag text="Java" deleted="true" />
              <Tag text="C++" deleted="true" />
            </div>
          </div>
          <div className={classes.Settings__SearchSettings}>
            Расширенный поиск
            <i className="fa fa-sliders" aria-hidden="true"></i>
          </div>
        </div>
      </div> */}