import React, {Component} from 'react';

import FormField from '../widgets/FormFields/formFields';
import style from './dashboard.module.css';
import {firebaseArticles, firebaseTeams, firebase} from '../../Firebase';
import Uploader from '../widgets/FileUploader/fileUploader';

import {Editor} from 'react-draft-wysiwyg';
import {EditorState, /* convertFromRaw, convertToRaw */} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

class Dashboard extends Component {
    
    state = {
        editorState: EditorState.createEmpty(),
        postError: '',
        loading: false,
        formData: {
            author: {
                element: 'input',
                value: '',
                config: {
                     name: 'author_input',
                     type: 'text',
                     placeholder: 'Enter your name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            title: {
                element: 'input',
                value: '',
                config: {
                     name: 'title_input',
                     type: 'text',
                     placeholder: 'Enter the title'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            body: {
                element: 'textEditor',
                value: '',
                valid: true
            },
            image: {
                element: 'image',
                value: '',
                valid: true
            },
            team: {
                element: 'select',
                value: '',
                config: {
                     name: 'teams_input',
                     options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''                
            }
        }
    }

    componentDidMount(){
        this.loadTeams()
    }

    loadTeams = () => {
        firebaseTeams.once('value')
        .then((snapshot) => {
            let team = [];

            snapshot.forEach((childSnapshot) => {
                team.push({
                    id: childSnapshot.val().teamId,
                    name: childSnapshot.val().city
                })
            })
            const newFormData = {...this.state.formData};
            const newElement = {...newFormData['team']};

            newElement.config.options = team;
            newFormData['team'] = newElement;

            this.setState({
                formData: newFormData
            })

        })
    }

    updateForm = (element, content = '') => {
        const newFormData = {
            ...this.state.formData
        }
        const newElement = {
            ...newFormData[element.id]
        }

        if(content === ''){
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content
        }

        if(element.blur){
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }
        newElement.touched = element.blur;
        newFormData[element.id] = newElement;

        console.log(newFormData)

        this.setState({
            formData: newFormData
        })
    }

    validate = (element) => {
        let error = [true, ''];

        if(element.validation.email){
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message = `${!valid ? 'Must be a valid email' : ''}`;
            error = !valid ? [valid, message] : error
        }

        return error;
    }


    submitForm = (event) => {
         
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value;
        }
        for(let key in this.state.formData){
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        console.log(dataToSubmit)

        if(formIsValid){
            this.setState({
                loading: true,
                postError: ''
            })
            firebaseArticles.orderByChild('id')
            .limitToLast(1).once('value')
            .then(snapshot => {
                let articleId = null;
                snapshot.forEach(childSnapshot => {
                    articleId = childSnapshot.val().id
                });

                dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP;
                dataToSubmit['id'] = articleId + 1 ;
                dataToSubmit['team'] = parseInt(dataToSubmit['team'], 10);
                
                firebaseArticles.push(dataToSubmit)
                .then(article => {
                        this.props.history.push(`/articles/${article.key}`)
                }).catch(e => {
                    this.setState({
                        postError: e.message
                    })
                })
            })
        } else {
            this.setState({
                postError: 'Something went wrong'
            })
        }

    }

    submitButton = () => (
        this.state.loading ?
            'loading...'
        :
        <div>
            <button type="submit"> Add Post </button>
        </div>
    )

    showError = () => (
        this.state.postError !== '' ?
        <div className={style.error}>
            {this.state.postError}
        </div>
        : ''  
    )

    onEditorStateChange = (editorState) => {

        let contentState = editorState.getCurrentContent();
        //let rawState = convertToRaw(contentState);

        let html = stateToHTML(contentState);

        this.updateForm({id:'body'}, html)
        
        this.setState({
            editorState
        })
    }

    storeFilename = (fileName) => {
        this.updateForm({id:'image'}, fileName)
    }

    render() {
        return(
            <div className={style.postContainer}>
                <form onSubmit={this.submitForm}>
                <h2>Add post</h2>

                 <Uploader
                    fileNamer={(fileName) => this.storeFilename(fileName)}
                 />

                <FormField
                    id={'author'}
                    formData={this.state.formData.author}
                    change={(element) => this.updateForm(element)}
                />

                <FormField
                    id={'title'}
                    formData={this.state.formData.title}
                    change={(element) => this.updateForm(element)}
                />

                <Editor
                    editorState={this.state.editorState}
                    wrapperClassName='myEditor-wrapper'
                    editorClassName='myEditor-editor'
                    onEditorStateChange={this.onEditorStateChange}
                />

                <FormField
                    id={'team'}
                    formData={this.state.formData.team}
                    change={(element) => this.updateForm(element)}
                />


                {this.submitButton()}
                {this.showError()}

                </form>
            </div>
            
        )
    }
}

export default Dashboard;