import React from 'react';
import axiosInstance from '../../axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postsobrenome: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

export default function Posts(props) {
	
	function parseJwt(token) {
		if (!token) { return; }
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}
	
	const userInfo = parseJwt(localStorage.getItem('access_token'))
	const userID = userInfo.user_id

	// const handleSubmit = (e) => {
	// 	e.preventDefault();

	// 	const sobrenome = e.currentTarget.dataset.sobrenome
	// 	const slug = e.currentTarget.dataset.slug
	// 	const nome = e.currentTarget.dataset.nome
	// 	const hobbies = e.currentTarget.dataset.hobbies

	// 	console.log(slug)
				
	// 	let formData = new FormData();
	// 	formData.append('sobrenome', sobrenome);
	// 	formData.append('slug', slug);
	// 	formData.append('author', userID);
	// 	formData.append('nome', nome);
	// 	formData.append('hobbies', hobbies);
	// 	//formData.append('image', postimage.image[0]);
	// 	axiosInstance.post(`admin/create/`, formData);
	// 	//window.location.reload();
	// };

	const { posts } = props;
	const classes = useStyles();
	if (!posts || posts.length === 0) 
	
	//return <p>Nenhum Cliente Encontrado</p>;

	return (
		<React.Fragment>
			<Typography
				//component="h4"
				//variant="h5"
				align="center"
				color="textPrimary"
				gutterBottom
			>
				{'Nenhum Cliente Encontrado'}
			</Typography>{' '}
			
			<Container maxWidth="md" component="main">
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell align="left">Nome</TableCell>
									<TableCell align="left">Sobrenome</TableCell>
									<TableCell align="left">Naturalidade</TableCell>
									<TableCell align="center">Ação</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{posts.map((post) => {
									return (
										<TableRow>
											<TableCell component="th" scope="row">{post.id}</TableCell>
											
											<TableCell align="left">{post.nome}</TableCell>
											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/post/' + post.id}
													className={classes.link}
												>
													{post.sobrenome}
												</Link>
											</TableCell>
											<TableCell align="left">{post.naturalidade}</TableCell>
											<TableCell align="center">
												<Button
													color="textPrimary"
													href={'/admin/edit/' + post.id}
													className={classes.link}
												>
													<EditIcon></EditIcon>
												</Button>
												{/* <Button
													data-slug = {post.slug}
													data-sobrenome = {post.sobrenome}
													data-nome = {post.nome}
													data-hobbies = {post.hobbies}
													onClick = {handleSubmit}
												>
													<AddIcon></AddIcon>
												</Button> */}
												
												<Button
													color="textPrimary"
													href={'/admin/delete/' + post.id}
													className={classes.link}
												>
													<DeleteForeverIcon></DeleteForeverIcon>
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TableCell colSpan={12} align="center">
										<Button
											href={'/admin/create'}
											variant="contained"
											color="primary"
										>
											Novo Cliente
										</Button>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		</React.Fragment>
	);
	
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									
									<TableCell align="left">Nome</TableCell>
									<TableCell align="left">Sobrenome</TableCell>
									<TableCell align="left">Naturalidade</TableCell>
									<TableCell align="center">Ação</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{posts.map((post) => {
									return (
										<TableRow>
											<TableCell component="th" scope="row">{post.id}</TableCell>
											
											<TableCell align="left">{post.nome}</TableCell>
											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/post/' + post.id}
													className={classes.link}
												>
													{post.sobrenome}
												</Link>
											</TableCell>
											<TableCell align="left">{post.naturalidade}</TableCell>
											<TableCell align="center">
												<Button
													color="textPrimary"
													href={'/admin/edit/' + post.id}
													className={classes.link}
												>
													<EditIcon></EditIcon>
												</Button>
												{/* <Button
													data-slug = {post.slug}
													data-sobrenome = {post.sobrenome}
													data-nome = {post.nome}
													data-hobbies = {post.hobbies}
													onClick = {handleSubmit}
												>
													<AddIcon></AddIcon>
												</Button> */}
												
												<Button
													color="textPrimary"
													href={'/admin/delete/' + post.id}
													className={classes.link}
												>
													<DeleteForeverIcon></DeleteForeverIcon>
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TableCell colSpan={12} align="center">
										<Button
											href={'/admin/create'}
											variant="contained"
											color="primary"
										>
											Novo Cliente
										</Button>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		</React.Fragment>
	);
};
