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
      <label>Название *</label>
      <input type="text" class="form-control form-control-lg" v-model="variable.description"
             :class="{'is-invalid': $v.variable.description.$error}"
             @blur="$v.variable.description.$touch">
      <div class="invalid-feedback" v-if="!$v.variable.description.required">
        Description field is required
      </div>
    </div>
    <button class="btn btn-primary" :disabled="$v.$invalid" @click.prevent="edit">Изменить</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  name: "EditVariable",
  data() {
    return {
      disable_button: true,
      variable: {
        name: '',
        description: ''
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
  created() {
    if (this.$route.params.item) {
      this.variable = this.$route.params.item
    } else {
      this.$router.push('/variable/all')
    }
  },
  methods: {
    ...mapActions(['getVariables', 'editVariable']),
    get() {
      this.getVariables().then(res => {
        this.variable = res.variable;
      });
    },
    edit() {
      if (this.disable_button) {
        this.editVariable(this.variable).then(res => {
          if (res.success) {
            this.$router.push('/variable/all')
          }
        });
      }
    },
  },
};
</script>


