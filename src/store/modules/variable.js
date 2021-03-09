import axios from 'axios'

const qs = require('query-string')

export const variables = {
    state: {
        token: document.cookie.match(new RegExp('(^| )' + '_token' + '=([^;]+)')) ? document.cookie.match(new RegExp('(^| )' + '_token' + '=([^;]+)'))[2] : ''
    },
    mutations: {},
    actions: {
        async getVariables(context, data) {
            try {
                const response = await axios.get('/variables', {
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
        async createVariable(context, data) {
            try {
                const response = await axios.post('/variables/create', qs.stringify(data), {
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
        async editVariable(context, data) {
            try {
                const response = await axios.put('/variables/' + data.id, qs.stringify(data), {
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
        async deleteVariable(context, data) {
            try {
                const response = await axios.get('/variables/' + data.id, {
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
