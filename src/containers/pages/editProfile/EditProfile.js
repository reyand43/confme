import React from "react";
import Input from "../../../components/UI/Input/Input";
import classes from "./EditProfile.module.scss";
import axios from "../../../axios/axios";
import { connect } from "react-redux";
import {
  loadUserNameFromServer,
  updateUserName,
  changeValue,
} from "../../../store/actions/editProfile";
import { UserItem } from "../../../components/UI/UserItem/UserItem";
import { UserPhoto } from "../../../components/UI/UserPhoto/UserPhoto";

class EditProfile extends React.Component {
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
    } else if (e.target.name === "Profession") {
      this.props.changeValue(e.target.name, e.target.value);
      this.profession = e.target.value;
    } else if (e.target.name === "Company") {
      this.props.changeValue(e.target.name, e.target.value);
      this.company = e.target.value;
    } else if (e.target.name === "Phone") {
      this.props.changeValue(e.target.name, e.target.value);
      this.phone = e.target.value;
    } else if (e.target.name === "Purpose") {
      this.props.changeValue(e.target.name, e.target.value);
      this.purpose = e.target.value;
    }
  }


  async onSendHandler() {
    const name = this.name;
    const surname = this.surname;
    const age = this.age;
    const country = this.country;
    const city = this.city;
    const profession = this.profession;
    const company = this.company;
    const purpose = this.purpose;
    const phone = this.phone;

    const userId = localStorage.getItem("userId");
    const requestData = {
      Name: name,
      Surname: surname,
      Age: age,
      Country: country,
      City: city,
      Profession: profession,
      Company: company,
      Phone: phone,
      Purpose: purpose,
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
        
          <div className={classes.Info}>
            <UserPhoto size="lg" />
            <div className={classes.column}>
              <div className={classes.Row}>
                <div className={classes.input}>
                  <label htmlFor="Name">Имя</label>
                  <input
                    name="Name"
                    value={this.props.nameValue}
                    onChange={this.onChangeHandler}
                    placholder="Введите ваше имя"
                  ></input>
                </div>
                <div className={classes.input}>
                  <label htmlFor="Surname">Фамилия</label>
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
                <div className={classes.input}>
                  <label htmlFor="Age">Возраст</label>
                  <input
                    name="Age"
                    onChange={this.onChangeHandler}
                    placeholder={"Введите ваш возраст"}
                    value={this.props.ageValue}
                  ></input>
                </div>
                <div className={classes.input}>
                  <label htmlFor="Phone">Телефон</label>
                  <input
                    name="Phone"
                    onChange={this.onChangeHandler}
                    value={this.props.phoneValue}
                    placeholder={"Введите ваш телефон"}
                  ></input>
                </div>
              </div>



              <div className={classes.Row}>
                <div className={classes.input}>
                  <label htmlFor="Country">Страна</label>
                  <input
                    name="Country"
                    onChange={this.onChangeHandler}
                    placeholder="Введите вашу страну"
                    value={this.props.countryValue}
                  ></input>
                </div>
                <div className={classes.input}>
                  <label htmlFor="City">Город</label>
                  <input
                    name="City"
                    onChange={this.onChangeHandler}
                    placeholder="Введите ваш город"
                    value={this.props.cityValue}
                  ></input>
                </div>
              </div>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label htmlFor="Profession">Профессия</label>
                  <input
                    name="Profession"
                    onChange={this.onChangeHandler}
                    value={this.props.professionValue}
                    placeholder="Введите паш род деятельности"
                  ></input>
                </div>
                <div className={classes.input}>
                  <label htmlFor="Company">Компания</label>
                  <input
                    name="Company"
                    onChange={this.onChangeHandler}
                    placeholder={"Введите вашу компанию"}
                    value={this.props.companyValue}
                  ></input>
                </div>
              </div>

              <div className={classes.input}>
                <label htmlFor="Purpose">Цель посещения</label>
                <textarea
                  name="Purpose"
                  onChange={this.onChangeHandler}
                  placeholder={"Введите цель посещения нашего мероприятия"}
                  value={this.props.purposeValue}
                ></textarea>
              </div>

              <button onClick={this.onSendHandler}>Сохранить</button>
            </div>
          </div>
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
    companyValue: state.editProfile.companyValue,
    professionValue: state.editProfile.professionValue,
    countryValue: state.editProfile.countryValue,
    cityValue: state.editProfile.cityValue,
    phoneValue: state.editProfile.phoneValue,
    purposeValue: state.editProfile.purposeValue,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserName: (name, surname) => dispatch(updateUserName(name, surname)),
    loadUserNameFromServer: () => dispatch(loadUserNameFromServer()),
    changeValue: (value) => dispatch(changeValue(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
