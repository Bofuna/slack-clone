import React from "react";
import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import SignupForm from "./SignupForm/SignupForm";

function App() {
  return (
    <div>
      {/* <NavBarContainer /> */}
      <Switch>
        <AuthRoute exact path="/signup" component={SignupForm} />
        />
      </Switch>
    </div>
  );
}

export default App;
