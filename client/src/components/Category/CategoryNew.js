import React from 'react';
import CategoryForm from './CategoryForm';
import Axios from 'axios';

export default class CategoryNew extends React.Component {
    handleSubmit = (formData) => {
        Axios.post('http://localhost:3020/categories', formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.name === 'JsonWebTokenError'){
                    window.alert(response.data.message)
                } else {
                    window.alert('Successfully added')
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
                <h2>Add new category</h2>
                <CategoryForm handleSubmit={this.handleSubmit} />
            </React.Fragment>
        )
    }
}