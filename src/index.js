
import HatechTable from '../packages/table'
import ColumnMixin from '../packages/mixins'

// 当组件包含多个子组件时，使用Vue.use都需要注入，可都填写在Components中
const components = [
  HatechTable
]

// 方便直接注入Vue
const install = function (Vue) {
  components.forEach(component => {
    if (component && component.name) {
      Vue.component(component.name, component)
    }
  })
}

// 版本号，与package.json中的版本保持一致
const version = '0.0.1'

export default {
  install,
  HatechTable,
  ColumnMixin
}

export {
  version,
  install,
  HatechTable,
  ColumnMixin
}
