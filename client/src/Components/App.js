import React from "react";
import Land from "./Land";
import Chat from "./Chat";
import { Route, HashRouter } from "react-router-dom";
import Rooms from "./Rooms";

const App = () => (
    <HashRouter>
        <Route path="/" exact component={Land} />
        <Route path="/chat" exact component={Chat} />
        <Route path="/rooms" exact component={Rooms} />
    </HashRouter>
);

export default App;
