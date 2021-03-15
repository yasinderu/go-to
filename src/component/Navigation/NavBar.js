import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	AppBar,
	Toolbar,
	IconButton,
	Link,
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
	menuButtom: {
		marginRight: theme.spacing(2),
	},
	link: {
		marginLeft: 12,
		marginRight: 12,
		':hover': {
			boxShadow: 5,
		},
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
		history.push('/');
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
				<Typography
					className={classes.title}
					variant='h5'
					onClick={() => history.push('/')}
				>
					<Link component='button' color='inherit' underline='none'>
						Home
					</Link>
				</Typography>
				{auth.isAuth && (
					<div className={classes.button}>
						<Typography variant='h6'>
							<Link
								component='button'
								underline='none'
								color='inherit'
								className={classes.link}
								onClick={() => history.push('/blog')}
							>
								My Blog
							</Link>
							<Link
								className={classes.link}
								component='button'
								underline='none'
								color='inherit'
								onClick={() => history.push('/profile')}
							>
								Profile
							</Link>
						</Typography>
					</div>
				)}
				<Typography variant='h6'>
					<Link
						color='inherit'
						component='button'
						underline='none'
						className={classes.link}
						onClick={auth.isAuth ? () => authLogout() : () => history.push('/auth')}
					>
						{auth.isAuth ? 'Logout' : 'Login'}
					</Link>
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
