<template>
  <CCardBody>
    <div class="col-sm-3 mb-3 d-flex">
      <div>
      <input type="text" class="form-control" placeholder="Search item..." v-on:keyup="searchItem" v-model="search">
      </div>
      <div class="ml-2">
      <img v-if="loadSearch" src="../../../public/img/load.gif" alt="loader"  width="30px" >
      </div>
    </div>
    <CDataTable
        :items="items.data"
        :fields="fields"
        :column-filter="false"
        :table-filter="false"
        :items-per-page-select="false"
        :items-per-page="per_page"
        hover
        sorter
        pagination
    >
      <template #isAdmin="{item}">
        <td>
          <CBadge :color="item.isAdmin ? 'success' : 'primary'">
            {{ item.isAdmin ? 'From shop admin' : 'From admin' }}
          </CBadge>
        </td>
      </template>
      <template #edit="{item}">
        <td class="py-2">
          <CButton
              color="primary"
              variant="outline"
              square
              size="sm"
              @click="edit(item)"
          >
            {{ 'Edit' }}
          </CButton>
        </td>
      </template>
      <template #delete="{item}">
        <td class="py-2">
          <CButton
              color="danger"
              variant="outline"
              square
              size="sm"
              @click="deleteProduct(item)"
          >
            {{ 'Delete' }}
          </CButton>
        </td>
      </template>
    </CDataTable>
    <paginate
        :page-count="items.last_page ? items.last_page : 0"
        :offset="22"
        :click-handler="getResults"
        :prev-text="'«'"
        :next-text="'»'"
        :container-class="'paginationItem'">
    </paginate>
  </CCardBody>
</template>

<script>
import {mapActions} from "vuex";
import Vue from 'vue'
import paginate from 'vuejs-paginate'

const fields = [
  {key: 'title', _style: 'min-width:200px'},
  {key: 'markup', _style: 'min-width:100px;'},
  {key: 'comment', _style: 'min-width:100px;'},
  {key: 'isAdmin', _style: 'min-width:100px;'},
  {
    key: 'edit',
    label: 'Edit',
    _style: 'width:1%',
    sorter: false,
    filter: false
  }, {
    key: 'delete',
    label: 'Delete',
    _style: 'width:1%',
    sorter: false,
    filter: false
  }

]
export default {
  name: 'Item',

  data() {
    return {
      items: [],
      fields,
      details: [],
      collapseDuration: 0,
      per_page: 20,
      search: '',
      loadSearch: false,
    }
  },
  mounted() {
    Vue.nextTick(function () {
      document.querySelector('h2').innerHTML = '<img src="/img/load.gif" class="loading" alt="load data">';
    })
  },
  components: {
    paginate
  },
  created() {
    this.getResults()
  },
  methods: {
    ...mapActions(['getItems', 'deleteItem', 'searchItems']),
    getResults(page) {
      if (typeof page === 'undefined') {
        page = 1;
      }

      this.getItems(page).then(res => {
        this.items = res.item
        document.getElementById('load') ? document.getElementById('load').innerHTML='': '';
      })
    },
    edit(item) {
      this.$router.push(
          {
            name: 'EditItem',
            params: {'item': item}
          })
    },
    deleteProduct(item) {
      if (confirm('Are you sure remove this product?')) {
        this.deleteItem(item).then(res => {
          this.getResults()
        })
      }
    },
    searchItem() {
      this.loadSearch = true;
      this.searchItems(this.search).then((res) => {
        this.items = res.item;
      }).finally(() => {
        this.loadSearch = false;
      })

    }
  }
}
</script>

<style scoped>

@import '../../assets/css/style.css';
</style>
