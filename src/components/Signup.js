import React, {Component} from 'react';
import {loaderLinear, login, signup} from '../actions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';

class Signup extends Component {
    state = {
        email: '',
        password: '',
        confPassword: '',
        error: {
            email: '',
            password: '',
            confPassword: '',
        },
        blur: {
            email: false,
            password: false,
            confPassword: false,
        },
        focus: {
            email: false,
            password: false,
            confPassword: false,
        },
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.validate()
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.signup(data, () => {
            this.props.history.push('/dashboard');
        });
    }

    validate = () => {
        if (this.state.blur.email && !(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email))) {
            this.setState((prevState) => {
                return {error: {...prevState.error, email: 'Please set correct email!'}}
            })
        } else {
            this.setState((prevState) => {
                return {error: {...prevState.error, email: ''}}
            })
        }
        if (this.state.blur.password && this.state.password.length < 6) {
            this.setState((prevState) => {
                return {error: {...prevState.error, password: 'Please set min 6 characters!'}}
            })
        } else {
            this.setState((prevState) => {
                return {error: {...prevState.error, password: ''}}
            })
        }
        if (this.state.blur.password &&
            this.state.blur.confPassword &&
            this.state.password !== this.state.confPassword
        ) {
            this.setState((prevState) => {
                return {error: {...prevState.error, confPassword: 'Passwords are not equal'}}
            })
        } else {
            this.setState((prevState) => {
                return {error: {...prevState.error, confPassword: ''}}
            })
        }
    }

    validateAll = () => (
        (
            this.state.error.email ||
            this.state.error.password ||
            this.state.error.confPassword)
        || (
            !this.state.focus.email ||
            !this.state.focus.password ||
            !this.state.focus.confPassword
        ) || (
            !this.state.email ||
            !this.state.password ||
            !this.state.confPassword
        )
    )

    render() {
        return (
            <form className="form-wrapper" onSubmit={(e) => this.handleSubmit(e)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={(e) => this.handleChange(e)}
                        onBlur={() => {
                            this.setState((prevState) => {
                                return {blur: {...prevState.blur, email: true}}
                            }, () => {
                                this.validate();
                            })
                        }}
                        onFocus={() => {
                            this.setState((prevState) => {
                                return {focus: {...prevState.focus, email: true}}
                            })
                        }}
                    />
                    {this.state.error.email ? <div className="error-message">{this.state.error.email}</div> : null}
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={(e) => this.handleChange(e)}
                        onBlur={() => {
                            this.setState((prevState) => {
                                return {blur: {...prevState.blur, password: true}}
                            }, () => {
                                this.validate();
                            })
                        }}
                        onFocus={() => {
                            this.setState((prevState) => {
                                return {focus: {...prevState.focus, password: true}}
                            })
                        }}
                    />
                    {this.state.error.password ?
                        <div className="error-message">{this.state.error.password}</div> : null}
                    <label htmlFor="password">Confirm password</label>
                    <input
                        type="password"
                        name="confPassword"
                        value={this.state.confPassword}
                        onChange={(e) => this.handleChange(e)}
                        onBlur={() => {
                            this.setState((prevState) => {
                                return {blur: {...prevState.blur, confPassword: true}}
                            }, () => {
                                this.validate();
                            })
                        }}
                        onFocus={() => {
                            this.setState((prevState) => {
                                return {focus: {...prevState.focus, confPassword: true}}
                            })
                        }}
                    />
                    {this.state.error.confPassword ?
                        <div className="error-message">{this.state.error.confPassword}</div> : null}

                </div>
                <button
                    disabled={this.validateAll()}
                    onSubmit={(e) => this.handleSubmit(e)}
                >
                    Signup
                </button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        showLoader: state.loader.linearLoader,
    }
}

export default withRouter(connect(mapStateToProps, {loaderLinear, signup})(Signup))