import axios from 'axios'

const qs = require('query-string')
export const order = {
    state: {},
    mutations: {},
    actions: {
        async getOrders (context, data) {
            try {
                const response = await axios.get('/order' + data, {
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
        async deleteContact (context, data) {
            try {
                const response = await axios.post('/order/' + data.id, {
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
                return e.response.data;
            }
        }
    },
    getters: {}
}
