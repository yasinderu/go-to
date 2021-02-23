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
} from '@material-ui/core';

import { Carousel, Row, Col } from 'react-bootstrap';

import NavBar from '../../component/Navigation/NavBar';
import BlogHeader from './Header';
import './Home.scss';
import mountIreng from '../../assets/Img/Home/ireng.jpg';
import krakal from '../../assets/Img/Home/krakal.jpg';
import likman from '../../assets/Img/Home/likman.jpg';
import ratuboko from '../../assets/Img/Home/ratuboko.jpg';

const items = [
	{
		name: 'Mount Ireng',
		img: mountIreng,
		desc: 'Hello Word #1',
	},
	{
		name: 'Krakal Beach',
		img: krakal,
		desc: 'Hello Word #2',
	},
	{
		name: 'Angkringan',
		img: likman,
		desc: 'Hello Word #2',
	},
	{
		name: 'Ratu Boko Tample',
		img: ratuboko,
		desc: 'Hello Word #2',
	},
];

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

const Home = props => {
	// const useStyles = makeStyles({
	// 	root: {
	// 		marginTop: 100,
	// 	},
	// });
	// const classes = useStyles();
	const dispatch = useDispatch();
	const onFetchPost = useCallback(() => dispatch(actions.fetchAllPosts()), [dispatch]);
	const { posts, isLoading } = useSelector(state => state.post);

	useEffect(() => {
		onFetchPost();
	}, [onFetchPost]);

	return (
		<React.Fragment>
			<CssBaseline />
			<NavBar />
			{/* <Container maxWidth='lg'> */}
			<Carousel>
				{items.map((item, index) => (
					<Carousel.Item key={index}>
						<img style={{ width: '100%' }} src={item.img} alt='not found' />
						<Carousel.Caption>
							<h2>{item.name}</h2>
							<h5>Subtitle</h5>
						</Carousel.Caption>
					</Carousel.Item>
				))}
			</Carousel>
			<div className='card-container'>
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
			</div>
			{/* </Container> */}
		</React.Fragment>
	);
};

export default Home;
