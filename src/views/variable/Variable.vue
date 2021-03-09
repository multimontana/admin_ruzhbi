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
  {key: 'name', _style: 'min-width:200px'},
  {key: 'description', _style: 'min-width:100px;'},
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
  name: 'Variable',
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
    swal("В этом разделе вы можете создать переменние  и дальше это применить  в других  разделах  использовая  {{ИМЯ_ПЕРЕМЕННОЙ}} формулу!")
    this.get()
  },
  methods: {
    ...mapActions(['getVariables', 'deleteVariable']),
    get() {
      this.getVariables().then(res => {
        if (res.variable.length) {
          this.items = res.variable
        } else {
          document.querySelector('h2').innerHTML = 'Empty'
        }
      })
    },
    edit(item) {
      this.$router.push(
          {
            name: 'EditVariable',
            params: {'item': item}
          })
    },
    deleteItem(item) {
      let vm = this;
      if (confirm('Are you sure remove this variable?')) {
        this.deleteVariable(item).then(res => {
          vm.get()
        })
      }
    }
  }
}
</script>
