<template>
  <div
    class="form_text"
    v-if="props.type === 'html'"
    @click="onHTMLClick($event)"
    v-html="formatter(scope.row[column.prop], scope.row)"
  ></div>
  <div v-else :style="props.style" @click="onClick">
    {{ formatter(scope.row[column.prop], scope.row) }}
  </div>
</template>

<script>
import mixins from "../../mixins";
export default {
  mixins: [mixins],
  methods: {
    onClick() {
      if (!this.props.event) {
        return;
      }
      this.$emit("onEvent", {
        event: this.props.event,
        params: {
          column: this.column,
          scope: this.scope,
          index: this.index,
        },
      });
    },
    /**
     * 处理html中点击事件
     */
    onHTMLClick(event) {
      if (!this.props.event) {
        return;
      }
      debugger
      let keys = [];
      if (typeof this.props.key === "string") {
        keys.push(this.props.key);
      } else if (Array.isArray(this.props.key)) {
        keys = this.props.key;
      }
      keys.forEach((key) => {
        const value = event.target.getAttribute(key);
        if (value) {
          this.$emit("onEvent", {
            event: this.props.event,
            params: {
              item: this.scope.row,
              key,
              value,
            },
          });
        }
      });
    },
  },
};
</script>