<script setup >
const runtimeConfig = useRuntimeConfig()


</script>

<template>
  <div class="page">
    <div class="page__header">
      <h1 class="page__title">Добавление товара</h1>
      <select-sort  />
    </div>
    <div class="page__container">
      <add-form />
      <card-wrapper />
    </div>
  </div>
</template>

<script >
export default {
  name: "shop"
}
</script>
<style lang="sass" scoped>
@import "@/assets/fonts"
.page
  display: flex
  flex-direction: column
  gap: 16px
  max-width: 1440px
  width: 100%
  height: 100%
  margin: 32px auto 32px auto
.page__title
  font-family: 'Source Sans Pro', sans-serif
  font-style: normal
  font-weight: 600
  font-size: 28px
  line-height: 35px
  margin: 0
.page__container
  display: flex
  gap: 16px
.page__header
  display: flex
  justify-content: space-between
@media (max-width: 768px)
  .page__container
    flex-direction: column
    align-items: center
  .page__header
    flex-direction: column
    gap: 16px
    justify-content: center
    align-items: center
</style>
