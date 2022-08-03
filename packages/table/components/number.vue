<template>
  <el-input-number
    ref="input"
    v-model="value"
    v-bind="props"
    @change="onEventEmit('onCellChange')"
  />
</template>

<script>
import mixins from '../../mixins'
/**
 * 表格使用inputNumber组件
 * 参数参考element-ui inputNumber组件，https://element.eleme.io/#/zh-CN/component/inputNumber
 */
export default {
  name: 'TableNumber',
  mixins: [mixins],
  data () {
    return {
      value: undefined
    }
  },
  watch: {
    scope(newVal) {
      if (newVal) {
        this.setValue()
      }
    }
  },
  mounted() {
    this.setValue()
  },
  methods: {
    setValue() {
      const { row } = this.scope
      const { prop } = this.column
      this.value = this.formatter(row[prop], row)
    },
    onEventEmit(event) {
      this.$emit('onComponentEvent', {
        event,
        value: this.value,
        scope: this.scope,
        column: this.column,
        index: this.scope.$index
      })
    },
  },
}
</script>