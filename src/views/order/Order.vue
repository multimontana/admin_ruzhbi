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
    {key: 'first_name', _style: 'min-width:200px'},
    {key: 'last_name', _style: 'min-width:100px;'},
    {key: 'email', _style: 'min-width:100px;'},
    {key: 'phone_1', _style: 'min-width:100px;'},
    {key: 'phone_2', _style: 'min-width:100px;'},
    {key: 'sum_price', _style: 'min-width:100px;'},
    {
        key: 'delete',
        label: 'Delete',
        _style: 'width:1%',
        sorter: false,
        filter: false
    }

]
export default {
    name: "Order",
    data () {
        return {
            items: [],
            fields,
            details: [],
            collapseDuration: 0
        }
    },
    mounted () {
        document.querySelector('h2').innerHTML = '<img src="/img/load.gif" class="loading" alt="load data">';
    },
    created () {
        this.get()
    },
    methods: {
        ...mapActions(['getOrders', 'deleteOrder']),
        get () {
            this.getOrders().then(res => {
                this.items = res.orders
            })
        },
        deleteItem (item) {
            let vm = this
            if (confirm('Are you sure remove this order?')) {
                this.deleteOrder(item).then(res => {
                    vm.get()
                })
            }
        }
    }
}
</script>