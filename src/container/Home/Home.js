import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import { CssBaseline } from '@material-ui/core';

import { Carousel, Row, Col } from 'react-bootstrap';

import NavBar from '../../component/Navigation/NavBar';
import BlogHeader from '../../component/Header/Header';
import PostCard from '../../component/PostCard/PostCard';
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

const Home = props => {
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
		</React.Fragment>
	);
};

export default Home;
