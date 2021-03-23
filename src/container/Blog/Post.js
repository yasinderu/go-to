import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import './post.css';
import NavBar from '../../component/Navigation/NavBar';

const Post = props => {
	const { posts, isLoading } = useSelector(state => state.post);
	const dispatch = useDispatch();
	const postId = props.location.pathname.replace('/post/', '');
	useEffect(() => {
		dispatch(actions.showPostbyId(postId));
	}, []);

	if (!posts || isLoading) {
		return 'Loading...';
	}
	return (
		<React.Fragment>
			<NavBar />
			<div className='post-container'>
				<h4>
					Post Title : <span>{posts?.postTitle}</span>
				</h4>
				<h4>
					Post Description : <span>{posts?.description}</span>
				</h4>
				<h4>
					Category : <span>{posts?.categoryTitle}</span>
				</h4>
			</div>
		</React.Fragment>
	);
};

export default Post;
