import {storage} from '../core/utils'
import {defaultStyles, defaultTitle} from '../constants'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles,
  stylesState: {},
  title: defaultTitle
}
export const initialState = storage('excel-state') ?
storage('excel-state') :
 defaultState