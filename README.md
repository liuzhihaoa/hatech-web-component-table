# 前端表格组件

提供通过配置快速展示Form表单，支持Element-UI中常用元素，如Input\Select\Radio等

主要思路是依托于ElementUI的Table通过类型映射，展示表格项。

## 使用说明

### 安装

```sh
npm install hatech-web-component-table
```

### 初始化

```js
// main.js
import HatechTable from 'hatech-web-component-table'
Vue.use(HatechTable)

// or
// xxx.vue
import { HatechTable } from 'hatech-web-component-table'
export default {
  components: { HatechTable }
}
```

### 使用示例

```html
<hatech-table :config="config" :data="data" @onEvent="onEvent" @onTableEvent="onTableEvent">
```

```js
export default {
  data() {
    return {
      data: [],
      config: {}
    }
  }
}
```

### 参数

| 参数名                           | 类型                 | 描述                                          |
| -------------------------------- | -------------------- | --------------------------------------------- |
| data                             | Array                | 表格数据源                                    |
| config                           | Object               | 表格配置信息                                  |
| config.table                     | Object               | 表格配置信息，支持el-table所有属性            |
| config.columns                   | Array                | 表格项配置信息，支持el-table-column中所有属性 |
| config.columns[].type            | String               | 表格项类型，详见下表表单项配置类型            |
| config.columns[].props           | Object               | 单元格中显示组件属性                          |
| config.columns[].props.formatter | Function(value, row) | 值处理器，显示前会经由此函数处理              |

#### 表格项配置类型

| 类型值   | 类型名称   | 说明                                            |
| -------- | ---------- | ----------------------------------------------- |
| slot     | 插槽       | 会提供table-column-XXX的插槽，XXX为prop的值 |
| text     | 文本       | 直接显示文本                                    |
| action   | 操作列     | 支持button、文本风格的操作按钮                  |
| input    | 输入框     | 同el-input                                      |
| number   | 输入框     | 同el-input-number                               |
| radio    | 单选框     | 同el-radio                                      |
| checkbox | 多选框     | 同el-checkbox                                   |
| select   | 下拉框     | 同el-select                                     |
| date     | 日期选择框 | 同el-date-picker                                |
| time     | 时间选择框 | 同el-time-picker                                |
| cascader | 级联       | 同el-cascader                                   |
| tag | 级联       | 同el-tag, 支持props.split（字符串时间隔符）,props.labelDef（显示标题字段）                                   |

### 插槽

当type为slot时，提供名为table-column-prop字段名，如prop为name，即table-column-name

### 事件

#### `onTableEvent`：表格事件总处理，所有表格事件由此事件发射。即el-table本身相关事件
  * `choice`单选事件，将返回`select-radio`事件
  * 输入组件值变化，将触发`onCellChange`事件
#### `onEvent`：事件总处理，所有自定义事件由此事件发射
  * `event`：el-table触发的事件名
      * `action`类型点击事件，将在onEvent返回`options`中配置的event
  * `params`: 事件相关参数

### 主题变量
未使用主题变量

### 依赖

| 依赖名               | 版本  | 链接                                                                       |
| -------------------- | ----- | -------------------------------------------------------------------------- |
| hatech-web-component | 0.0.8 | http://git.hatech.com.cn:8088/hatech-web/hatech-web-template-component.git |

## 知识点

### 使用共识
如已提供相关表格项，可直接使用。有个性化需要时，请通过slot实现

## 特点

该组件属于纯组件中的表格组件，属于基础组件

## 作者/维护者

| 名称 | 联系方式              | 参与部分     |
| ---- | --------------------- | ------------ |
| 吴浩 | wuhaowh@hatech.com.cn | 初始版本开发 |