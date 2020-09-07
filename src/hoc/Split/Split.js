import React from 'react'
import './Split.css'

function Split(props) {
    return (
      <div className="Split">
        {props.children}
      </div>
    );
  }

export default Split