import axios from 'axios'
import {logo} from "../../assets/icons/logo";

const qs = require('query-string')

export const items = {
    state: {
        token: document.cookie.match(new RegExp('(^| )' + '_token' + '=([^;]+)')) ? document.cookie.match(new RegExp('(^| )' + '_token' + '=([^;]+)'))[2] : ''
    },
    mutations: {},
    actions: {
        async getItems(context, data) {
            try {
                const response = await axios.get('/items?page=' + data, {
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
        async getPrices(context, data) {
            try {
                const response = await axios.get('/prices', {
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
        async createItem(context, data) {
            try {
                const formData = new FormData()
                for (const prop in data) {
                    if (prop === 'document') {
                        for (let i = 0; i < data[prop].length; i++) {
                            formData.append('document[' + i + ']', data[prop][i])
                        }
                    } else {
                        formData.append([prop], data[prop])

                    }
                }
                const response = await axios.post('/items/create', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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
        async editItem(context, data) {
            try {
                let formData = new FormData()

                for (const prop in data) {
                    if (prop === 'document' && data[prop] !== null) {
                        for (let i = 0; i < data[prop].length; i++) {
                            formData.append('document[' + i + ']', data[prop][i])
                            console.log(data[prop][i])
                        }
                    }
                    else {
                        formData.append(prop, data[prop])
                    }
                }

                const response = await axios.post('/items/' + data.id, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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
        async deleteItem(context, data) {
            try {
                const response = await axios.get('/items/' + data.id, {
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
        async searchItems(context, data) {
            try {
                const response = await axios.post('/search', {data},{
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
        },
    },
    getters: {}
}
