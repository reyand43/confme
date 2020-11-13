import React, { Component } from "react";
import classes from "./SponsorMain_Top.module.scss";
import { UserPhoto } from '../UserPhoto/UserPhoto'
import { SponsorLogo } from "../SponsorLogo/SponsorLogo";



class SponsorMain_Top extends Component{
    render(){
        return (
            <div className={classes.SponsorMain_Top}>
                {/* <div className={classes.SponsorCard__Logo}>
                    {this.props.logo}
                </div> */}
                <div className={classes.SponsorMain_Top__Logo}>
                    <SponsorLogo size={'lg'} rounded={'true'}/>
                </div>
                <div className={classes.SponsorMain_Top__MainText}>
                    <div className={classes.SponsorMain_Top__MainText__Title}>
                        {this.props.title}
                    </div>
                    <div className={classes.SponsorMain_Top__MainText__Description}>
                        {this.props.description}
                    </div>
                    <div className={classes.SponsorMain_Top__MainText__Text}>
                        {this.props.text}
                    </div>
                </div>

            </div>
        )
    }
}

export default SponsorMain_Top