import "./App.scss";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import GlobalLoading from "./components/Loading/Global";
import NotFound from "./components/NotFound";
//configuration
// import './configs/message.config';
import routesConfig from "./configs/routesConfig";
import HeaderView from "components/HeaderView";
import { useDispatch, useSelector } from "react-redux";
import authActions from "reducers/auth";
import userActions from "reducers/user";
import ScrollTo from "components/ScrollTo";
import FooterView from "components/FooterView";

function App() {
  const { renderRoutes, routes } = routesConfig;
  const isAuth = useSelector((state) => state.authenticate.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    //authentication
    dispatch(authActions.getIsAuth());
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    //get user -> store redux
    if (isAuth) dispatch(userActions.getUserRequest());
    return () => {};
  }, [isAuth, dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<GlobalLoading />}>
        <div className="App" id="app">
          <HeaderView />
          <ScrollTo />
          {/* <ContactIcon /> */}
          <Switch>
            {renderRoutes(routes)}
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <FooterView />
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
