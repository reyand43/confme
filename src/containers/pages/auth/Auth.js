import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Auth.module.scss";
import is from "is_js";
import AuthInput from "../../../components/UI/AuthInput/AuthInput";
import { Redirect } from "react-router-dom";
import {signIn, signUp } from "../../../store/actions/auth";
import { clearUserName } from "../../../store/actions/editProfile";

class Auth extends Component {
  state = {
    signUp: false,
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        placeholder: "example@mail.com",
        errorMessage: "Введите корректный email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Пароль",
        errorMessage: "Пароль должен содержать не менее 6 симоволов",
        placeholder: "Пароль должен содержать не менее 6 симоволов",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
    nameControls: {
      name: {
        value: "",
        type: "text",
        label: "Имя",
        placeholder: "Иван",
        errorMessage: "Введите имя",
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
      },
      surname: {
        value: "",
        type: "text",
        label: "Фамилия",
        placeholder: "Иванов",
        errorMessage: "Введите фамилию",
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
      },
    },
  };

  signUpHandler = (event) => {
    const formControls = { ...this.state.formControls };
    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });
    //-------------------------------------
    const value = this.state.signUp;
    this.setState({ signUp: !value, isFormValid });
    //-------------------------------------
  };

  formToggle = () => {
    this.setState({ signUp: !this.state.signUp });
  };

  loginHandler = () => {
    this.props.signIn(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  };

  registerHandler = () => {
    this.props.signUp(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      this.state.nameControls.name.value,
      this.state.nameControls.surname.value
    );
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  validateControl(value, validation) {
    //если не нужна валидация то все ок
    if (!validation) {
      return true;
    }
    let isValid = true;
    //обязательное поле
    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }
    //если это email
    if (validation.email) {
      isValid = is.email(value) && isValid;
    }
    //если минимальная длина
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    //если все прошло то возращаемся что все валидно
    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    let isFormValid = true;
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);
    formControls[controlName] = control;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });
    this.setState({
      formControls,
      isFormValid,
    });
  };

  onChangeNameHandler = (event, controlName) => {
    let isFormValid = true;
    const nameControls = { ...this.state.nameControls };
    const control = { ...nameControls[controlName] };
    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);
    nameControls[controlName] = control;
    Object.keys(nameControls).forEach((item) => {
      isFormValid = nameControls[item].valid && isFormValid;
    });
    this.setState({
      nameControls,
      isFormValid,
    });
  };


  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <div
          key={controlName + index}
          className={classes.Auth__Card__Form__Center}
        >
          <AuthInput
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={(event) => this.onChangeHandler(event, controlName)}
            placeholder={control.placeholder}
          />
        </div>
      );
    });
  }

  renderNameInputs() {
    return Object.keys(this.state.nameControls).map((controlName, index) => {
      const control = this.state.nameControls[controlName];
      return (
        <div
          key={controlName + index}
          className={classes.Auth__Card__Form__Center}
        >
          <AuthInput
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={(event) => this.onChangeNameHandler(event, controlName)}
            placeholder={control.placeholder}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div className={classes.Auth__LeftSide}>
          <div className={classes.Auth__LeftSide__Logo}>
            <span>conf.me</span>
          </div>
          <div className={classes.Auth__LeftSide__TextField}>
            <h1>Добро пожаловать на<br/>Conf.me 2020 Online!</h1>
            <h2>Море полезного контента и<br/> нетворкинга ждут тебя!</h2>
          </div>
        </div>
        <div className={classes.Auth__Card}>
          <div
            className={classes.Auth__Card__FormToggle}
            onClick={this.formToggle}
          >
            {this.state.signUp ? (
              <p>
                Уже есть аккаунт?&nbsp;<span>Войти</span>
              </p>
            ) : (
              <p>
                Нет аккаунта?&nbsp;<span>Зарегистрироваться</span>
              </p>
            )}
          </div>
          <div className={classes.Auth__Card__Form}>
            {this.state.signUp ? (
              <div>
                <h1>Зарегистрироваться</h1>
                <div className={classes.Auth__Card__Form__Center}>
                  <button>Sign up with Google</button>
                </div> 
                <div className={classes.or}>
                  <hr />
                  или
                  <hr />
                </div>

                <form onSubmit={this.submitHandler}>
                  {this.renderInputs()}
                  {this.renderNameInputs()}
                </form>
                <div className={classes.Auth__Card__Form__Center}>
                  <button
                    onClick={this.registerHandler}
                    className={classes.Auth__Card__Form__Submit}
                  >
                    Создать аккаунт
                  </button>
                </div>
                {this.props.authError ? <span className={classes.Auth__Card__Form__Error}>
                  Упс! Не удалось зарегистрироваться...
                </span> : null}
              </div>
            ) : (
              <div>
                <h1>Войти</h1>
                <div className={classes.Auth__Card__Form__Center}>
                  <button>Sign in with Google</button>
                </div>
                <div className={classes.or}>
                  <hr />
                  или
                  <hr />
                </div>
                <form
                  onSubmit={this.submitHandler}
                  className={classes.AuthForm}
                >
                  {this.renderInputs()}
                </form>
                <div className={classes.Auth__Card__Form__Center}>
                  <button
                    className={classes.Auth__Card__Form__Submit}
                    onClick={this.loginHandler}
                    disabled={!this.state.isFormValid}
                  >
                    Войти
                  </button>
                </div>
                {this.props.loginError ? <span className={classes.Auth__Card__Form__Error}>
                  Упс! Не удалось войти...
                </span> : null}
                
              </div>
            )}

            {this.props.isAuthenticated ? <Redirect to="/editProfile" /> : null}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
    loginError: state.auth.loginError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (email, password, isLogin) => {
      dispatch(signIn(email, password, isLogin));
    },
    signUp: (email, password, name, surname) => {
      dispatch(signUp(email, password, name, surname));
    },
    clearUserName: () => dispatch(clearUserName()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
