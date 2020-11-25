import React, { Component } from "react";
import classes from "./SponsorMain_Materials.module.scss";
import { UserPhoto } from '../UserPhoto/UserPhoto'
import { SponsorLogo } from "../SponsorLogo/SponsorLogo";
import Surveys from "../Surveys/Surveys";
import Presentations from "../Presentations/Presentations";



export const SponsorMain_Materials =(props)=>{
      return(
            <div className={classes.SponsorMain_Materials}>
                <div className={classes.SponsorMain_Materials__Title}>
                    Материалы
                </div>
                <div className={classes.SponsorMain_Materials__TwoBlocks}>
                    <Surveys id={props.id}/>
                    <Presentations/>
                </div>
            </div>
        )
}
