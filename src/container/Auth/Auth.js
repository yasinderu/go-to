import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Box,
	Typography,
	Container,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../../store/actions';

const Copyright = () => (
	<Typography variant='body2' color='textSecondary' align='center'>
		{'Copyright © '}
		<Link color='inherit' href='/'>
			Go-To
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	</Typography>
);

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Auth = () => {
	const classes = useStyles();
	const [signInForm, setSignInForm] = useState({
		email: '',
		password: '',
	});
	const [signUpForm, setSignupForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		userName: '',
		password: '',
	});
	const [isSignup, setIsSignup] = useState(false);
	const dispatch = useDispatch();
	const { auth } = useSelector(state => state);

	const history = useHistory();

	useEffect(() => {
		if (auth.authRedirectPath !== '/') {
			dispatch(actions.setAuthRedirect('/'));
		}
	}, [auth, dispatch]);

	const changeHandler = e => {
		if (isSignup) {
			setSignupForm(prev => ({
				...prev,
				[e.target.name]: e.target.value,
			}));
		} else {
			setSignInForm(prev => ({
				...prev,
				[e.target.name]: e.target.value,
			}));
		}
	};

	const submit = event => {
		event.preventDefault();
		if (isSignup) {
			const userData = {
				name: `${signUpForm.firstName} ${signUpForm.lastName}`,
				email: signUpForm.email,
				userName: signUpForm.userName,
				password: signUpForm.password,
			};
			dispatch(actions.authSignUp(userData))
				.then(res => {
					setIsSignup(false);
				})
				.catch(err => {
					alert(err);
				});
		} else {
			const userData = { ...signInForm };
			dispatch(actions.authLogin(userData))
				.then(res => {
					window.location.reload();
				})
				.catch(err => {
					console.log(err);
				});
		}
	};

	let redirectAuth = null;
	if (auth.token !== null) {
		redirectAuth = <Redirect to={auth.authRedirectPath} />;
	}

	return (
		<Container component='main' maxWidth='xs'>
			{redirectAuth}
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlined />
				</Avatar>
				<Typography component='h1' variant='h5'>
					{isSignup ? 'Sign Up' : 'Sign in'}
				</Typography>
				<form className={classes.form} noValidate onSubmit={submit}>
					<Grid container spacing={2}>
						{isSignup && (
							<React.Fragment>
								<Grid item xs={12} sm={6}>
									<TextField
										value={signUpForm.firstName}
										autoComplete='fname'
										name='firstName'
										variant='outlined'
										required
										fullWidth
										id='firstName'
										label='First Name'
										onChange={changeHandler}
										autoFocus
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										value={signUpForm.lastName}
										variant='outlined'
										required
										fullWidth
										id='lastName'
										label='Last Name'
										name='lastName'
										autoComplete='lname'
										onChange={changeHandler}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										value={signInForm.userName}
										variant='outlined'
										required
										fullWidth
										id='userName'
										label='Username'
										name='userName'
										autoComplete='userName'
										onChange={changeHandler}
									/>
								</Grid>
							</React.Fragment>
						)}
						<Grid item xs={12}>
							<TextField
								value={isSignup ? signUpForm.email : signInForm.email}
								variant='outlined'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								onChange={changeHandler}
								autoFocus
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								value={isSignup ? signUpForm.password : signInForm.password}
								variant='outlined'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
								onChange={changeHandler}
							/>
						</Grid>
						<Grid item xs={12}>
							{isSignup ? (
								<FormControlLabel
									control={<Checkbox value='allowExtraEmails' color='primary' />}
									label='I want to receive inspiration, marketing promotions and updates via email.'
								/>
							) : (
								<FormControlLabel
									control={<Checkbox value='remember' color='primary' />}
									label='Remember me'
								/>
							)}
						</Grid>
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						{isSignup ? 'Sign Up' : 'Sign in'}
					</Button>
					<Grid container>
						{!isSignup && (
							<Grid item xs>
								<Link href='#' variant='body2'>
									Forgot password?
								</Link>
							</Grid>
						)}
						<Grid item>
							<Link href='#' variant='body2' onClick={() => setIsSignup(!isSignup)}>
								{isSignup
									? 'Already have an account? Sign in'
									: "Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default Auth;
