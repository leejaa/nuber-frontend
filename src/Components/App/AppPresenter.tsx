import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../../Routes/Login";
import Home from "../../Routes/Home";
import PhoneLogin from "../../Routes/PhoneLogin";
import VerifyPhone from "../../Routes/VerifyPhone";
import EditAccount from "../../Routes/EditAccount";
import Places from "../../Routes/Places";
import AddPlace from "../../Routes/AddPlace";
import FindAddress from "../../Routes/FindAddress";
import Ride from "../../Routes/Ride";
import Chat from "../../Routes/Chat";

interface IProps {
    isLoggedIn: boolean;
}
  
  const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (
    <BrowserRouter>
      {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
    </BrowserRouter>
  );
  
  const LoggedOutRoutes: React.SFC = () => (
    <Switch>
      <Route path={"https://leejaa.github.io/nuber-frontend/"} exact={true} component={Login}/>
      <Route path={"/phone-login"} component={PhoneLogin} />
      <Route path={"/verify-phone"} component={VerifyPhone} />
    </Switch>
  );
  
  const LoggedInRoutes: React.SFC = () => (
    <Switch>
      <Route path={"https://leejaa.github.io/nuber-frontend/"} exact={true} component={Home}/>
      <Route path={"/edit-account"} exact={true} component={EditAccount}/>
      <Route path={"/places"} exact={true} component={Places}/>
      <Route path={"/add-place"} exact={true} component={AddPlace}/>
      <Route path={"/find-address"} exact={true} component={FindAddress}/>
      <Route path={"/ride"} exact={true} component={Ride} />
      <Route path={"/chat"} exact={true} component={Chat} />
    </Switch>
  );
  
  AppPresenter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
  };
  
  export default AppPresenter;