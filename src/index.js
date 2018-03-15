import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Home from './App.js';
import Restricted from './Restricted.js';
import About from './About.js';
import Footer from './footer.js';
import Header from './header.js';
import Login from './Login.js';
import Stock from './Stock/stock.js';
import CustomerOrder from './CustomerOrders/customerOrder.js';
import PurchaseOrder from './PurchaseOrders/purchaseOrder.js';
import 'bootstrap/dist/css/bootstrap.css';
import './app.css';

const AuthRoute = ({component: Component, loginUser}) => {
    return (
        <Route render={(props) => loginUser != ''
            ? <Component {...props} />
            : <Redirect to={{pathname: '/Login', state: {from: props.location}}} />}
        />)
};



class Router extends React.Component {

    state={
        currentUsername: '',
        possibleUsers: ['Simon','Steve','Tom'],
    }

    handleUserLogin = (newUser) => {
        this.setState({currentUsername: newUser});
    }

    render() {
        return (
        <BrowserRouter>
            <div>
                <Header currentUserName={this.state.currentUsername}/>
                    <div>
                        <div className="container">
                            <Switch>
                                <Route path='/about' component={ About } />
                                <AuthRoute loginUser={this.state.currentUsername} path='/Restricted' component={Restricted} />
                                <Route path='/stock/:id' component={Stock} />
                                <Route path='/stock' component={Stock} />
                                <Route path='/Login' render={props => <Login userName={this.state.currentUsername} handleLogin={this.handleUserLogin} />} />
                                <Route path='/customerOrder' component={CustomerOrder} />
                                <Route path='/purchaseOrder/:id' component={PurchaseOrder} />
                                <Route path='/purchaseOrder' component={PurchaseOrder} />
                                <Route exact path='/' render={props => <Home userName={this.state.currentUsername} />} />
                                <Redirect from='*' to='/' />
                            </Switch>
                        </div>
                    </div>
                <Footer />
            </div>
        </BrowserRouter>
        );
    }
};

ReactDOM.render((
    <Router/> 
), document.getElementById('root')) ;

