<template>
  <button class="btn" :class="className">
  <slot></slot>
  </button>
</template>

<script>
export default {
   props:{
    className:{
        type:String
    }
   }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/header.scss';
</style>