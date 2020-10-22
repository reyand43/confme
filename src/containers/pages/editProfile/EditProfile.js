import React from "react";
import Input from "../../../components/UI/Input/Input";
import classes from "./EditProfile.module.scss";
import axios from "../../../axios/axios";
import { Card } from "../../../components/UI/Card/Card";
import { connect } from "react-redux";
import {
  loadUserNameFromServer,
  updateUserName,
  changeValue,
  changeEditor,
} from "../../../store/actions/editProfile";
import { UserItem } from "../../../components/UI/UserItem/UserItem";
import { UserPhoto } from "../../../components/UI/UserPhoto/UserPhoto";
import  MainInfo  from "./MainInfo/MainInfo"
import  Contacts  from "./Contacts/Contacts"
import  Career  from "./Career/Career"
import  Interests  from "./Interests/Interests"
import { BGMain } from "../../../components/UI/BGMain/BGMain";
import { BGSide } from "../../../components/UI/BGSide/BGSide";
import EditCard from "../../../components/UI/EditCard/EditCard";


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

    const profession = this.profession;
    const company = this.company;
    const purpose = this.purpose;
    const phone = this.phone;

    const userId = localStorage.getItem("userId");
    const requestData = {
      Name: name,
      Surname: surname,
      Age: age,
      Sex: sex,
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

  onClick(id) {
    this.props.changeEditor(id);
  }

  componentWillUnmount() {
    this.props.changeEditor(0);
  }

  render() {
    let current = this.props.activeEdit


    const main = (
      <MainInfo />
    )
    //-----------------------------------
    const contacts = (
      <Contacts />
    )
    //-----------------------------------
    const career  = (
      <Career />
    )
    //-----------------------------------
    const interests = (
      <Interests />
    )
    //-----------------------------------


    const plans = [main, contacts, career, interests];

    return (
      <div className={classes.EditProfile}>
        <div className={classes.Row}>
            <div className={classes.column}>
                <BGMain>
                    {plans[current]}
                </BGMain>
            </div>
            <div className={classes.column}>
            <BGSide>
              <div className={classes.Row}>
                <div style={{paddingLeft: "1px", paddingTop: "7px"}} className={classes.column}>
                    <UserPhoto size="gt"/>
                </div>
                <div className={classes.column}>
                    <div className={classes.Row}>
                      {this.name}
                    </div>
                    <div className={classes.Row}>
                      {this.surname}
                    </div>
                </div>
              </div>
              <div className={classes.WhiteBlank}>
                <div className={classes.column}>
                  <EditCard
                    editor={"Основное"}
                    isActive={this.props.activeEdit === 0}
                    onClick={() => this.onClick(0)}
                  />
                  <EditCard
                    editor={"Контакты"}
                    isActive={this.props.activeEdit === 1}
                    onClick={() => this.onClick(1)}
                  />
                  <EditCard
                    editor={"Карьера"}
                    isActive={this.props.activeEdit === 2}
                    onClick={() => this.onClick(2)}
                  />
                  <EditCard
                    editor={"Интересы"}
                    isActive={this.props.activeEdit === 3}
                    onClick={() => this.onClick(3)}
                  />
                  {/*<div style={{paddingTop:"13px", paddingLeft: "15px"}} onClick={this.onChangeSetHandler}> Основное </div>
                  <div style={{paddingTop:"13px", paddingLeft: "5px"}}> Контакты </div>
                  <div style={{paddingTop:"13px", paddingLeft: "15px"}}> Карьера </div>
                  <div style={{paddingTop:"13px", paddingLeft: "15px"}}> Интересы </div>*/}
                </div>
              </div>
            </BGSide>

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
    sexValue: state.editProfile.sexValue,
    companyValue: state.editProfile.companyValue,
    professionValue: state.editProfile.professionValue,
    countryValue: state.editProfile.countryValue,
    cityValue: state.editProfile.cityValue,
    phoneValue: state.editProfile.phoneValue,
    purposeValue: state.editProfile.purposeValue,

    activeEdit: state.editProfile.activeEdit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //updateUserName: (name, surname) => dispatch(updateUserName(name, surname)),
    //loadUserNameFromServer: () => dispatch(loadUserNameFromServer()),
    //changeValue: (value) => dispatch(changeValue(value)),

    changeEditor: (activeEdit) => dispatch(changeEditor(activeEdit))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
