import React, { Component } from "react";
import Land from "./Land";
import { BrowserRouter as Router, Route, HashRouter } from "react-router-dom";
const App = () => {
  return (
    <HashRouter>
      <Route path="/" exact component={Land} />
    </HashRouter>
  );
};

export default App;
