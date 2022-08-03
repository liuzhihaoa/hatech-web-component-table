<template>
  <div>
    <!-- 按钮组 -->
    <el-button-group v-if="props.type === 'btngroup'">
      <el-button 
        v-for="(item, index) in options" 
        :key="index" 
        v-bind="item" 
        size="mini" 
        @click="onClickButton(item, index)"
      >
        {{ item.label }}
      </el-button>
    </el-button-group>
    <!-- 按钮 -->
    <div v-else-if="props.type === 'btn'">
      <el-button 
        v-for="(item, index) in options" 
        :key="index" 
        v-bind="item" 
        size="mini" 
        @click="onClickButton(item)"
      >
        {{ item.label }}
      </el-button>
    </div>
    <!-- 文本按钮 -->
    <div v-else>
      <span
        v-for="(item, index) in options" 
        :key="index"
        :class="['text_button', `text_button__${item.type}`]"
        @click="onClickButton(item, index)"
      >
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<script>
import mixins from '../../mixins'
export default {
  name: 'TableAction',
  mixins: [mixins],
  computed: {
    options() {
      if (!this.props) return []
      return this.props.options.map(option => {
        if (!option.formatter || option.formatter(this.scope.row)) return option
        return false
      }).filter(Boolean)
    }
  },
  methods: {
    /**
     * 点击按钮
     */
    onClickButton(item, index) {
      this.$emit('onEvent', {
        event: item.event,
        params: {
          option: item,
          scope: this.scope,
          column: this.column,
          index: this.scope.$index
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.text_button {
  cursor: pointer;
  padding: 5px 10px 5px 0;
}
.text_button__primary {
  color: var(--color-primary);
}
.text_button__danger {
  color: var(--color-danger);
}
.text_button__warning {
  color: var(--color-warning);
}
.text_button__info {
  color: var(--color-info);
}
.text_button__success {
  color: var(--color-success);
}
</style>