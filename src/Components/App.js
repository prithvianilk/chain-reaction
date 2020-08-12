import React from "react";
import Land from "./Land";
import Chat from "./Chat";
import { Route, HashRouter } from "react-router-dom";

const App = () => {
    return (
        <HashRouter>
            <Route path="/" exact component={Land} />
            <Route path="/chat" exact component={Chat} />
        </HashRouter>
    );
};

export default App;
