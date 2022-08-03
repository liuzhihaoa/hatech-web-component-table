<template>
  <el-rate
    ref="rate"
    v-model="value"
    v-bind="props"
    @change="onEventEmit('onCellChange')"
  />
</template>

<script>
import mixins from '../../mixins'
/**
 * 表格使用rate组件
 * 参数参考element-ui rate组件，https://element.eleme.io/#/zh-CN/component/rate
 */
export default {
  name: 'TableRate',
  mixins: [mixins],
  data () {
    return {
      value: 0
    }
  },
  watch: {
    scope: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.setValue()
        }
      }
    }
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
    }
  },
}
</script>