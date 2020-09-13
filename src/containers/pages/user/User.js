import React from 'react'
import {fetchUserById} from '../../../store/actions/users'
import { connect } from 'react-redux';
import { Card } from '../../../components/UI/Card/Card';
import classes from './User.module.scss'
import { NavLink } from 'react-router-dom';

class User extends React.Component{

    componentDidMount() {
        this.props.fetchUserById(this.props.match.params.id);
      }

    render(){
        return(
            <div className={classes.User}>
                <div>
                    <Card>
                        <div className={classes.userInfo}>
                            <div className={classes.userInfo_wrap}>
                    <div className={classes.userPhoto}/>
                    <h1> {this.props.user.Name}&nbsp;{this.props.user.Surname}</h1>
                    </div>
                    </div>
                    <NavLink to={"/dialogs/" + this.props.match.params.id} ><button>Send message</button></NavLink>
                    
                    </Card>
                    
                    
                    
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return{
      user: state.users.user,
      loading: state.users.loading
    }
    }
    
function mapDispatchToProps(dispatch){
      return{
        fetchUserById: (id) => dispatch(fetchUserById(id))
     
      }
    }

export default connect(mapStateToProps, mapDispatchToProps)(User)
