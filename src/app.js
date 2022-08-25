import { createApp } from "vue";
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
  Uploader
} from "@nutui/nutui-taro";

import "./app.css";

const App = createApp({
  onShow(options) {}
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

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
  .use(Uploader);

export default App;
