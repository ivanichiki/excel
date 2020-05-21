import {toInlineStyles} from '../../core/utils'
import {parse} from '../../core/parse'

const CODES = {
  A: 65,
  Z: 90
}
function createCell(row, state) {
  return function(_, index) {
    const id = `${row}:${index}`
    const text = state.dataState[id] ?
    state.dataState[id]: ''
    const width = state.colState[index] ?
     `width:${state.colState[index]}px'` : ''
    const styles = toInlineStyles(state.stylesState[id])
    return `
      <div 
      style='${styles}; ${width}'
        class='cell' 
        data-col='${index}' 
        data-value="${text}"
        data-type='cell'
        data-id='${id}' 
        contenteditable> ${parse(text)}
      </div>`
  }
}

function createCol(colState) {
  return function(col, index) {
    const width = colState[index] ?
    `style='width:${colState[index]}px'` : ''
    return `
     <div ${width} 
      class='column' data-col='${index}' data-type="resizable">
       ${col}
      <div class="col-resize" data-resize="col"></div>
     </div> 
    `
  }
}

function createRow(content, index, rowState) {
  const height = rowState[index] ?
    `style='height:${rowState[index]}px'` : ''
  const resizer = index!=='' ?
   `<div class="row-resize" data-resize="row"></div>`:
   ''
  return `
  <div ${height} data-row='${index}' class='row' data-type="resizable">
    <div class='row-info'>
    ${index}
    ${resizer}
    </div>
    <div class='row-data'>${content}</div>
  </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15, state) {
  const colsCount = CODES.Z - CODES.A
  const rows = []
  const cols = new Array(colsCount+1)
      .fill('')
      .map(toChar)
      .map(createCol(state.colState))
      .join('')

  rows.push(createRow(cols, '', ''))
  for (let i=0; i<rowsCount; i++) {
    const cells = new Array(colsCount+1)
        .fill('')
        .map(createCell(i, state))
        .join('')
    rows.push(createRow(cells, i+1, state.rowState))
  }
  return rows.join('')
}