import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";

//import { DefinitionsProvider, loadDefs, getInventoryItemDefs, includeTables } from '@d2api/manifest-react';


import Navigation from "./components/Navigation";
import D2Profile from "./components/D2Profile";
import D2Item from "./components/D2Item";
import HomePage from "./components/HomePage";

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getJsonDefinitions());
  // }, [dispatch]);

  return (
    <>
        <Navigation />

        <Switch>
          <Route exact path="/profile">
            <D2Profile />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
    </>
  );
}

export default App;
