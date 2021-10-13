import "./App.css";
import React from "react";
import { Route, Switch } from "react-router";
import Infoboard from "./Components/Infoboard";
import Landing from "./Components/Landing";
import Layout from "./Components/Layout";



const App = () => {
  

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/country/:abbr">
            <Infoboard />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
