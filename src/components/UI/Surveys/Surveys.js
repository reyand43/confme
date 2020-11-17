import React, { Component } from "react";
import classes from "./Surveys.module.scss";
import { UserPhoto } from '../UserPhoto/UserPhoto'
import { SponsorLogo } from "../SponsorLogo/SponsorLogo";
import SurveyCard from "../SurveyCard/SurveyCard";



class Surveys extends Component{
    render(){
        return (
            <div className={classes.Surveys}>
                <div className={classes.Surveys__Title}>
                    Опросы
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
                <div className={classes.Surveys__List}>
                    <SurveyCard
                        title = "Очень важный опрос"
                    />
                    <SurveyCard
                        title = "Еще более важный опрос"
                    />                   
                    <SurveyCard
                        title = "Интересный опрос"
                    />                   
                    {/* <SurveyCard
                        title = "Скучный опрос"
                    />                   
                    <SurveyCard
                        title = "Просто опрос"
                    />                   */}
                </div>
            </div>
        )
    }
}

export default Surveys