import React, {Component} from 'react';
import {loaderLinear, login, uploadFiles, getFiles} from '../actions'
import {connect} from 'react-redux'
import {withRouter, Link} from "react-router-dom";
import FilesContainer from './FilesContainer';

class Dashboard extends Component {
    state = {
        selectedFile: ''
    }

    componentWillMount() {
        this.props.getFiles(this.props.isAuth);
    }

    handleSelectElem = (elem) => {
        if (elem.slice(-3) !== "pdf") {
            this.setState({
                selectedFile: `url("http://localhost:3090/${elem}")`
            })
        } else {
            window.open(`http://localhost:3090/${elem}`, "_blank")
            this.setState({
                selectedFile: `url("../../resources/icons/pdf-ico.png")`
            })
        }
    }

    render() {
        return (
            <div className="dashboard">
                <div>welcome {this.props.username}</div>
                <div className="show-image">
                    {this.state.selectedFile ? (
                        <div style={{backgroundImage: this.state.selectedFile}}/>
                    ) : (
                        <div style={{backgroundImage: `url("../../resources/img-placeholder.jpg")`, opacity: "0.5"}}/>
                    )}

                </div>
                <FilesContainer files={this.props.files} onSelect={this.handleSelectElem}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.authenticated,
        username: state.user.username,
        files: state.user.files,
    }
}

export default withRouter(connect(mapStateToProps, {getFiles})(Dashboard))