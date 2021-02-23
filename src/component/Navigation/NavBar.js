import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	AppBar,
	Toolbar,
	IconButton,
	Button,
	Typography,
	makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import * as actions from '../../store/actions';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: 'black',
		boxShadow: '10px',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const NavBar = () => {
	const history = useHistory();
	const classes = useStyles();
	const dispatch = useDispatch();
	const { auth } = useSelector(state => state);

	const authLogout = () => {
		dispatch(actions.logout());
	};
	return (
		<AppBar className={classes.root} position='fixed'>
			<Toolbar>
				<IconButton
					edge='start'
					className={classes.menuButton}
					color='inherit'
					aria-label='menu'
				>
					<MenuIcon />
				</IconButton>
				<Typography variant='h6' className={classes.title}>
					News
				</Typography>
				<Button
					color='inherit'
					onClick={auth.isAuth ? () => authLogout() : () => history.push('/auth')}
				>
					{auth.isAuth ? 'Logout' : 'Login'}
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
