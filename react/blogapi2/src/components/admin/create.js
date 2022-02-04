import React, { useState } from 'react';
import axiosInstance from '../../axios';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';





const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
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
	//https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1
	function slugify(string) {
		const a =
			'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
		const b =
			'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
		const p = new RegExp(a.split('').join('|'), 'g');

		return string
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
			.replace(/&/g, '-and-') // Replace & with 'and'
			.replace(/[^\w\-]+/g, '') // Remove all non-word characters
			.replace(/\-\-+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, ''); // Trim - from end of text
	}

	const navigate = useNavigate();
	const initialFormData = Object.freeze({
		sobrenome: '',
		naturalidade: '',
		slug: '',
		nome: '',
		hobbies: '',
		nascimento: '',
	});

	const [postData, updateFormData] = useState(initialFormData);
	const [postimage, setPostImage] = useState(false);
	const [fileName, setFileName] = useState("");

	const handleChange = (e) => {
		if ([e.target.name] == 'image') {
			setPostImage({
				image: e.target.files,
			});
			setFileName(e.target.files[0].name);
			console.log(e.target.files);
		}
		if ([e.target.name] == 'sobrenome') {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value.trim(),
				['slug']: slugify(e.target.value.trim()),
			});
		} else {
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

	const handleSubmit = (e) => {
		e.preventDefault();
		//console.log(postimage.image[0])
		let formData = new FormData();
		formData.append('sobrenome', postData.sobrenome);
		formData.append('slug', postData.slug);
		formData.append('author', userID);
		formData.append('nome', postData.nome);
		formData.append('naturalidade', postData.naturalidade);
		formData.append('hobbies', postData.hobbies);
		formData.append('nascimento', postData.nascimento);
		if (postimage) {
			formData.append('image', postimage.image[0]);
		}
		axiosInstance.post(`admin/create/`, formData);
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
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Criar Novo Cliente
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="sobrenome"
								label="Post sobrenome"
								name="sobrenome"
								autoComplete="sobrenome"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="nome"
								label="Post nome"
								name="nome"
								autoComplete="nome"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="naturalidade"
								label="Post naturalidade"
								name="naturalidade"
								autoComplete="naturalidade"
								onChange={handleChange}
							/>
						</Grid>
						{/* <Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="slug"
								label="slug"
								name="slug"
								autoComplete="slug"
								value={postData.slug}
								onChange={handleChange}
							/>
						</Grid> */}
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="hobbies"
								label="hobbies"
								name="hobbies"
								autoComplete="hobbies"
								onChange={handleChange}
								multiline
								rows={4}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								type="date"
								id="nascimento"
								label="Data de Nascimento"
								name="nascimento"
								InputLabelProps={{ shrink: true }}
								autoComplete="nascimento"
								onChange={handleChange}
							/>
						</Grid>
						{/* <Grid item xs={12}>
							<input
								accept="image/*"
								className={classes.input}
								id="post-image"
								onChange={handleChange}
								name="image"
								type="file"
								//style={{ display: 'none' }}
							/>
							<label htmlFor="post-image">
								<Button
								    //fullWidth
									className="btn-choose"
									variant="outlined"
									component="span" >
									Selecione Foto Cliente
								</Button>
							</label>
						</Grid> */}
						<Grid item xs={12}>
							<Button
								variant="contained"
								component="label"
								color="primary"
								>
								Upload Foto
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
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Criar Cliente
					</Button>
				</form>
			</div>
		</Container>
	);
}