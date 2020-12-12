<template>
  <div>
    <div class="form-group">
      <label for="">Login *</label>
      <input type="text" class="form-control form-control-lg" v-model="user.login"
             :class="{'is-invalid': $v.user.login.$error}"
             @blur="$v.user.login.$touch">
      <div class="invalid-feedback" v-if="!$v.user.login.required">
        Login field is required
      </div>
    </div>
    <div class="form-group">
      <label for="">First name *</label>
      <input type="text" class="form-control form-control-lg" v-model="user.name"
             :class="{'is-invalid': $v.user.name.$error}"
             @blur="$v.user.name.$touch">
      <div class="invalid-feedback" v-if="!$v.user.name.required">
        User field is required
      </div>
    </div>
    <div class="form-group">
      <label for="">Email *</label>
      <input type="email" class="form-control form-control-lg" v-model="user.email"
             :class="{'is-invalid' : $v.user.email.$error}"
             @blur="$v.user.email.$touch"
      >
      <div class="invalid-feedback" v-if="!$v.user.email.required">
        Email field is required
      </div>
      <div class="invalid-feedback" v-if="!$v.user.email.email">
        This field should be an email
      </div>
    </div>
    <div class="form-group">
      <label for="">Password *</label>
      <input type="text" class="form-control form-control-lg" v-model="user.password"
             :class="{'is-invalid': $v.user.password.$error}"
             @blur="$v.user.password.$touch"
      >
      <div class="invalid-feedback" v-if="!$v.user.password.minLength">
        Min length of password is {{ $v.user.password.$params.minLength.min }}. Now it is
        {{ user.password.length }}.
      </div>
    </div>
    <div class="form-group">
      <label for="">Role *</label>
      <select name="role" class="form-control form-control-lg" v-model="user.role"
              :class="{'is-invalid': $v.user.role.$error}"
              @blur="$v.user.role.$touch">
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="manager">Manager</option>
      </select>
      <div class="invalid-feedback" v-if="!$v.user.role.required">
        Role field is required
      </div>
    </div>

    <button class="btn btn-primary" :disabled="$v.$invalid" @click="create()">Создать</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {email, minLength, required} from 'vuelidate/lib/validators'

export default {
  name: "CreateUser",
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
  validations: {
    user: {
      login: {
        required,
      },
      name: {
        required,
      },
      role: {
        required,
      },
      email: {
        required,
        email
      },
      password: {
        minLength: minLength(6)
      },
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
