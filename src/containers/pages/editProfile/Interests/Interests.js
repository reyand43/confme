import React from "react";
import Input from "../../../../components/UI/Input/Input";
import classes from "./Interests.module.scss";
import axios from "../../../../axios/axios";
import { connect } from "react-redux";
import {
  loadUserNameFromServer,
  updateUserName,
  changeValue,
  updateHobbyInfo
} from "../../../../store/actions/editProfile";
import { UserItem } from "../../../../components/UI/UserItem/UserItem";
import { UserPhoto } from "../../../../components/UI/UserPhoto/UserPhoto";

class Interests extends React.Component {
  constructor(props) {
    super(props);

    this.name = this.props.name;
    this.surname = this.props.surname;

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSendHandler = this.onSendHandler.bind(this);
  }

  onChangeHandler(e) {
    if (e.target.name === "Look") {
      this.props.changeValue(e.target.name, e.target.value);
      this.look = e.target.value;
    } else if (e.target.name === "Suggest") {
      this.props.changeValue(e.target.name, e.target.value);
      this.suggest = e.target.value;
    } else if (e.target.name === "Hobby") {
      this.props.changeValue(e.target.name, e.target.value);
      this.hobby = e.target.value;
    }
  }


  async onSendHandler() {
    const look = this.look;
    const suggest = this.suggest;
    const hobby = this.hobby;


    const userId = localStorage.getItem("userId");
    const requestData = {
      Look: look,
      Suggest: suggest,
      Hobby: hobby
    };
    try {
      this.props.updateHobbyInfo(look, suggest, hobby);
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
                  <label style={{paddingLeft: 160}} htmlFor="Look">Я ищу:</label>
                  <input

                    name="Look"
                    value={this.props.lookValue}
                    onChange={this.onChangeHandler}
                    placeholder="Введите тег"
                  ></input>
                </div>
              </div>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 93, width: "112px"}} htmlFor="Suggest">Я предлагаю:</label>
                  <input
                    name="Suggest"
                    value={this.props.suggestValue}
                    onChange={this.onChangeHandler}
                    placeholder="Введите тег"
                  ></input>
                </div>
              </div>


              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 89, width: "126px"}} htmlFor="Hobby">Мои интересы:</label>
                  <input
                    style={{width: "354px", height: "90px"}}
                    name="Hobby"
                    onChange={this.onChangeHandler}
                    placeholder="Напишите пару слов о себе и своих интересах"
                    value={this.props.hobbyValue}
                  ></input>
                </div>
              </div>

              <button style={{width: '235px', marginLeft: '200px'}} onClick={this.onSendHandler}>Сохранить</button>
            </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lookValue: state.editProfile.lookValue,
    suggestValue: state.editProfile.suggestValue,
    hobbyValue: state.editProfile.hobbyValue
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUserNameFromServer: () => dispatch(loadUserNameFromServer()),
    changeValue: value => dispatch(changeValue(value)),
    updateHobbyInfo: (lookValue, suggestValue, hobbyValue) => dispatch(updateHobbyInfo(lookValue, suggestValue, hobbyValue))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Interests);
