import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class CategoryList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            categories: []
        }
    }
    componentDidMount(){
        Axios.get('http://localhost:3020/categories', {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.name === 'JsonWebTokenError'){
                    window.alert(response.data.message)
                } else {
                    const categories = response.data
                    this.setState({categories})
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
    handleDelete = (_id) => {
        Axios.delete(`http://localhost:3020/categories/${_id}`, {
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
                        categories: prevState.categories.filter(category => category._id !== _id)
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
                <h2>Categories - {this.state.categories.length}</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.categories.map((category, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{category.name}</td>
                                        <td><Link to={`/categories/${category._id}`}>Edit</Link></td>
                                        <td><button onClick={ () => {
                                            this.handleDelete(category._id)
                                        }}>Delete</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <br/>
                <Link to="/categories/new">Add category</Link>
            </React.Fragment>
        )
    }
}