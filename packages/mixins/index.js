import { mixins } from 'hatech-web-component'
export default {
  mixins: [mixins],
  props: {
    /**
     * 列配置
     */
    column: {
      type: Object,
      default: () => ({})
    },
    /**
     * 行对象
     */
    scope: {
      type: Object,
      default: () => ({
        row: {},
        column: {},
        $index: 0
      })
    },
    /**
     * 行下标
     */
    index: {
      type: Number
    }
  },
  computed: {
    /**
     * 取列配置中的props属性
     */
    props() {
      return this.column.props || {}
    }
  },
  methods: {
    /**
     * 判断是否是BOOL值
     * @param {any} value 
     */
    isBool(value) {
      return typeof value === 'boolean'
    },
    /**
     * 显示参数格式化
     * @param {any} value 
     * @param {Object} row 
     */
    formatter(value, row) {
      const { formatter } = this.props
      if (typeof formatter === 'function') {
        return formatter(value, row, this.column)
      } else {
        return value
      }
    }
  }
}