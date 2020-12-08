import React from "react";
import classes from "./Interests.module.scss";
import { connect } from "react-redux";
import {

  sendUserData
} from "../../../../store/actions/editProfile";
import EditCard from "../../../../components/UI/EditCard/EditCard";
import HorizontalInput from "../../../../components/UI/Input/HorizontalInput/HorizontalInput";
import {Loader} from "../../../../components/UI/Loader/Loader"

class Interests extends React.Component {
  state = {
    formChanged: false,

    formControls: {
      Look: {
        value: this.props.userData.Look,
        isRequired: false,
        touched: false,
        valid: true,
      },
      Suggest: {
        value: this.props.userData.Suggest,
        isRequired: false,
        touched: false,
        valid: true,
      },
      Hobby: {
        value: this.props.userData.Hobby,
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
    control.valid = this.requireControl(control.value, control.isRequired, event.target.name);

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
        <EditCard title="Интересы">
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
              name="Look"
              value={this.state.formControls.Look.value}
              onChange={this.onChangeHandler}
              placeholder="Введите тег"
              label="Я ищу:"
              touched={this.state.formControls.Look.touched}
            />
            <HorizontalInput
              value={this.state.formControls.Suggest.value}
              onChange={this.onChangeHandler}
              touched={this.state.formControls.Suggest.touched}
              label="Я предлагаю:"
              name="Suggest"
              onChange={this.onChangeHandler}
              placeholder="Введите тег"
            />

            <div className={classes.Inputs__Textarea}>
              <label>Мои интересы:</label>
              <textarea
                name="Hobby"
                onChange={this.onChangeHandler}
                placeholder="Напишите пару слов о себе и своих интересах"
                touched={this.state.formControls.Hobby.touched}
              >
                {this.state.formControls.Hobby.value}
              </textarea>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Interests);
