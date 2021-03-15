import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './profile.css';
import { Container, TextField } from '@material-ui/core';

import * as actions from '../../store/actions/index';

const Profile = props => {
	const dispatch = useDispatch();
	const { userProfile } = useSelector(state => state.user);
	const { userId } = useSelector(state => state.auth);
	const onFindUser = useCallback(userId => dispatch(actions.findUserById(userId)), [
		dispatch,
	]);
	const [profileForm, setProfileForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
	});

	const changeHandler = e => {
		setProfileForm(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		onFindUser(userId);
	}, [onFindUser]);
	return (
		<React.Fragment>
			<Container>
				<div className='profile-card'>
					<div className='content' style={{ justifyContent: 'space-evenly' }}>
						<div className='profile-picture'>
							<div>Profile pic</div>
						</div>
						<div className='wrapper'>
							<div className='content mb-3'>
								<div className='text-field '>
									<div style={{ width: 300 }}>
										<TextField
											disabled
											fullWidth
											name='firstName'
											id='outlined-disabled'
											label='First Name'
											value={profileForm.firstName}
											variant='outlined'
											InputLabelProps={{
												shrink: true,
											}}
											onChange={changeHandler}
											// required
										/>
									</div>
									<button>Edit</button>
								</div>
								<div className='text-field'>
									<div style={{ width: 300 }}>
										<TextField
											disabled
											fullWidth
											name='lastName'
											id='outlined-disabled'
											label='Last Name'
											value={profileForm.lastName}
											variant='outlined'
											InputLabelProps={{
												shrink: true,
											}}
											onChange={changeHandler}
											// required
										/>
									</div>
									<button>Edit</button>
								</div>
							</div>
							<div className='mb-3'>
								<div className='text-field'>
									<TextField
										fullWidth
										id='outlined-disabled'
										label='Email'
										value={profileForm.email}
										name='email'
										variant='outlined'
										InputLabelProps={{
											shrink: true,
										}}
										onChange={changeHandler}
										// autoComplete='fname'
										// required
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</React.Fragment>
	);
};

export default Profile;
