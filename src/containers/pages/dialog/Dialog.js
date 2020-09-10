import React from 'react'

import { connect } from 'react-redux';
import classes from './Dialog.module.scss'
import Input from '../../../components/UI/Input/Input';
import MyMessage from '../../../components/UI/Messages/MyMessage/MyMessage';
import FriendMessage from '../../../components/UI/Messages/FriendMessage/FriendMessage';


class Dialog extends React.Component{

    

    render(){
        return(
            <div className={classes.Dialog}>
                <div className={classes.chatHeader}>
                    <h1>Andrey Babushkin</h1>
                </div>
                <div className={classes.chatBody}>
                    <ul>
                        <li><div className={classes.right}><MyMessage name='Andey' surname='Babushkin' text='hi! how are you'/></div></li>
                        <li><div className={classes.right}><MyMessage name='Andey' surname='Babushkin' text='hi! how are you'/></div></li>
                        <li><div className={classes.left}><FriendMessage name='Andey' surname='Babushkin' text='hi! how are you'/></div></li>
                        <li><div className={classes.left}><FriendMessage name='Andey' surname='Babushkin' text='hi! how are you'/></div></li>

                    </ul>



                </div>
                <div className={classes.chatFooter}>
                    <Input placeholder='Введите ваше сообщение'/>
                    <button>send</button>
                </div>
                
            </div>

        )
    }
}


export default Dialog
