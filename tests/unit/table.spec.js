import { mount } from '@vue/test-utils'
import Table from '../../packages/table/src/main.vue'
import Element from 'element-ui'
import Vue from 'vue'

describe('main.vue', () => {
  Vue.use(Element)

  const props = {
    data: [
      {
        id: 1,
        name: "张三",
        age: "18",
        sex: 1,
        status: false,
        birth: "1991-07-07",
        html: "<a src='http://www.baidu.com'>HTML内容</a>",
        like: ["球类"],
      },
      { id: 2, name: "李四", age: "24", sex: 1, status: 1, like: ["阅读"] },
      {
        id: 3,
        name: "王五",
        age: "28",
        sex: 1,
        status: 2,
        marry: "未婚",
        html: "<div style='color:red;'>HTML内容11</div>",
        childs: 1,
      },
      {
        id: 4,
        name: "马六",
        age: "30",
        sex: 1,
        status: 0,
        marry: "已婚",
        childs: 2,
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
          type: "text",
          prop: "age",
          label: "年龄",
          width: 50,
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
              { label: "球类", value: "ball" },
              { label: "阅读", value: "read" },
              { label: "编程", value: "soft" },
              { label: "其他", value: "other" },
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
              { label: "未婚", value: 0 },
              { label: "已婚", value: 1 },
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
          props: {},
        },
        {
          show: true,
          type: "text",
          prop: "html",
          label: "HTML内容",
          width: 100,
          props: {
            type: "html",
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
                formatter: (row) => true,
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
  }

  const wrapper = mount(Table, {
    propsData: props
  })

  it('render', () => {
    expect(wrapper.element.nodeName).toBe('DIV')
    expect(wrapper.element.className.includes('el-table')).toBe(true)
  })

  it('props', () => {
    expect(wrapper.vm.config.columns.length > 0).toBe(true)
    expect(toString.apply(wrapper.vm.data)).toBe('[object Array]')
  })

  // 事件发射
  // it('table events', () => {

  // })

  // mixins测试
  // it('mixin', () => {

  // })

  it('table component type', () => {
    const func = wrapper.vm.transfer
    expect(func()).toBe(undefined)
    expect(func('test')).toBe('TableTest')
  })

  // 单选
  // 多选
  // 序号显示
  // input框输入
  // 文本显示
  // date
  // checkbox
  // radio
  // select
  // time
  // switch
  // html
  // action
  // slot
})
