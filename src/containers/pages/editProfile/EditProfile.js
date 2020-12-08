import React from "react";
import classes from "./EditProfile.module.scss";
import { connect } from "react-redux";

import { UserPhoto } from "../../../components/UI/UserPhoto/UserPhoto";
import MainInfo from "./MainInfo/MainInfo";
import Contacts from "./Contacts/Contacts";
import Career from "./Career/Career";
import Interests from "./Interests/Interests";
import { BGMain } from "../../../components/UI/BGMain/BGMain";
import { BGSide } from "../../../components/UI/BGSide/BGSide";
import { Loader } from "../../../components/UI/Loader/Loader";



class EditProfile extends React.Component {
  state = {
    choosedSection: {
      main: {
        title: "Основное",
        active: true,
        card: <MainInfo/>,
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
  }

  renderSectionMenu() {
    return Object.keys(this.state.choosedSection).map((sectionName, index) => {
      const section = this.state.choosedSection[sectionName];
      const cls = [];
      if (section.active) {
        cls.push(classes.SideMenu__Menu__Active);
      }
      return (
        <li
          className={cls}
          onClick={() => this.selectSectionMenu(sectionName)}
          key={index}
        >
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
      {this.props.userDataLoading ? <Loader/> :  <>
        <BGMain>
          <div className={classes.EditProfile}>
            <div className={classes.EditProfile__Card}>
              <div className={classes.EditProfile__Card__Title}>
                {this.renderCard()}
              </div>
            </div>
          </div>
        </BGMain>
        <BGSide padding={true}>
          <div className={classes.SideMenu}>
            <div className={classes.SideMenu__UserInfo}>
              <UserPhoto size="lg">
                <div className={classes.SideMenu__UserInfo__ShadePhoto}>
                  <i className="fa fa-camera" aria-hidden="true"></i>
                </div>
              </UserPhoto>

              <div className={classes.SideMenu__UserInfo__Name}>
                <span>{this.props.userData.Name}</span>
                <span>{this.props.userData.Surname}</span>
              </div>
            </div>
            <div className={classes.SideMenu__Menu}>
              <ul>{this.renderSectionMenu()}</ul>
            </div>
          </div>
        </BGSide>
      </>
}
     </>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.editProfile.name,
    surname: state.editProfile.surname,
   
    userData: state.editProfile.userData,

    userDataLoading: state.editProfile.userDataLoading,
    userDataError: state.editProfile.userDataError,
    
  };
}



export default connect(mapStateToProps)(EditProfile);
