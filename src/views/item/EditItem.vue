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
    <div class="form-row">
      <label for="">Прикрепить файл</label>

    </div>
    <div class="d-flex">
    <div v-bind:class="{ 'is-active': isActive }" style="position: relative" class="ml-2" v-for="(src_img,i) in item.parsed ? item.parsed : []" :key="i">
      <a :href="src_img" target="_blank"><img src="/pdf.jpg" height="35px" alt="document"></a>
      <span v-on:click="delete_pdf(i)" style="position: absolute;cursor: pointer">X</span>
    </div>
    </div>
    <div class="dropbox">
      <input value="c:/amrit.txt" type="file" multiple name="document" @change="upload($event)"
             accept="application/pdf" class="input-file">
      Upload files <span>{{ filelength }} {{ filename }}</span>
    </div>
    <div v-if="import_file" class="d-flex">
      <div v-for="name in import_file" :key="name.id">
      <span>{{ name }}</span>
      <img src="/pdf.jpg" ref="cat_image" height="60px" width="60px" alt="category_image">
      </div>
    </div>
    <button class="btn btn-primary" :disabled="$v.$invalid" @click="edit()">Изменить</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";
import {logo} from "@/assets/icons/logo";

export default {
  name: "EditCategory",
  data() {
    return {
      import_file: [],
      filelength: '',
      isActive: false,
      filename: 'Empty',
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
        parsed: [],
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
    if (this.$route.params.item) {
      this.item = {...this.$route.params.item}
      this.item.properties.forEach(item => {
        switch (item.name) {
          case 'length':
            this.item.length = item.value
            break
          case 'price':
            this.item.price = item.value
            break
          case 'width':
            this.item.width = item.value
            break
          case 'height':
            this.item.height = item.value
            break
          case 'weight':
            this.item.weight = item.value
            break
          case 'url':
            this.item.url = item.url
            break
        }
      })
      this.item.parsed = this.item.document ?  JSON.parse(this.item.document) : [];
    }
    else {
      this.$router.push('/item/all')
    }
  },

  methods: {
    ...mapActions(['getPrices', 'editItem']),
    upload(event) {
      this.filename = event.target.name
      this.filelength = event.target.files.length
      this.item.document = event.target.files;
      let fileData =  event.target.files;
      this.import_file = [];
      for (let i = 0; i < fileData.length; i++) {
        this.import_file.push(fileData[i].name)
      }
    },
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
    delete_pdf(arg){
      this.item.parsed.splice(arg, 1)
      this.isActive = !this.isActive;
    },
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


