import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }
  toHTML() {
    return createTable(35)
  }
  onMousedown(e) {
    if (e.target.dataset.resize) {
      console.log('start resizing')
    }
  }
}