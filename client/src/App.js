import "./App.css";
import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import Home from "./components/home/Home"
import Form from "./components/form/Form";
import Details from "./components/cardDetail/CardDetail"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={"/"} component={LandingPage}></Route>
          <Route exact path={"/home"} component={Home}></Route>
          <Route exact path={"/form/"} component={Form}></Route>
          <Route exact path={"/home/:id"} component={Details}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
