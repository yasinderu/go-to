import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import {
	Button,
	makeStyles,
	Card,
	CardActionArea,
	CardActions,
	Typography,
	CardContent,
	CardMedia,
	CssBaseline,
	Container,
} from '@material-ui/core';

import { Carousel, Row, Col } from 'react-bootstrap';

import NavBar from '../../component/Navigation/NavBar';
import BlogHeader from '../../component/Header/Header';

const PostCard = ({ post }) => {
	const [hover, setHover] = useState(false);
	const useStyles = makeStyles({
		root: {
			maxWidth: 345,
			marginBottom: 30,
			boxShadow: hover ? '10px 12px' : '0',
		},
		media: {
			height: 220,
		},
	});
	const classes = useStyles();

	return (
		<Card
			className={classes.root}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={post.img.url}
					title={post.postTitle}
				/>
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						{post.postTitle}
					</Typography>
					<Typography variant='body2' color='textSecondary' component='p'>
						{post.description}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				{/* <Button size='small' color='primary'>
					Share
				</Button>
				<Button size='small' color='primary'>
					Learn More
				</Button> */}
				<Button size='small' color='primary'>
					{post.categoryTitle}
				</Button>
			</CardActions>
		</Card>
	);
};

const Blog = props => {
	const dispatch = useDispatch();
	const onFetchPost = useCallback(
		userId => dispatch(actions.fetchPostsByUserId(userId)),
		[dispatch]
	);
	const { posts, isLoading } = useSelector(state => state.post);
	const { userId } = useSelector(state => state.auth);

	useEffect(() => {
		onFetchPost(userId);
	}, [onFetchPost]);

	return (
		<React.Fragment>
			<CssBaseline />
			<NavBar />
			<Container maxWidth='lg'>
				<BlogHeader />
				{isLoading ? (
					<div style={{ display: 'flex', alignItems: 'center', margin: 'auto' }}>
						<h3>Loading ... </h3>
					</div>
				) : (
					<Row md={4}>
						{posts &&
							posts.map((post, index) => (
								<Col key={index}>
									<PostCard key={index} post={post} />
								</Col>
							))}
					</Row>
				)}
			</Container>
		</React.Fragment>
	);
};

export default Blog;
