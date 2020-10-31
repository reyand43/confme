import React from "react";
import classes from './AuthInput.module.scss'


function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched 
  }

const AuthInput = (props) => {
  const inputType = props.type || "text";
  const cls = [classes.AuthInput];
  const htmlFor = `${inputType}-${Math.random()}`;
    if(isInvalid(props)) {
    cls.push(classes.invalid)
    }

    return(
      <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        placeholder={props.placeholder}
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        style={{width: props.width}}

      />

      {
          isInvalid(props) ? <span>{props.errorMessage || 'Введите верное значение'}</span> : null
      }

      
    </div>
    )
}

export default AuthInput