<template>
  <header>
    <ul>
        <li><router-link to="/">HOME</router-link></li>
        <li><router-link to="/about">ABOUT</router-link></li>
        <li><router-link to="/contacts">CONTACTS</router-link></li>
        <li><router-link to="/basket">BASKET({{ getBasket }})</router-link></li>
    </ul>
  </header>
</template>

<script>
export default {
computed:{
  getBasket(){
    return this.$store.getters.getBasket.length
  }
}
}
</script>

<style lang="scss" scoped>
@import '../assets/css/header.scss';
</style>