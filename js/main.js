axios.defaults.baseURL = "http://localhost:3000"
// var userName = ""
var app = new Vue({
  el: '#app',
  data: {
    results: [],
    showMainPage: false,
    showProfilePage: true,
    showLogRegPage: false,
    name: "",
    inputLogin: {
      email: "",
      password: ""
    },
    inputRegister: {
      name: "",
      email: "",
      image: "",
      password: ""
    },
    inputNewBMI: {
      height: "",
      weight: ""
    }
  },
  created() {
    // if (localStorage.hasOwnProperty('token')) {
    //   this.showLogRegPage = false
    //   this.showMainPage = true
    //   this.showProfilePage = false
    //   this.name = localStorage.getItem('name')
    //   this.getAllBMIs()
    // }
    // else {
    //   this.showLogRegPage = true
    //   this.showMainPage = false
    //   this.showProfilePage = false
    // }
  },
  methods: {
    emptyLogRegField() {
      // this.name = name || ""
      this.inputRegister.name = ""
      this.inputRegister.image = ""
      this.inputRegister.email = ""
      this.inputRegister.password = ""
      this.inputLogin.email = ""
      this.inputLogin.password = ""
    },
    getAllBMIs() {
      axios({
        method: "GET",
        url: "/bmi",
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.results = [...response.data]
          // this.results.forEach((obj, i) => {
          //   this.results[i].created_at = new Date(this.results[i].created_at.slice(0, 10)).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })
          // })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getModalBMI(idBMI) {
      axios({
        method: "GET",
        url: `/bmi/${idBMI}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.results = [...response.data]
          // this.results.forEach((obj, i) => {
          //   this.results[i].created_at = new Date(this.results[i].created_at.slice(0, 10)).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })
          // })
        })
        .catch(err => {
          console.log(err)
        })
    },
    generateBMI() {
      axios({
        method: "POST",
        url: "/posts/create",
        data: {
          title: this.inputNewPost.title,
          content: this.inputNewPost.content
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(result => {
          this.showMainPage = true
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
    },
    register() {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
      if (emailRegex.test(this.inputRegister.email)) {
        axios({
          method: "POST",
          url: "/user/signup",
          data: {
            name: this.inputRegister.name,
            image: this.inputRegister.image,
            email: this.inputRegister.email,
            password: this.inputRegister.password
          }
        })
          .then(({ data }) => {
            console.log(data.token)
            Swal.fire(
              'Registered!',
              'You Have Been Registered Successfully, please login now',
              'success'
            )
            emptyLogRegField()
          })
          .catch(err => {
            console.log(err)
          })
      }
      else {
        Swal.fire({
          type: 'error',
          title: 'Input Error',
          text: 'Email harus yang benar!'
        })
      }
    },
    login() {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
      if (emailRegex.test(this.inputRegister.email)) {
        axios({
          method: "POST",
          url: "/users/login",
          data: {
            email: this.inputLogin.email,
            password: this.inputLogin.password
          }
        })
          .then(({ data }) => {
            console.log(data.token)
            localStorage.setItem('token', data.token)
            Swal.fire(
              'Logged In!',
              'You have been logged in successfully!',
              'success'
            )
            localStorage.setItem('name', data.name)
            this.name = localStorage.getItem('name')
            this.showLogRegPage = false
            this.showMainPage = true
            emptyLogRegField()
          })
          .catch(err => {
            console.log(err)
          })
      }
      else {
        Swal.fire({
          type: 'error',
          title: 'Input Error',
          text: 'Email harus yang benar!'
        })
      }
    },
    logout() {
      localStorage.removeItem('token')
      Swal.fire(
        'Logged Out!',
        'You have been logged out successfully!',
        'success'
      )
      this.showLogRegPage = true
      this.showMainPage = false
    }
  }
})