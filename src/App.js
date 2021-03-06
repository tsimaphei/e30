import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route, withRouter} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import store from "./redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import {Provider} from "react-redux";
import Preloader from './components/common/preloader/Preloader';

class App extends Component {
       componentDidMount() {
              this.props.initializeApp();
       }
   
    render() {
       if (!this.props.initialized) {
       return <Preloader/>
       }

       return (  
              <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={ () => <DialogsContainer /> }/>

                    <Route path='/profile/:userId?'
                           render={ () => <ProfileContainer /> }/>

                    <Route path='/users'
                           render={ () => <UsersContainer /> }/>

                    <Route path='/login~'
                           render={ () => <Login /> }/>
                </div>
            </div>
       )
   }
}

const mapStateToProps = (state) => ({
       initialized: state.app.initialized
})

let AppContainer = compose(
       withRouter,
       connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = (props) => {
     return  <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp;