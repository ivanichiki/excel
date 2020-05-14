import {$} from '../../core/dom'

export function resizeHandeler(e, $root) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = e.target.dataset.resize
  let value
  $resizer.css({opacity: 1})

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({right: -delta + 'px', height: '100vh'})
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({bottom: -delta + 'px', width: '100vw'})
    }
  }
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (type === 'col') {
      $parent.css({width: value + 'px'})
      $root.findAll(`[data-col='${$parent.data.col}']`)
          .forEach(element => element.style.width = `${value}px`)
      $resizer.css({
        right: '0',
        opacity: '0',
        height: 'auto'
      })
    } else {
      $parent.css({height: value + 'px'})
      $root.findAll(`[data-col='${$parent.data.col}']`)
          .forEach(element => element.style.height = `${value}px`)
      $resizer.css({
        bottom: '0',
        opacity: '0',
        width: 'auto'
      })
    }
  }
}