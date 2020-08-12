import React from "react";
import Land from "./Land";
import Form from "./Form";
import chat from "./chat";
import { Route, HashRouter } from "react-router-dom";

const App = () => {
  return (
    <HashRouter>
      <Route path="/" exact component={chat} />
    </HashRouter>
  );
};

export default App;
