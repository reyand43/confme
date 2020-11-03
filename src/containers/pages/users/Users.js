import React from "react";
import classes from "./Users.module.scss";
import { UserItem } from "../../../components/UI/UserItem/UserItem";
import { connect } from "react-redux";
import { fetchUsers } from "../../../store/actions/users";
import { BGMain } from "../../../components/UI/BGMain/BGMain";
import { BGSide } from "../../../components/UI/BGSide/BGSide";
import SearchInput from "../../../components/UI/Input/SearchInput/SearchInput";
import { UserCard } from "../../../components/UI/UserCard/UserCard";
import {
  openUserCard,
  closeUserCard,
} from "../../../store/actions/openUserCard";
import { RoleSearchListItem } from "../../../components/UI/RoleSearchListItem/RoleSearchListItem";
import { Loader } from "../../../components/UI/Loader/Loader";

class Users extends React.Component {
  state = {
    selectedUser: "",
    searchControls: {
      roleSearch: {
        all: {
          label: "Все",
          selected: true,
        },
        guests: {
          label: "Участники",
          selected: false,
        },
        speakers: {
          label: "Спикеры",
          selected: false,
        },
        reps: {
          label: "Представители",
          selected: false,
        },
        orgs: {
          label: "Организаторы",
          selected: false,
        },
      },
      tagSearch: {
        tags: [],
      },
    },
  };

  renderRoleSearch() {
    return Object.keys(this.state.searchControls.roleSearch).map(
      (controlName, index) => {
        const control = this.state.searchControls.roleSearch[controlName];
        return (
          <div
            key={controlName + index}
            onClick={() => this.selectRole(controlName)}
          >
            <li>
              <RoleSearchListItem
                selected={control.selected}
                label={control.label}
              />
            </li>
          </div>
        );
      }
    );
  }

  selectRole = (controlName) => {
    const searchControls = { ...this.state.searchControls };
    const roleSearch = { ...searchControls.roleSearch };
    const role = { ...roleSearch[controlName] };

    if (controlName === "all") {
      if (role.selected === false) {
        for (var name in roleSearch) {
          roleSearch[name].selected = false;
          roleSearch["all"].selected = true;
          role.selected = !role.selected;
        }
      }
    } else {
      role.selected = !role.selected;
      roleSearch["all"].selected = false;
    }

    searchControls.roleSearch[controlName] = role;
    this.setState({
      searchControls,
    });
  };

  openSideCard = (user) => {
    this.setState({
      selectedUser: user.id,
    });
    console.log(this.state);
    this.props.openUserCard(user);
  };

  renderUsers() {
    return this.props.users.map((user) => {
      return (
        <li onClick={this.openSideCard.bind(this, user)} key={user.id}>
          <UserItem
            id={user.id}
            name={user.name}
            surname={user.surname}
            accountType={user.accountType}
            clicked={this.state.selectedUser}
          />
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
            <SearchInput placeholder="Введите имя, компанию, сферу деятельности или интересы..." />
            <div className={classes.UserList__FindLabel}>
              <span>Найдено 1763 человека</span>
            </div>
            <div className={classes.UserList__List}>
              {this.props.loading ? (
                <Loader/>
              ) : (
                <ul>{this.renderUsers()}</ul>
              )}
            </div>
          </div>
        </BGMain>
        <BGSide>
          <div className={classes.Aside}>
            {this.props.user != null ? (
              <div>
                
                <div className={classes.Aside__CloseButton}>
                  <i
                    onClick={this.props.closeUserCard}
                    className="fa fa-times"
                  ></i>
                </div>

                <UserCard
                  name={this.props.user.name}
                  surname={this.props.user.surname}
                  city={this.props.user.city}
                  country={this.props.user.country}
                  role={this.props.user.accountType}
                  id={this.props.user.id}
                />
              </div>
            ) : (
              <div className={classes.Settings}>
                <div className={classes.Settings__RoleSearch}>
                  <ul>{this.renderRoleSearch()}</ul>
                </div>
                <div className={classes.Settings__Tags}>
                  <span>Я ищу</span>
                  <div className={classes.Settings__Tags__Select}>
                    <input />
                  </div>
                </div>
                <div className={classes.Settings__Tags}>
                  <span>Я предлагаю</span>
                  <div className={classes.Settings__Tags__Select}>
                    <input />
                  </div>
                </div>
                <div className={classes.Settings__Tags}>
                  <span>Регион</span>
                  <div className={classes.Settings__Tags__Select}>
                    <input />
                  </div>
                </div>
              </div>
            )}
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
    openUserCard: (user) => dispatch(openUserCard(user)),
    closeUserCard: () => dispatch(closeUserCard()),
    fetchUsers: () => dispatch(fetchUsers()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);