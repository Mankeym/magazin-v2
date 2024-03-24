import { defineStore } from 'pinia'

export  const useProductItemStore = defineStore(<string>'products', {
    state: () => {
        return { products: []}
    },
    getters: {
        getProducts(state){
            return state.products
        }
    },
    actions: {
        async getProductItemStore () {
            try {
                this.products = JSON.parse(<string>localStorage.getItem('productArray'))
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
    }
})
