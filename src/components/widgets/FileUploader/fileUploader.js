import React, {Component} from 'react';
import {firebase} from '../../../Firebase';
import FileUploader from 'react-firebase-file-uploader';

class Uploader extends Component {

    state = {
        name: '',
        isUploading: false,
        progress: 0,
        fileURL: ''
    }

    handleUploadStart = () => {
        this.setState({
            isUploading: true,
            progress: 0
        })
    }

    handleUploadError = (error) => {
        this.setState({
            isUploading: false,
        })
        console.log(error)
    }

    handleUploadSuccess = (fileName) => {
        this.setState({
            name: fileName,
            progress: 100,
            isUploading: false
        })

        firebase.storage().ref('images')
        .child(fileName).getDownloadURL()
        .then(url => {
            this.setState({
                fileURL: url
            })
        })

        this.props.fileNamer(fileName)
    }

    handleProgress = (progress) => {
        this.setState({
            progress
        })
    }

    render(){
        return(
            <div>
                
                <FileUploader
                    accept='image/*'
                    name='image'
                    randomizeFilename
                    storageRef={firebase.storage().ref('images')}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleUploadProgress}
                />
                {this.state.isUploading ?
                <p>Progress: {this.state.progress}</p>
                    : null
                }
                {this.state.fileURL ? 
                    <img style={{
                        width:'300px'
                    }} src={this.state.fileURL} alt={this.state.fileURL}/>
                    : null
                }
            </div>
        ) 
    }
}

export default Uploader;