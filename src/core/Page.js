export class Page {
  constructor(params) {
    this.params = params
    console.log(this.params)
  }
  getRoot() {
    throw new Error('Method getRoot should be implemented')
  }
  afterRender() {}

  destroy() {}
}