import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import { CssBaseline, Container, makeStyles } from '@material-ui/core';

import { Row, Col } from 'react-bootstrap';

import NavBar from '../../component/Navigation/NavBar';
import Header from '../../component/Header/Header';
import PostCard from '../../component/PostCard/PostCard';

const useStyles = makeStyles({
	root: {
		marginTop: 100,
	},
});

const Blog = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const onFetchPost = useCallback(
		userId => dispatch(actions.fetchPostsByUserId(userId)),
		[dispatch]
	);
	const { posts, isLoading } = useSelector(state => state.post);
	const { userId } = useSelector(state => state.auth);

	useEffect(() => {
		// window.location.reload();
		onFetchPost(userId);
	}, [onFetchPost]);

	return (
		<React.Fragment>
			<CssBaseline />
			<NavBar />
			<Container maxWidth='lg' className={classes.root}>
				<Header />
				{isLoading ? (
					<div style={{ display: 'flex', alignItems: 'center', margin: 'auto' }}>
						<h3>Loading ... </h3>
					</div>
				) : (
					<Row md={4}>
						{posts && posts.length
							? posts.map((post, index) => (
									<Col key={index}>
										<PostCard key={index} post={post} />
									</Col>
							  ))
							: 'Post not yet available'}
					</Row>
				)}
			</Container>
		</React.Fragment>
	);
};

export default Blog;
