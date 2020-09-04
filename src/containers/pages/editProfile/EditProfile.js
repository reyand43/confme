import React from "react";
import Name from "./editProfilePages/Name";
import Company from "./editProfilePages/Company";
import Input from "../../../components/UI/Input/Input";
import classes from "./EditProfile.module.css";
import { connect } from "react-redux";
import { sendNewProfileData } from "../../../store/actions/editProfile";
import axios from "../../../axios/axios";
import firebase from "firebase";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
   
        Name: "",
        Surname: "",
        Age: "",
        Company: ""  
    
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSendHandler = this.onSendHandler.bind(this);
  }
  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // backHandler() {
  //   this.setState({[activeSlide] : activeSlide-1})
  //   console.log(state.activeSlide)
  // }

  // nextHandler() {
  //   this.setState({[state.activeSlide] : state.activeSlide+1})
  //   console.log(state.activeSlide)
  // }
  async onSendHandler() {
    var userId = firebase.auth().currentUser.uid;
    console.log("userId=", userId);
    const sendData = {
      'PersonalData':
      this.state
    }
    console.log(this.state);
    await axios.patch(`/users/${userId}.json`, sendData);}

  // state = {
  //     name,
  //     surname,
  //     age
  // }

  // sendDataHandler = event => {
  //     event.preventDefault()

  //     this.setState({
  //       formControls: createFormControls()
  //     })
  //     this.props.sendNewProfileData()
  //   }
  //sendDataHandler =

  render() {
    return (
      <div>
        <h3>Controlled Component</h3>
        <br />

        <form>
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
        </form>
        <br />
        
        
        <button onClick={this.onSendHandler}>Send</button>
         
        <button >Back</button> 
        <button>Next</button>
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
