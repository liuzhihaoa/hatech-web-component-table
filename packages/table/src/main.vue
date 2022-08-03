<template>
  <el-table ref="table"
            :data="data"
            v-bind="config.table"
            @select="onEventEmit('select', $event)"
            @select-all="onEventEmit('select-all', $event)"
            @selection-change="onEventEmit('selection-change', $event)"
            @cell-mouse-enter="onEventEmit('cell-mouse-enter', $event)"
            @cell-mouse-leave="onEventEmit('cell-mouse-leave', $event)"
            @cell-click="onEventEmit('cell-click', $event)"
            @cell-dblclick="onEventEmit('cell-dblclick', $event)"
            @row-click="onEventEmit('row-click', $event)"
            @row-contextmenu="onEventEmit('row-contextmenu', $event)"
            @row-dblclick="onEventEmit('row-dblclick', $event)"
            @header-click="onEventEmit('header-click', $event)"
            @header-contextmenu="onEventEmit('header-contextmenu', $event)"
            @sort-change="onEventEmit('sort-change', $event)"
            @filter-change="onEventEmit('filter-change', $event)"
            @current-change="onEventEmit('current-change', $event)"
            @header-dragend="onEventEmit('header-dragend', $event)"
            @expand-change="onEventEmit('expand-change', $event)">
    <template v-for="(column, index) in configColumns">
      <!-- 未设置prop属性，不显示任何东西 -->
      <el-table-column v-if="
          (typeof column.show === 'boolean' ? !column.show : false) ||
          (!column.prop && !['selection', 'index', 'choice', 'expend'].includes(column.type))
        "
                       :key="index" />

      <!-- 当为多选、序号、展开等特殊列时，内部不使用slot，优先处理 -->
      <el-table-column v-else-if="['selection', 'index', 'expend'].includes(column.type)"
                       :key="index"
                       v-bind="column" />

      <!-- 单选 -->
      <el-table-column v-else-if="column.type === 'choice'"
                       :key="index"
                       v-bind="column">
        <template slot-scope="scope">
          <el-radio v-model="singleSelected"
                    class="table_radio"
                    :label="scope.$index"
                    @change.native="onSingleChoiceClick(scope.row)" />
        </template>
      </el-table-column>

      <!-- 未设置表格展示类型时，直接展示值 -->
      <el-table-column v-else-if="!column.type || !transfer(column.type)"
                       :key="index"
                       v-bind="column">
        <template slot-scope="scope">
          {{ scope.row[column.prop] }}
        </template>
      </el-table-column>

      <!-- 插槽 -->
      <el-table-column v-else-if="column.type === 'slot'"
                       :key="index"
                       v-bind="column">
        <template slot-scope="scope">
          <slot :name="`table-column-${column.prop}`"
                :scope="scope"
                :column="column" />
        </template>
      </el-table-column>

      <!-- 展示相应组件 -->
      <el-table-column v-else-if="transfer(column.type)"
                       :key="index"
                       v-bind="column">
        <template slot-scope="scope">
          <component :is="transfer(column.type)"
                     style="width:100%;"
                     :scope="scope"
                     :column="column"
                     @onComponentEvent="onComponentEvent"
                     @onEvent="onEvent" />
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import { mixins } from 'hatech-web-component'
import components from '../components'
/**
 * 表格组件
 * @param {Array} data 表格数据
 * @param {Object} config 表格配置
 * @param {Object} config.table 表格本身相关配置
 * @param {Object} config.columns 表格列表项配置
 * @param {Object} config.columns[].type
 * @param {Object} config.columns[].prop
 * @param {Object} config.columns[].xxx 与ElementUI el-table-column属性一致
 * @param {Object} config.columns[].props 传递给单元格相关类型展示组件的属性，如select组件需要options
 */
export default {
  name: "HatechTable",
  components,
  mixins: [mixins],
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      singleSelected: false,
      ldata: []
    }
  },
  watch: {
    data (newVal) {
      this.ldata = newVal
    }
  },
  computed: {
    configColumns () {
      return (this.config.columns || []).filter(column => {
        return (column.show || column.show === undefined) ? true : false
      })
    }
  },
  mounted () {
    this.ldata = this.data
  },
  methods: {
    /**
     * 组件类型处理
     * @param {String} type 组件类型
     */
    transfer (type) {
      if (!type) {
        return undefined
      }
      return `Table${type.replace(type[0], type[0].toUpperCase())}`
    },
    /**
     * 单选值变化
     */
    onSingleChoiceClick (scope) {
      this.$emit('onTableEvent', {
        event: 'select-radio',
        params: {
          row: scope.row,
          index: scope.$index,
          column: scope.column
        }
      })
    },
    /**
     * 事件处理函数
     * @param {Object} args 事件参数
     */
    onEvent (args) {
      this.$emit('onEvent', args)
    },
    /**
     * 组件事件处理
     */
    onComponentEvent (args) {
      const { event, value, scope, column } = args
      if (toString.apply(value) === '[object Object]') {
        scope.row[column.prop] = { ...value }
      } else if (toString.apply(value) === '[object Array]') {
        scope.row[column.prop] = [...value]
      } else if (column.type === 'switch') {
        const { props } = column
        const switchValue = scope.row[column.prop] === props.activeValue ? scope.row[column.prop] : 
         ([undefined, null].includes(props.inactiveValue) ? scope.row[column.prop] : props.inactiveValue)
        scope.row[column.prop] = switchValue
      } else {
        scope.row[column.prop] = value
      }

      this.$emit('onEvent', {
        event,
        params: args
      })
    },
    /**
     * 表格事件发射
     * @param {String} event 事件名称
     * @param {Object} params 事件参数
     */
    onEventEmit (event, params) {
      this.$emit('onTableEvent', {
        event,
        params
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.table_radio {
  /deep/ .el-radio__label {
    display: none;
  }
}

// 导出所有数据
// :export {
//   // 主要颜色
//   --color-primary: $color-primary;
//   --color-success: $color-success;
//   --color-warning: $color-warning;
//   --color-danger: $color-danger;
//   --color-info: $color-info;

//   // 主要功能颜色
//   --color-background: $color-background;
//   --color-text: $color-text;
//   --color-border: $color-border;
//   --color-under: $color-under;

//   // 字体
//   --font-attach-size: $font-attach-size;
//   --font-text-size: $font-text-size;
//   --font-icon-size: $font-icon-size;
//   --font-title-size: $font-title-size;
//   --font-family: $font-family;

//   // 组件
//   --component-shadow: $component-shadow;
//   --component-background: $component-background;
//   --component-title-size: $component-title-size;
//   --component-border-color: $component-border-color;

//   // 内容区域背景
//   --content-background-color: $content-background-color;

//   // 头部区域
//   --header-background-color: $header-background-color;
//   --header-color-hover: $header-color-hover;

//   // 侧边栏
//   --side-background-color: $side-background-color;

//   // 表格
//   --table-border-color: $table-border-color;

//   // 面包屑
//   --breadcurmb-shadow: $breadcurmb-shadow;

//   // 模态框
//   --dialog-line-color: $dialog-line-color;
//   --dialog-background-color: $dialog-background-color;
//   --dialog-close-bg-color: $dialog-close-bg-color;
//   --dialog-close-color: $dialog-close-color;
// }
</style>