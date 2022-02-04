import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Create() {
	const navigate = useNavigate();
	const { id } = useParams();
	const initialFormData = Object.freeze({
		id: '',
		sobrenome: '',
		slug: '',
		nome: '',
		hobbies: '',
		naturalidade: '',
		nascimento: '',
		image:'',
	});

	const [postData, updateFormData] = useState(initialFormData);
	const [postimage, setPostImage] = useState();
	const [fileName, setFileName] = useState("");

	useEffect(() => {
		axiosInstance.get('admin/edit/postdetail/' + id).then((res) => {
			updateFormData({
				...postData,
				['sobrenome']: res.data.sobrenome,
				['nome']: res.data.nome,
				['slug']: res.data.slug,
				['hobbies']: res.data.hobbies,
				['naturalidade']: res.data.naturalidade,
				['nascimento']: res.data.nascimento,
				['image']: res.data.image,
			});
			console.log(res.data);
		});
	}, [updateFormData]);

	// useEffect(() => {
	// 	axiosInstance.get('admin/edit/postdetail/' + id).then((res) => {
	// 		setPostImage({
	// 			...postData,
	// 			['image']: res.data.image,
	// 		});
	// 		console.log(res.data);
	// 	});
	// }, [setPostImage]);

	// const handleChange = (e) => {
	// 	updateFormData({
	// 		...postData,
	// 		// Trimming any whitespace
	// 		[e.target.name]: e.target.value.trim(),
	// 	});
	// };

	const handleChange = (e) => {
		if ([e.target.name] == 'image') {
			setPostImage({
				image: e.target.files,
			});
			setFileName(e.target.files[0].name);
			console.log(e.target.files);
		}
		 else {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value.trim(),
			});
		}
	};

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
	// 	//console.log(postimage.image[0]);

	// 	axiosInstance.put(`admin/edit/` + id + '/', {
	// 		sobrenome: formData.sobrenome,
	// 		slug: formData.slug,
	// 		author: userID,
	// 		nome: formData.nome,
	// 		hobbies: formData.hobbies,
	// 		naturalidade: formData.naturalidade,
	// 		nascimento: formData.nascimento,
	// 		image: postimage.image[0],
	// 	});
	// 	// navigate({
	// 	// 	pathname: '/admin/',
	// 	// });
	// 	// window.location.reload();
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(postData.image);
		let formData = new FormData();
		formData.append('sobrenome', postData.sobrenome);
		formData.append('slug', postData.slug);
		formData.append('author', userID);
		formData.append('nome', postData.nome);
		formData.append('naturalidade', postData.naturalidade);
		formData.append('hobbies', postData.hobbies);
		formData.append('nascimento', postData.nascimento);
		//formData.append('image', postimage.image[0]);
		axiosInstance.put(`admin/edit/` + id + '/', formData);
		navigate({
			pathname: '/admin/',
		});
		window.location.reload();
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Editar Cliente
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="sobrenome"
								label="Sobrenome"
								name="sobrenome"
								autoComplete="sobrenome"
								value={postData.sobrenome}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="nome"
								label="Nome"
								name="nome"
								autoComplete="nome"
								value={postData.nome}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="hobbies"
								label="Hobbies"
								name="hobbies"
								autoComplete="hobbies"
								value={postData.hobbies}
								onChange={handleChange}
								multiline
								rows={3}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="naturalidade"
								label="Naturalidade"
								name="naturalidade"
								autoComplete="naturalidade"
								value={postData.naturalidade}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="nascimento"
								type="date"
								label="Data de Nascimento"
								name="nascimento"
								autoComplete="nascimento"
								InputLabelProps={{ shrink: true }}
								value={postData.nascimento}
								onChange={handleChange}
							/>
						</Grid>
						{/* <Grid item xs={12}>
							<Button
								variant="contained"
								component="label"
								color="primary"
								>
								Editar Foto
								<input
									accept="image/*"
									className={classes.input}
									id="post-image"
									onChange={handleChange}
									name="image"
									type="file"
									//style={{ display: 'none' }}
									hidden
								/>
							</Button>
							<span style={{ paddingLeft: "20px", marginTop: "5px" }}></span>
							{fileName}
						</Grid> */}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Atualizar Cliente
					</Button>
				</form>
			</div>
		</Container>
	);
}