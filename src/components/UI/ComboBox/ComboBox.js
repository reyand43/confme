import { Multiselect } from 'multiselect-react-dropdown';
import classes from './ComboBox.module.scss'
import React from 'react'

export const ComboBox = (props) => {
let state = {
    options: [{name: 'Srigar', id: 1},{name: 'Sam', id: 2},{name: 'Sam2', id: 3}, {name: 'Sam3', id: 4}, {name: 'Sam5', id: 5}]
};
 
 return(
<Multiselect
options={state.options} // Options to display in the dropdown
selectedValues={state.selectedValue} // Preselected value to persist in dropdown
//onSelect={onSelect} // Function will trigger on select event
//onRemove={onRemove} // Function will trigger on remove event
displayValue="name" // Property name to display in the dropdown options

/>
 )
}