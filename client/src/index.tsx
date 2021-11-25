import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import i18n from "i18next";
import Router from "./router";
const App = () => (
  <BrowserRouter >
      <Router />
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));
