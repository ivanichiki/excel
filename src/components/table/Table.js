import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandeler} from './resize';
import {TableSelection} from './TableSelection';
import {$} from '../../core/dom';
import {matrix} from './table.functions';
import {nextSelector} from './table.functions';
import {tableResize, changeText, changeStyles,
  applyStyles} from '../../redux/actions';
import {defaultStyles} from '../../constants';
import {parse} from '../../core/parse';

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
    return createTable(100, this.$getState())
  }
  preper() {
    this.selection = new TableSelection()
  }
  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)
    this.$on('formula:input', value => {
      console.log(value)
      this.selection.current.attr('data-value', value)
      this.selection.current.text(parse(value))
      this.updateTextInStore(value)
    })
    this.$on('formula:enter', () => {
      this.selection.current.focus()
    })
    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(applyStyles({
        value,
        ids: this.selection.selectedIds
      }))
    }
    )
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
    const $current = this.selection.current
    if ($current) {
      $current.text(parse($current.data.value))
    }
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    $cell.text($cell.data.value)
    this.updateTextInStore(this.selection.current.data.value)
    this.$dispatch(changeStyles($cell.getStyles(Object.keys(defaultStyles))))
  }
  async resizeTable(e) {
    const data = await resizeHandeler(e, this.$root)
    this.$dispatch(tableResize(data))
  }
  onMousedown(e) {
    if (e.target.dataset.resize) {
      this.resizeTable(e)
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
  updateTextInStore(value) {
    this.$dispatch(changeText({
      id: this.selection.current.id(),
      value: value
    }))
  }
  onInput(event) {
    const $cell = $(event.target)
    this.updateTextInStore($cell.text())
    $cell.attr('data-value', $cell.text())
  }
}