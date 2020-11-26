import React, { Component } from "react";
import classes from "./SurveyCard.module.scss";
import { UserPhoto } from '../UserPhoto/UserPhoto'
import { SponsorLogo } from "../SponsorLogo/SponsorLogo";
import { NavLink } from "react-router-dom";

export const SurveyCard = (props) => {
        return (
            <div className={classes.SurveyCard}>
                {/* <div className={classes.SurvayCard__Logo}>
                    {this.props.logo}
                </div> */}
                <div className={classes.SurveyCard__Icon}>
                    <i className="fa fa-calendar fa-lg" aria-hidden="true"></i>
                </div>
                <div className={classes.SurveyCard__TextBlock}>
                    <div className={classes.SurvayCard__TextBlock__Title}>
                        {props.title}
                    </div>
                    <div className={classes.SurveyCard__TextBlock__TakeTheSurvey}>
                        <NavLink to={"/quiz/" + props.id}><span>Пройти опрос</span></NavLink>
                    </div>
                </div>
            </div>
        )
}
