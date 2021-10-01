import Vue from 'vue/dist/vue.esm.browser'

const employeeCards = document.querySelectorAll('#employee-filter-items .employee-card')
Array.prototype
  .forEach.call(
  employeeCards,
  (el, index) => new Vue({
    el,
    data() {
      return {
        meta: null
      }
    },
    methods: {
      mouseOver() {
        console.log(this.meta.classList)
        this.meta.classList.remove('uk-hidden')
        console.log(this.meta.classList)
      },
      mouseOut() {
        this.meta.classList.add('uk-hidden')
      },
    },
    created() {
      this.meta = el.querySelector('.uk-overlay')
    }
  })
)