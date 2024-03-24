<template>
  <label class="add-form__label">
    <p class="add-form__label-text">{{text}}<i v-if="required" class="add-form__label-required"></i></p>
    <input v-model="input" @input="checkInput" :pattern="pattern" :class="error ? 'add-form__input_error' : ''" class="add-form__input" :placeholder="placeholder" :type="type" :name="name" :required="required" v-if="!textArea">
    <textarea v-model="input" @input="checkInput" class="add-form__textarea add-form__input" :placeholder="placeholder" :name="name" maxlength="150" v-else></textarea>
    <span class="add-form__error-text" :class="error ? 'add-form__error-text_show' : ''" >Поле является обязательным</span>
  </label>
</template>

<script>
export default {
  name: "formInput",
  props: ['text','name','required','type','placeholder','textArea','pattern'],
  data () {
    return {
      error: false,
      input: ''
    }
  },
  methods: {
    checkInput (e) {
      let error = 0
      if (this.required) {
        e.target.value.length === 0 ? this.error = true : this.error = false
      }
      if(this.name === 'priceProduct') {
        const stringNumber = Number(this.input.replace(/\D/g,'')).toLocaleString('ru')
        e.target.value = stringNumber
      }
      if(this.name === 'urlProduct') {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        !!pattern.test(this.input.value) ? this.input.length > 0 ? error = 1 : error = 0  : error = 0
      } else {
        if(this.input.length > 0) {
          error = 1
        } else {
          error = 0
        }
      }
      this.$emit('onInput', {name: this.name, value: this.input, error: error});
    },
  }
}
</script>

<style lang="sass" scoped>
.add-form__label
  display: flex
  flex-direction: column
.add-form__error-text
  opacity: 0
  letter-spacing: -0.02em
  color: #FF8484
  font-family: 'Source Sans Pro', sans-serif
  font-style: normal
  font-weight: 400
  font-size: 8px
  line-height: 10px
  transition: .35s
  margin-top: 4px
.add-form__error-text_show
  opacity: 1
.add-form__label-text
  font-family: 'Source Sans Pro', sans-serif
  font-style: normal
  font-weight: 400
  font-size: 10px
  line-height: 13px
  margin: 0 0 4px
.add-form__label-required
  position: absolute
  width: 4px
  height: 4px
  background: #FF8484
  border-radius: 4px
.add-form__input
  font-family: 'Source Sans Pro', sans-serif
  font-style: normal
  font-weight: 400
  font-size: 12px
  line-height: 15px
  max-width: 284px
  width: 100%
  color: #3F3F3F
  background: #FFFEFB
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1)
  border-radius: 4px
  padding: 10px 16px
  box-sizing: border-box
  outline: none
  transition: .35s
  border: 1px solid transparent
  &::placeholder
    color: #B4B4B4
  &:focus
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3)
.add-form__input_error
  border: 1px solid #FF8484
.add-form__textarea
  font-family: 'Source Sans Pro', sans-serif
  font-style: normal
  font-weight: 400
  font-size: 12px
  line-height: 15px
  padding: 10px 16px
  box-sizing: border-box
  max-width: 284px
  width: 100%
  overflow-y: auto
  height: 108px
  border: none
  outline: none
  background: #FFFEFB
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1)
  border-radius: 4px
  resize: none
  &::placeholder
    color: #B4B4B4
</style>
