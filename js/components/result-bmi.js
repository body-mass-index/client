Vue.component('result-bmi', {
  data() {
    return {
      count: 0
    }
  },
  props:['result'],
  template: `
    <a data-toggle="modal" data-target=".bd-example-modal-lg" href="#" class="list-group-item list-group-item-action">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{ result.status }}</h5>
        <small>{{ result.date }}</small>
      </div>
      <p class="mb-1">{{ result.ideal }}</p>
      <p class="mb-1">{{ result.result }}</p>
    </a>
`
})