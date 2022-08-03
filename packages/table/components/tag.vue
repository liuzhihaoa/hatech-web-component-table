<template>
  <div class="table_tag_view">
    <el-tag
      class="table_tag"
      v-for="(tag, index) in value"
      :key="index"
      ref="tag"
      v-bind="tagProps(tag)"
    >
      {{ tagLabel(tag) }}
    </el-tag>
  </div>
</template>

<script>
import mixins from "../../mixins";
/**
 * 表格使用tag组件
 * 参数参考element-ui tag组件，https://element.eleme.io/#/zh-CN/component/tag
 */
export default {
  name: "TableTag",
  mixins: [mixins],
  data() {
    return {
      value: [],
    };
  },
  watch: {
    'scope.row': {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.setValue();
        }
      },
    },
  },
  methods: {
    setValue() {
      const { row } = this.scope;
      const { prop } = this.column;
      const value = this.formatter(row[prop], row);
      
      if (typeof value === 'string' && value !== '') {
        this.value = value.split(this.props.split || ',')
      } else if (toString.apply(value) === '[object Array]') {
        this.value = value
      }
    },
    onEventEmit(event) {
      this.$emit("onComponentEvent", {
        event,
        value: this.value,
        scope: this.scope,
        column: this.column,
        index: this.scope.$index,
      });
    },
    tagProps(tag) {
        if (toString.apply(tag) === '[object Object]') {
            return tag
        }
        return {}
    },
    tagLabel(tag) {
        if (toString.apply(tag) === '[object Object]') {
            return tag[this.props.labelDef || 'label']
        }
        return tag.label
    }
  },
};
</script>

<style lang="scss" scoped>
.table_tag_view {
  display: flex;
  flex-wrap: wrap;
}
.table_tag {
  display: inline-block;
}
</style>