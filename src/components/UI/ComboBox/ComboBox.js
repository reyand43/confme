import { Multiselect } from "multiselect-react-dropdown";
import classes from "./ComboBox.module.scss";
import React from "react";

export const ComboBox = (props) => {
  const multiselectRef = React.createRef()
  let state = {
    options: [],
  };
  
 let border = 'none'
 if (props.border)
 {border = `${props.border}`}
 
  return (
    <Multiselect
    
    ref={multiselectRef}
    id={props.id}
      options={props.tags} // Options to display in the dropdown
      selectedValues={state.selectedValue} // Preselected value to persist in dropdown
      displayValue="name" // Property name to display in the dropdown options
      className = {classes.ComboBox}
      onSelect = {() => {props.onChange(multiselectRef.current.getSelectedItems())}}
      placeholder={"Выберите теги"}
      style={{
        searchBox: {
          background: "white",
          border: `${border}`,
          borderRadius: "5px",
          width: `${props.width}`,
          boxSizing: 'border-box',
          padding: '3px',
          
        },
        chips: {
          fontSize: "13px",
          background: " #4952A6",
        },
        
        
        
      }}
    />
  );
};
