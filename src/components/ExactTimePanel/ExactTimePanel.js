import React from 'react'
import classes from './ExactTimePanel.module.scss';

const Panel = (props) => {

    return(
        <div className = {classes.Panel} style={{paddingBottom: props.panelBottom}}>
          <div className={classes.Panel__Row}>
            <div className={classes.Panel__ColumnTime}  >
              <div className={classes.Panel__ColumnTime__Time} style={{borderRadius: props.timeBorder}}>
                <p>{props.time}</p>
              </div>
            </div>
            <div className={classes.Panel__ColumnEvent}>
              <div className={classes.Panel__ColumnEvent__Event}  style={{borderRadius: props.eventBorder}}>

              </div>
            </div>
          </div>
        </div>
    )
}

export default Panel;
