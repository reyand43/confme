import React from "react";
import Input from "../../../../components/UI/Input/Input";
import classes from "./MainInfo.module.scss";
import axios from "../../../../axios/axios";
import { Card } from "../../../../components/UI/Card/Card";
import { connect } from "react-redux";
import {
  loadUserNameFromServer,
  updateUserName,
  changeValue,
} from "../../../../store/actions/editProfile";
import { UserItem } from "../../../../components/UI/UserItem/UserItem";
import { UserPhoto } from "../../../../components/UI/UserPhoto/UserPhoto";

class MainInfo extends React.Component {
  constructor(props) {
    super(props);

    this.name = this.props.name;
    this.surname = this.props.surname;

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSendHandler = this.onSendHandler.bind(this);
  }

  onChangeHandler(e) {
    if (e.target.name === "Name") {
      this.props.changeValue(e.target.name, e.target.value);
      this.name = e.target.value;
    } else if (e.target.name === "Surname") {
      this.props.changeValue(e.target.name, e.target.value);
      this.surname = e.target.value;
    } else if (e.target.name === "Age") {
      this.props.changeValue(e.target.name, e.target.value);
      this.age = e.target.value;
    } else if (e.target.name === "Country") {
      this.props.changeValue(e.target.name, e.target.value);
      this.country = e.target.value;
    } else if (e.target.name === "City") {
      this.props.changeValue(e.target.name, e.target.value);
      this.city = e.target.value;
    } else if (e.target.name === "Sex") {
      this.props.changeValue(e.target.name, e.target.value);
      this.sex = e.target.value;
    }
  }


  async onSendHandler() {
    const name = this.name;
    const surname = this.surname;
    const age = this.age;
    const country = this.country;
    const city = this.city;

    const sex = this.sex;

    const userId = localStorage.getItem("userId");
    const requestData = {
      Name: name,
      Surname: surname,
      Age: age,
      Sex: sex,
      Country: country,
      City: city,
    };
    try {
      this.props.updateUserName(this.name, this.surname);
      await axios.patch(`/users/${userId}/personalData.json`, requestData);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className={classes.EditProfile}>
        <Card title="Основное">
          <div className={classes.Info}>
            <UserPhoto size="lg" />
            <div className={classes.column}>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 143}} htmlFor="Name">Имя:</label>
                  <input

                    name="Name"
                    value={this.props.nameValue}
                    onChange={this.onChangeHandler}
                    placholder="Введите ваше имя"
                  ></input>
                </div>
              </div>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 100}} htmlFor="Surname">Фамилия:</label>
                  <input
                    label="Фамилия"
                    name="Surname"
                    value={this.props.surnameValue}
                    onChange={this.onChangeHandler}
                    placholder="Введите вашу фамилию"
                  ></input>
                </div>
              </div>


              <div className={classes.Row}>
                <div className={classes.column}>
                    <div className={classes.input}>
                      <label htmlFor="Age">Возраст:</label>
                      <input
                        style={{width: "136px"}}
                        name="Age"
                        onChange={this.onChangeHandler}
                        placeholder={"Ваш возраст"}
                        value={this.props.ageValue}
                      ></input>
                    </div>
                  </div>
                <div className={classes.column}>
                    <div className={classes.input}>
                      <label style={{paddingLeft: 1}} htmlFor="Sex">Пол:</label>
                      <input
                        style={{width: "136px"}}
                        name="Sex"
                        onChange={this.onChangeHandler}
                        placeholder={"Введите ваш пол"}
                        value={this.props.sexValue}
                      ></input>
                    </div>
                </div>
              </div>


              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 117}} htmlFor="Country">Страна:</label>
                  <input
                    style={{width: "356px"}}
                    name="Country"
                    onChange={this.onChangeHandler}
                    placeholder="Введите вашу страну"
                    value={this.props.countryValue}
                  ></input>
                </div>
              </div>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 128}} htmlFor="City">Город:</label>
                  <input
                    style={{width: "356px"}}
                    name="City"
                    onChange={this.onChangeHandler}
                    placeholder="Введите ваш город"
                    value={this.props.cityValue}
                  ></input>
                </div>
              </div>



              <button style={{width: '235px', marginLeft: '200px'}} onClick={this.onSendHandler}>Сохранить</button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.editProfile.name,
    surname: state.editProfile.surname,
    accountType: state.editProfile.accountType,
    isAuthenticated: !!state.auth.token,
    userData: state.editProfile.userData,

    nameValue: state.editProfile.nameValue,
    surnameValue: state.editProfile.surnameValue,
    ageValue: state.editProfile.ageValue,
    sexValue: state.editProfile.sexValue,
    countryValue: state.editProfile.countryValue,
    cityValue: state.editProfile.cityValue,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserName: (name, surname) => dispatch(updateUserName(name, surname)),
    loadUserNameFromServer: () => dispatch(loadUserNameFromServer()),
    changeValue: (value) => dispatch(changeValue(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainInfo);
