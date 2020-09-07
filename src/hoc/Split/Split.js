import React from 'react'
import './Split.scss'

function Split(props) {
    return (
      <div className="Split">
        <div className="Split-left">
          {props.left}
        </div>
        <div className="Split-right">
          {props.right}
        </div>
      </div>
    );
  }

export default Split