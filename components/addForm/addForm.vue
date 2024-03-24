<template>
  <div class="add-form__container">
    <form @submit.prevent="submitForm"  class="add-form__form" ref="form">
      <form-input
          type="text"
          :required="true"
          name="nameProduct"
          @onInput="updateName"
          text="Наименование товара"
          placeholder="Введите наименование товара"
          :textArea="false"
      />
      <form-input
          type="text"
          :required="false"
          name="descriptionProduct"
          @onInput="updateName"
          text="Описание товара"
          placeholder="Введите описание товара"
          :textArea="true"
      />
      <form-input
          type="url"
          :required="true"
          name="urlProduct"
          @onInput="updateName"
          text="Ссылка на изображение товара"
          placeholder="Введите ссылку"
          :textArea="false"
          pattern="https://.*"
      />
      <form-input
          type="text"
          :required="true"
          name="priceProduct"
          @onInput="updateName"
          text="Цена товара"
          placeholder="Введите цену"
          :textArea="false"
      />
      <button class="add-form__button-submit" :disabled="!dataProd.disabledStatus">Добавить товар</button>
    </form>
  </div>
</template>
<script setup>
import { useVuelidate } from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
import FormInput from "@/components/addForm/formInput";
import { useProductItemStore } from "@/store/productItemStore";
import {ref, reactive, computed} from 'vue'
const dataProd = reactive({
  errors: {
    nameProduct: 0,
    descriptionProduct: 0,
    urlProduct: 0,
    priceProduct: 0
  },
  disabledStatus: false
})
const store = useProductItemStore();
const form = ref(null);
let formData = {
  nameProduct: '',
  descriptionProduct: '',
  urlProduct: '',
  priceProduct: ''
}
const updateName = (value) => {
  formData[value.name] = value.value
  dataProd.errors[value.name] = value.error
  checkForm()
}
const checkForm = () => {
  dataProd.disabledStatus = Object.keys(dataProd.errors).every((val,) => dataProd.errors[val] === 1);
}
 function submitForm () {
  let data = []
  if(localStorage.getItem('productArray')){
    data = JSON.parse(localStorage.getItem('productArray'))
    formData['id'] = Math.floor(Math.random() * 10000)
  } else {
    data[0]['id'] = Math.floor(Math.random() * 10000)
  }
   data.push(formData)
   localStorage.setItem('productArray', JSON.stringify(data))
   form.value.reset()
   dataProd.disabledStatus = false
   store.$patch({
     products: data
   })


}
</script>
<style lang="sass" scoped>
.add-form__container
  max-width: 332px
  width: 100%
.add-form__form
  position: sticky
  top: 20px
  max-width: 332px
  display: flex
  flex-direction: column
  gap: 5px
  padding: 24px
  box-sizing: border-box
  background: #FFFEFB
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02)
  border-radius: 4px
.add-form__button-submit
  font-family: 'Inter', sans-serif
  font-style: normal
  font-weight: 600
  font-size: 12px
  line-height: 15px
  border: none
  outline: none
  background: #7BAE73
  border-radius: 10px
  padding: 10px 0
  color: #FFFFFF
  cursor: pointer
  transition: .35s
  &:hover
    transform: scale(1.1)
  &:disabled
    background: #EEEEEE
    color: #B4B4B4
    cursor: default
    &:hover
      transform: scale(1)
</style>
