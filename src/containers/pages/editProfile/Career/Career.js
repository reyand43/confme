import React from "react";
import classes from "./Career.module.scss";
import { connect } from "react-redux";
import {
  sendUserData
} from "../../../../store/actions/editProfile";
import HorizontalInput from "../../../../components/UI/Input/HorizontalInput/HorizontalInput";
import EditCard from "../../../../components/UI/EditCard/EditCard";
import { Loader } from "../../../../components/UI/Loader/Loader";
import { linkValidator, textValidator } from "../../../../helpers/validators";

class Career extends React.Component {
  state = {
    formChanged: false,

    formControls: {
      WorkPlace: {
        value: this.props.userData.WorkPlace,
        isRequired: false,
        touched: false,
        valid: true,
      },
      CompanyName: {
        value: this.props.userData.CompanyName,
        isRequired: false,
        touched: false,
        valid: true,
      },

      Position: {
        value: this.props.userData.Position,
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
    if (event.target.name==="CompanyName"){
      control.valid = textValidator(control.value, control.isRequired)
    }
    else {
      control.valid = linkValidator(control.value, control.isRequired)
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
        <EditCard title="Контакты">
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
              value={this.state.formControls.WorkPlace.value}
              onChange={this.onChangeHandler}
              touched={this.state.formControls.WorkPlace.touched}
              name="WorkPlace"
              placeholder="Введите название компании"
              label="Место работы:"
              valid={this.state.formControls.WorkPlace.valid}

            />
            <HorizontalInput
              value={this.state.formControls.CompanyName.value}
              onChange={this.onChangeHandler}
              touched={this.state.formControls.CompanyName.touched}
              label="Ссылка на компанию:"
              name="CompanyName"
              onChange={this.onChangeHandler}
              placeholder="Вставьте ссылку на сайт вашей компании"
              valid={this.state.formControls.CompanyName.valid}

            />

            <HorizontalInput
              value={this.state.formControls.Position.value}
              onChange={this.onChangeHandler}
              touched={this.state.formControls.Position.touched}
              name="Position"
              onChange={this.onChangeHandler}
              placeholder="Введите название вашей должности"
              label="Должность:"
              valid={this.state.formControls.Position.valid}

              
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

export default connect(mapStateToProps, mapDispatchToProps)(Career);
