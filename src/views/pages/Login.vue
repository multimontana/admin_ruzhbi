<template>
    <CContainer class="d-flex content-center min-vh-100">
        <CRow>
            <CCol>
                <CCardGroup>
                    <CCard class="p-4">
                        <CCardBody>
                            <CForm @submit.prevent="loginUserPost">
                                <h1>Login</h1>
                                <p class="text-muted">Sign In to your account</p>
                                <div v-if="errorMessage" class="modal-body alert-danger">Your Email or Password is
                                    incorrect
                                </div>
                                <div role="group" class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-prepend"><span class="input-group-text">@</span></div>
                                        <input id="email" type="email" placeholder="Email"
                                               autocomplete="email" class="form-control"
                                               :class="{'is-invalid' : $v.email.$error}"
                                               @blur="$v.email.$touch"
                                               v-model="email"
                                        >
                                        <div class="invalid-feedback" v-if="!$v.email.required">
                                            Email field is required
                                        </div>
                                        <div class="invalid-feedback" v-if="!$v.email.email">
                                            This field should be an email
                                        </div>
                                    </div>
                                </div>

                                <div role="group" class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-prepend"><span class="input-group-text"><svg
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img"
                                            class="c-icon"><path
                                            d="M18 9.375v-2.625c0-3.314-2.686-6-6-6s-6 2.686-6 6v0 2.625h-1.875v6c0 4.342 3.533 7.875 7.875 7.875s7.875-3.533 7.875-7.875v-6zM7.5 6.75c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5v0 2.625h-9zM18.375 15.375c0 3.515-2.86 6.375-6.375 6.375s-6.375-2.86-6.375-6.375v-4.5h12.75z"></path></svg></span>
                                        </div>
                                        <input id="password" type="password" placeholder="Password"
                                               autocomplete="new-password" class="form-control"
                                               v-model="password"
                                               :class="{'is-invalid': $v.password.$error}"
                                               @blur="$v.password.$touch"
                                        >
                                        <div class="invalid-feedback" v-if="!$v.password.minLength">
                                            Min length of password is {{ $v.password.$params.minLength.min }}. Now it is
                                            {{ password.length }}.
                                        </div>
                                    </div>
                                </div>

                                <CRow>
                                    <CCol col="12" class="text-center">
                                        <CButton color="primary" type="submit" :disabled="$v.$invalid" class="px-4">
                                            Login
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCardGroup>
            </CCol>
        </CRow>
    </CContainer>
</template>

<script>
import {email, minLength, required} from 'vuelidate/lib/validators'
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            dangerModal: true,
            errorMessage: false,
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            minLength: minLength(6)
        },
    },
    methods: {
        ...mapActions(['loginUserAction']),
        ...mapState({
            log: state => user.login
        }),
        loginUserPost() {
            let log = {
                email: this.email,
                password: this.password
            }
            this.loginUserAction(log).then(res => {
                console.log(res)
                if (res) {
                    this.$router.push('/dashboard')
                } else {
                    this.errorMessage = true
                }
            })
        },
    }
}
</script>
