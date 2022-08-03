<template>
  <el-radio-group
    ref="input"
    v-model="value"
    v-bind="props"
    @change="onEventEmit('onCellChange')"
  >
    <template v-if="props.type === 'button'">
      <el-radio-button
        v-for="(item, index) in props.options" 
        :key="index"
        v-bind="item"
      >
      {{item.name}}
      </el-radio-button>
    </template>
    <template v-else>
      <el-radio
        v-for="(item, index) in props.options" 
        :key="index"
        v-bind="item"
      >
      {{item.name}}
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script>
import mixins from '../../mixins'
/**
 * 表格使用radio组件
 * 参数参考element-ui radio组件，https://element.eleme.io/#/zh-CN/component/radio
 */
export default {
  name: 'TableRadio',
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