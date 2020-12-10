<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    setTimeout(function () {
      document.getElementsByClassName('c-header-toggler')[1].addEventListener('click', function () {
        document.getElementsByClassName('c-sidebar')[0].classList.toggle('c-sidebar-lg-show')
      })
    }, 1000)
  }
}
</script>

<style lang="scss">
// Import Main styles for this application
@import 'assets/scss/style';
</style>
