import React, {Component} from 'react';
import {uploadFiles} from '../actions'
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom";
import Dropzone from 'react-dropzone'
import requireAuth from './requireAuth';

class UploadPanel extends Component {
    state = {
        uploadStatus: false,
        files: [],
        accepted: [],
        rejected: []
    }
    handleUpload = (e) => {
        e.preventDefault();

        let data = this.state.accepted;

        let formData = new FormData();
        for (let i = 0; i < data.length; i++) {
            formData.append("file", data[i]);
        }

        this.props.uploadFiles(formData, this.props.isAuth, () => {
            this.props.history.push('/dashboard');
        });
    }
    bytesToSize = (bytes) => {
        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return +(bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    };

    delFile = (file) => {
        this.setState((prevState) => {
            return {
                accepted: prevState.accepted.filter(elem => elem.name !== file)
            }
        })
    }

    render() {
        return (
            <div className="upload">
                <div className="dropzone">
                    <Dropzone
                        accept="image/jpeg, image/png, image/gif, application/pdf"
                        maxSize={5242880}
                        className="actual-dropzone"
                        onDrop={
                            (accepted, rejected) => {
                                this.setState({
                                    accepted,
                                    rejected
                                });
                            }}
                    >
                        <div>
                            <p>Try dropping some files here, or click to select files to upload.</p>
                            <p>Only *.jpg, *.png, *.gif, *.pdf up to 5MB files will be accepted</p>
                        </div>
                    </Dropzone>
                    <div className="upload-status">
                        {this.state.accepted.length !== 0 ? (
                            <div
                                className={'accepted-files' + (this.state.accepted.length > 10 ? ' rejected-files' : '')}>
                                <p>Ready to upload
                                    files: {this.state.accepted.length} {this.state.accepted.length > 10 ? 'too many. Please delete' : null}
                                </p>
                                <ul>
                                    {this.state.accepted.map(f => <li key={f.name}><span className="delete-file"
                                                                                         onClick={() => this.delFile(f.name)}>X</span>{' - ' + f.name.toLowerCase()} - {this.bytesToSize(f.size)}
                                    </li>)}
                                </ul>
                            </div>
                        ) : null}
                        {this.state.rejected.length !== 0 ? (
                            <div className="rejected-files">
                                <p>Rejected files</p>
                                <p>Only *.jpg, *.png, *.gif, *.pdf up to 5MB files will be accepted</p>
                                <ul>
                                    {this.state.rejected.map(f => <li
                                        key={f.name}>{f.name.toLowerCase()} - {this.bytesToSize(f.size)}</li>)}
                                </ul>
                            </div>
                        ) : null}

                    </div>
                    <button className="btn"
                            disabled={this.state.accepted.length > 10 || this.state.accepted.length === 0}
                            onClick={(e) => this.handleUpload(e)}>upload
                    </button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.authenticated,
    }
}

export default requireAuth(withRouter(connect(mapStateToProps, {uploadFiles})(UploadPanel)))