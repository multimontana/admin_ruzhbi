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
  {key: 'email', _style: 'min-width:100px;'},
  {key: 'address', _style: 'min-width:100px;'},
  {key: 'site', _style: 'min-width:100px;'},
  {key: 'comment', _style: 'min-width:100px;'},
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
    document.querySelector('h2').innerHTML = '<img src="/img/load.gif" class="loading" alt="load data">';
  },
  created() {
    this.get()
  },
  methods: {
    ...mapActions(['getContractors', 'deleteContractor']),
    get() {
      this.getContractors().then(res => {
        if (res.contractors.length) {
          this.items = res.contractors
        } else {
          document.querySelector('h2').innerHTML = 'Empty'
        }
      })
    },
    edit(item) {
      this.$router.push(
          {
            name: 'EditContractor',
            params: {'item': item}
          })
    },
    deleteItem(item) {
      if (confirm('Are you sure remove this contractor?')) {
        this.deleteContractor(item).then(res => {
          this.get()
        })
      }
    }
  }
}
</script>
