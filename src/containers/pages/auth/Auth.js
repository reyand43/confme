import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Auth.module.scss";
import { Button } from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import is from "is_js";
import { Redirect } from "react-router-dom";
import { Card } from "../../../components/UI/Card/Card";
import { signIn, signUp } from "../../../store/actions/auth";

class Auth extends Component {
  state = {
    signUp: true,
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
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
        errorMessage: "Введите корректный пароль",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
    select: {
      value: "Ваша роль",
      type: "select",
      valid: false,
    },
  };

  signUpHandler = (event) => {
    const formControls = { ...this.state.formControls };
    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });
    if (!this.state.signUp) {
      isFormValid = this.state.select.valid && isFormValid;
    }
    //-------------------------------------
    const value = this.state.signUp;
    this.setState({ signUp: !value, isFormValid});
    //-------------------------------------
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
      this.state.select.value
    );
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    let isFormValid = true;
    let select = { ...this.state.select };
    const formControls = { ...this.state.formControls };
    if (controlName !== "select") {
      const control = { ...formControls[controlName] };
      control.value = event.target.value;
      control.touched = true;
      control.valid = this.validateControl(control.value, control.validation);

      formControls[controlName] = control;
    }
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    if (controlName === "select") {
      select = {
        ...this.state.select,
        value: event.target.value,
        valid: true,
      };
    }
    if (this.state.signUp) {
      isFormValid = select.valid && isFormValid;
    }
    this.setState({
      formControls,
      isFormValid,
      select,
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <div className={classes.Auth}>
        <h1>Авторизация</h1>

        <form onSubmit={this.submitHandler} className={classes.AuthForm}>
          <Card>
            {this.renderInputs()}

            {this.state.signUp ? (
              <div>
                <select
                  onChange={(event) => this.onChangeHandler(event, "select")}
                >
                  <option hidden value = {this.state.select.value}>{this.state.select.value}</option>
                  <option value="Участник">Участник</option>
                  <option value="Спонсор">Спонсор</option>
                  <option value="Спикер">Спикер</option>
                </select>

                <Button
                  type="primary"
                  onClick={this.registerHandler}
                  disabled={!this.state.isFormValid}
                >
                  Зарегистрироваться
                </Button>
              </div>
            ) : (
              <Button
                type="success"
                onClick={this.loginHandler}
                disabled={!this.state.isFormValid}
              >
                Войти
              </Button>
            )}

            <p onClick={this.signUpHandler} type = "changer">Уже зарегистрированы? Войдите</p>
          </Card>
        </form>

        {this.props.isAuthenticated ? <Redirect to="/editProfile" /> : null}
      </div>
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
    signIn: (email, password, isLogin) => {
      dispatch(signIn(email, password, isLogin));
    },
    signUp: (email, password, accountType) => {
      dispatch(signUp(email, password, accountType));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
