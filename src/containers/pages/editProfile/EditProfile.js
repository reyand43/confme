import React from "react";
import Input from "../../../components/UI/Input/Input";
import classes from "./EditProfile.module.scss";
import axios from "../../../axios/axios";
import firebase from "firebase";
import { Card } from "../../../components/UI/Card/Card";
import { UserPhoto } from "../../../components/UI/UserPhoto/UserPhoto";


class EditProfile extends React.Component {
  constructor(props) {  
    super(props);
    this.state = {
      Name: "",
      Surname: "",
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSendHandler = this.onSendHandler.bind(this);
  }
  onChangeHandler(e) {
    console.log(e.target.name, "====", e.target.value)
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async onSendHandler() {
    const userId = localStorage.getItem('userId')
    const requestData = this.state
    try {
      await axios.patch(`/users/${userId}/personalData.json`, requestData);
      localStorage.setItem('userName', this.state.Name)
      localStorage.setItem('userSurname', this.state.Surname)
      console.log('onsend', localStorage)
    } catch (error) {
      console.log(error)
    }
    
    
  }

  render() {
    return (
      <div className={classes.EditProfile}>
        <Card title="Личные данные">
          <div className={classes.PhotoName}>
            <UserPhoto />
            <p>
              {localStorage.getItem("name")}&nbsp;
              {localStorage.getItem("surname")}{" "}
            </p>
          </div>
          <div className={classes.Inputs}>
            <div className={classes.Row}>
              <Input
                label="Имя"
                name="Name"
                onChange={this.onChangeHandler}
                placeholder={localStorage.getItem("userName")}
              ></Input>
              <Input
                label="Фамилия"
                name="Surname"
                onChange={this.onChangeHandler}
                placeholder={localStorage.getItem("userSurname")}
              ></Input>
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


export default EditProfile;
