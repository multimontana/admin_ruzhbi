<template>
    <h1>dsfsdfsd</h1>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "Order",
    data () {
        return {

        }
    },
    methods:{
        ...mapActions(['getOrders'])
    }
}
</script>

<style scoped>

</style>