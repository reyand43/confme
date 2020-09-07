import React from 'react'
import './Split.scss'

function Split(props) {
    return (
      <div className="Split">
        {props.children}
      </div>
    );
  }

export default Split