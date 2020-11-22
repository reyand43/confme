import React, { Component } from "react";
import classes from "./SponsorMain.module.scss";
import { connect } from "react-redux";
import { BGMain } from "../../../components/UI/BGMain/BGMain";
import SponsorMain_Top from "../../../components/UI/SponsorMain_Top/SponsorMain_Top";
import SponsorMain_Materials from "../../../components/UI/SponsorMain_Materials/SponsorMain_Materials";
import { ScrollBar } from "../../../components/UI/ScrollBar/ScrollBar";
import { RepresentativeCard } from "../../../components/UI/RepresentativeCard/RepresentativeCard";
import { fetchSponsorById } from "../../../store/actions/sponsors";
import { Loader } from "../../../components/UI/Loader/Loader";

class SponsorMain extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.fetchSponsorById(this.props.match.params.id);
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
              <SponsorMain_Materials />
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
    fetchSponsorById: (sponsorId) => dispatch(fetchSponsorById(sponsorId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SponsorMain);
