import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
//import SignupFormPage from "./components/SignupFormPage";
//import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import D2Profile from "./components/D2Profile";
import D2Item from "./components/D2Item";

function App() {
  // const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = useState(false);
  // useEffect(() => {
  //   dispatch(authenticate()).then(() => setIsLoaded(true));
  // }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/:memId">
            <HomePage />
          </Route>
        </Switch>
      )} */}

        <Navigation />

        <Switch>
          <Route exact path="/profile">
            <D2Profile />
          </Route>
          
        </Switch>
    </>
  );
}

export default App;
