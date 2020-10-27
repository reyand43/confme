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
  loadCareerFromServer,
  loadInterestsFromServer,
  loadContactsFromServer
} from "../../../../store/actions/editProfile";
import { UserItem } from "../../../../components/UI/UserItem/UserItem";
import { UserPhoto } from "../../../../components/UI/UserPhoto/UserPhoto";

class MainInfo extends React.Component {
  constructor(props) {
    super(props);

    this.name = this.props.name;
    this.surname = this.props.surname;
    this.age = this.props.age;

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
      this.props.updateUserName(name, surname, age, sex, country, city);
      await axios.patch(`/users/${userId}/personalData.json`, requestData);
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.props.loadUserNameFromServer()
    this.props.loadContactsFromServer()
    this.props.loadCareerFromServer()
    this.props.loadInterestsFromServer()
  }

  render() {
    return (
      <div className={classes.EditProfile}>
        <Card title="Основное">
          <div className={classes.Info}>
            <div className={classes.column}>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 193}} htmlFor="Name">Имя:</label>
                  <input

                    name="Name"
                    value={this.props.nameValue}
                    onChange={this.onChangeHandler}
                    placeholder="Введите ваше имя"
                  ></input>
                </div>
              </div>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 140}} htmlFor="Surname">Фамилия:</label>
                  <input
                    label="Фамилия"
                    name="Surname"
                    value={this.props.surnameValue}
                    placeholder="Введите вашу фамилию"
                    onChange={this.onChangeHandler}
                  ></input>
                </div>
              </div>


              <div className={classes.Row}>
                <div className={classes.column}>
                    <div className={classes.input}>
                      <label style={{paddingLeft: 159}} htmlFor="Age">Возраст:</label>
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
                      <label style={{paddingLeft: 3}} htmlFor="Sex">Пол:</label>
                      <select
                        style={{width: "160px", height: "45px"}}
                        name="Sex"
                        onChange={this.onChangeHandler}
                        value={this.props.sexValue}
                      >
                        <option outline= "none" value="" disabled defaultValue>Не выбрано</option>
                        <option value="Man">Мужчина</option>
                        <option value="Woman">Женщина</option>
                      </select>
                      {/*<input
                        style={{width: "136px"}}
                        name="Sex"
                        onChange={this.onChangeHandler}
                        placeholder={"Введите ваш пол"}
                        value={this.props.sexValue}
                      ></input>*/}
                    </div>
                </div>
              </div>


              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 166}} htmlFor="Country">Страна:</label>
                  <input
                    style={{width: "356px"}}
                    name="Country"
                    onChange={this.onChangeHandler}
                    placeholder="Введите страну"
                    value={this.props.countryValue}
                  ></input>
                </div>
              </div>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 177}} htmlFor="City">Город:</label>
                  <input
                    style={{width: "356px"}}
                    name="City"
                    onChange={this.onChangeHandler}
                    placeholder="Введите город"
                    value={this.props.cityValue}
                  ></input>
                </div>
              </div>



              <button style={{width: '235px', marginLeft: '233px'}} onClick={this.onSendHandler}>Сохранить</button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
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
    updateUserName: (name, surname, ageValue, sexValue, countryValue, cityValue) =>
      dispatch(updateUserName(name, surname, ageValue, sexValue, countryValue, cityValue)),
    loadUserNameFromServer: () => dispatch(loadUserNameFromServer()),
    loadContactsFromServer: () => dispatch(loadContactsFromServer()),
    loadCareerFromServer: () => dispatch(loadCareerFromServer()),
    loadInterestsFromServer: () => dispatch(loadInterestsFromServer()),
    changeValue: (value) => dispatch(changeValue(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainInfo);
