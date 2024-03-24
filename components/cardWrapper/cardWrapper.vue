<template>
  <div class="card-wrapper">
    <productCard
        v-for="(item,index) in getUsers"
        :key="index"
        :title="item.nameProduct"
        :description="item.descriptionProduct"
        :url="item.urlProduct"
        :price="item.priceProduct"
        :id="item.id"
    />
  </div>

</template>

<script setup>
import productCard from "@/components/cardWrapper/productCard";
import { ref, onMounted, computed } from "vue";
import { useProductItemStore } from "@/store/productItemStore";
const store = useProductItemStore();
let getUsers = computed(() => {
  return store.getProducts;
});
onMounted(() => {
  store.getProductItemStore();
});
</script>

<style lang="sass" scoped>
.card-wrapper
  display: flex
  flex-wrap: wrap
  gap: 16px
@media (max-width: 1024px)
  .card-wrapper
    flex-direction: column
    justify-content: center
</style>
