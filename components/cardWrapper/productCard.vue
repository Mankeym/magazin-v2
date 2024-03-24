<template>
  <div class="product-card">
    <button class="product-card__delete-button" @click="deleteCard(id)">
     <img src="../../assets/trash.svg" />
    </button>
    <img :src="url" class="product-card__image" />
    <div class="product-card__info-container">
      <h3 class="product-card__info-title">{{title}}</h3>
      <p class="product-card__info-text">{{description}}</p>
      <p class="product-card__info-price">{{price + ' руб.'}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "productCard",
  props: ['title', 'url','description','price', 'id'],
}
</script>
<script setup>
import { useProductItemStore } from "@/store/productItemStore";
const store = useProductItemStore();

const deleteCard = (id) => {
  const data = JSON.parse(localStorage.getItem('productArray')).filter(item => item.id !== id)
  localStorage.setItem('productArray', JSON.stringify(data))
  store.$patch({
    products: data
  })
}
</script>
<style lang="sass" scoped>
.product-card
  cursor: pointer
  display: flex
  flex-direction: column
  gap: 16px
  position: relative
  background: #FFFEFB
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02)
  border-radius: 4px
  &:hover
    .product-card__delete-button
      visibility: visible
.product-card__image
  width: 332px
  height: 200px
  object-fit: cover
  border-radius: 4px 4px 0px 0px
.product-card__info-container
  display: flex
  flex-direction: column
  padding: 0 16px 24px 16px
  gap: 16px
  max-width: 300px
.product-card__info-price
  font-family: 'Source Sans Pro', sans-serif
  font-style: normal
  font-weight: 600
  font-size: 24px
  line-height: 30px
  margin: 16px 0 0 0
.product-card__info-text
  font-family: 'Source Sans Pro', sans-serif
  font-style: normal
  font-weight: 400
  font-size: 16px
  line-height: 20px
  margin: 0
  min-height: 80px
  max-width: 300px
  padding: 5px
.product-card__info-title
  font-family: 'Source Sans Pro', sans-serif
  font-style: normal
  font-weight: 600
  font-size: 20px
  line-height: 25px
  margin: 0
.product-card__delete-button
  visibility: hidden
  transition: .35s
  cursor: pointer
  position: absolute
  top: -16px
  right: -8px
  width: 32px
  height: 32px
  background: #FF8484
  display: flex
  justify-content: center
  align-items: center
  border: none
  outline: none
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
  border-radius: 10px
  &:hover
    transform: scale(1.1)
</style>
