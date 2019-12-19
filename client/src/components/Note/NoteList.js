import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class NoteList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            notes: []
        }
    }
    componentDidMount(){
        Axios.get('http://localhost:3020/notes', {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.name === "JsonWebTokenError"){
                    window.alert(response.data.message)
                } else {
                    const notes = response.data
                    this.setState({notes})
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
    handleDelete = (_id) => {
        Axios.delete(`http://localhost:3020/notes/${_id}`, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.name === 'JsonWebTokenError'){
                    window.alert(response.data.message)
                } else {
                    window.alert('Successfully deleted')
                    this.setState((prevState) => ({
                        notes: prevState.notes.filter(note => note._id !== _id)
                    }))
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
    render(){
        return (
            <React.Fragment>
                <h2>Listing - {this.state.notes.length}</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Category</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.notes.map((note, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{note.title}</td>
                                        <td>{note.body}</td>
                                        <td>{note.category.name}</td>
                                        <td><Link to={`/notes/${note._id}`}>Edit</Link></td>
                                        <td><button onClick={ () => {
                                            this.handleDelete(note._id)
                                        }}>Delete</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <br/>
                <Link to="/notes/new">Add note</Link>
            </React.Fragment>
        )
    }
}