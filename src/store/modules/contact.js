import axios from 'axios'

const qs = require('query-string')

export const contact = {
    state: {
        token: document.cookie.match(new RegExp('(^| )' + '_token' + '=([^;]+)')) ? document.cookie.match(new RegExp('(^| )' + '_token' + '=([^;]+)'))[2] : ''
    },
    mutations: {},
    actions: {
        async getContact(context, data) {
            try {
                const response = await axios.get('/contact', {
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
        async getAddresses(context, data) {
            try {
                const response = await axios.get('https://geocode-maps.yandex.ru/1.x/?apikey=c0d403ab-e5be-4049-908c-8122a58acf23&format=json&geocode='+data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                let res = response.data.response.GeoObjectCollection.featureMember
                if (response.data) {
                    return  res
                }
                return {success: false}
            } catch (e) {
                console.log(e.response.data.message);
            }
        },
        async createContact(context, data) {
            try {
                const response = await axios.post('/contact/create', qs.stringify(data), {
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
