<template>
  <div id="app">
    <div class="demo_title">Table使用Demo</div>
    <hatech-table ref="table"
                  :config="config"
                  :data="data"
                  @onEvent="onEvent"
                  @onTableEvent="onTableEvent"></hatech-table>
  </div>
</template>

<script>
export default {
  name: "App",
  data () {
    return {
      data: [
        {
          id: 1,
          name: "张三",
          age: "18",
          sex: 1,
          status: 0,
          birth: "1991-07-07",
          html: "<a src='http://www.baidu.com'>HTML内容</a>",
          like: ["球类"],
          tags: '好人,好同事',
          rate: 4
        },
        { id: 2, name: "李四", age: "24", sex: 1, status: 1, like: ["阅读"] },
        {
          id: 3,
          name: "王五",
          age: "28",
          sex: 1,
          status: 1,
          marry: "未婚",
          html: "<div style='color:red;'>HTML内容11</div>",
          childs: 1,
          tags: ['坏人', '坏的很'],
          rate: 4
        },
        {
          id: 4,
          name: "马六",
          age: "30",
          sex: 1,
          status: 0,
          marry: "已婚",
          childs: 2,
          rate: 4
        },
      ],
      config: {
        table: {
          showHeader: true,
          border: true,
          size: "small",
          stripe: false,
          fit: true,
          highlightCurrentRow: false,
          defaultExpandAll: false,
          defaultSort: { order: "ascending" },
          tooltipEffect: "light",
          showSummary: false,
          sumText: "合计",
          selectOnIndeterminate: true,
          indent: 16,
          rowKey: (row = {}) => row.id,
        },
        columns: [
          {
            type: "choice",
            width: 50,
          },
          {
            type: "selection",
            width: 50,
            selectable: () => true,
            reserveSelection: true,
          },
          {
            type: "index",
            label: "序号",
            width: 50,
            index: (index) => index + 1,
          },
          {
            type: "input",
            prop: "name",
            label: "姓名",
            width: 150,
            props: {
              maxlength: 20,
              showWordLimit: true,
              clearable: true,
            },
          },
          {
            show: false,
            type: "text",
            prop: "age",
            label: "年龄",
            width: 50,
            props: {
              style: 'color:blue',
              event: 'onClickAge'
            }
          },
          {
            type: "tag",
            prop: "tags",
            label: "标签",
            width: 150,
            props: {
              labelDef: 'name',
              formatter: (value, row, column) => {
                console.log('tag formatter : ', value, row, column)
                if (!value) return ''
                let tags = []
                if (typeof value === 'string') {
                  tags = value.split(',')
                } else if (toString.apply(value) === '[object Array]') {
                  tags = value
                } else {
                  tags = [value]
                }
                return tags.map((option, index) => ({
                  name: option,
                  type: 'success',
                  style: 'margin: 0 5px;',
                  size: index < 2 ? 'medium' : 'mini'
                }))
              }
            }
          },
          {
            type: "date",
            prop: "birth",
            label: "生日",
            width: 150,
            props: {
              format: "MM-dd",
            },
          },
          {
            show: true,
            type: "text",
            prop: "sex",
            label: "性别",
            width: 50,
            props: {
              formatter: (value) => (value === 1 ? "男" : "女"),
            },
          },
          {
            show: true,
            type: "checkbox",
            prop: "like",
            label: "爱好",
            width: 200,
            props: {
              // type: 'button',
              // size: 'mini',
              min: 1,
              max: 10,
              options: [
                { name: "球类", label: "ball" },
                { name: "阅读", label: "read" },
                { name: "编程", label: "soft" },
                { name: "其他", label: "other" },
              ],
            },
          },
          {
            show: true,
            type: "radio",
            prop: "marry",
            label: "婚姻",
            width: 180,
            props: {
              // type: 'button',
              // size: 'mini',
              options: [
                { name: "未婚", label: 0 },
                { name: "已婚", label: 1 },
              ],
            },
          },
          {
            show: true,
            type: "select",
            prop: "childs",
            label: "小孩数量",
            width: 180,
            props: {
              // type: 'button',
              // size: 'mini',
              options: [
                { label: "没有", value: 0 },
                { label: "一个", value: 1 },
                { label: "二个", value: 2 },
                { label: "三个", value: 3 },
              ],
            },
          },
          {
            show: true,
            type: "time",
            prop: "backtime",
            label: "下班时间",
            width: 120,
            props: {
              format: "HH:mm",
            },
          },
          {
            show: true,
            type: "switch",
            prop: "status",
            label: "是否启用",
            width: 100,
            props: {
              activeValue: 1,
              inactiveValue: 0,
              activeTitle: '启用',
              inactiveTitle: '禁用'
            },
          },
          {
            show: true,
            type: "text",
            prop: "html",
            label: "HTML内容",
            width: 100,
            props: {
              type: "html",
              event: 'onClickId',
              key: 'id',
              formatter: () => {
                return `<div id="div">12312321</div>`
              }
            },
          },
          {
            show: true,
            type: "rate",
            prop: "rate",
            label: "评分",
            width: 130,
            props: {
              max: 5,
              allowHalf: true,
            },
          },
          {
            show: true,
            type: "action",
            prop: "action",
            label: "操作",
            rightFixed: true,
            props: {
              type: "btngroup",
              options: [
                {
                  type: "primary",
                  label: "编辑",
                  event: "onEditAction",
                  params: {},
                },
                {
                  type: "danger",
                  label: "删除",
                  event: "onDeleteAction",
                  params: {},
                  formatter: () => false,
                },
              ],
            },
          },
        ],
      },
    };
  },
  methods: {
    onEvent (args) {
      const { event, params } = args;
      this[event] && this[event](params);
      console.log("on event : ", event, params)
    },
    onClickAge (params) {
      console.log(params)
    },
    onTableEvent () {
      // const { event, params } = args
      // console.log("on table event : ", event, params);
      // table 相关事件从此处回调
    },
    // onClickHtml(args) {
    //   console.log("on click html ", args);
    //   this.$message.success("点击html内容");
    // },
    /**
     * 表格内组件编辑
     */
    async onCellChange (params) {
      const { value, scope, column, index } = params;
      console.log('onCellChange : ', params, scope.row.status)
      if (column.type === 'switch' && column.prop === 'status') {
        await this.$confirm('请确定?', '提示')
        this.data = this.data.map(item => {
          if (item.id === scope.row.id) {
            item.status = value
          }
          return item
        })
      }
      console.log("cell value change : ", value, scope, column, index);
    },
    /**
     * 自定义操作列
     */
    onEditAction ({ scope }) {
      this.$message.success(JSON.stringify(scope.row));
    },
    /**
     * 删除
     */
    onDeleteAction ({ scope }) {
      this.$message.error(JSON.stringify(scope.row));
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 90%;
  margin: 20px auto;
}
.demo_title {
  font-size: 19px;
  padding: 10px 20px 10px 0;
}
</style>