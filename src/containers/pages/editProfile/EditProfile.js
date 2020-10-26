import React from "react";
import Input from "../../../components/UI/Input/Input";
import classes from "./EditProfile.module.scss";
import axios from "../../../axios/axios";
import { Card } from "../../../components/UI/Card/Card";
import { connect } from "react-redux";
import {
  changeValue,
  changeEditor
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
import { Scrollbars } from 'react-custom-scrollbars'


class EditProfile extends React.Component {
  constructor(props) {
    super(props);
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
    const contacts = (
      <Contacts />
    )
    const career  = (
      <Career />
    )
    const interests = (
      <Interests />
    )

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
                        {this.props.name}
                      </div>
                      <div className={classes.Row}>
                        {this.props.surname}
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

    activeEdit: state.editProfile.activeEdit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeValue: (value) => dispatch(changeValue(value)),
    changeEditor: (activeEdit) => dispatch(changeEditor(activeEdit))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
