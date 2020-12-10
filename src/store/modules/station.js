import axios from 'axios'

// const qs = require('query-string')

export const station = {
    state: {
    },
    mutations: {},
    actions: {
        async getStations(context, data) {
            try {
                const response = await axios.get('/station/' + data, {
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
    },
    getters: {}
}
