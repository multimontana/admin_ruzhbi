<template>
  <div>
    <div class="form-group">
      <label for="">Родительская категория
      </label>
      <select class="form-control form-control-lg" v-model="category.parent_id">
        <option value="0">Нет</option>
        <option v-for="cat in categories" :value="cat.parent_id">{{ cat.title }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="">Название *</label>
      <input type="text" class="form-control form-control-lg" v-model="category.title"
             :class="{'is-invalid': $v.category.title.$error}"
             @blur="$v.category.title.$touch">
      <div class="invalid-feedback" v-if="!$v.category.title.required">
        Title field is required
      </div>
    </div>
    <div class="form-group">
      <label for="">Наценка категории *</label>
      <input type="text" class="form-control form-control-lg" v-model="category.markup"
             :class="{'is-invalid': $v.category.markup.$error}"
             @blur="$v.category.markup.$touch">
      <div class="invalid-feedback" v-if="!$v.category.markup.required">
        Markup field is required
      </div>
    </div>
    <div class="form-group">
      <label for="">Серия/ГОСТ/Чертеж</label>
      <multiselect
          :options="serias"
          :multiple="true"
          :taggable="true"
          v-model="category.seria"
      >
      </multiselect>
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Комментарий</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="category.comment"></textarea>
    </div>
    <div class="form-row">
      <div class="form-group col-md-4">
        <label for="">Мета заголовок</label>
        <input type="text" class="form-control form-control-lg" v-model="category.meta_title"
        :class="{'is-invalid': $v.category.meta_title.$error}"
        @blur="$v.category.meta_title.$touch">
        <div class="invalid-feedback" v-if="!$v.category.meta_title.required">
          Image field is required
        </div>
      </div>
      <div class="form-group col-md-4">
        <label for="">Мета описание </label>
        <input type="text" class="form-control form-control-lg" v-model="category.meta_description">
      </div>
      <div class="form-group col-md-4">
        <label for="">Мета ключевые слова</label>
        <input type="text" class="form-control form-control-lg" v-model="category.meta_keyword">
      </div>
    </div>
    <div class="form-group">
      <label for="">Изображение *</label>
      <input type="file" @change="onImageChange" class="form-control-file"
             :class="{'is-invalid': $v.category.image.$error}"
             @blur="$v.category.image.$touch">
      <div class="invalid-feedback" v-if="!$v.category.image.required">
        Image field is required
      </div>
    </div>
    <button class="btn btn-primary" :disabled="$v.$invalid" @click="create()">Создать</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import Multiselect from 'vue-multiselect';
import {required} from 'vuelidate/lib/validators'

export default {
  name: "CreateCategory",
  data() {
    return {
      category: {
        parent_id: 0,
        title: '',
        markup: '',
        seria: null,
        image: '',
        comment: '',
        meta_title: '',
        meta_description: '',
        meta_keyword: ''
      },
      categories: [],
      serias: ['Select seria'],
      items: []
    };
  },
  validations: {
    category: {
      title: {
        required
      },
      markup: {
        required
      },
      image: {
        required
      },
      meta_title: {
        required
      },
    }
  },
  components: {Multiselect},
  created() {
    this.get();
  },
  methods: {
    ...mapActions(['getCategories', 'createCategory']),
    get() {
      this.getCategories().then(res => {
        this.categories = res.cat;
        this.serias = res.serias;
      });
    },
    create() {
      this.createCategory(this.category).then(res => {
        if (res.success) {
          this.$router.push('/category/all')
        } else {
          alert('Please check and insert again')
        }
      });
    },
    onImageChange(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      if (file['size'] < 2111775) {
        reader.onloadend = (file) => {
          this.category.image = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('File size can not be bigger than 2 MB');
      }
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

