import React from 'react';
import Axios from 'axios';
import NoteForm from './NoteForm';

export default class NoteEdit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            note: {}
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id
        Axios.get(`http://localhost:3020/notes/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.name === 'JsonWebTokenError'){
                    window.alert(response.data.message)
                } else {
                    const note = response.data
                    this.setState({note})
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
    handleSubmit = (formData) => {
        const id = this.props.match.params.id
        Axios.put(`http://localhost:3020/notes/${id}`, formData, {
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
                <h2>Edit</h2>
                {Object.keys(this.state.note).length ? <NoteForm {...this.state.note} handleSubmit={this.handleSubmit} /> : ''}
            </React.Fragment>
        )
    }
}