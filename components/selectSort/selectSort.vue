<template>
  <div class="form__select-container" :class="nameSelect">
    <select class="form__select form__select_disabled">
      <option class="select-option" :value="props.selectOption" >{{props.selectOption}}</option>
    </select>
    <div class="select__custom">
      <div class="form__select-custom" :class="props.arrayOptVisible ? 'active' : ''" @click="props.arrayOptVisible = !props.arrayOptVisible">
        <p class="select__custom-title" >{{props.selectOption}}</p>
      </div>
      <div class="option__custom" v-if="props.arrayOptVisible">
        <p class="option" @click="selectOpt(item)" v-for="(item,index) in props.arrayOpt" :key="index" :value="item.name">{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "selectSort",
  props: ['text', 'noneSelect', 'nameSelect']
}
</script>
<script setup lang="ts">
import { useProductItemStore } from "@/store/productItemStore";
import { reactive } from 'vue'
const store = useProductItemStore();
const props = reactive({
  selectOption: 'По умолчанию',
  arrayOptVisible: false,
  arrayOpt: [
    {
      name: 'По наименованию',
      type: 'name'
    },
    {
      name: 'По цене max',
      type: 'max'
    },
    {
      name: 'По цене min',
      type: 'min'
    }
  ]})
const selectOpt = (option) => {
  props.selectOption = option.name
  let data = []
  if(option.type === 'max') {
    data = JSON.parse(<string>localStorage.getItem('productArray')).sort((a, b) => b['priceProduct'].replace(/\s/g,'') - a['priceProduct'].replace(/\s/g,''))
  }
  if(option.type === 'min') {
    data = JSON.parse(<string>localStorage.getItem('productArray')).sort((a, b) => a['priceProduct'].replace(/\s/g,'') - b['priceProduct'].replace(/\s/g,''))
  }
  if(option.type === 'name') {
    data = JSON.parse(<string>localStorage.getItem('productArray')).sort((a, b) => a['nameProduct'].localeCompare(b['nameProduct']))
  }
  props.arrayOptVisible = !props.arrayOptVisible
  store.$patch({
    products: data
  })
}
</script>
<style lang="sass" scoped>
.form__select-container
  position: relative
  width: 120px
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)
  border-radius: 4px
  display: flex
  justify-content: center
  margin-right: 65px
.form__select-custom
  position: relative
  cursor: pointer
  padding-bottom: 5px
  border-bottom: 3px solid white
  &.active
    &:after
      transform: rotate(180deg)
  .form__select
    position: relative
    width: 100%
    border: none
    outline: none
    appearance: none
    cursor: pointer
    font-weight: 500
    font-size: 13px
    line-height: 170%
    color: #97A5C1
    padding: 0 3px 8px 3px
    border-bottom: 3px solid black
    option
      padding: 30px
  &:after
    content: ''
    position: absolute
    top: 6px
    right: 5px
    background: url("../../assets/Rectangle 33.svg") no-repeat
    width: 10px
    height: 5px
.form__select_disabled
  display: none

.option
  margin: 0
  padding: 15px 0 15px
  font-family: 'Source Sans Pro',sans-serif
  color: #B4B4B4
  font-style: normal
  font-weight: 400
  font-size: 12px
  line-height: 15px
  display: flex
  align-items: center
  letter-spacing: 0.05em
  text-indent: 10px
  text-align: center
  &:hover
    background: #EFF0F6
    cursor: pointer
.option__custom
  position: absolute
  background: white
  top: 100%
  left: 0
  width: 120px
  box-sizing: border-box
  z-index: 2
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)
  border-radius: 4px
.select__custom
  position: relative
  width: 120px
.select__custom-title
  margin-top: 10px
  margin-bottom: 0
  color: #B4B4B4
  text-align: center
  font-family: 'Source Sans Pro',sans-serif
  font-style: normal
  font-weight: 400
  font-size: 12px
  line-height: 15px
  width: 105px
</style>
