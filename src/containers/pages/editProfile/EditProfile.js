import React from "react";
import Input from "../../../components/UI/Input/Input";
import classes from "./EditProfile.module.scss";
import { connect } from "react-redux";
import { sendNewProfileData } from "../../../store/actions/editProfile";
import axios from "../../../axios/axios";
import firebase from "firebase";
import { Card } from "../../../components/UI/Card/Card";
import { UserPhoto } from "../../../components/UI/UserPhoto/UserPhoto";


class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
   
        Name: "Name",
        Surname: "Surname",
       
    
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSendHandler = this.onSendHandler.bind(this);
  }
  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async onSendHandler() {
    var userId = firebase.auth().currentUser.uid;
    console.log("userId=", userId);
    const sendData = {
      'PersonalData':
      this.state
    }
    console.log(this.state);
    await axios.patch(`/users/${userId}.json`, sendData);}


  

  render() {
    return (
      <div className={classes.EditProfile}>
       
        
<Card title='Личные данные'>
  <div className={classes.PhotoName}>
  <UserPhoto/>
  <p>{localStorage.getItem('name')}&nbsp;{localStorage.getItem('surname')} </p>
  </div>
  <div className={classes.Inputs}>
    <div className={classes.Row}>
    <Input label='Имя' name="Name" onChange={this.onChangeHandler} placeholder={localStorage.getItem('name')}></Input>
    <Input label='Фамилия' name="Surname" onChange={this.onChangeHandler} placeholder={localStorage.getItem('surname')}></Input>
    </div>
  </div>
  <button onClick={this.onSendHandler}>Сохранить</button>
  

  </Card>
        {/* <form>
          <label>Name: </label>

          <input type="text" name="Name" onChange={this.onChangeHandler} />
          <br />
          <label>Surname: </label>
          <input type="text" name="Surname" onChange={this.onChangeHandler} />
          <br />
          <label>Age: </label>
          <input type="text" name="Age" onChange={this.onChangeHandler} />
          <br />
          <label>Company: </label>
          <input type="text" name="Company" onChange={this.onChangeHandler} />
        </form> */}
        
        
{/*         
        <button onClick={this.onSendHandler}>Send</button>
          */}
        
      </div>
     
    );
  }
}
function mapStateToProps(state) {
  return {
    //data: state.create.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendNewProfileData: (name, surname, age) => {
      dispatch(sendNewProfileData(name, surname, age));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
