import axios from 'axios'

const qs = require('query-string')

export const contractors = {
    state: {
    },
    mutations: {
    },
    actions: {
        async getContractors (context, data) {
            try {
                const response = await axios.get('/contractors', {
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
                console.log(e)
            }
        },
        async createContractor (context, data) {
            try {
                const response = await axios.post('/contractors/create', qs.stringify(data), {
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
                console.log(e)
            }
        },
        async editContractor (context, data) {
            try {
                const response = await axios.put('/contractors/' + data.id, data, {
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
                console.log(e)
            }
        },
        async deleteContractor (context, data) {
            try {
                const response = await axios.delete('/contractors/'+ data.id, {
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
                console.log(e)
            }
        }

    },
    getters: {

    }
}
