<template>
    <CCardBody>
        <CDataTable
            :items="items.data"
            :fields="fields"
            column-filter
            table-filter
            :items-per-page-select="false"
            :items-per-page="per_page"
            hover
            sorter
            pagination
        >
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
            per_page: 20
        }
    },
  mounted() {
    Vue.nextTick(function () {
      document.querySelector('h2').innerHTML = '<img src="/img/load.gif" class="loading" alt="load data">';
    })
  },
    created() {
        this.getResults()
    },
    methods: {
        ...mapActions(['getItems', 'deleteItem']),
        getResults(page) {
            if (typeof page === 'undefined') {
                page = 1;
            }
            this.getItems(page).then(res => {
                this.items = res.item
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
        }
    }
}
</script>

<style scoped>

@import '../../assets/css/style.css';
</style>
