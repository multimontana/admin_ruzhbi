<template>
    <CCardBody>
        <CDataTable
            :items="items"
            :fields="fields"
            column-filter
            table-filter
            items-per-page-select
            :items-per-page="10"
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
                        @click="deleteItem(item)"
                    >
                        {{ 'Delete' }}
                    </CButton>
                </td>
            </template>
        </CDataTable>
    </CCardBody>
</template>

<script>
import {mapActions} from "vuex";

const fields = [
    {key: 'title', _style: 'min-width:200px'},
    {key: 'markup', _style: 'min-width:100px;'},
    {key: 'seria', _style: 'min-width:100px;'},
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
    name: 'Category',
    data() {
        return {
            items: [],
            fields,
            details: [],
            collapseDuration: 0
        }
    },
  mounted() {
    document.querySelector('h2').innerHTML='<img src="/img/load.gif" class="loading" alt="load data">';
  },
    created() {
        this.get()
    },
    methods: {
        ...mapActions(['getCategories', 'deleteCategory']),
        get() {
            this.getCategories().then(res => {
                this.items = res.cat
            })
        },
        edit(item) {
            this.$router.push(
                {
                    name: 'EditCategory',
                    params: {'item': item}
                })
        },
        deleteItem(item) {
            if (confirm('Are you sure remove this category?')) {
                this.deleteCategory(item).then(res => {
                    this.get()
                })
            }
        }
    }
}
</script>
