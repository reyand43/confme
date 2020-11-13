import React, { Component } from "react";
import classes from "./RepresentativeCard.module.scss";
import { UserPhoto } from '../UserPhoto/UserPhoto'
import { SponsorLogo } from "../SponsorLogo/SponsorLogo";
import { NavLink } from "react-router-dom";




class RepresentativeCard extends Component{
    render(){
        return (
            <div className={classes.RepresentativeCard}>
                {/* <div className={classes.SponsorCard__Logo}>
                    {this.props.logo}
                </div> */}
                <div className={classes.RepresentativeCard__Photo}>
                    <UserPhoto size={'lg'} rounded={'true'}/>
                </div>
                <div className={classes.RepresentativeCard__TextBlock}>
                    <div className={classes.RepresentativeCard__TextBlock__Name}>
                        {this.props.name}
                    </div>
                    <div className={classes.RepresentativeCard__TextBlock__Career}>
                        {this.props.career}
                    </div>
                    <div className={classes.RepresentativeCard__TextBlock__Massage}>
                        <NavLink to={"/dialogs/" /*+props.id*/}><span>Написать сообщение</span></NavLink>
                    </div>

                </div>

            
            </div>
        )
    }
}

export default RepresentativeCard