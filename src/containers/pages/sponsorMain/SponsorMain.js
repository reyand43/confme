import React, { Component } from "react";
import classes from "./SponsorMain.module.scss";
import { connect } from "react-redux";
import { BGMain } from "../../../components/UI/BGMain/BGMain";
import SponsorMain_Top from "../../../components/UI/SponsorMain_Top/SponsorMain_Top";
import { SponsorMain_Materials } from "../../../components/UI/SponsorMain_Materials/SponsorMain_Materials";
import { ScrollBar } from "../../../components/UI/ScrollBar/ScrollBar";
import { RepresentativeCard } from "../../../components/UI/RepresentativeCard/RepresentativeCard";
import { fetchSponsorById } from "../../../store/actions/sponsors";
import { fetchSurveysById } from "../../../store/actions/surveys";
import { Loader } from "../../../components/UI/Loader/Loader";
import { SurveyCard } from "../../../components/UI/SurveyCard/SurveyCard";
import {selectQuiz} from "../../../store/actions/quiz"


class SponsorMain extends Component {
  componentDidMount() {
    console.log(this.props.sponsor);
    this.props.fetchSponsorById(this.props.match.params.id);
    //this.props.fetchSurveys(this.props.match.params.id);
  }

  renderRepresentatives = () => {
    console.log(this.props.sponsor.representatives);
    return Object.keys(this.props.sponsor.representatives).map(
      (representative) => {
        console.log("rep", representative);
        return (
          <RepresentativeCard
            key={this.props.sponsor.representatives[representative].Id}
            name={this.props.sponsor.representatives[representative].Name}
            surname={this.props.sponsor.representatives[representative].Surname}
            id={this.props.sponsor.representatives[representative].Id}
          />
        );
      }
    );
  };

  selectQuiz = (survey) =>{
    this.props.selectQuiz(survey)
  }

  renderSurveys = () => {
    if (!!this.props.sponsor.surveys === true){
    console.log(this.props.sponsor.surveys);
    return Object.keys(this.props.sponsor.surveys).map(
      (survey) => {
        console.log("sur", this.props.sponsor.surveys[survey]);
        return (
          <SurveyCard
            onClick={() => {this.selectQuiz(this.props.sponsor.surveys[survey])}}
            key={this.props.sponsor.surveys[survey].Id}
            name={this.props.sponsor.surveys[survey].Name}
            id={this.props.sponsor.surveys[survey].Id}
          />
        );
      }
    );
  }else console.log('Пока что нет в бд')
  };

  render() {
    return (
      <BGMain>
        {this.props.sponsorLoading ? (
          <Loader />
        ) : (
          <ScrollBar>
            <div className={classes.SponsorMain}>
              <SponsorMain_Top
                title={this.props.sponsor.Name}
                description={this.props.sponsor.Description}
                text={this.props.sponsor.FullDescription}
              />
              {this.props.sponsor.representatives && (
                <div className={classes.SponsorMain__Reps}>

                  <span className={classes.SponsorMain__Reps__Title}>Представители</span>

                  <div className={classes.SponsorMain__Reps__List}>
                    {this.renderRepresentatives()}
                  </div>
                </div>
              )}
              {/* <div className={classes.SponsorMain__Materials2}>
          <SponsorMain_Surveys/>
          <SponsorMain_Presentations/>
        </div> */}
              <SponsorMain_Materials id={this.props.match.params.id}>
                {this.renderSurveys()}
              </SponsorMain_Materials>
            </div>
          </ScrollBar>
        )}
      </BGMain>
    );
  }
}

function mapStateToProps(state) {
  return {
    sponsor: state.sponsors.sponsor,
    sponsorLoading: state.sponsors.sponsorLoading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchSponsorById: sponsorId => dispatch(fetchSponsorById(sponsorId)),
    //fetchSurveys: (sponsorId) => dispatch(fetchSurveys(sponsorId)),
    selectQuiz: (survey) => dispatch(selectQuiz(survey))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SponsorMain);
