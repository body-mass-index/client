Vue.component('graph', {
    props: ['bmis'],
    template: `
        <div style="width: 900px; height:700px">
            <h3>Your progress (or otherwise) over time</h3>
            <canvas id="myChart" width="50px" height="50px">
            </canvas>
        </div>
    `,
    data() {
        return {
            myBmi: null,
        }
    },
    methods: {

    },
    watch: {
        bmis() {
            console.log('watch', this.bmis)
            let dates = this.bmis.map((el) => el.date)
            // let dates = []
            // let datas = []
            // for (let i = 0; i < this.bmis.length; i++){
            //     dates.push(this.bmis[i].date)
            //     datas.push(this.bmis[i].result)
            // }
            console.log(this.bmis,'opopopopopop')
            let datas = this.bmis.map(el => el.result)
            let max = Math.max(...datas)
            let under = []
                over = []
            for (let i = 0; i < datas.length; i++){
                under.push(18.5)
                over.push(25)
            }
            var ctx = document.getElementById('myChart');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: '# Body Mass Index ',
                        data: datas,
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                            'rgba(0, 0, 0, 1)'
                        ],
                        borderWidth: 1
                    }, { 
                        label: "Underweight",
                        backgroundColor: [
                            'rgba(0, 0, 0, 0.2)',
                        ],
                        fillColor: "rgba(0,0,0,0)", //adds the color below the line
                        strokeColor: "rgba(224,0,0,1)", //creates the line
                        pointColor: "rgba(244,0,0,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#ffffff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: under
                    }, {
                        label: "Normal",
                        backgroundColor: [
                            'rgba(0, 255, 0, 0.2)',
                        ],
                        fillColor: "rgba(255,255,255,0.2)", //adds the color below the line
                        strokeColor: "rgba(224,0,0,1)", //creates the line
                        pointColor: "rgba(244,0,0,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: over
                    }, { //my red line
                        label: "Overweight",
                        backgroundColor: [
                            'rgba(255, 0, 0, 0.2)',
                        ],
                        fillColor: "rgba(255,255,255,0.2)", //adds the color below the line
                        strokeColor: "rgba(224,0,0,1)", //creates the line
                        pointColor: "rgba(244,0,0,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [max, max, max, max, max]
                    }, ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
                            }
                        }]
                    }
                }
            });
        
            // var canvas = document.getElementById('myChart')
            // var img = canvas.toDataURL("image/png")
            // document.write('<img src="' + img + '"/>')
        }
    },
    created() {
        console.log(this.bmis)
    }
})