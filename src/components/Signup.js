import React, {Component} from 'react';
import {loaderLinear, login, signup} from '../actions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';

class Signup extends Component {
    state = {
        email: '',
        password: '',
        confPassword: '',
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <label htmlFor="password">Confirm password</label>
                    <input
                        type="password"
                        name="confPassword"
                        value={this.state.confPassword}
                        onChange={(e) => this.handleChange(e)}
                    />
                </div>
                <button onSubmit={(e) => this.handleSubmit(e)}>Signup</button>
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