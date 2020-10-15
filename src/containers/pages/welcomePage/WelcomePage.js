import classes from "./WelcomePage.module.scss";
import React from "react";
import { ItemCard } from "../../../components/UI/ItemCard/ItemCard";
import { loadUserNameFromServer } from "../../../store/actions/editProfile";
import { connect } from "react-redux";

class WelcomePage extends React.Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.loadUserNameFromServer();
    }
  }

  render() {
    return (
      <div className={classes.WelcomePage}>
        <div className={classes.WelcomePage__UpperTexts}>
          <h1>Добро пожаловать на онлайн-выставку Conf.Me 2020</h1>
        </div>
        <div className={classes.WelcomePage__Video}></div>
        <div className={classes.WelcomePage__Spickers}>
          <div className={classes.WelcomePage__Spickers__Texts}>
            <h1>Спикеры</h1>
            <p>Показать больше</p>
          </div>
          <div className={classes.WelcomePage__Spickers__Row}>
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </div>
        </div>
        <div className={classes.WelcomePage__Spickers}>
          <div className={classes.WelcomePage__Spickers__Texts}>
            <h1>Спонсоры</h1>
            <p>Показать больше</p>
          </div>
          <div className={classes.WelcomePage__Spickers__Row}>
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </div>
        </div>
        <div style={{ height: "150px", padding: "20px" }}></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token,
    }
}

function mapDispatchToProps(dispatch) {
    return {
      loadUserNameFromServer: () => dispatch(loadUserNameFromServer()),
    };
  }
export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
