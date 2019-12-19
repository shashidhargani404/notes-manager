import axios from '../config/axios'

export const setCategories = (categories) => {
    return {
        type: 'SET_CATEGORIES',
        payload: categories
    }
}

export const startSetCategories = () => {
    return (dispatch) => {
        axios.get('/categories', {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.name === 'JsonWebTokenError'){
                    window.alert(response.data.message)
                } else {
                    dispatch(setCategories(response.data))
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}

export const addCategory = (formData) => {
    return {
        type: 'ADD_CATEGORY',
        payload: formData
    }
} 

export const startAddCategory = (formData, props) => {
    return (dispatch) => {
        axios.post('/categories', formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.name === 'JsonWebTokenError'){
                    window.alert(response.data.message)
                } else {
                    window.alert('Successfully added')
                    dispatch(addCategory(response.data))
                    props.history.push('/categories')
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}

export const updateCategory = (formData) => {
    return {
        type: 'UPDATE_CATEGORY',
        payload: formData
    }
}

export const startUpdateCategory = (formData, props) => {
    return (dispatch) => {
        axios.put(`/categories/${props.match.params.id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.name === 'JsonWebTokenError'){
                    window.alert(response.data.message)
                } else {
                    window.alert('Successfully updated')
                    dispatch(updateCategory(response.data))
                    props.history.push('/categories')
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}

export const removeCategory = (id) => {
    return {
        type: 'REMOVE_CATEGORY',
        payload: id
    }
}

export const startRemoveCategory = (id) => {
    return (dispatch) => {
        axios.delete(`/categories/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.name === 'JsonWebTokenError'){
                    window.alert(response.data.message)
                } else {
                    window.alert('Successfully deleted')
                    dispatch(removeCategory(id))
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}