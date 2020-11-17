import React from "react";
import { connect } from "react-redux";
import { setSearchedUsers } from "../../../../store/actions/users";
import classes from './SearchInput.module.scss'



class SearchInput extends React.Component{


  dataSearch = (e) => {
    const value = e.target.value.toLowerCase();

    const filter = this.props.users.filter((user) => {
      return (user.Name.toLowerCase().includes(value) || user.Surname.toLowerCase().includes(value));
    });
    
    this.props.setSearchedUsers(filter)


  };
render(){
    return(
      <div className={classes.SearchInput}>
        <div className={classes.SearchInput__Icon}>
          <i className="fa fa-search" aria-hidden="true"></i>
          </div>
          <input onChange={this.dataSearch} placeholder={this.props.placeholder}/>
          
          </div>
    )
}
}
function mapStateToProps(state){
  return{
    users: state.users.users
  }
}

function mapDispatchToProps(dispatch){
  return{
    setSearchedUsers: (filter) => dispatch(setSearchedUsers(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)