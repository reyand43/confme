import React, { Component } from "react";
import classes from "./SponsorMain_Materials.module.scss";
import { UserPhoto } from '../UserPhoto/UserPhoto'
import { SponsorLogo } from "../SponsorLogo/SponsorLogo";
import Surveys from "../Surveys/Surveys";
import Presentations from "../Presentations/Presentations";



class SponsorMain_Materials extends Component{
    render(){
        return (  
            <div className={classes.SponsorMain_Materials}>
                <div className={classes.SponsorMain_Materials__Title}>
                    Материалы
                </div>
                <div className={classes.SponsorMain_Materials__TwoBlocks}>
                    <Surveys/>
                    <Presentations/>
                </div>
            </div>
        )
    }
}

export default SponsorMain_Materials