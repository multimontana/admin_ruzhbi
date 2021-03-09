<template>
  <div>
    <div class="form-group">
      <label>Название *</label>
      <input type="text" class="form-control form-control-lg" v-model="variable.name"
             :class="{'is-invalid': $v.variable.name.$error}"
             @blur="$v.variable.name.$touch">
      <div class="invalid-feedback" v-if="!$v.variable.name.required">
        Name field is required
      </div>
    </div>
    <div class="form-group">
      <label>Описание *</label>
      <input type="text" class="form-control form-control-lg" v-model="variable.description"
             :class="{'is-invalid': $v.variable.description.$error}"
             @blur="$v.variable.description.$touch">
      <div class="invalid-feedback" v-if="!$v.variable.description.required">
        Description field is required
      </div>
    </div>
    <button class="btn btn-primary" :disabled="$v.$invalid" @click.prevent="create()">Создать</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {required} from 'vuelidate/lib/validators'

export default {
  name: "CreateVariable",
  data() {
    return {
      variable: {
        name: '',
        description: '',
      },
    };
  },
  validations: {
    variable: {
      name: {
        required
      },
      description: {
        required
      }
    }
  },
  methods: {
    ...mapActions(['createVariable']),
    create() {
        this.createVariable(this.variable).then(res => {
          if (res.success) {
            this.$router.push('/variable/all')
          } else {
            alert('Please check and insert again')
          }
        });
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

