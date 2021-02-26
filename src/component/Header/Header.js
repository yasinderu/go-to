import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as actions from '../../store/actions';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		marginBottom: 30,
	},
	tabIndicator: {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		'& > span': {
			maxWidth: 100,
			width: '100%',
			backgroundColor: 'black',
		},
	},
});

const Header = () => {
	const [value, setValue] = useState(0);
	const classes = useStyles();

	const dispatch = useDispatch();
	const onFetchCategory = useCallback(() => dispatch(actions.fetchAllCategory()), [
		dispatch,
	]);
	const { categories } = useSelector(state => state.category);
	const { isAuth, userId } = useSelector(state => state.auth);

	const history = useHistory();

	const handleChange = (event, newValue) => {
		setValue(newValue);
		if (isAuth && history.location.pathname !== '/') {
			if (newValue === 0) {
				dispatch(actions.fetchPostsByUserId(userId));
			} else {
				dispatch(actions.fetchPostByCategoryAndUser(newValue, userId));
			}
		} else {
			if (newValue === 0) {
				dispatch(actions.fetchAllPosts());
			} else {
				dispatch(actions.fetchPostsByCategory(newValue));
			}
		}
	};

	useEffect(() => {
		onFetchCategory();
	}, [onFetchCategory]);

	const sections = [];
	for (let key in categories) {
		sections.push({
			id: categories[key].id,
			title: categories[key].title,
		});
	}

	return (
		<Paper square className={classes.root}>
			<Tabs
				classes={{ indicator: classes.tabIndicator }}
				TabIndicatorProps={{ children: <span /> }}
				variant='fullWidth'
				value={value}
				onChange={handleChange}
			>
				<Tab value={0} disableRipple key={sections.length} label='All' />
				{sections.map((category, index) => (
					<Tab value={category.id} disableRipple key={index} label={category.title} />
				))}
			</Tabs>
		</Paper>
	);
};

export default Header;
