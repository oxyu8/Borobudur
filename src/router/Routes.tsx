import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Serp } from "../pages/Serp";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Serp} />
      </Switch>
    </BrowserRouter>
  );
};
