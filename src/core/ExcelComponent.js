import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options={}) {
    super($root, options.listeners)
    this.name = options.name||''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.unsubscribers = []
    this.store = options.store
    this.preper()
  }
  preper() {}
  toHTML() {
    return ''
  }
  $getState() {
    return this.store.getState()
  }
  $dispatch(action) {
    this.store.dispatch(action)
  }
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }
  init() {
    this.initDOMListener()
  }
  destroy() {
    this.removeDOMListener()
    this.unsubscribers.forEach(unsub => unsub())
  }
}