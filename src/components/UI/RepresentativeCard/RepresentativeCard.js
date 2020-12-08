import React, { Component } from "react";
import classes from "./RepresentativeCard.module.scss";
import { UserPhoto } from "../UserPhoto/UserPhoto";
import { SponsorLogo } from "../SponsorLogo/SponsorLogo";
import { NavLink } from "react-router-dom";

export const RepresentativeCard = (props) => {
  return (
    <div className={classes.RepresentativeCard}>
      <div className={classes.RepresentativeCard__Photo}>
        <UserPhoto size={"md"} rounded={"true"} />
      </div>
      <div className={classes.RepresentativeCard__TextBlock}>
        <div className={classes.RepresentativeCard__TextBlock__Name}>
          {props.name}&nbsp;{props.surname}
        </div>
        <div className={classes.RepresentativeCard__TextBlock__Career}>
          {props.career}
        </div>
        <div className={classes.RepresentativeCard__TextBlock__Message}>
          <NavLink to={"/dialogs/" +props.id}>
            <span>Написать сообщение</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
