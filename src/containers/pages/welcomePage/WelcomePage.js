import classes from './WelcomePage.module.scss';
import React from 'react'
import {ItemCard} from "../../../components/UI/ItemCard/ItemCard"

class WelcomePage extends React.Component {

    render() {
        return(
            <div className = {classes.WelcomePage}>
                <div className = {classes.WelcomePage__UpperTexts}>
                    <h1>Добро пожаловать на онлайн-выставку Conf.Me 2020</h1>
                </div>
                <div className = {classes.WelcomePage__Video} >
                    
                </div>
                <div className = {classes.WelcomePage__Spickers}>
                    <div className = {classes.WelcomePage__Spickers__Texts}>
                        <h1>Спикеры</h1>
                        <p>Показать больше</p>
                    </div>
                    <div className = {classes.WelcomePage__Spickers__Row}>
                        <ItemCard />
                        <ItemCard />
                        <ItemCard />
                        <ItemCard />
                        <ItemCard />
                        <ItemCard />
                    </div>
                </div>
                <div className = {classes.WelcomePage__Spickers}>
                    <div className = {classes.WelcomePage__Spickers__Texts}>
                        <h1>Спонсоры</h1>
                        <p>Показать больше</p>
                    </div>
                    <div className = {classes.WelcomePage__Spickers__Row}>
                        <ItemCard />
                        <ItemCard />
                        <ItemCard />
                        <ItemCard />
                        <ItemCard />
                        <ItemCard />
                    </div>
                </div>
                <div style = {{height: "150px", padding: "20px"}}>

                </div>
            </div>
        )
    }

}

export default WelcomePage;