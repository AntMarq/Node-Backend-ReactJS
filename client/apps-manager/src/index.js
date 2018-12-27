//App.js
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import {Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/moment/locale/fr';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Cerbere from './components/Cerbere';
import AsyncDispatchMiddleware from './middleware';
import LoginPage from './pages/login/Login';
import HomePage from './pages/home';
import {RealTimeProvider} from './providers/RealTimeProvider';
import AppStore from './reducers';

const history = createHistory();
const middlewares = [AsyncDispatchMiddleware, routerMiddleware(history)];
let store = createStore(AppStore, applyMiddleware(...middlewares));

RealTimeProvider.init(store);

ReactDOM.render(
<Provider store={store}>
    <ConnectedRouter history={history}>
        <div style={{height:'100%'}}>
            <Switch>
                <Cerbere path='/home' component={HomePage} />
                <Route component={LoginPage} />
            </Switch>
        </div>
    </ConnectedRouter>
</Provider>
, document.getElementById('root')
);
registerServiceWorker();
