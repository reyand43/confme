import React, { Component } from "react";
import classes from "./PresentationCard.module.scss";
import { UserPhoto } from '../UserPhoto/UserPhoto'
import { SponsorLogo } from "../SponsorLogo/SponsorLogo";
import { NavLink } from "react-router-dom";




class PresentationCard extends Component{
    render(){
        return (
            <div className={classes.PresentationCard}>
                {/* <div className={classes.SurvayCard__Logo}>
                    {this.props.logo}
                </div> */}
                <div className={classes.PresentationCard__TextBlock}>
                    <div className={classes.SurvayCard__TextBlock__Title}>
                        {this.props.title}
                    </div>
                    <div className={classes.PresentationCard__TextBlock__Download}>
                        <NavLink to={"/100" /*+props.id*/}><span>Загрузить</span></NavLink>
                    </div>

                </div>
                <div className={classes.PresentationCard__Icon}>
                    <i className="fa fa-calendar fa-lg" aria-hidden="true"></i>
                </div>

            
            </div>
        )
    }
}

export default PresentationCard