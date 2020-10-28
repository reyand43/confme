import React from 'react'
import classes from './ExactTimePanel.module.scss';

const Panel = (props) => {

    return(
        <div className = {classes.Panel} style={{marginBottom: props.panelBottom, marginTop: props.panelTop}}>
          <div className={classes.Row}>
            <div className={classes.column}>
              <div className={classes.Time} style={{borderRadius: props.timeBorder}}>
                <p>{props.time}</p>
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.Event} style={{borderRadius: props.eventBorder}}>
                <p>{props.event}</p>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Panel;
