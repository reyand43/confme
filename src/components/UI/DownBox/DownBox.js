import React, { Component } from "react";
import classes from "./DownBox.module.scss";

import { useState } from "react";

export function DownBox(props) {
  //получаем props

  const [open, setOpen] = useState(false); //хук состояния, есть переменная open, и метод setOpen, дефолтно она равна false

  return (
    <div onClick={() => setOpen(!open)} className={classes.DownBox}>
      {" "}
      {/* на онклике меняем значение стейта на противоположное */}
      <div className={classes.DownBox__Title}>
        {/* Вставляем title из props */}
        <span>{props.title}</span>
        {/* В зависимости от состояния хука меняем иконку */}
        {!open ? (
          <i className={"fa fa-chevron-down"} aria-hidden="true"></i>
        ) : (
          <i className={"fa fa-chevron-up"} aria-hidden="true"></i>
        )}
      </div>
      {/* В зависимости от состояния хука показываем текст из props */}
      {open && props.title === "Карьера" && (
        <div className={classes.DownBox__Content}>
          <p>
            {props.prof}&nbsp; в&nbsp;
            {props.work}
          </p>
          <a href={props.workLink} target="_blank">
            {props.workLink}
          </a>
        </div>
      )}
      {open && props.title === "Контакты" && (
        <div className={classes.DownBox__Content}>
          {props.tel && <span>Тел:&nbsp;{props.tel}</span>}
          {props.email && <span>Email:&nbsp;{props.email}</span>}
          {props.vk && (
            <a href={props.vk} target="_blank">
              VK
            </a>
          )}
        </div>
      )}
      {/* {open && props.title === "Интересы" && (
        <div className={classes.DownBox__Content}>
          {props.look && <span>Я ищу:&nbsp;{props.look}</span>}
          {props.suggest && <span>Я предлагаю:&nbsp;{props.suggest}</span>}
          {props.hobby && <span>Интересы:&nbsp;{props.hobby}</span>}
          
        </div>
      )} */}
    </div>
  );
}
