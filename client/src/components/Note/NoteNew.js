import React from 'react';
import Axios from 'axios';

import NoteForm from './NoteForm';

export default class NoteNew extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            categories: []
        }
    }
    handleSubmit = (formData) => {
        Axios.post('http://localhost:3020/notes', formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.name === 'JsonWebTokenError'){
                    window.alert(response.data.message)
                } else {
                    window.alert('Note successfully created')
                    this.props.history.push('/notes')
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
    render(){
        return (
            <React.Fragment>
                <h2>Add new note</h2>
                <NoteForm handleSubmit={this.handleSubmit} />
            </React.Fragment>
        )
    }
}
