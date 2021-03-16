<template>
  <div>
    <div class="form-group">
      <label for="">Цена </label>
      <select class="form-control form-control-lg" v-model="item.price_id">
        <option v-for="price in prices" :value="price.id">{{ price.id }}</option>
      </select>
    </div>
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
      <label for="">Кастомный url*</label>
      <input type="text" class="form-control form-control-lg" v-model="item.url">
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
    <div class="form-row">
      <label for="">Прикрепить файл</label>
    </div>
      <div class="dropbox">
        <input type="file" multiple name="document" @change="upload($event)"
               accept="application/pdf" class="input-file">
        Upload files <span>{{ filelength }} {{filename}}</span>
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
      filelength:'',
      filename:'Empty',
      item: {
        price_id: '',
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
        weight: '',
        document: [],
        url: '',
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
    upload(event) {
      this.filename = event.target.name
      this.filelength = event.target.files.length
      this.item.document = event.target.files;
    },
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
          // alert('Please check and insert again')
        }
      });
    }
  },
};
</script>
<style scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 100px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 100px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
