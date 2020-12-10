import axios from 'axios'

const qs = require('query-string')

export const users = {
    state: {
        token: document.cookie.match(new RegExp('(^| )' + '_token' + '=([^;]+)')) ? document.cookie.match(new RegExp('(^| )' + '_token' + '=([^;]+)'))[2] : ''
    },
    mutations: {},
    actions: {
        async getUsers(context, data) {
            try {
                const response = await axios.get('/users', {
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
        async createUser(context, data) {
            try {
                const response = await axios.post('/users/create', qs.stringify(data), {
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
        async editUser(context, data) {
            try {
                const response = await axios.put('/users/' + data.id, qs.stringify(data), {
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
        async deleteUser(context, data) {
            try {
                const response = await axios.get('/users/' + data.id, {
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
        }

    },
    getters: {}
}
