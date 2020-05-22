import {ExcelComponent} from '../../core/ExcelComponent';
import {changeTitle} from '../../redux/actions';
import {$} from '../../core/dom';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }
  toHTML() {
    const title = this.store.getState().title
    return `<input type="text" value="${title}" class="input"/>
        <div>
          <div data-button="remove" class="button">
            <i  data-button="remove" class="material-icons">delete</i>
          </div>
          <div data-button="exit" class="button">
            <i data-button="exit" class="material-icons">exit_to_app</i>
          </div>
        </div>
`
  }
  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')
      if (decision) {
        localStorage.removeItem('excel:'+ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}