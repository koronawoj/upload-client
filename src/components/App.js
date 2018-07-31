import React, {Component} from 'react';
import {Route, Switch, withRouter } from 'react-router-dom';
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'
import LoginWrapper from './LoginWrapper'
import Loader from './Loader'
import Welcome from './Welcome'
import UploadPanel from './UploadPanel'
import Navigation from './Navigation'
import {connect} from "react-redux";
import { logout, checkTokenExist } from "../actions"

class App extends Component {
    componentWillMount() {
        this.props.checkTokenExist(() => {
            this.props.history.push('/dashboard');
        });
    }
    render() {
        return (
            <div className="content-wrapper">
                {this.props.loading ? <Loader/> : null}
                <Navigation isAuth={this.props.isAuth} onLogout={this.props.logout}/>
                <Switch>
                    <Route exact path="/" component={Welcome}/>
                    <Route path="/login" render={props => (
                            <LoginWrapper props={props}>
                                <Login/>
                            </LoginWrapper>
                        )
                    }/>
                    <Route exact path="/signup" render={props => (
                            <LoginWrapper props={props}>
                                <Signup/>
                            </LoginWrapper>
                        )
                    }/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/upload" component={UploadPanel}/>
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.authenticated,
        loading: state.loader.big,
    }
}

export default withRouter(connect(mapStateToProps, {logout, checkTokenExist})(App))