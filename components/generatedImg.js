Vue.component('genimg', {
    props: ['user', 'result', 'input'],
    data() {
        return {
            imgsrc: this.user.image_profil || 'img/profile.png',
            name: localStorage.name || 'Siapa Aku?',
            weight: this.input.weight || 55,
            height: this.input.height || 1.75,
            status: this.result.status || "Low",
            point: this.result.result || 17.95,
            idealMan: this.result.idealMan || 75,
            idealWoman: this.result.idealWoman || 65,
            bgcolor: '#00bf9b',
            fcolor: '#ffffff',
            uploadreport: null
        }
    },
    template: `
    <div >
            <button class="btn btn-dark" @click="screenshot()"> generate image </button>
            <label for bgcolor> background color</label>
            <input type="color" v-model="bgcolor" name="bgcolor" />
            <label for fcolor> font color</label>
            <input type="color" v-model="fcolor" name="bgcolor" />
            <br><br>
            <div id="hehe" >
                <div :style="{'height': 'auto', 'width':'600px', 'border': '5px solid #2c4151', backgroundColor: bgcolor, borderRadius:'10px'}">
                    <div class="text-center" :style="{'paddingTop':'50px', 'color':fcolor}">
                        <div class="container">
                            <img class="img-fluid mb-5 d-block mx-auto" :src="imgsrc" alt=""
                                style="height:256px;width:256px;border-radius:128px">
                            <h1 class="text-uppercase mb-0" style="font-family:Montserrat, serif; font-weight:700">
                                {{ name }}
                            </h1>
                            <br>
                            <hr color="white">
                            <br>
                            <div class="row">
                                <div class="col col-6">
                                    Your weight: {{ input.weight }} kg
                                </div>
                                <div class="col col-6">
                                    Your height: {{ input.height }} m
                                </div>
                                <br><br><br>
                            </div>
                            <div class="row" style="justify-content:center">
                                <div>
                                    Your index is {{ point }}, you are considered to be:
                                </div>
                                <br>
                            </div>
                            <div style="font-size: 30px; margin-top:20px;margin-bottom:20px">
                                <strong>
                                    {{ status }}
                                </strong>
                            </div>
                            <div>
                                on Body Mass Index Rating
                            </div>
                            <br>
                            <div class="row" style="justify-content:center; font-size:25px; margin-bottom:30px">
                                {{ nasehat }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="ss">
                <div id='subss'>
                </div>
            </div>
            <div>
            <br>
                <button @click="linkFacebook" class="btn btn-primary">
                <i class="fab fa-facebook-square align-middle" style="font-size:25px; "></i> <span class="align-middle">Share on Facebook</span> 
                </button>
            </div>
        </div>
    `,
    methods: {
        screenshot() {
            html2canvas(document.getElementById('hehe')).then((canvas) => {
                // console.log(canvas, 'loplop')
                // console.log(canvas.toDataURL('image/png'), '------')
                // document.getElementById('ss').appendChild(canvas);
                var base64URL = canvas.toDataURL('image/png')
                // document.write('<img src="data:image/png;charset=utf-8;base64,'+base64URL+'"/>');
                console.log(base64URL)
                // var image = new Image();
                // image.src = base64URL;
                // document.body.appendChild(image);
                axios
                .post('http://localhost:3000/bmi',{
                    data: {
                        image: base64URL,
                        status: this.status,
                        result: this.point
                    }
                },{
                    headers: {token: localStorage.getItem('token')}
                })
                .then(data => {
                    console.log(data.data)
                    this.uploadreport = data.data
                    this.$emit('tambahbaru')
                })
                .catch(err => {
                    console.log(err)
                })
            });
        },
        linkFacebook() {
            window.open(`https://www.facebook.com/sharer.php?u=${this.uploadreport.url_image}`)
        }
    },
    computed: {
        nasehat: function () {
            let advice
            if (this.point < 18.5) {
                advice = `Gain more weight! ${Math.abs(this.idealWoman - this.weight)} more kg to go!`
            } else if (this.point > 25) {
                advice = `Lose your weight! ${Math.abs(this.weight - this.idealWoman)} more kg to lose!`
            } else {
                advice = 'You are in a good shape!'
            }
            return advice
        }
    },
    watch: {
        result: function(){
            this.status= this.result.status
            this.point= this.result.result.toFixed(2)
            this.idealMan= this.result.ideal_weight.man
            this.idealWoman= this.result.ideal_weight.woman

        },
        user: function(){
            this.name = this.user.userName
            this.imagesrc = this.user.image_profil
        },
        input: function(){
            this.weight = this.input.weight
            this.height = this.input.height
        }
    }
})