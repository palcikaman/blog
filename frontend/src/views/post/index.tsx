import { Route, RouteComponentProps, Switch } from "react-router-dom";
import PostCreate from "./PostCreate";
import PostDetails from "./PostDetails";
import PostModify from "./PostModify";

const PageRoutes = ({ location, match }: RouteComponentProps) => (
  <Switch location={location}>
    <Route path={`${match.path}/create`} component={PostCreate} />
    <Route exact path={`${match.path}/:id`} component={PostDetails} />
    <Route path={`${match.path}/:id/modify`} component={PostModify} />
  </Switch>
);

export default PageRoutes;
