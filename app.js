const vm = new Vue({
  el:"#app",
  data: {
    products: [],
    product: false,
    cart:[]
   },
   filters: {
    numberPrice(value) {
      return parseFloat(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL"});
    }
   },
   computed: {
    cartTotal() {
      let total = 0;
      if(this.cart.length) {
        this.cart.forEach(item => {
          total += item.preco;
        })
      }
      return total;
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
    },
    openModal(id) {
      this.fetchProduct(id);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    closeModal({target, currentTarget}) {
      if (target === currentTarget) this.product = false;
    },
    addItem() {
      this.product.estoque--
      const{ id, nome, preco } = this.product;
      this.cart.push({id, nome, preco})
    },
    removeItem(index) {
      this.cart.splice(index, 1)
    },
    checkLocalStorage() {
      if(window.localStorage.cart) {
        this.cart = JSON.parse(window.localStorage.cart);
      }
    }
  },
  watch: {
    cart() {
      window.localStorage.cart = JSON.stringify(this.cart);
    }
  },
  created() {
    this.fetchProducts();
    this.checkLocalStorage();
  }
})