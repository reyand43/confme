import React, { Component } from "react";
import classes from "./Presentations.module.scss";
import { UserPhoto } from '../UserPhoto/UserPhoto'
import { SponsorLogo } from "../SponsorLogo/SponsorLogo";
import PresentationCard from "../PresentationCard/PresentationCard";



class Presentations extends Component{
    render(){
        return (
            <div className={classes.Presentations}>
                <div className={classes.Presentations__Title}>
                    Презентации
                </div>
                {/* <div className={classes.SponsorMain_Top__Logo}>
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
                </div> */}
                <div className={classes.Presentations__List}>
                    <PresentationCard
                        title = "Очень интересная презентация"
                    />
                    <PresentationCard
                        title = "Классная презентация"
                    />                   
                    <PresentationCard
                        title = "Красивая презентация"
                    />                   
                </div>
            </div>
        )
    }
}

export default Presentations