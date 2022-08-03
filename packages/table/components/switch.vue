<template>
  <el-switch
    ref="switch"
    :value="value"
    v-bind="props"
    :title="value ? props.activeTitle : props.inactiveTitle"
    @change="onEventEmit('onCellChange', $event)"
  />
</template>

<script>
import mixins from '../../mixins'
/**
 * 表格使用switch组件
 * 参数参考element-ui switch组件，https://element.eleme.io/#/zh-CN/component/switch
 */
export default {
  name: 'TableSwitch',
  mixins: [mixins],
  data () {
    return {
      value: false
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
    onEventEmit(event, value) {
      this.$emit('onComponentEvent', {
        event,
        value,
        scope: this.scope,
        column: this.column,
        index: this.scope.$index
      })
    },
    focus() {
      this.$refs.switch && this.$refs.switch.focus()
    }
  },
}
</script>