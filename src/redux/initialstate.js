import {defaultStyles, defaultTitle} from '../constants'
import {clon} from '@core/utils';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles,
  stylesState: {},
  title: defaultTitle,
  openedDate: new Date().toJSON()
}

export function normalizeInitialState(state) {
  return state ? state : clon(defaultState)
}