import React from "react";
import classes from "./Navbar.module.scss";
import { connect } from "react-redux";
import {fetchData} from '../../../store/actions/navbar'

import { NavLink } from "react-router-dom";
import { UserPhoto } from "../../UI/UserPhoto/UserPhoto";
import Input from "../../UI/Input/Input";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
    };
    
  }
  
    renderData(){
      
        return(
            <div className={classes.userInfo}>
            <NavLink exact to='/editProfile'>
                
                    <div className={classes.userInfoBlock}>
                     
                    <p>
                        
                        {localStorage.getItem('userName')}&nbsp; {localStorage.getItem('userSurname')}
  
                    </p>
                   <UserPhoto/>
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                    </div>
                   
                  </NavLink> 
                  </div>   
        )
    }
  

  componentDidMount() {
    console.log('NAAAV',localStorage)
    this.props.fetchData();
    
  }

  render() {
    return( 
    <div className={classes.Navbar}>

     
      {(localStorage.getItem('userId')!== 'null') ? this.renderData() : null}
        
         
      
        </div>
    )}
}


function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => dispatch(fetchData()),
  };
}

export default connect(null, mapDispatchToProps)(Navbar);
