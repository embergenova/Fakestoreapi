<template>
  <div class="basket">
    <h3>Корзина</h3>
    <div class="basket-wrapper">
      <div class="basket-card" v-for="item of getBasket" :key="item">
        <img :src="item.image" alt="">
        <div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
        <div class="basket-counter">
          <button @click="cardAction('cardDecrease', item.id)">-</button>
          <span>{{item.quantity}}</span>
          <button @click="cardAction('cardIncrease',item.id)" >+ </button>
        </div>
        <h4 class="price">{{item.price*item.quantity}}$</h4>
        <button @click="cardAction('cardDelete',item.id)">x</button>
      </div>
    </div>
    <div class="basket-total">
      <div>
        <h3>Итого: <span>{{ getTotalPrice }}</span></h3>
        <h4 v-if="getTotalPrice < 1500">До бесплатной доставки не хватет: <span>
          {{ 1500- getTotalPrice }} ₽
        </span></h4>
        <h4>Минимальная сума заказа <span>1500 ₽</span></h4>
      </div>
      <button>Оформить заказ</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getBasket() {
      return this.$store.getters.getBasket
    },
    getTotalPrice(){
      const totalPrice=Array.from(this.$store.getters.getBasket).reduce((prev,curr)=>prev + curr.price*curr.quantity,0)

      return totalPrice
    }
  },
  methods:{
    cardAction(type,id){
      this.$store.dispatch(type,id) 
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/basket.scss';
</style>