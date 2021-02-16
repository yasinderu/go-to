import React from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Button,
	Typography,
	makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: 'black',
		boxShadow: 0,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const NavBar = () => {
	const classes = useStyles();
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
				<Button color='inherit'>Login</Button>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
