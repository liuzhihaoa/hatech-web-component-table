<template>
  <el-input
    ref="input"
    v-model="value"
    v-bind="props"
    @change="onEventEmit('onCellChange')"
    @blur="onEventEmit('onCellBlur')"
    @focus="onEventEmit('onCellFocus')"
    @input="onEventEmit('onCellInput')"
    @clear="onEventEmit('onCellClear')"
  />
</template>

<script>
import mixins from '../../mixins'
/**
 * 表格使用input组件
 * 参数参考element-ui input组件，https://element.eleme.io/#/zh-CN/component/input
 */
export default {
  name: 'TableInput',
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
    focus() {
      this.$refs.input && this.$refs.input.focus()
    },
    blur() {
      this.$refs.input && this.$refs.input.blur()
    },
    select() {
      this.$refs.input && this.$refs.input.select()
    }
  },
}
</script>