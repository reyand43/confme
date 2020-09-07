import React, {Component} from 'react'
import {connect} from 'react-redux'
import classes from './Auth.module.css'
import {Button} from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import is from 'is_js'
import { auth } from '../../../store/actions/auth'
import {Redirect} from 'react-router-dom'
import { Card } from '../../../components/UI/Card/Card'

class Auth extends Component {

  state = {
    signUp: true,
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  signUpHandler = (event) => {
    console.log(!this.state.signUp)
    const value = this.state.signUp
    
    return(
    this.setState({signUp: !value}))
  }


  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true,
      
    )
  }

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false,
      
    );
  }

 

  submitHandler = event => {
    event.preventDefault()
  }

  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls, isFormValid
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
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
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  

  render() {
    
    

    return (
      
      <div className={classes.Auth}>
       
          <h1>Авторизация</h1>
          
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
          <Card>
            { this.renderInputs() }

            {/* <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button> */}
            {this.state.signUp ?  (<Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Зарегистрироваться
            </Button>) : (
               <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button> 
            )} 
           
            <p onClick={this.signUpHandler}>Уже зарегистрированы? Войдите</p>


            </Card>
          </form>
          
          {
            this.props.isAuthenticated ? <Redirect to='/editProfile' /> : null
          }
        </div>
      
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => {
      dispatch(auth(email, password, isLogin))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)