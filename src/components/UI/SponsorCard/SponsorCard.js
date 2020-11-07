import React, { Component } from "react";
import classes from "./SponsorCard.module.scss";
import { UserPhoto } from '../UserPhoto/UserPhoto'
import { SponsorLogo } from "../SponsorLogo/SponsorLogo";



class SponsorCard extends Component{
    // constructor(props) {
    //     super(props);
    //     this.speakers = this.props.speakers;
    //   }


    render(){

    return (
        <div className={classes.SponsorCard}>
            {/* <div className={classes.SponsorCard__Logo}>
                {this.props.logo}
            </div> */}
            <div className={classes.SponsorCard__Logo}>
                <SponsorLogo size={'lg'} rounded={'true'}/>
            </div>
            <div className={classes.SponsorCard__Title}>
                {this.props.title}
            </div>
            <div className={classes.SponsorCard__Text}>
                {this.props.text}
            </div>


        </div>
    )
}}

export default SponsorCard