<template>
  <div id="app">
    <Header/>
    <main>  
      <router-view></router-view>
    </main>
  </div>
  
</template>

<script>
import Header from './components/Header.vue';
export default {
  components:{
             Header
            }
}
</script>

<style>
*{
  padding:0;
  margin:0;
  text-decoration: none;
  box-sizing: border-box;
}
main{
  max-width: 1200px;
  margin:auto;
  padding-top:35px;
}
</style>