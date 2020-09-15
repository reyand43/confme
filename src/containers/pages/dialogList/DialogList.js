
import React from 'react'
import classes from './DialogList.module.scss'
import {DialogListItem} from '../../../components/UI/DialogListItem/DialogListItem'
import { connect } from 'react-redux'
import { fetchDialogs } from '../../../store/actions/dialogList'

class DialogList extends React.Component{

    componentDidMount(){
        this.props.fetchDialogs(localStorage.getItem('userId'))
        console.log('mounted')
    }

    renderDialogs(){
        const uid = localStorage.getItem('userId')
        return this.props.dialogs.map((dialog) => {
            return (
        
            <li>
                <DialogListItem name={dialog.name} surname={dialog.surname} text={dialog.userId === uid ? `Вы: ${dialog.text}` : dialog.text} time={dialog.tiime}/>
            </li>
        )
    })
}
    

    render(){
        return(
            <div className={classes.DialogList}>
                Dialogs
                <ul>
                    {this.renderDialogs()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      dialogs: state.dialogList.dialogs,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchDialogs: (userId) => dispatch(fetchDialogs(userId)),
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(DialogList)