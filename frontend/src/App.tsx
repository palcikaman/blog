import React from "react";
import { Route, Switch } from "react-router";
import PageRoutes from "./views/post";
import PostList from "./views/post/PostList";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={PostList} />
      <Route path="/post" component={PageRoutes} />
      <Route path="/post/create" />
    </Switch>
  );
}

export default App;
