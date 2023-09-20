<template>
   <div class="search">
        <input  type="search" id="input" placeholder="Поиск" v-model="search">
        <button-element className="searchbtn" @click="searchProducts">Найти</button-element>
    </div>
    <div class="main-filter">
      <h4 class="card-count">Всего: {{ getProducts.length }}</h4>
      <select name="" v-model="sorted">
          <option value="0">По умолчанию</option>
          <option value="5">По возрастние цены</option>
          <option value="10">По убывание цены</option>
      </select>
      <select name="" id="" v-model="getCategory" @change="getCategoryProducts($event)">
        <option value="0">Все категории</option>
        <option :value="item" v-for="item of getCategory" :key="item">{{ item }}</option>
      </select>
    </div>
    <div class="wrapper">
        <div class="card" v-for="item of getProducts" :key="item.id">
           <img :src="item.image" alt="">
           <h2>{{ item.title }}</h2>
           <h3>{{ item.price }}</h3>
           <p>{{ item.category}}</p>
           <button-element className="add"  @click="showDetails(item.title, item.id)">Подробнее</button-element>
      </div>
    </div>
    <button-element className="showMore" @click="showMore"> Показать еще </button-element>
</template>

<script>
import ButtonElement from '../components/ButtonElement.vue'
export default {
  components: {  ButtonElement},
    data(){
      return{
        limit:0,
        sorted:'0',
        selectCategory:'',
        search:''
      }
    },
    created(){
      this.limit=this.getLimit
      this.$store.dispatch('fetchProducts', [this.getlimit,this.sorted])
      this.$store.dispatch('fetchCategory')
    },
  computed:{
      getProducts(){
        return this.$store.getters.getProducts
      },
      getLimit(){
        return this.$store.getters.getLimit
      },
      getCategory(){
        return this.$store.getters.getCategory
      }
      },
      watch:{
        sorted(){
          this.$store.dispatch('fetchCategoryProducts',[this.selectCategory, this.sorted])
        }
      },
    methods:{
      searchProducts(){
        this.$store.dispatch('fetchSearchProducts', this.search)
      },
      getCategoryProducts(event){
        this.selectCategory=event.target.value
        if(event.target.value!=='0'){
        this.$store.dispatch('fetchCategoryProducts',[this.selectCategory, this.sorted])
        }else{
          this.$store.dispatch('fetchProducts',[this.getlimit,this.sorted])
        }
      },
        showMore(){
        this.limit +=3
            this.$store.dispatch('fetchProducts',[this.getlimit,this.sorted])
        },
        showDetails(title,id){
            this.$router.push({path:`/product-details/${title}`, query:{id:id}})
        }
    }
      
  }
</script>

<style lang="scss" scoped>
@import '../assets/css/main.scss';
</style>