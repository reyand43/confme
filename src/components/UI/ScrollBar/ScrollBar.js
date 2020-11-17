import React from 'react'
import Scrollbars from 'react-custom-scrollbars';

export const ScrollBar = (props) => {
   
    return <Scrollbars
    autoHide
    renderTrackVertical={({ style, ...props }) => (
      <div
        {...props}
        style={{
          ...style,
          backgroundColor: "rgba(0, 0, 0, 0.0)",
          right: "2px",
          bottom: "2px",
          top: "2px",
          borderRadius: "3px",
          width: "7px",
          
        }}
      />
    )}
    renderThumbVertical={({ style, ...props }) => (
      <div
        {...props}
        style={{
          ...style,
          width: "5px",
          borderRadius: "4px",
          boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.16)",
          backgroundColor: "rgba(73, 82, 166, 0.7)",
          
        }}
      />
    )}
  >
        {props.children}
    </Scrollbars>;
  };