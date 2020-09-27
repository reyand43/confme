import React from "react";
import classes from './SearchInput.module.scss'


function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched 
  }

const Input = (props) => {
    return(
      <div className={classes.ListOfUsers__SearchBlock}>
          <i className="fa fa-search" aria-hidden="true"></i>
          <input placeholder={props.placeholder}/>
          </div>
    )
}

export default Input