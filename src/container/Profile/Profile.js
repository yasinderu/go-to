import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './profile.css';
import { Container, TextField } from '@material-ui/core';
import NavBar from '../../component/Navigation/NavBar';

import * as actions from '../../store/actions/index';

const DisabledTextField = props => {
	const { name, value, label, changeHandler } = props;
	const [edit, setEdit] = useState(false);
	return (
		<div className='text-field '>
			<div style={{ width: 300 }}>
				<TextField
					disabled={!edit}
					fullWidth
					name={name}
					label={label}
					value={value}
					variant='outlined'
					InputLabelProps={{
						shrink: true,
					}}
					onChange={changeHandler}
					// required
				/>
			</div>
			<button onClick={() => setEdit(!edit)}>{edit ? 'Submit' : 'Edit'}</button>
		</div>
	);
};

const Profile = () => {
	const dispatch = useDispatch();
	const { userId } = useSelector(state => state.auth);
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
		dispatch(actions.findUserById(userId))
			.then(res => {
				setProfileForm({
					firstName: res.name,
					lastName: res.name,
					email: res.email,
				});
			})
			.catch(err => {
				console.log('error', err);
			});
	}, []);
	return (
		<React.Fragment>
			<NavBar />
			<Container>
				<div className='profile-card'>
					<div className='content' style={{ justifyContent: 'space-evenly' }}>
						<div className='profile-picture'>
							<div>Profile pic</div>
						</div>
						<div className='wrapper'>
							<div className='content mb-3'>
								<DisabledTextField
									name='firstName'
									label='First Name'
									value={profileForm.firstName}
									changeHandler={changeHandler}
								/>
								<DisabledTextField
									name='lastName'
									label='Last Name'
									value={profileForm.lastName}
									changeHandler={changeHandler}
								/>
							</div>
							<div className='mb-3'>
								<div className='text-field'>
									<TextField
										fullWidth
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
