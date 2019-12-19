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
                dispatch(setCategories(response.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}