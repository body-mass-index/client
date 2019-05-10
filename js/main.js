axios.defaults.baseURL = "http://localhost:3000"
// var userName = ""
var app = new Vue({
  el: '#app',
  data: {
    results: [],
    showMainPage: true,
    showProfilePage: false,
    showLogRegPage: false,
    showMessage: true,
    message: "Wow",
    name: "",
    // registered: false,
    inputLogin: {
      email: "",
      password: ""
    },
    inputRegister: {
      name: "",
      email: "",
      password: ""
    },
    inputNewBMI: {
      height: "",
      weight: ""
    }
  },
  created() {
    if (localStorage.hasOwnProperty('token')) {
      this.showLogRegPage = false
      this.showMainPage = true
      this.showProfilePage = false
      this.name = localStorage.getItem('name')
      this.getAllBMIs()
    }
    else {
      this.showLogRegPage = true
      this.showMainPage = false
      this.showProfilePage = false
    }
  },
  methods: {
    messageSuccess(message){
      this.message = message
      this.showMessage = true
    },
    emptyLogRegField() {
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
        url: "/posts/read",
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.posts = [...response.data]
          this.posts.forEach((obj, i) => {
            this.posts[i].created_at = new Date(this.posts[i].created_at.slice(0, 10)).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })
          })
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
          this.messageSuccess("New Post have been created")
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
    },
    createBMI() {
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
          this.showNewPostPage = false
          this.messageSuccess("New Post have been created")
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updatePost() {
      axios({
        method: "PUT",
        url: `/posts/update`,
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
          this.showNewPostPage = false
          this.message = "New Post have been created"
          this.showMessage = true
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editPost(idPost) {
      axios({
        method: "GET",
        url: `/posts/read/${idPost}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(result => {
          console.log(result)
          this.formPostHeading = "Edit Post"
          this.showMainPage = false
          this.showNewPostPage = true
          this.inputNewPost.title = result.data.title
          this.inputNewPost.content = result.data.content
        })
        .catch(err => {
          console.log(err)
        })
    },
    deletePost(idPost) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          console.log('processing')
          axios({
            method: "DELETE",
            url: `/posts/delete/${idPost}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(result => {
              this.posts = this.posts.filter(post => post._id !== idPost)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              console.log(result)
            })
            .catch(err => {
              console.log(err)
            })
        }
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
            this.message = "You Have Been Registered Successfully, please login now"
            this.showMessage = true
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
            this.message = "You Have Been Logged In Successfully"
            this.showMessage = true
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
      this.message = "You Have Been Logged Out Successfully"
      this.showMessage = true
      this.showLogRegPage = true
      this.showMainPage = false
    }
  }
})