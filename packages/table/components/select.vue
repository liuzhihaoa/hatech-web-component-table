<template>
  <el-select
    ref="input"
    v-model="value"
    v-bind="props"
    @change="onEventEmit('onCellChange')"
  >
    <el-option
      v-for="(item, index) in props.options" 
      :key="index"
      v-bind="item"
    />
  </el-select>
</template>

<script>
import mixins from '../../mixins'
/**
 * 表格使用select组件
 * 参数参考element-ui select组件，https://element.eleme.io/#/zh-CN/component/select
 */
export default {
  name: 'TableSelect',
  mixins: [mixins],
  data () {
    return {
      value: ''
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
      this.value = this.formatter(row[prop], row) || ''
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