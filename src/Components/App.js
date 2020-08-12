import React from "react";
import Land from "./Land";
import { Route, HashRouter } from "react-router-dom";

const App = () => {
    return (
        <HashRouter>
            <Route path="/" exact component={Land} />
        </HashRouter>
    );
};

export default App;
