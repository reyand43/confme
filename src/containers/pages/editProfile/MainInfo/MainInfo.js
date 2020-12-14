import React from "react";
import classes from "./MainInfo.module.scss";
import { connect } from "react-redux";
import { sendUserData } from "../../../../store/actions/editProfile";

import EditCard from "../../../../components/UI/EditCard/EditCard";
import HorizontalInput from "../../../../components/UI/Input/HorizontalInput/HorizontalInput";
import { Loader } from "../../../../components/UI/Loader/Loader";
import { numberValidator, textValidator} from "../../../../helpers/validators";

class MainInfo extends React.Component {
  state = {
    formChanged: false,

    formControls: {
      Name: {
        value: this.props.userData.Name,
        isRequired: true,
        touched: false,
        valid: true,
      },
      Surname: {
        value: this.props.userData.Surname,
        isRequired: true,
        touched: false,
        valid: true,
      },
      Age: {
        value: this.props.userData.Age,
        isRequired: false,
        touched: false,
        valid: true,
      },
      Country: {
        value: this.props.userData.Country,
        isRequired: false,
        touched: false,
        valid: true,
      },
      City: {
        value: this.props.userData.City,
        isRequired: false,
        touched: false,
        valid: true,
      },
      Sex: {
        value: this.props.userData.Sex,
        isRequired: false,
        touched: false,
        valid: true,
      },
    },
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.userData.length === 0) {
      return true;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot === true) {
      let formControls = { ...this.state.formControls };
      Object.keys(formControls).forEach((name) => {
        formControls[name].value = this.props.userData[name];
      });
      this.setState({
        formControls,
      });
    }
  }

  requireControl(value, isRequired) {
    if (isRequired === false) {
      return true;
    } else {
      let isValid = true;
      isValid = value.trim() !== "";
      return isValid;
    }
  }

  onChangeHandler = (event) => {
    let formControls = { ...this.state.formControls };
    let control = { ...formControls[event.target.name] };
    control.value = event.target.value;
    control.touched = true;
    //control.valid = this.requireControl(control.value, control.isRequired);
    if (event.target.name==="Age"){
      control.valid = numberValidator(control.value, control.isRequired)
    }
    else {
      control.valid = textValidator(control.value, control.isRequired)
    }
    formControls[event.target.name] = control;
    this.setState({
      formControls,
      formChanged: true,
    });
  };

  checkForm = () => {
    //если форма не изменена то ок
    if (!this.state.formChanged) {
      return true;
    }

    let check = true;
    const formControls = { ...this.state.formControls };
    //проверяем все ли инпуты валидны
    Object.keys(formControls).forEach((control) => {
      check =
        (formControls[control].valid ||
          formControls[control].value === this.props.userData[control]) &&
        check;
    });

    return check;
  };

  submitHandler = () => {
    if (this.checkForm()) {
      const Info = new Object();
      const formControls = { ...this.state.formControls };
      Object.keys(formControls).forEach((control) => {
        formControls[control].value !== undefined &&
          (Info[control] = formControls[control].value);
      });
      this.props.sendUserData(Info);
    }
  };

  render() {
    return (
      <>
        <EditCard title="Основное">
          {this.props.sendUserDataLoading && (
            <div className={classes.Card}>
              <Loader />
            </div>
          )}
          {this.props.userDataSent && (
            <div className={classes.Card}>
              <i className="fa fa-check" aria-hidden="true"></i>
              <span>Данные успешно изменены</span>
            </div>
          )}
          <div className={classes.Inputs}>
            <HorizontalInput
              name="Name"
              value={this.state.formControls.Name.value}
              onChange={this.onChangeHandler}
              label="Имя:"
              placeholder="Введите ваше имя"
              valid={this.state.formControls.Name.valid}
              touched={this.state.formControls.Name.touched}
              shouldValidate={this.state.formControls.Name.isRequired}
              errorMessage={"Имя не может быть пустым"}
            />
            <HorizontalInput
              label="Фамилия:"
              name="Surname"
              value={this.state.formControls.Surname.value}
              placeholder="Введите вашу фамилию"
              onChange={this.onChangeHandler}
              valid={this.state.formControls.Surname.valid}
              touched={this.state.formControls.Surname.touched}
              shouldValidate={this.state.formControls.Surname.isRequired}
              errorMessage={"Фамилия не может быть пустой"}
            />
            <div className={classes.Inputs__Divider}>
              <HorizontalInput
                small={true}
                name="Age"
                onChange={this.onChangeHandler}
                placeholder={"Ваш возраст"}
                value={this.state.formControls.Age.value}
                label="Возраст:"
                valid={this.state.formControls.Age.valid}
                shouldValidate={this.state.formControls.Age.isRequired}
                errorMessage={"Введите корректный возраст"}
                touched={this.state.formControls.Age.touched}
              />
              <div style={{ width: "22px" }} />
              <div className={classes.Inputs__Select}>
                <label>Пол:</label>
                <select
                  name="Sex"
                  onChange={this.onChangeHandler}
                  value={this.state.formControls.Sex.value}
                >
                  <option value="" defaultValue>
                    Не выбрано
                  </option>
                  <option value="Man">Мужчина</option>
                  <option value="Woman">Женщина</option>
                </select>
              </div>
            </div>
            <HorizontalInput
              label="Страна:"
              name="Country"
              onChange={this.onChangeHandler}
              placeholder="Введите страну"
              value={this.state.formControls.Country.value}
              valid={this.state.formControls.Country.valid}
              touched={this.state.formControls.Country.touched}
              shouldValidate={this.state.formControls.Country.isRequired}
            />
            <HorizontalInput
              label="Город:"
              name="City"
              onChange={this.onChangeHandler}
              placeholder="Введите город"
              value={this.state.formControls.City.value}
              valid={this.state.formControls.City.valid}
              touched={this.state.formControls.City.touched}
              shouldValidate={this.state.formControls.City.isRequired}
              noSpan
            />
          </div>
          <div className={classes.Inputs__Button}>
            <button onClick={this.submitHandler}>Сохранить</button>
          </div>
        </EditCard>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.editProfile.userData,
    userDataError: state.editProfile.userDataError,
    sendUserDataLoading: state.editProfile.sendUserDataLoading,
    sendUserDataError: state.editProfile.sendUserDataError,
    userDataSent: state.editProfile.userDataSent,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendUserData: (Info) => dispatch(sendUserData(Info)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainInfo);
