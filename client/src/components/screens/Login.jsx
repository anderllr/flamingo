import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';

import { AUTH_LOGIN } from '../resources/queries/userQuery';
import logo from '../../assets/img/logo.png';
import './Login.css';
import FormErrors from '../utils/FormErrors';

/*
*  In this page I used ApolloConsumer because I want to fire my query after user click on button
*
*
*/
class Login extends Component {
    state = {
        email: '',
        password: '',
        remember: false,
        formErrors: { email: '', password: '' },
        serverErrors: '',
        emailValid: false,
        passwordValid: false,
        formValid: false
    }

    constructor(props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
                fieldValidationErrors.password = passwordValid ? '' : ' must have at least 8 characters, one uppercase letter and one number';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    onChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value, serverErrors: '' },
            () => { this.validateField(name, value) });
    }

    async onLogin(token) {
        if (token) {
            //TODO: Put the name of token in a security place
            await sessionStorage.setItem('access_token', token);
            //On successfull we redirect to admin page
            console.log('Vai redirecionar: ', token);
            this.props.history.push('/admin');
        }
    }

    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-md-12">

                                <div className="row">
                                    <div className="col-md-6 mx-auto">

                                        <div className="card rounded-0">
                                            <div className="card-header d-flex justify-content-center align-items-center">
                                                <img src={logo} alt="logo" className="text-center" />
                                            </div>
                                            <div className="card-header d-flex justify-content-center align-items-center">
                                                <h3 className="mb-0">Please Sign in</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="form">
                                                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                                                        <label>Email</label>
                                                        <input type="text" className="form-control form-control-lg rounded-0" name="email" required=""
                                                            onChange={e => this.onChange(e)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Password</label>
                                                        <input type="password" className="form-control form-control-lg rounded-0" name="password" required="" autoComplete="new-password"
                                                            onChange={e => this.onChange(e)}
                                                        />

                                                    </div>
                                                    <div>
                                                        <label>
                                                            <input type="checkbox" value="remember-me" /> Remember me on this computer
                                                        </label>
                                                    </div>
                                                    <button className="btn btn-success btn-lg float-right"
                                                        disabled={!this.state.formValid}
                                                        id="btnLogin"
                                                        onClick={() => client.query({
                                                            query: AUTH_LOGIN,
                                                            variables: {
                                                                email: this.state.email,
                                                                password: this.state.password
                                                            }
                                                        })
                                                            .then(({ data }) => {
                                                                let { login: { token } } = data;
                                                                this.onLogin(token);
                                                            })
                                                            .catch(({ graphQLErrors }) => {
                                                                this.setState({ serverErrors: graphQLErrors[0].message });
                                                            })

                                                        }
                                                    >Login</button>
                                                </div>

                                            </div>

                                        </div>
                                        <div className="card rounded-0 d-flex justify-content-center align-items-center">
                                            <FormErrors formErrors={this.state.formErrors} />
                                            <div className="text-danger">{this.state.serverErrors}</div>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </ApolloConsumer>
        )

    }
}

export default Login;