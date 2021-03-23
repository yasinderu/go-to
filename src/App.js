import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import Home from './container/Home/Home';
import Auth from './container/Auth/Auth';
import Blog from './container/Blog/Blog';
import Profile from './container/Profile/Profile';
import Post from './container/Blog/Post';

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
			<Route path='/post/:postId' component={Post} />
		</Switch>
	);

	if (auth.token !== null) {
		routes = (
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/blog' component={Blog} />
				<Route path='/auth' component={Auth} />
				<Route path='/profile' component={Profile} />
				<Route path='/:postId' component={Post} />
			</Switch>
		);
	}

	return <div>{routes}</div>;
}

export default withRouter(App);
