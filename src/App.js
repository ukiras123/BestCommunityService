import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './redux/actions';
import { PrivateRoute, PublicRoute } from './container';
import { ErrorPage } from './container/ErrorPage';
import { LandingPage } from './components/LandingPage';
import { HomePage } from './container/HomePage';
import { LoginPage } from './container/LoginPage';
import { RegisterPage } from './container/RegisterPage';
import { CateringPage } from './container/CateringPage';
import { FreeClassesPage } from './container/FreeClassesPage';
import { HomeCarePage } from './container/HomeCarePage';
import { RentPage } from './container/RentPage';
import { ReserveHallPage } from './container/ReserveHallPage';
import { ShuttlePage } from './container/ShuttlePage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        return (
            <div className="container">
                        <Router history={history}>
                            <Switch>
                                <PublicRoute path="/main" component={LandingPage} />
                                <PrivateRoute path="/home" component={HomePage} />
                                <PrivateRoute path="/rent" component={RentPage} />
                                <PrivateRoute path="/catering" component={CateringPage} />
                                <PrivateRoute path="/hall" component={ReserveHallPage} />
                                <PrivateRoute path="/homecare" component={HomeCarePage} />
                                <PrivateRoute path="/freeclasses" component={FreeClassesPage} />
                                <PrivateRoute path="/shuttle" component={ShuttlePage} />
                                <PublicRoute path="/login" component={LoginPage}/>
                                <PublicRoute path="/register" component={RegisterPage} />
                                <PrivateRoute exact path="/" component={HomePage}/>
                                <Route path="*" component={ErrorPage} />
                                </Switch>
                        </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 