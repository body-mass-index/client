axios.defaults.baseURL = "http://localhost:3000"
// var userName = ""
var app = new Vue({
  el: '#app',
  data: {
    results: [],
    showMainPage: false,
    showProfilePage: false,
    showLogRegPage: false,
    name: "",
    inputLogin: {
      email: "",
      password: ""
    },
    inputRegister: {
      name: "",
      email: "",
      password: "",
    },
    inputnewbmi: {
      height: "",
      weight: ""
    },
    // outputBMI: {
    //   status: '',
    //   result: '',
    //   ideal_weight: ''
    // },
    modal: {
      url_image: "",
      status: ""
    },
    user: {
      name: null,
      image_profil: null
    },

    result: {
      status: null,
      point: null,
      idealMan: null,
      idealWoman: null
    },
    input: {
      weight: null,
      height: null,
    },
  },
  created() {
    if (localStorage.hasOwnProperty('token')) {
      this.showLogRegPage = false
      this.showMainPage = true
      this.showProfilePage = false
      this.name = localStorage.getItem('name')
      this.getAllBMIs()
      // this.user.name = localStorage.getItem('name')
      this.user.image_profil = localStorage.pp
    } else {
      this.showLogRegPage = true
      this.showMainPage = false
      this.showProfilePage = false
    }
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
    selectFile(event) {
      this.image = event.target.files[0]
    },  
    messageSuccess(message) {
      this.message = message
      this.showMessage = true
    },
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
    showModalBMI(result) {
      this.modal.status = result.status
      this.modal.url_image = result.url_image
    },
    generateBMI() {
      axios({
          method: "POST",
          url: "http://localhost:3000/bmi/result",
          data: {
            height: this.inputnewbmi.height,
            weight: this.inputnewbmi.weight
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(result => {
          this.height = this.inputnewbmi.height
          this.weight = this.inputnewbmi.weight
          this.showMainPage = true
          this.messageSuccess("New Post have been created")
          console.log(result.data, 'hehehehe')
          this.result = result.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    register() {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

      var formData = new FormData();

      formData.append("name", this.inputRegister.name)
      formData.append("email", this.inputRegister.email)
      formData.append("password", this.inputRegister.password)
      formData.append("image", this.image, this.image.name)


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
          .then(({
            data
          }) => {
            console.log(data.token)
            Swal.fire(
              'Registered!',
              'You Have Been Registered Successfully, please login now',
              'success'
            )
            this.emptyLogRegField()
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        Swal.fire({
          type: 'error',
          title: 'Input Error',
          text: 'Email harus yang benar!'
        })
      }
    },
    login() {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
      if (emailRegex.test(this.inputLogin.email)) {
        axios({
            method: "POST",
            url: "/user/signin",
            data: {
              email: this.inputLogin.email,
              password: this.inputLogin.password
            }
          })
          .then(({
            data
          }) => {
            console.log(data)
            localStorage.setItem('token', data.token)
            Swal.fire(
              'Logged In!',
              'You have been logged in successfully!',
              'success'
            )
            localStorage.setItem('name', data.userName)
            localStorage.setItem('pp', data.pp)
            this.user.name = data.userName
            this.user.image_profil = data.pp
            this.name = localStorage.getItem('name')
            this.showLogRegPage = false
            this.showMainPage = true
            this.emptyLogRegField()
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        Swal.fire({
          type: 'error',
          title: 'Input Error',
          text: 'Email harus yang benar!'
        })
      }
    },
    logout() {
      localStorage.clear()
      localStorage.removeItem('token')
      Swal.fire(
        'Logged Out!',
        'You have been logged out successfully!',
        'success'
      )
      this.showLogRegPage = true
      this.showMainPage = false
      this.showProfilePage = false
    }
  }
})