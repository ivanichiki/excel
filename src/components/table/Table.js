import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandeler} from './resize';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }
  toHTML() {
    return createTable(100)
  }
  onMousedown(e) {
    if (e.target.dataset.resize) {
      resizeHandeler(e, this.$root)
    }
  }
}