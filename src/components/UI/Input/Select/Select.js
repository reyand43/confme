import React from 'react'
import classes from './Select.module.scss'



const Select = (props) => {
    return(
      <div className={classes.Select}>
        <label>{props.label} </label>
          <select placeholder={props.placeholder}/>
          <option value="" disabled defaultValue>Не выбрано</option>
            <option value="Man">{props.values[0]}</option>
            <option value="Woman">{props.values[0]}</option>
          </div>
    )
}

export default SearchInput