<template>
    <CCardBody>
        <CDataTable
                :items="users"
                :fields="fields"
                column-filter
                table-filter
                :items-per-page-select="true"
                :items-per-page="20"
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
    {key: 'name', _style: 'min-width:100px'},
    {key: 'login', _style: 'min-width:100px;'},
    {key: 'salt', _style: 'min-width:100px;'},
    {key: 'role', _style: 'min-width:100px;'},
    {key: 'email', _style: 'min-width:100px;'},
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
    name: 'User',
    data () {
        return {
            users: [],
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
        ...mapActions(['getUsers', 'deleteUser']),
        get () {
            this.getUsers().then(res => {
                this.users = res.user
            })
        },
        edit (user) {
            this.$router.push(
                {
                    name: 'EditUser',
                    params: {'user': user}
                })
        },
        deleteItem (item) {
            if (confirm('Are you sure remove this user?')) {
                this.deleteUser(item).then(res => {
                    this.get()
                })
            }
        }
    }
}
</script>

<style scoped>
</style>
