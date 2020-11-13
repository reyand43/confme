import React, { Component } from "react";
import classes from "./SponsorMain_Representatives.module.scss";
import { UserPhoto } from '../UserPhoto/UserPhoto'
import { SponsorLogo } from "../SponsorLogo/SponsorLogo";
import RepresentativeCard from "../RepresentativeCard/RepresentativeCard";



class SponsorMain_Representatives extends Component{
    render(){
        return (
            <div className={classes.SponsorMain_Representatives}>
                <div className={classes.SponsorMain_Representatives__Title}>
                    Представители
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
                <div className={classes.SponsorMain_Representatives__Grid}>
                    <RepresentativeCard
                        name = "Наталья Рыбченко"
                        career = "Должность"
                    />
                    <RepresentativeCard
                        name = "Вася Пупкин"
                        career = "Другая должность"
                    />                    
                    <RepresentativeCard
                        name = "Пупка Васин"
                        career = "Еще одна должность"
                    />                    
                    <RepresentativeCard
                        name = "Андрей Бабушкин"
                        career = "И еще одна должность"
                    />                    
                    <RepresentativeCard
                        name = "Владислав Жаворонков"
                        career = "Должность"
                    />                    
                    <RepresentativeCard
                        name = "Никита Папенков"
                        career = "Должность"
                    />
                </div>
            </div>
        )
    }
}

export default SponsorMain_Representatives