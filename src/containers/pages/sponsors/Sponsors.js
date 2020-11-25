import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import classes from "./Sponsors.module.scss";
import { connect } from "react-redux";
import SponsorCard from "../../../components/UI/SponsorCard/SponsorCard";
import { BGMain } from "../../../components/UI/BGMain/BGMain";
import { fetchSponsors} from "../../../store/actions/sponsors";

class Sponsors extends Component{

  componentDidMount(){
    this.props.fetchSponsors()
  }



  renderSponsors = () => {
    return this.props.sponsors.map((sponsor) => {
      return (
        <NavLink key={sponsor.Id} to={"/sponsors/" + sponsor.Id}>
            <SponsorCard
              logo = "Логотип"
              title = {sponsor.Name}
              description = {sponsor.Description}
            />
        </NavLink>
      );

    });
  }

  render(){
    return(
      <BGMain>
        <div className={classes.Sponsors}>
          <div className={classes.Sponsors__Title}>
            Спонсоры
          </div>
          <div className={classes.Sponsors__Grid}>
            {this.renderSponsors()}
            {/* <NavLink to="/sponsorMain" activeClassName={classes.active}>
              <SponsorCard
              logo = "Логотип"
              title = "Google"
              description = "Классная компания"/>
            </NavLink>
              <SponsorCard
                // logo = "Логотип"
                title = "Amazon"
                description = "Тоже классная компания"/>
              <SponsorCard
                // logo = "Логотип"
                title = "Apple"
                description = "Прикольная компания"/>
              <SponsorCard
                // logo = "Логотип"
                title = "Facebook"
                description = "Дурацкая компания"/>
              <SponsorCard
                // logo = "Логотип"
                title = "Макшнакнекс"
                description = "Ресторан"/>
              <SponsorCard
                // logo = "Логотип"
                title = "Макдокнак"
                description = "Тоже ресторан"/>
              <SponsorCard
                // logo = "Логотип"
                title = "Ашан"
                description = "Продуктовый гипермаркет"/> */}
          </div>
        </div>
      </BGMain>

    )
  }
}

function mapStateToProps(state) {
  return {
    sponsors: state.sponsors.sponsors,
    sponsorsLoading: state.sponsors.sponsorsLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSponsors: () => dispatch(fetchSponsors()),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sponsors);
