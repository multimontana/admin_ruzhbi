<template>
  <div>
    <div class="form-group">
      <label for="">Название *</label>
      <input type="text" class="form-control form-control-lg" v-model="item.title"
             :class="{'is-invalid': $v.item.title.$error}"
             @blur="$v.item.title.$touch">
      <div class="invalid-feedback" v-if="!$v.item.title.required">
        Title field is required
      </div>
    </div>
    <div class="form-group">
      <label for="">Наценка категории *</label>
      <input type="text" class="form-control form-control-lg" v-model="item.markup"
             :class="{'is-invalid': $v.item.markup.$error}"
             @blur="$v.item.markup.$touch">
      <div class="invalid-feedback" v-if="!$v.item.markup.required">
        Markup field is required
      </div>

    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Комментарий</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="item.comment"></textarea>
    </div>
    <div class="form-row">
      <div class="form-group col-md-2">
        <label for="">Длина</label>
        <input type="text" class="form-control form-control-lg" v-model="item.length">
      </div>
      <div class="form-group col-md-2">
        <label for="">Ширина </label>
        <input type="text" class="form-control form-control-lg" v-model="item.width">
      </div>
      <div class="form-group col-md-2">
        <label for="">Высота</label>
        <input type="text" class="form-control form-control-lg" v-model="item.height">
      </div>
      <div class="form-group col-md-3">
        <label for="">Вес</label>
        <input type="text" class="form-control form-control-lg" v-model="item.weight">
      </div>
      <div class="form-group col-md-3">
        <label for="">Цена</label>
        <input type="text" class="form-control form-control-lg" v-model="item.price">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-4">
        <label for="">Мета заголовок</label>
        <input type="text" class="form-control form-control-lg" v-model="item.meta_title">
      </div>
      <div class="form-group col-md-4">
        <label for="">Мета описание </label>
        <input type="text" class="form-control form-control-lg" v-model="item.meta_description">
      </div>
      <div class="form-group col-md-4">
        <label for="">Мета ключевые слова</label>
        <input type="text" class="form-control form-control-lg" v-model="item.meta_keyword">
      </div>
    </div>
    <button class="btn btn-primary" :disabled="$v.$invalid" @click="create()">Создать</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  name: "CreateItem",
  data() {
    return {
      item: {
        price_id: 1,
        title: '',
        markup: '',
        comment: '',
        meta_title: '',
        meta_description: '',
        meta_keyword: '',
        price: '',
        width: '',
        height: '',
        length: '',
        weight: ''
      },
      items: [],
      prices: []
    };
  },
  validations: {
    item: {
      title: {
        required
      },
      markup: {
        required
      }
    }
  },

  created() {
    this.get()
  },
  methods: {
    ...mapActions(['getPrices', 'createItem']),
    get() {
      this.getPrices().then(res => {
        this.prices = res.price
      })
    },
    create() {
      this.createItem(this.item).then(res => {
        if (res.success) {
          this.$router.push('/item/all')
        } else {
          alert('Please check and insert again')
        }
      });
    }
  },
};
</script>
