Vue.component('register-edit', {
    data() {
      return {
        input: {
          name: data.name || "",
          email: data.email || "",
          image: data.image || "",
        }
      }
    },
    props: ['data'],
    methods:{
      emptyForm(){
        this.name = ""
        this.email = ""
        this.image = ""
      },
      submitForm(){
        console.log('massuk')
        this.$emit('lempar',this.input)
      }
    },
    created(){
  
    },
    template: `
  <form @submit.prevent="submitForm();emptyForm()" class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab" method="POST">
    <div class="form-group">
      <label for="Username">Name</label>
      <input v-model="input.name" type="text" class="form-control" id="nameregister"
        placeholder="Enter username">
    </div>
    <div class="form-group">
      <label for="Email">Email Address</label>
      <input v-model="input.email" type="email" class="form-control" id="emailregister"
        aria-describedby="emailHelp" placeholder="Enter email">
    </div>
    <slot></slot>
    <div class="form-group">
      <div class="custom-file">
        <input v-model="input.image_profil" type="file" class="custom-file-input" id="customFile">
        <label class="custom-file-label" for="customFile">Choose file for your profile picture</label>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Register</button>
  </form>
  `
  })