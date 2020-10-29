import React from 'react'
import classes from './DateChanger.module.scss';

const DateChanger = (props) => {

    return(
        <div className = {classes.DateChanger}>
          <div className={classes.Row}>
            <div className={classes.column}>
              <input type="button" value="<"/>
            </div>
            <div className={classes.column} style={{paddingTop: "0.32%"}}>
              <input type="image" src="../../../images/userPhoto.jpg"/>
            </div>
            <div className={classes.column} style={{paddingTop: "0.32%"}}>
              29 октября 2020
            </div>
            <div className={classes.column}>
              <input type="button" value=">"/>
            </div>
          </div>
        </div>
    )
}

export default DateChanger;
