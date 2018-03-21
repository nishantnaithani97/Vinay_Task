import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Validation extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        let checkPass = '';
        this.state = {
            value : this.props.value,
            valid : false,
            errMessage : 'Input is Invalid',
            errVisible : false
        };
    }

    componentDidMount() {
        this.handleChange();
        this.setState ({
            errVisible : false
        });
    }

    focusInput() {
        this.ref[this.props.name].focus();
        this.handleChange();
        return;
    }

    handleChange(event) {
        console.log('inside handle change');
        let valid = false;
        let value, errMessage = 'Input Ok', errVisible = false;

        const { refs } = this;
        const { name, type } = this.props;

        value = refs[name].value;

        if(type == 'email' ) {
            valid = this.validateEmail( refs[name].value);
            if(!valid) {
                errMessage = "Invalid Email";
                errVisible = "text";
            }
        }
        else if(type == 'number') {
            valid = this.validateNumber( refs[name].value);
            if(!valid) {
                errMessage = "Invalid Number";
                errVisible = "text";
            }
        }
        else if(type == 'name') {
            valid = this.validateName(refs[name].value);
            if(!valid) {
                errMessage = "Invalid Name";
                errVisible = "text";
            }
        }
        else if(type == 'password' && name == 'Password') {
            valid = this.validatePassword(refs[name].value);
            checkPass = refs[name].value;
            if(!valid) {
                errMessage = "Invalid Password";
                errVisible = "text";
            }
        }
        else if(type == 'password' && name == 'confirmPassword') {
            valid = this.validateConfirmPassword(checkPass, refs[name].value );
            if(!valid) {
                errMessage = "Invalid Password";
                errVisible = "text";
            }
        }
        this.setState({
            errMessage,
            value,
            valid,
            errVisible
        });
    }
    validateEmail(value) {
        let re = /^[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-z]{2,4}$/;
        return re.test(value);
    }
  
    validateName(value) {
        let re=/^[a-zA-Z]+[ ]{1,1}[a-zA-Z]+$/;
        return re.test(value);
    }

    validateNumber(value) {
        return !isNaN(value);
    }
    
    validatePassword(value) {
        let re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return re.test(value);
    }

    validateConfirmPassword(password,confirmPassword) {
        if(password == confirmPassword){
           return true;
        }
        else{
           return false;
        }
    }

    renderLabel() {
        if (this.props.label) {
            return (
                <label htmlFor={this.props.name}>{this.props.label}</label>
            );
        }
    }
  
    render() {
        console.log('Inside Validation Render');
        const { props, state } = this;
        const { name, text, password, disabled } = props;
        let { type } = props;
        const { value, errVisible, errMessage } = state;
        const isAllowedTypes = ['text', 'email', 'number', 'password'];
      
        const isValidType    = (isAllowedTypes.indexOf(type) > -1);
        type                 = isValidType ? type : 'text';

        return (
            <div className={this.state.validClass}>
            {this.renderLabel()}
            <input
                type        = { type }  
                name        = { name } 
                ref         = { name }
                className   = { "form-control input " } 
                placeholder = { text }
                onChange    = { this.handleChange } 
              />
              <h2>{ errMessage }</h2>
            </div>
        );

    }
}

Validation.propTypes = {
    name : PropTypes.string.isRequired
};