import React from 'react'
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from '../components/home/Home'
import Login from '../components/auth/Login'
import Logout from '../components/auth/Logout'
import Register from '../components/auth/Register'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Buckets from '../components/bucket/Buckets'
import Items from '../components/items/Items'
import NotFound from '../components/NotFound'
import PasswordReset from "../components/auth/PasswordReset";
import {PrivateRoute} from "../components/auth/PrivateRoute";

class Application extends React.Component {

  render() {
    const {dispatch, isAuthenticated, message, isRegistered} = this.props;
    return (
        <BrowserRouter>
          <div>
            <Navbar isAuthenticated={isAuthenticated} dispatch={dispatch}/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login"
                     render={() => <Login dispatch={dispatch} isAuthenticated={isAuthenticated}/>}/>
              <Route exact path="/signup"
                     render={() => <Register dispatch={dispatch} message={message} isRegistered={isRegistered}/>}/>
              <Route exact path="/logout" render={() => <Logout dispatch={dispatch}/>}/>
              <PrivateRoute path="/buckets/:bucketId/items" component={Items} isAuthenticated={isAuthenticated}/>
              <PrivateRoute path="/buckets" component={Buckets} isAuthenticated={isAuthenticated}/>
              <PrivateRoute path="/auth/password/reset" component={PasswordReset} isAuthenticated={isAuthenticated}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  const {isAuthenticated, isFetching, message, isRegistered} = state;
  return {
    isAuthenticated,
    isFetching,
    isRegistered,
    message,
  }
};

export default connect(mapStateToProps)(Application)