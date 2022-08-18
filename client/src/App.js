import "./App.css";
import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import Home from "./components/home/Home"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={"/"} component={LandingPage}></Route>
          <Route exact path={"/home"} component={Home}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
