import React, {Component} from 'react';
import {getFiles, deleteFile} from '../actions'
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom";
import FilesContainer from './FilesContainer';
import requireAuth from './requireAuth';

class Dashboard extends Component {
    state = {
        selectedFile: '',
        renderImage: true
    }

    componentWillMount() {
        if (this.props.isAuth) {
            this.props.getFiles(this.props.isAuth);
        }
    }

    handleSelectElem = (elem) => {
        this.setState({
            renderImage: false
        }, () => {
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
        });

        setTimeout(() => {
            this.setState({
                renderImage: true
            })
        }, 150)
    }

    handleDeleteElem = (elem) => {
        this.setState({
            selectedFile: ''
        }, () => {
            this.props.deleteFile(this.props.isAuth, elem);
        })
    }


    render() {
        return (
            <div className="dashboard">
                {this.props.files === [] ? <div className="no-files">Upload some files</div> : (
                    <div>
                        <div className="show-image">
                            {this.state.selectedFile ? (
                                <div className={this.state.renderImage ? 'loader' : ''}
                                     style={{backgroundImage: this.state.selectedFile}}/>
                            ) : (
                                this.props.files ? this.props.files.length !== 0 ? <div style={{
                                    backgroundImage: `url("../../resources/img-placeholder.jpg")`,
                                    opacity: "0.5"
                                }}/> : null : null
                            )}
                        </div>
                        <FilesContainer
                            files={this.props.files}
                            onSelect={this.handleSelectElem}
                            onDelete={this.handleDeleteElem}
                        />
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.authenticated,
        files: state.user.files,
    }
}

export default requireAuth(withRouter(connect(mapStateToProps, {getFiles, deleteFile})(Dashboard)))