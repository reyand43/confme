import React, { Component } from "react";
import classes from "./SponsorCard.module.scss";
import { UserPhoto } from '../UserPhoto/UserPhoto'
import { SponsorLogo } from "../SponsorLogo/SponsorLogo";



class SponsorCard extends Component{
    render(){
        return (
            <div className={classes.SponsorCard}>
                {/* <div className={classes.SponsorCard__Logo}>
                    {this.props.logo}
                </div> */}
                <div className={classes.SponsorCard__Logo}>
                    <SponsorLogo size={'md'} rounded={'true'}/>
                </div>
                <div className={classes.SponsorCard__Title}>
                    {this.props.title}
                </div>
                <div className={classes.SponsorCard__Description}>
                    {this.props.description}
                </div>
            </div>
        )
    }
}

export default SponsorCard