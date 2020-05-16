const CODES = {
  A: 65,
  Z: 90
}
function createCell(row) {
  return function(_, index) {
    return `
      <div 
        class='cell' 
        data-col='${index}' 
        data-type='cell'
        data-id='${row}:${index}' 
        contenteditable>
      </div>`
  }
}

function createCol(col, index) {
  return `
  <div class='column' data-col='${index}' data-type="resizable">
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div> 
  `
}

function createRow(content, index) {
  const resizer = index!=='' ?
   `<div class="row-resize" data-resize="row"></div>`:
   ''
  return `
  <div class='row' data-type="resizable">
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A
  const rows = []
  const cols = new Array(colsCount+1)
      .fill('')
      .map(toChar)
      .map(createCol)
      .join('')

  rows.push(createRow(cols, ''))
  for (let i=0; i<rowsCount; i++) {
    const cells = new Array(colsCount+1)
        .fill('')
        .map(createCell(i))
        .join('')
    rows.push(createRow(cells, i+1))
  }
  return rows.join('')
}