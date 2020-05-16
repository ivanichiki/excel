import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandeler} from './resize';
import {TableSelection} from './TableSelection';
import {$} from '../../core/dom';
import {matrix} from './table.functions';
import {nextSelector} from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }
  toHTML() {
    return createTable(100)
  }
  preper() {
    this.selection = new TableSelection()
  }
  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)
    this.$on('formula:input', text =>{
      this.selection.current.text(text)
    })
    this.$on('formula:enter', () => {
      this.selection.current.focus()
    })
  }
  onKeydown(e) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowDown',
      'ArrowUp',
      'ArrowLeft',
      'ArrowRight'
    ]
    if (keys.includes(e.key)&& !e.shiftKey) {
      e.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(e.key, id))
      this.selectCell($next)
    }
  }
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell.text())
  }
  onMousedown(e) {
    if (e.target.dataset.resize) {
      resizeHandeler(e, this.$root)
    } else if (e.target.dataset.type==='cell') {
      const $target = $(e.target)
      if (e.shiftKey) {
        const $cells = matrix($target, this.selection.current).map(id=>
          this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }
  onInput(event) {
    this.$emit('table:input', $(event.target).text())
  }
}