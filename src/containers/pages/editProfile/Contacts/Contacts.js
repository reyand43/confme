import React from "react";
import classes from "./Contacts.module.scss";
import { connect } from "react-redux";
import { sendUserData } from "../../../../store/actions/editProfile";
import HorizontalInput from "../../../../components/UI/Input/HorizontalInput/HorizontalInput";
import EditCard from "../../../../components/UI/EditCard/EditCard";
import { Loader } from "../../../../components/UI/Loader/Loader";
import { linkValidator, numberValidator, phoneValidator, textValidator } from "../../../../helpers/validators";

class Contacts extends React.Component {
  state = {
    formChanged: false,

    formControls: {
      Vk: {
        value: this.props.userData.Vk,
        isRequired: false,
        touched: false,
        valid: true,
      },
      Fb: {
        value: this.props.userData.Fb,
        isRequired: false,
        touched: false,
        valid: true,
      },

      Inst: {
        value: this.props.userData.Inst,
        isRequired: false,
        touched: false,
        valid: true,
      },
      Phone: {
        value: this.props.userData.Phone,
        isRequired: false,
        touched: false,
        valid: true,
      },
      Li: {
        value: this.props.userData.Li,
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

  

  onChangeHandler = (event) => {
    let formControls = { ...this.state.formControls };
    let control = { ...formControls[event.target.name] };
    control.value = event.target.value;
    control.touched = true;
    if (event.target.name==="Phone"){
      control.valid = phoneValidator(control.value, control.isRequired)
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
              value={this.state.formControls.Phone.value}
              onChange={this.onChangeHandler}
              touched={this.state.formControls.Phone.touched}
              name="Phone"
              placeholder="+7 (___) ___-__-__"
              label="Телефон:"
              valid={this.state.formControls.Phone.valid}
              shouldValidate={this.state.formControls.Phone.isRequired}
              errorMessage={"Введите корректный номер телефона"}
            />
            <HorizontalInput
              value={this.state.formControls.Vk.value}
              onChange={this.onChangeHandler}
              touched={this.state.formControls.Vk.touched}
              valid={this.state.formControls.Vk.valid}
              name="Vk"
              label="Вконтакте:"
              placeholder="Вставьте ссылку на страницу"
            />

            <HorizontalInput
              value={this.state.formControls.Fb.value}
              onChange={this.onChangeHandler}
              touched={this.state.formControls.Fb.touched}
              valid={this.state.formControls.Fb.valid}
              name="Fb"
              label="Facebook:"
              placeholder="Вставьте ссылку на страницу"
            />

            <HorizontalInput
              value={this.state.formControls.Li.value}
              onChange={this.onChangeHandler}
              touched={this.state.formControls.Li.touched}
              valid={this.state.formControls.Li.valid}
              name="Li"
              label="LinkedIn:"
              placeholder="Вставьте ссылку на страницу"
            />

            <HorizontalInput
              value={this.state.formControls.Inst.value}
              onChange={this.onChangeHandler}
              touched={this.state.formControls.Inst.touched}
              valid={this.state.formControls.Inst.valid}
              label="Instagram:"
              name="Inst"
              placeholder="Вставьте ссылку на страницу"
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

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
