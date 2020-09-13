import React from "react";
import classes from "./Users.module.scss";
import { UserItem } from "../../../components/UI/UserItem/UserItem";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUsers } from "../../../store/actions/users";

class Users extends React.Component {
  renderUsers() {
    return this.props.users.map((user) => {
      console.log("users", this.props.users);
      return (
        <li key={user.id}>
          <NavLink to={"/users/" + user.id}>
            <UserItem name={user.name} surname={user.surname} />
          </NavLink>
        </li>
      );
    });
  }

    renderUsers() {
        return this.props.users.map((user) => {
          return (
            <li key={user.id}>
              <NavLink to={"/users/" + user.id}><UserItem name={user.name} surname={user.surname}/></NavLink>
            </li>
          );
        });
      }
    
      componentDidMount() {
    this.props.fetchUsers()
      }

  render() {
    return (
      <div className={classes.Users}>
        <div>
          <h1>Список пользователей</h1>

          {this.props.loading /* && this.props.quizes.length !== 0 */ ? (
            <p>Loading</p>
          ) : (
            <ul>{this.renderUsers()}</ul>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return{
      users: state.users.users,
      loading: state.users.loading
    }
    }
    
function mapDispatchToProps(dispatch){
      return{
        fetchUsers: () => dispatch(fetchUsers())
      }
    }

export default connect(mapStateToProps, mapDispatchToProps)(Users);
