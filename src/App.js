import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import Home from './container/Home/Home';

function App() {
	return <Route path='/' exact component={Home} />;
}

export default withRouter(App);
