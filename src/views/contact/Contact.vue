<template>
    <div>
        <div v-if="error">
            <p class="alert-danger">Указанные данные неверны.</p>
        </div>
        <div v-if="success">
            <p class="alert-success">Изменения успешно сохранены </p>
        </div>
        <div class="form-group">
            <label for="">Номер телефона *</label>
            <input type="text" class="form-control form-control-lg" v-model="contact.phone">
        </div>
        <div class="form-group">
            <label for="">Email *</label>
            <input type="email" class="form-control form-control-lg" v-model="contact.email">
        </div>
        <div class="form-group">
            <label for="">Адрес *</label>
            <input type="text" class="form-control form-control-lg" v-model="contact.address" @keyup="getAddress ()">
            <ul>
                <li class="list-group-item" v-for="(addr, index) in addresses" :key="index" @click="selectAddr(addr)">
                    {{ addr }}
                </li>
            </ul>
        </div>
        <button class="btn btn-primary" @click="create()">Сохранить</button>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "Contact",
    data() {
        return {
            contact: {
                id: '',
                phone: '',
                email: '',
                address: ''
            },
            error: false,
            success: false,
            errorMessage: 'Error',
            addresses: []
        }
    },
    created() {
        this.get()
    },
    methods: {
        ...mapActions(['getContact', 'createContact', 'getAddresses']),
        get() {
            this.getContact().then(res => {
                if (res.contact) {
                    this.contact = res.contact
                }
            })
        },
        create() {
            this.createContact(this.contact).then(res => {
                if (res.success) {
                    this.get()
                    this.success = true
                    this.error = false
                } else {
                    this.success = false
                    this.error = true
                }
            })
        },
        onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        },
        getAddress() {
            if (this.contact.address) {
                this.getAddresses(this.contact.address).then(res => {
                    if (res) {
                        this.addresses = []
                        res.forEach(item => {
                            this.addresses.push(item.GeoObject.name)
                        })
                        this.addresses.filter(this.onlyUnique);
                    }
                })
            } else {
                this.addresses = []
            }
        },
        selectAddr(e) {
            this.contact.address = e
            this.addresses = []
        },
    }
}
</script>

<style scoped>

</style>
