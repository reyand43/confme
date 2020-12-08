import React from 'react'
import classes from './Split.module.scss'

function Split(props) {
    return (
      
      <div className={classes.Split}>
        {props.children}
      </div>
    );
  }

export default Split