<template>
    <div>
        <div class="form-group">
            <label>Login *</label>
            <input type="text" class="form-control form-control-lg" v-model="user.login" required>
        </div>
        <div class="form-group">
            <label>First name *</label>
            <input type="text" class="form-control form-control-lg" v-model="user.name" required>
        </div>
        <div class="form-group">
            <label>Email *</label>
            <input type="email" class="form-control form-control-lg" v-model="user.email" required>
        </div>
        <div class="form-group">
            <label>Password *</label>
            <input type="password" class="form-control form-control-lg" placeholder="Enter password" v-model="user.password" required>
        </div>
        <div class="form-group">
            <label>Role *</label>
            <select name="role"  class="form-control form-control-lg" v-model="user.role" required>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="manager">Manager</option>
            </select>
        </div>

        <button class="btn btn-primary" @click="create()">Создать</button>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "EditUser",
    data() {
        return {
            user: {
                login: '',
                name: '',
                email: '',
                password: '',
                role: 'admin'
            },
            users: [],
        };
    },

    created() {
        if(this.$route.params.user){
            this.user = this.$route.params.user
        }else{
            this.$router.push('/user/all')
        }
    },
    methods: {
        ...mapActions(['createUser']),
        create() {
            this.createUser(this.user).then(res => {
                if (res.success) {
                    this.$router.push('/user/all')
                } else {
                    alert('Please check and insert again')
                }
            });
        }
    },
};
</script>
