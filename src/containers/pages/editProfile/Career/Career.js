import React from "react";
import Input from "../../../../components/UI/Input/Input";
import classes from "./Career.module.scss";
import axios from "../../../../axios/axios";
import { Card } from "../../../../components/UI/Card/Card";
import { connect } from "react-redux";
import {
  changeValue,
  loadUserNameFromServer,
  loadContactsFromServer,
  loadCareerFromServer,
  loadInterestsFromServer,
  updateUserName,
  updateContactInfo,
  updateCareerInfo,
  updateHobbyInfo
} from "../../../../store/actions/editProfile";
import { UserItem } from "../../../../components/UI/UserItem/UserItem";
import { UserPhoto } from "../../../../components/UI/UserPhoto/UserPhoto";

class Career extends React.Component {
  constructor(props) {
    super(props);

    this.name = this.props.name;
    this.surname = this.props.surname;

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSendHandler = this.onSendHandler.bind(this);
  }

  onChangeHandler(e) {
    if (e.target.name === "WorkPlace") {
      this.props.changeValue(e.target.name, e.target.value);
      this.workplace = e.target.value;
    } else if (e.target.name === "CompanyName") {
      this.props.changeValue(e.target.name, e.target.value);
      this.companyname = e.target.value;
    } else if (e.target.name === "Position") {
      this.props.changeValue(e.target.name, e.target.value);
      this.position = e.target.value;
    }
  }


  async onSendHandler() {
    const workplace = this.workplace;
    const companyname = this.companyname;
    const position = this.position;

    const userId = localStorage.getItem("userId");
    const requestData = {
      WorkPlace: workplace,
      CompanyName: companyname,
      Position: position
    };
    try {
      this.props.updateCareerInfo(workplace, companyname, position);
      await axios.patch(`/users/${userId}/personalData.json`, requestData);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className={classes.EditProfile}>
        <Card title="Карьера">
          <div className={classes.Info}>
            <UserPhoto size="lg" />
            <div className={classes.column}>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: "40px", width: "170px"}} htmlFor="WorkPlace">Ваше место работы:</label>
                  <input
                    style={{width: '354px'}}
                    name="WorkPlace"
                    value={this.props.workplaceValue}
                    onChange={this.onChangeHandler}
                    placeholder="Введите название компании"
                  ></input>
                </div>
              </div>

              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: "18px", width: "183px"}} htmlFor="CompanyName">Ссылка на компанию:</label>
                  <input
                    style={{marginLeft: "0px", width: "354px"}}
                    name="CompanyName"
                    value={this.props.companynameValue}
                    onChange={this.onChangeHandler}
                    placeholder="Вставьте ссылку на сайт вашей компании"
                  ></input>
                </div>
              </div>


              <div className={classes.Row}>
                <div className={classes.input}>
                  <label style={{paddingLeft: 117}} htmlFor="Position">Должность:</label>
                  <input
                    style={{marginLeft: "0px", width: "352px"}}
                    name="Position"
                    onChange={this.onChangeHandler}
                    placeholder="Введите название вашей должности"
                    value={this.props.positionValue}
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
    workplaceValue: state.editProfile.workplaceValue,
    companynameValue: state.editProfile.companynameValue,
    positionValue: state.editProfile.positionValue
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUserNameFromServer: () => dispatch(loadUserNameFromServer()),
    changeValue: (value) => dispatch(changeValue(value)),
    updateCareerInfo: (workplaceValue, companynameValue, positionValue) => dispatch(updateCareerInfo(workplaceValue, companynameValue, positionValue))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Career);
