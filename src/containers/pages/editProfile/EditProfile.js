import React from "react";
import Input from "../../../components/UI/Input/Input";
import classes from "./EditProfile.module.scss";
import axios from "../../../axios/axios";
import { Card } from "../../../components/UI/Card/Card";
import { connect } from "react-redux";
import { changeValue, changeEditor } from "../../../store/actions/editProfile";
import { UserItem } from "../../../components/UI/UserItem/UserItem";
import { UserPhoto } from "../../../components/UI/UserPhoto/UserPhoto";
import MainInfo from "./MainInfo/MainInfo";
import Contacts from "./Contacts/Contacts";
import Career from "./Career/Career";
import Interests from "./Interests/Interests";
import { BGMain } from "../../../components/UI/BGMain/BGMain";
import { BGSide } from "../../../components/UI/BGSide/BGSide";
import EditCard from "../../../components/UI/EditCard/EditCard";
import { Scrollbars } from "react-custom-scrollbars";

class EditProfile extends React.Component {
  state = {
    choosedSection: {
      main: {
        title: "Основное",
        active: true,
        card: <MainInfo />,
      },
      contacts: {
        title: "Контакты",
        active: false,
        card: <Contacts />,
      },
      career: {
        title: "Карьера",
        active: false,
        card: <Career />,
      },
      interests: {
        title: "Интересы",
        active: false,
        card: <Interests />,
      },
    },
  };

  selectSectionMenu(sectionName) {
    const choosedSection = { ...this.state.choosedSection };

    for (var name in choosedSection) {
      choosedSection[name].active = false;
    }
    choosedSection[sectionName].active = true;
    this.setState({
      choosedSection,
    });
    console.log("STATE ", this.state);
  }

  renderSectionMenu() {
    return Object.keys(this.state.choosedSection).map((sectionName, index) => {
      const section = this.state.choosedSection[sectionName];
      return (
        <li onClick={() => this.selectSectionMenu(sectionName)} key={index}>
          {section.title}
        </li>
      );
    });
  }

  renderCard() {
    return Object.keys(this.state.choosedSection).map((sectionName) => {
      const section = this.state.choosedSection[sectionName];
      if (section.active === true) return <>{section.card}</>;
    });
  }

  render() {
    return (
      <>
        <BGMain>
          <div className={classes.EditProfile}>
            <div className={classes.EditProfile__Card}>
              <div className={classes.EditProfile__Card__Title}>
                {this.renderCard()}
                <MainInfo />
              </div>
            </div>
          </div>
        </BGMain>
        <BGSide>
          <div className={classes.SideMenu}>
            <div className={classes.SideMenu__UserInfo}>
              <UserPhoto size="lg">
                <div className={classes.SideMenu__UserInfo__ShadePhoto}>
                <i className="fa fa-camera" aria-hidden="true"></i>
                </div>
              </UserPhoto>
              
              <div className={classes.SideMenu__UserInfo__Name}>
                <span>Лариса</span>
                <span>Каримова</span>
              </div>
            </div>
            <div className={classes.SideMenu__Menu}>
          <ul>{this.renderSectionMenu()}</ul>
          </div>
          </div>
        </BGSide>
      </>

      // <div className={classes.EditProfile}>
      //   <div className={classes.Row}>
      //       <div className={classes.column}>
      //           <BGMain>
      //             {plans[current]}
      //           </BGMain>
      //       </div>
      //       <div className={classes.column}>
      //       <BGSide>
      //         <div className={classes.Row}>
      //           <div style={{paddingLeft: "1px", paddingTop: "7px"}} className={classes.column}>
      //               <UserPhoto size="gt"/>
      //           </div>
      //           <div className={classes.column}>
      //               <div className={classes.Row}>
      //                 {this.props.name}
      //               </div>
      //               <div className={classes.Row}>
      //                 {this.props.surname}
      //               </div>
      //           </div>
      //         </div>
      //         <div className={classes.WhiteBlank}>
      //           <div className={classes.column}>
      //             <EditCard
      //               editor={"Основное"}
      //               isActive={this.props.activeEdit === 0}
      //               onClick={() => this.onClick(0)}
      //             />
      //             <EditCard
      //               editor={"Контакты"}
      //               isActive={this.props.activeEdit === 1}
      //               onClick={() => this.onClick(1)}
      //             />
      //             <EditCard
      //               editor={"Карьера"}
      //               isActive={this.props.activeEdit === 2}
      //               onClick={() => this.onClick(2)}
      //             />
      //             <EditCard
      //               editor={"Интересы"}
      //               isActive={this.props.activeEdit === 3}
      //               onClick={() => this.onClick(3)}
      //             />
      //           </div>
      //         </div>
      //       </BGSide>
      //     </div>
      //   </div>
      // </div>
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
    activeEdit: state.editProfile.activeEdit,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeValue: (value) => dispatch(changeValue(value)),
    changeEditor: (activeEdit) => dispatch(changeEditor(activeEdit)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
