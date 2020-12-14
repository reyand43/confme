import React from "react";
import classes from "./Users.module.scss";
import { UserItem } from "../../../components/UI/UserItem/UserItem";
import { connect } from "react-redux";
import { fetchUsers, setSearchedUsers } from "../../../store/actions/users";
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
import { ScrollBar } from "../../../components/UI/ScrollBar/ScrollBar";
import {ComboBox} from '../../../components/UI/ComboBox/ComboBox'
import {fetchTags} from '../../../store/actions/tags'

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: "",
      searchControls: {
        roleSearch: {
          all: {
            label: "Все",
            selected: true,
            name: "Все"
          },
          guests: {
            label: "Участники",
            name: "Участник",
            selected: false,
          },
          speakers: {
            label: "Спикеры",
            name: "Спикер",
            selected: false,
          },
          reps: {
            label: "Представители",
            name: "Представитель",
            selected: false,
          },
          orgs: {
            label: "Организаторы",
            name: "Оранизатор",
            selected: false,
          },
        },
        tagSearch: {
          tags: [],
        },
      },
    };
    
  }

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
    const searchControls2 = { ...this.state.searchControls };
    const roleSearch2 = { ...searchControls2.roleSearch };

    let selected = []
    for (name in roleSearch){
      if (roleSearch2[name].selected === true){
        selected.push(roleSearch2[name].name)
      }
    }
    const filter = this.props.users.filter((user) => {
      if (selected.includes("Все")){
        return (this.props.users);
      }
      else{
      return (user.AccountType.includes(selected[0] || selected[1] || selected[2] || selected[3] || selected[4]));
      }
    });
    
    this.props.setSearchedUsers(filter)
  };

  lookHandler = (array) => {
    const filter = this.props.users.filter((user) => {
      if (!!user.Look){
      return (user.Look.includes(array));}
      ///Здесь нужно починить неправильный массив!!!!
      //В базе данных разные id
      
    });
    
    this.props.setSearchedUsers(filter)
  };

  suggestHandler = (array) => {
    const filter = this.props.users.filter((user) => {
      if (!!user.Look){
      return (user.Suggest.includes(array));}
      ///Здесь нужно починить неправильный массив!!!!
      //В базе данных разные id
    });
    this.props.setSearchedUsers(filter)
  };

  openSideCard = (user) => {
    this.setState({
      selectedUser: user.id,
    });
    
    this.props.openUserCard(user);
  };

  renderUsers() {
    return this.props.searchedUsers.map((user) => {
      return (
        <li onClick={this.openSideCard.bind(this, user)} key={user.id}>
          <UserItem
            id={user.id}
            name={user.Name}
            surname={user.Surname}
            accountType={user.AccountType}
            clicked={this.state.selectedUser}
            profession={user.Profession}
            company={user.Company}
          />
        </li>
      );
    });
  }

  

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchTags()
  }

  componentWillUnmount(){
    this.props.closeUserCard()
  }


  render() {
    return (
      <>
        <BGMain>
          <div className={classes.UserList}>
            <SearchInput
            update={this.updateData}
              placeholder="Введите имя, компанию, сферу деятельности или интересы..."
            />
            <div className={classes.UserList__FindLabel}>
              
              <span>Найдено {this.props.users.length} </span>
              {this.props.users.length % 10 === ( 2 || 3 || 4) ? <span>человека</span> : <span>человек</span>}
            </div>
            <div className={classes.UserList__List}>
              {this.props.loading ? (
                <Loader />
              ) : (
                <ScrollBar>
                  <ul>{this.renderUsers()}</ul>
                </ScrollBar>
              )}
            </div>
          </div>
        </BGMain>
        <BGSide padding={true}>
          <div className={classes.Aside}>
            {this.props.user != null ? (
              <div>
                <div className={classes.Aside__CloseButton}>
                  <i
                    onClick={this.props.closeUserCard}
                    className="fa fa-times"
                  ></i>
                </div>

                <UserCard user={this.props.user} />
              </div>
            ) : (
              <div className={classes.Settings}>
                <div className={classes.Settings__RoleSearch}>
                  <ul>{this.renderRoleSearch()}</ul>
                </div>
                <div className={classes.Settings__Tags}>
                  <span className={classes.Settings__Tags__Title}>Я ищу</span>
                  <div className={classes.Settings__Tags__Select}>
                    <ComboBox id={"look"} tags={this.props.tags} onChange={this.lookHandler}/>
                  </div>
                </div>
                <div className={classes.Settings__Tags}>
                  <span className={classes.Settings__Tags__Title}>Я предлагаю</span>
                  <div className={classes.Settings__Tags__Select}>
                  <ComboBox  id={"suggest"} tags={this.props.tags} onChange={this.suggestHandler}/>
                  </div>
                </div>
                {/* <div className={classes.Settings__Tags}>
                  <span>Регион</span>
                  <div className={classes.Settings__Tags__Select}>
                  <ComboBox/>
                  </div>
                </div> */}
                
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
    searchedUsers: state.users.searchedUsers,
    users: state.users.users,
    loading: state.users.loading,
    modalOpenState: state.modal.modalOpenState,
    user: state.openUserCard.user,
    tags: state.tags.tags
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openUserCard: (user) => dispatch(openUserCard(user)),
    closeUserCard: () => dispatch(closeUserCard()),
    fetchUsers: () => dispatch(fetchUsers()),
    setSearchedUsers: (filter) => dispatch(setSearchedUsers(filter)),
    fetchTags: ()=>dispatch(fetchTags())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
