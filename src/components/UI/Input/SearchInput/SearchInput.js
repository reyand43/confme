import React from "react";
import classes from './SearchInput.module.scss'



const SearchInput = (props) => {
    return(
      <div className={classes.SearchInput}>
        <div className={classes.SearchInput__Icon}>
          <i className="fa fa-search" aria-hidden="true"></i>
          </div>
          <input placeholder={props.placeholder}/>
          
          </div>
    )
}

export default SearchInput