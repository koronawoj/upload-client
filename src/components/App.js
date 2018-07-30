import React, {Component} from 'react';
import {Route, Link, Switch, withRouter } from 'react-router-dom';
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'
import LoginWrapper from './LoginWrapper'
import Welcome from './Welcome'
import UploadPanel from './UploadPanel'
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
                <div className="nav">
                    <div className="left">
                        <Link to="/">Home</Link>
                        {this.props.isAuth ? (
                            <div>
                                <Link to="/dashboard">Dashboard</Link>
                                <Link to="/upload">Upload</Link>
                            </div>
                        ) : null}
                    </div>
                    <div className="right">
                        {this.props.isAuth ? (
                            <div>
                                <Link onClick={() => {this.props.logout()}} to="/">Logout</Link>
                            </div>
                        ) : (
                            <div>
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Signup</Link>
                            </div>
                        )}
                    </div>
                </div>
                <Switch>
                    <Route exact path="/" component={Welcome}/>

                    <Route path="/login" render={(props) => {
                        return (
                            <LoginWrapper props={props}>
                                <Login/>
                            </LoginWrapper>
                        )
                    }}/>
                    <Route exact path="/signup" render={(props) => {
                        return (
                            <LoginWrapper props={props}>
                                <Signup/>
                            </LoginWrapper>
                        )
                    }}/>
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
    }
}

// export default App
export default withRouter(connect(mapStateToProps, {logout, checkTokenExist})(App))