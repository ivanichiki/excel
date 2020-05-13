import './scss/index.scss';
import {Excel} from './components/excel/Excel';
import {Formula} from './components/fornula/Formula';
import {Toolbar} from './components/toolbar/Toolbar';
import {Header} from './components/header/Header';
import {Table} from './components/table/Table';

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table]
});

excel.render()
