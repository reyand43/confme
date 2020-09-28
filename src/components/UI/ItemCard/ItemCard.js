import React from "react";
import classes from "./ItemCard.module.scss";

export const ItemCard = (props) => {

    return(
        <div className = {classes.SponsorItem}>
            <div className = {classes.SponsorItem__Photo}>

            </div>
            <div className = {classes.SponsorItem__Texts}>
                <h1>Николай Наумов</h1>
                <p>Вице-президент компании LYNX</p>
            </div>
        </div>
    )
}