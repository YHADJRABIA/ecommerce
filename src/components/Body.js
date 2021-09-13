import React from "react";

import { Switch, Route } from "react-router-dom"; //Router

// Components
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Cart from "../pages/Cart";

const Body = () => {
  return (
    <main>
      <Switch>
        <Route path={["/", "/home"]} exact component={Home} />
        <Route path={"/cart"} exact component={Cart} />
        <Route path={"/*"} component={NotFound} />
      </Switch>
    </main>
  );
};

export default Body;
