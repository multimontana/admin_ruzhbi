<template>
    <div>
        <div class="form-group">
            <label>Родительская категория
            </label>
            <select class="form-control form-control-lg" v-model="category.parent_id">
                <option>Нет</option>
                <option v-for="cat in categories" :value="cat.parent_id">{{ cat.title }}</option>
            </select>
        </div>
        <div class="form-group">
            <label>Название *</label>
            <input type="text" class="form-control form-control-lg" v-model="category.title">
        </div>
        <div class="form-group">
            <label>Наценка категории *</label>
            <input type="text" class="form-control form-control-lg" v-model="category.markup">
        </div>
        <div class="form-group">
            <label>Серия/ГОСТ/Чертеж</label>
            <multiselect
                :options="serias"
                :multiple="true"
                :taggable="true"
                v-model="category.seria"
            >
            </multiselect>
        </div>
        <div class="form-group">
            <label>Комментарий</label>
            <textarea class="form-control" rows="3"
                      v-model="category.comment"></textarea>
        </div>
        <div class="form-row">
            <div class="form-group col-md-4">
                <label>Мета заголовок</label>
                <input type="text" class="form-control form-control-lg" v-model="category.meta_title">
            </div>
            <div class="form-group col-md-4">
                <label>Мета описание </label>
                <input type="text" class="form-control form-control-lg" v-model="category.meta_description">
            </div>
            <div class="form-group col-md-4">
                <label>Мета ключевые слова</label>
                <input type="text" class="form-control form-control-lg" v-model="category.meta_keyword">
            </div>
        </div>
        <div class="form-group">
            <label>Изображение</label>
            <input type="file" @change="onImageChange" class="form-control-file">
        </div>
        <button class="btn btn-primary" @click="edit()">Изменить</button>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import Multiselect from 'vue-multiselect';

export default {
    name: "EditCategory",
    data() {
        return {
            category: {
                parent_id: '',
                title: '',
                markup: '',
                seria: [],
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
    components: {Multiselect},
    created() {
        this.get()
        if (this.$route.params.item) {
            this.category = this.$route.params.item
            this.category.seria = JSON.parse(this.category.seria)
        } else {
            this.$router.push('/category/all')
        }
    },
    methods: {
        ...mapActions(['getCategories', 'editCategory']),
        get() {
            this.getCategories().then(res => {
                this.categories = res.cat;
                this.serias = res.serias;
            });
        },
        edit() {
            this.editCategory(this.category).then(res => {
                if (res.success) {
                    this.$router.push('/category/all')
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

