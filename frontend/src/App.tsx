import { StoreState, useAppDispatch } from "config/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { getUser } from "shared/redux/autherntication.reducer";
import PageRoutes from "./views/post";
import PostList from "./views/post/PostList";

function App() {
  const dispatch = useAppDispatch();
  const { token } = useSelector((state: StoreState) => state.authentication);

  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, [token, dispatch]);

  return (
    <Switch>
      <Route exact path="/" component={PostList} />
      <Route path="/post" component={PageRoutes} />
      <Route path="/post/create" />
    </Switch>
  );
}

export default App;
