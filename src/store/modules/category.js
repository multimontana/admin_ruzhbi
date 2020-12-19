import axios from 'axios'

const qs = require('query-string')

export const category = {
    mutations: {},
    actions: {
        async getCategories (context, data) {
            try {
                const response = await axios.get('/categories', {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                if (response.data) {
                    return response.data
                }
                return {success: false}
            } catch (e) {
                console.log(e.response.data.message);
            }
        },
        async createCategory (context, data) {
            try {
                if (data.title && data.markup) {
                    data.seria = JSON.stringify(data.seria)
                }
                const response = await axios.post('/categories/create', qs.stringify(data), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                console.log(response, 'ggg')
                if (response.data) {
                    return response.data
                }
                return {success: false}
            } catch (e) {
                console.log(e.response.data.message);
            }
        },
        async editCategory (context, data) {
            try {
                if (data.title && data.markup) {
                    data.seria = JSON.stringify(data.seria)
                }
                const response = await axios.put('/categories/' + data.id, qs.stringify(data), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                if (response.data) {
                    return response.data
                }
                return {success: false}
            } catch (e) {
                console.log(e.response.data.message);
            }
        },
        async deleteCategory (context, data) {
            try {
                const response = await axios.get('/categories/' + data.id, {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                if (response.data) {
                    return response.data
                }
                return {success: false}
            } catch (e) {
                console.log(e.response.data.message);
            }
        }

    },
    getters: {}
}
