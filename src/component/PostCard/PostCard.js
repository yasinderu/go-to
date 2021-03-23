import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Button,
	makeStyles,
	Card,
	CardActionArea,
	CardActions,
	Typography,
	CardContent,
	CardMedia,
} from '@material-ui/core';

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
	const history = useHistory();

	return (
		<Card
			className={classes.root}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={() => history.push(`/post/${post.postId}`)}
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

export default PostCard;
