import classes from "./WelcomePage.module.scss";
import React from "react";
import { fetchUserData } from "../../../store/actions/editProfile";
import { connect } from "react-redux";
import { BGMain } from "../../../components/UI/BGMain/BGMain";

class WelcomePage extends React.Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.fetchUserData();
    }
  }

  render() {
    return (
      <BGMain>
        <div className={classes.WelcomePage}>
          <div className={classes.WelcomePage__Top}>
            <div className={classes.WelcomePage__Top__Text}>
              <span className={classes.WelcomePage__Top__Text__Title}>
                Conf.me 2020
              </span>
              <span className={classes.WelcomePage__Top__Text__Date}>
                22 Ноября
              </span>
              <span className={classes.WelcomePage__Top__Text__Info}>
                Конференция о том,<br/>как проводить конференции. <br/><b>Бесплатно,
                онлайн</b>
              </span>
            </div>
            <div className={classes.WelcomePage__Top__Image} />
          </div>
        </div>
      </BGMain>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserData: () => dispatch(fetchUserData()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
