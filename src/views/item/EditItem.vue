<template>
  <div>
    <!--        <div class="form-group">-->
    <!--            <label for="">Цена </label>-->
    <!--            <select class="form-control form-control-lg" v-model="item.price_id">-->
    <!--                <option v-for="price in prices" :value="price.id">{{ price.id }}</option>-->
    <!--            </select>-->
    <!--        </div>-->
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
      <label>Комментарий</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                v-model="item.comment"></textarea>
    </div>
    <div class="form-row">
      <div class="form-group col-md-2">
        <label>Длина</label>
        <input type="text" class="form-control form-control-lg" v-model="item.length">
      </div>
      <div class="form-group col-md-2">
        <label>Ширина </label>
        <input type="text" class="form-control form-control-lg" v-model="item.width">
      </div>
      <div class="form-group col-md-2">
        <label>Высота</label>
        <input type="text" class="form-control form-control-lg" v-model="item.height">
      </div>
      <div class="form-group col-md-3">
        <label>Вес</label>
        <input type="text" class="form-control form-control-lg" v-model="item.weight">
      </div>
      <div class="form-group col-md-3">
        <label>Цена</label>
        <input type="text" class="form-control form-control-lg" v-model="item.price">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-4">
        <label>Мета заголовок</label>
        <input type="text" class="form-control form-control-lg" v-model="item.meta_title">
      </div>
      <div class="form-group col-md-4">
        <label>Мета описание </label>
        <input type="text" class="form-control form-control-lg" v-model="item.meta_description">
      </div>
      <div class="form-group col-md-4">
        <label>Мета ключевые слова</label>
        <input type="text" class="form-control form-control-lg" v-model="item.meta_keyword">
      </div>
    </div>
    <button class="btn btn-primary" @click="edit()">Изменить</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  name: "EditCategory",
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
    if (this.$route.params.item) {
      this.item = this.$route.params.item
      this.item.properties.forEach(item => {
        switch (item.name) {
          case 'price':
            this.item.price = item.value
            break
          case 'width':
            this.item.width = item.value
            break
          case 'height':
            this.item.height = item.value
            break
          case 'length':
            this.item.length = item.value
            break
          case 'weight':
            this.item.weight = item.value
            break
          default:
            break
        }
      })
    } else {
      this.$router.push('/item/all')
    }
  },
  methods: {
    ...mapActions(['getPrices', 'editItem']),
    get() {
      this.getPrices().then(res => {
        this.prices = res.price
      });
    },
    edit() {
      this.editItem(this.item).then(res => {
        if (res.success) {
          this.$router.push('/item/all')
        }
      });
    },
  },
};
</script>


