// import { Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
// import { withTracker } from 'meteor/react-meteor-data';
import Validation from './Validation.js';
// import { Users } from '../api/users.js';
export default class Register extends Component {
    constructor(props) {
        super(props);
    }
    saveData=()=>{
        let that = this;
        if(this.name.state.valid && this.email.state.valid && this.password.state.valid && this.password.state.value === this.confirmPassword.state.value) {
            Meteor.call('addUser',
                this.name.state.value,
                this.email.state.value,
                this.password.state.value, (err, res) => {
                    if(!res) {
                        alert('You are already registered');
                        that.props.history.push('/login');                
                    }
                    else {
                        alert('HOORAY!!.....You are successfully registered.');
                        that.props.history.push('/login');
                    }
                });
        }
        else {
            alert('Please provide all details.');
        }
    }
    render() {
        return (
            <div>
                <h2>Registration Page</h2>
                <hr></hr>
                <Validation 
                type = 'name'
                name = 'uname'
                text = 'Username' 
                required  
                ref = {(input) => this.name = input } 
                onChange = { this.handleChange }
                />
                <Validation
                type = 'email'
                name = 'uemail'
                text = 'Email Address'
                required 
                ref = {(input) => this.email = input } 
                onChange = { this.handleChange }
                />
                <Validation 
                type = 'password'
                name = 'Password'
                text = 'Password'
                required 
                ref = {(input) => this.password = input } 
                onChange = { this.handleChange }
                />
                <Validation 
                type = 'password'
                name = 'confirmPassword'
                text = 'Confirm Password'
                required 
                ref = {(input) => this.confirmPassword = input } 
                onChange = { this.handleChange }
                />
                <input type = 'submit' name = 'register' value = 'Register' onClick ={this.saveData.bind(this)}/>
  
            </div>
        );
    }

}
