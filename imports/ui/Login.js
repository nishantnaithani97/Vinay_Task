import React, { Component } from 'react';
import Validation from './Validation.js';
// import Task from './Task.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Register from './Register.js';
export default class Login extends Component {
  constructor(props) {
    super(props);

  }

  login() {
    console.log(this.email.state.value);
    let that = this;
    if(this.email.state.valid && this.password.state.valid) {
      // console.log(this.email.state.value);
      Meteor.call('findUser', this.email.state.value, this.password.state.value,function(er,res){
        // console.log(res);
        if(res) {
          that.props.history.push('/todo');
        }
        else {
          alert('Enter correct values');
        }
      });
    }
    else {
      alert('Please enter the valid values');
    }
  }

  toRegister(e) {
    e.preventDefault();
    this.props.history.push('/register');
  }
  render() {
     return (
      <div>
        <h2>Login Page</h2>
        <hr></hr>
        <Validation 
        type = 'email'
        name = 'uemail'
        text = 'Username' 
        required = 'true' 
        ref ={(input) => this.email = input } 
        onChange = { this.handleChange }
        />
        <Validation 
        type = 'password'
        name = 'Password'
        text = 'Password'
        required = 'true'
        ref = {(input) => this.password = input } 
        onChange = { this.handleChange }
        />
        <input
        type = 'submit'
        name = 'ulogin'
        value = 'Login'
        onClick = { this.login.bind(this) }
        />
        <input
        type = 'submit'
        name = 'uregister'
        value = 'Register'
        onClick = { this.toRegister.bind(this) }
        />
      </div>
    );
  }
}
