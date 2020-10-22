import React from "react";
import Input from "../../../../components/UI/Input/Input";
import classes from "./Contacts.module.scss";
import axios from "../../../../axios/axios";
import { Card } from "../../../../components/UI/Card/Card";
import { connect } from "react-redux";
import {
  loadUserNameFromServer,
  updateUserName,
  changeValue,
  updateContactInfo
} from "../../../../store/actions/editProfile";
import { UserItem } from "../../../../components/UI/UserItem/UserItem";
import { UserPhoto } from "../../../../components/UI/UserPhoto/UserPhoto";

class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.name = this.props.name;
    this.surname = this.props.surname;

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSendHandler = this.onSendHandler.bind(this);
  }

  onChangeHandler(e) {
    if (e.target.name === "Vkontakte") {
      this.props.changeValue(e.target.name, e.target.value);
      this.vkontakte = e.target.value;
    } else if (e.target.name === "Phone") {
      this.props.changeValue(e.target.name, e.target.value);
      this.phone = e.target.value;
    } else if (e.target.name === "Facebook") {
      this.props.changeValue(e.target.name, e.target.value);
      this.facebook = e.target.value;
    } else if (e.target.name === "Linkedin") {
      this.props.changeValue(e.target.name, e.target.value);
      this.linkedin = e.target.value;
    } else if (e.target.name === "Instagram") {
      this.props.changeValue(e.target.name, e.target.value);
      this.instagram = e.target.value;
    }
  }


  async onSendHandler() {
    const name = this.name;
    const surname = this.surname;

    const phone = this.phone;
    const vkontakte = this.vkontakte;
    const facebook = this.facebook;
    const linkedin = this.linkedin;
    const instagram = this.instagram;

    const userId = localStorage.getItem("userId");
    const requestData = {
      Phone: phone,
      Vkontakte: vkontakte,
      Facebook: facebook,
      Linkedin: linkedin,
      Instagram: instagram
    };
    try {
      this.props.updateContactInfo(phone, vkontakte, facebook, linkedin, instagram);
      await axios.patch(`/users/${userId}/personalData.json`, requestData);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    loadUserNameFromServer()
    return (
      <div className={classes.EditProfile}>
        <Card title="Контакты">
          <div className={classes.Info}>
            <UserPhoto size="lg" />
            <div className={classes.column}>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 123}} htmlFor="Phone">Телефон:</label>
                  <input

                    name="Phone"
                    onChange={this.onChangeHandler}
                    placeholder="+7 (___) ___-__-__"
                    value={this.props.phoneValue}
                  ></input>
                </div>
              </div>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 100}} htmlFor="Vkontakte">Вконтакте:</label>
                  <input

                    name="Vkontakte"
                    value={this.props.vkontakteValue}
                    onChange={this.onChangeHandler}
                    placeholder="Вставьте ссылку на страницу"
                  ></input>
                </div>
              </div>


              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 115}} htmlFor="Facebook">Facebook:</label>
                  <input
                    name="Facebook"
                    value={this.props.facebookValue}
                    onChange={this.onChangeHandler}
                    placeholder="Вставьте ссылку на страницу"
                  ></input>
                </div>
              </div>


              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 122}} htmlFor="Linkedin">Linkedin:</label>
                  <input
                    style={{width: "356px"}}
                    name="Linkedin"
                    onChange={this.onChangeHandler}
                    placeholder="Вставьте ссылку на страницу"
                    value={this.props.linkedinValue}
                  ></input>
                </div>
              </div>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 108}} htmlFor="Instagram">Instagram:</label>
                  <input
                    style={{width: "356px"}}
                    name="Instagram"
                    onChange={this.onChangeHandler}
                    placeholder="Вставьте ссылку на страницу"
                    value={this.props.instagramValue}
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
    phoneValue: state.editProfile.phoneValue,
    vkontakteValue: state.editProfile.vkontakteValue,
    facebookValue: state.editProfile.facebookValue,
    linkedinValue: state.editProfile.linkedinValue,
    instagramValue: state.editProfile.instagramValue
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUserNameFromServer: () => dispatch(loadUserNameFromServer()),
    changeValue: (value) => dispatch(changeValue(value)),
    updateContactInfo: (phoneValue, vkontakteValue, facebookValue, linkedinValue, instagramValue) =>
      dispatch(updateContactInfo(phoneValue, vkontakteValue, facebookValue, linkedinValue, instagramValue))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
