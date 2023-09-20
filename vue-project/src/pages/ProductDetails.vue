<template>
  <div class="cardDet">
    <div class="cardDet-img"><img :src="getDetails.image" alt=""></div>
    <div class="cardDet-content">
      <h3>{{ getDetails.title }}</h3>
      <h3>{{ getDetails.category }}</h3>
      <p>{{ getDetails.description }}</p>
      <p>{{ getDetails.rate}}</p>
      <p>{{ getDetails.count}}</p>
      <div class="cardDet-btn">
        <button-element className="det" @click="addToBasket">add to backet</button-element>
        <p>{{ getDetails.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonElement from '../components/ButtonElement.vue'
export default {
  components: { ButtonElement },
  created() {
    this.$store.dispatch('fetchDetails', this.$route.query.id)
  },
  computed: {
    getDetails() {
      return this.$store.getters.getDetails
    },
    getBasket(){
          return this.$store.getters.getBasket
   }
  },
  methods:{
    addToBasket(){
      this.$store.dispatch('addToBasket',this.getDetails)
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/css/details.scss';
</style>