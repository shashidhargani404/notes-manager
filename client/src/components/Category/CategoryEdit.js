import React from 'react';
import CategoryForm from './CategoryForm';
import Axios from 'axios';

export default class CategoryEdit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            category: {}
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id
        Axios.get(`http://localhost:3020/categories/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.name === 'JsonWebTokenError'){
                    window.alert(response.data.message)
                } else {
                    const category = response.data
                    this.setState({category})
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
    handleSubmit = (formData) => {
        const id = this.props.match.params.id
        Axios.put(`http://localhost:3020/categories/${id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.name === 'JsonWebTokenError'){
                    window.alert(response.data.message)
                } else {
                    window.alert('Note successfully created')
                    this.props.history.push('/categories')
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
                {this.state.category.hasOwnProperty('name') ? <CategoryForm handleSubmit={this.handleSubmit} name={this.state.category.name} /> : ''}        
            </React.Fragment>
        )
    }
}
