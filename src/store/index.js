import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {auth} from './modules/auth'
import {category} from './modules/category'
import {users} from './modules/users'
import {contractors} from './modules/contractors'
import {items} from './modules/items'
import {contact} from './modules/contact'
import {station} from "@/store/modules/station";

export default new Vuex.Store({
        modules: {
            auth,
            users,
            category,
            contractors,
            items,
            contact,
            station
        }
    }
)
