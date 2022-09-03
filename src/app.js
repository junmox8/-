import { createApp } from "vue";
import { createPinia } from "pinia";
import {
  Button,
  Toast,
  Cell,
  CellGroup,
  Icon,
  Swiper,
  SwiperItem,
  BackTop,
  Tabs,
  TabPane,
  Tag,
  Input,
  TextArea,
  Form,
  FormItem,
  DatePicker,
  Picker,
  Popup,
  OverLay,
  Radio,
  RadioGroup,
  Uploader,
  Checkbox,
  CheckboxGroup,
  Dialog,
  Progress,
  Empty,
  Swipe
} from "@nutui/nutui-taro";

import "./app.css";

const App = createApp({
  onShow(options) {}
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});
const pinia = createPinia();
App.use(Button)
  .use(Toast)
  .use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Swiper)
  .use(SwiperItem)
  .use(BackTop)
  .use(TabPane)
  .use(Tabs)
  .use(Tag)
  .use(Input)
  .use(TextArea)
  .use(Form)
  .use(FormItem)
  .use(DatePicker)
  .use(Picker)
  .use(Popup)
  .use(OverLay)
  .use(Radio)
  .use(RadioGroup)
  .use(Uploader)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Dialog)
  .use(Progress)
  .use(Empty)
  .use(Swipe)
  .use(pinia);

export default App;
