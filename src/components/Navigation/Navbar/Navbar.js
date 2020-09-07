import React, { useCallback, useState } from "react";
import classes from "./Navbar.module.scss";
import { connect } from "react-redux";
import {fetchData} from '../../../store/actions/navbar'
import firebase from 'firebase'
import { NavLink } from "react-router-dom";
import { UserPhoto } from "../../UI/UserPhoto/UserPhoto";

class Navbar extends React.Component {
  
    renderData(){
        return(
            <div className={classes.userInfo}>
            <NavLink exact to='/editProfile'>
                
                    <div className={classes.userInfoBlock}>
                    <p>
                        
                        {localStorage.getItem('name')}&nbsp; {localStorage.getItem('surname')}

                    </p>
                   <UserPhoto/>
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                    </div>
                   
                  </NavLink> 
                  </div>   
        )
    }
  

  componentDidMount() {
      console.log('componentDidMount')
      console.log('props', this.props)
      
    this.props.fetchData();
    
  }

  render() {
    return( 
    <div className={classes.Navbar}>
      {this.props.isAuthenticated ? this.renderData() : null}
        
          
      
        </div>
    )}
}

function mapStateToProps(state) {
  return {
    name: state.name,
    surname: state.surname,
    loading: state.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => dispatch(fetchData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
