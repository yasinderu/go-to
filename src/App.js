import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import Home from './container/Home/Home';
import Auth from './container/Auth/Auth';
import * as actions from './store/actions';

function App() {
	const dispatch = useDispatch();
	const { auth } = useSelector(state => state);
	useEffect(() => {
		dispatch(actions.authCheckState());
	}, []);

	let routes = (
		<Switch>
			<Route path='/' exact component={Home} />
			<Route path='/auth' component={Auth} />
			<Redirect to='/' />
		</Switch>
	);

	if (auth.token !== null) {
		routes = (
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/auth' component={Auth} />
			</Switch>
		);
	}

	return <div>{routes}</div>;
}

export default withRouter(App);
