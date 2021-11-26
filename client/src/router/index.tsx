import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeaderJob from "../components/HeaderJob";
import routes from "./config";
import { Styles } from "../styles/styles";

const Headers =()=> (window.location.href === "/" || window.location.href === "http://localhost:3000/") ? <Header /> : <HeaderJob />;
const Footers =()=> (window.location.href === "/" || window.location.href === "http://localhost:3000/") ? <Footer /> : <></>;
const Router = () => {
  return (
    <Suspense fallback={null}>
      <Styles />
      <Headers/>
      <Switch>
        {routes.map((routeItem) => {
          return (
            <Route
              key={routeItem.component}
              path={routeItem.path}
              exact={routeItem.exact}
              component={lazy(() => import(`../pages/${routeItem.component}`))}
            />
          );
        })}
      </Switch>
      <Footers />
    </Suspense>
  );
};

export default Router;
