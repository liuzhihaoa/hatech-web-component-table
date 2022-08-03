<template>
  <el-checkbox-group
    ref="input"
    v-model="value"
    v-bind="props"
    @change="onEventEmit('onCellChange')"
  >
    <template v-if="props.type === 'button'">
      <el-checkbox-button
        v-for="(item, index) in props.options" 
        :key="index"
        v-bind="item"
      >
      {{item.name}}
      </el-checkbox-button>
    </template>
    <template v-else>
      <el-checkbox
        v-for="(item, index) in props.options" 
        :key="index"
        v-bind="item"
      >
      {{item.name}}
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>

<script>
import mixins from '../../mixins'
/**
 * 表格使用checkbox组件
 * 参数参考element-ui checkbox组件，https://element.eleme.io/#/zh-CN/component/checkbox
 */
export default {
  name: 'TableCheckbox',
  mixins: [mixins],
  data () {
    return {
      value: []
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
      this.value = this.formatter(row[prop], row) || []
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