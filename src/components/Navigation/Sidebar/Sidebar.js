import React from "react";
import classes from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import {Logo} from '../../UI/Logo/Logo'


export const Sidebar = () => (
    <nav className = {classes.Sidebar}>
       <Logo/>
        <ul className=''>
        <li className=''>
                <NavLink exact to='/' className='nav-link'>Войти</NavLink>
            </li>
            <li className=''>
                <NavLink to='/feed' className='nav-link'>Новости</NavLink>
            </li>
            <li className=''>
                <NavLink to='messages' className='nav-link'>Сообщения</NavLink>
            </li>
            <li className=''>
                <NavLink to='materials' className='nav-link'>Материалы</NavLink>
            </li>
            <li className=''>
                <NavLink to='timetable' className='nav-link'>Расписание</NavLink>
            </li>
        </ul>
    </nav>
)

