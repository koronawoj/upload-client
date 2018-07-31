import React, {Component} from 'react';
import {loaderLinear, login} from '../actions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';

class Login extends Component {
    state = {
        email: '',
        password: '',
        error: {
            email: '',
            password: '',
        },
        blur: {
            email: false,
            password: false,
        },
        focus: {
            email: false,
            password: false,
        },
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.validate()
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
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.login(data, () => {
            this.props.history.push('/dashboard');
        });
    }

    validateAll = () => (
        (
            this.state.error.email ||
            this.state.error.password)
        || (
            !this.state.focus.email ||
            !this.state.focus.password
        ) || (
            !this.state.email ||
            !this.state.password
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
                </div>
                {this.props.errorMessage ?
                    <div className="error-message">{this.props.errorMessage}</div> : null}

                <button
                    disabled={this.validateAll()}
                    onSubmit={(e) => this.handleSubmit(e)}
                >
                    login
                </button>
            </form>
        )
    }
}



function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessageLogin,
    }
}


export default withRouter(connect(mapStateToProps, {loaderLinear, login})(Login))