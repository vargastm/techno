const vm = new Vue({
  el:"#app",
  data: {
    products: [],
    product: false
   },
   filters: {
    numberPrice(value) {
      return parseFloat(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL"});
    }
   },
  methods: {
    fetchProducts() {
      fetch("./api/products.json")
        .then(r => r.json())
        .then (r => {
          this.products = r;
        })
    },
    fetchProduct(id) {
      fetch(`./api/products/${id}/dados.json`)
      .then(r => r.json())
      .then(r => {
        this.product = r;
      })
    }
  },
  created() {
    this.fetchProducts();
  }
})