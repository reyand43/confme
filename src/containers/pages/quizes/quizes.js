import React from "react";
import classes from "./quizes.module.scss";
import { connect } from "react-redux";
import QuizList from './QuizList/QuizList'
import QuizCreator from './QuizCreator/QuizCreator'
import { BGMain } from "../../../components/UI/BGMain/BGMain";
import { BGSide } from "../../../components/UI/BGSide/BGSide";
import { Loader } from "../../../components/UI/Loader/Loader";


class Quizes extends React.Component {
  state = {
    choosedSection: {
      list: {
        title: "Список опросов",
        active: true,
        card: <QuizList/>,
      },
      creator: {
        title: "Создать опрос",
        active: false,
        card: <QuizCreator/>,
      }
    }
  };

  selectSectionMenu(sectionName) {
    const choosedSection = { ...this.state.choosedSection };

    for (let name in choosedSection) {
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
      {this.props.userDataLoading ? <Loader/> :
        <>
          <BGMain>
            <div className={classes.Quizes}>
              <div className={classes.Quizes__title}>
                  {this.renderCard()}
              </div>
            </div>
          </BGMain>
          <BGSide>
            <div className={classes.SideMenu}>
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



export default connect(mapStateToProps)(Quizes);
