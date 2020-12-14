import React, { Component } from "react";
import classes from "./QuizList.module.scss";
import { BGMain } from "../../../../components/UI/BGMain/BGMain";
import { BGSide } from "../../../../components/UI/BGSide/BGSide";
import {
  BrowserRouter,
  NavLink,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Loader } from "../../../../components/UI/Loader/Loader";
import axios from "./../../../../axios/axios";
import QuizCreator from "./../QuizCreator/QuizCreator";

export default class QuizList extends Component {
  state = {
    quizes: [],
    loading: true,
  };

  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  async componentDidMount() {
    try {
      const response = await axios.get("/quizes.json");
      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        console.log('ur quiz key is',key)
        quizes.push({
          id: key,
          name: `Опрос №${index + 1}`,
        });
      });

      this.setState({
        quizes,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>

          {this.state.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}
