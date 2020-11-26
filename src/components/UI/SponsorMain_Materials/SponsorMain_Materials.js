import React, { Component } from "react";
import classes from "./SponsorMain_Materials.module.scss";
import { UserPhoto } from '../UserPhoto/UserPhoto'
import { SponsorLogo } from "../SponsorLogo/SponsorLogo";
import Surveys from "../Surveys/Surveys";
import Presentations from "../Presentations/Presentations";


export const SponsorMain_Materials =(props)=>{
      return(
            <div className={classes.SponsorMain_Materials}>
                <div className={classes.SponsorMain_Materials__Title}>
                    Материалы
                </div>
                <div className={classes.SponsorMain_Materials__TwoBlocks}>
                    <Surveys id={props.id}/>
                    <Presentations/>
                </div>
            </div>
        )
}


























/*class SponsorMain_Materials extends Component{
  componentDidMount() {
    console.log('ur props', this.props)
    this.props.fetchSurveys(this.props.id);
  }

  selectQuiz = (survey) =>{
    console.log('survey is', survey)
    this.props.selectQuiz(survey)
  }

  renderSurveys = () => {
    if (!!this.props.surveys === true){
    console.log('опрос, который должен рендериться', this.props.surveys);
    return Object.keys(this.props.surveys).map(
      (survey) => {
        console.log("looking at survey - ", this.props.surveys[survey]);
        return (
          <SurveyCard
            onClick={() => {console.log('calling selectquiz next')}} //this.selectQuiz(this.props.sponsor.surveys[survey])}}
            key={this.props.surveys[survey].Id}
            name={this.props.surveys[survey].Name}
            id={this.props.surveys[survey].Id}
          />
        );
      }
    );
  }else console.log('Пока что нет в бд')
  };
  render(){
      return(
            <div className={classes.SponsorMain_Materials}>
                <div className={classes.SponsorMain_Materials__Title}>
                    Материалы
                </div>
                <div className={classes.SponsorMain_Materials__TwoBlocks}>
                    {this.renderSurveys()}
                    <Presentations/>
                </div>
            </div>
        )
      }
}
function mapStateToProps(state) {
  return {
    surveys: state.surveys,
    surveysLoading: state.surveysLoading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchSurveys: (sponsorId) => dispatch(fetchSurveys(sponsorId)),
    selectQuiz: (survey) => dispatch(selectQuiz(survey))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SponsorMain_Materials);*/
