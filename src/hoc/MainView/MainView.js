import React from 'react'
import classes from './MainView.module.scss'

function MainView(props) {
    return (
      <div className={classes.MainView}>
        {props.children}
      </div>
    );
  }

export default MainView