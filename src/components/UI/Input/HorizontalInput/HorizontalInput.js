import React from "react";
import classes from "./HorizontalInput.module.scss";

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid;
}

const HorizontalInput = (props) => {
  const inputType = props.type || "text";
  const cls = [classes.HorizontalInput, classes[props.width]];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  if (!!props.small) {
    cls.push(classes.small);
  }

  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <div className={classes.HorizontalInput__Field}>
        <input
          placeholder={props.placeholder}
          type={inputType}
          id={htmlFor}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          style={{ width: props.width }}
        />
        {isInvalid(props) && !!props.noSpan ? (
          <span>{props.errorMessage || "Введите верное значение"}</span>
        ) : null}
      </div>
    </div>
  );
};

export default HorizontalInput;
