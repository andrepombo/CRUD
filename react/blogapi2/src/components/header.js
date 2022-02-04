import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { fade, makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import SearchBar from 'material-ui-search-bar';
import { useNavigate } from 'react-router-dom';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
	},
	// searchInput: {
	// 	alignItems: 'center',
	// }
}));

function Header() {
	const classes = useStyles();
	let navigate = useNavigate();
	const [data, setData] = useState({ search: '' });

	const goSearch = (e) => {
		navigate({
			pathname: '/search/',
			search: '?search=' + data.search,
		});
		window.location.reload();
	};
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary"
						>
							Início
						</Link>
					</Typography>
				
					<SearchBar 
						value={data.search}
						onChange={(newValue) => setData({ search: newValue })}
						onRequestSearch={() => goSearch(data.search)}
						placeholder='Procurar Nome'
						className={classes.searchInput}
					/>

					{/* <nav>
						<Link
							color="textPrimary"
							href="#"
							className={classes.link}
							component={NavLink}
							to="/admin"
						>
							Admin
						</Link>
					</nav> */}
					<Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/admin"
					>
						Admin
					</Button>
					<IconButton
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/logout"
					>
						<PowerSettingsNewIcon fontSize="small" />
					</IconButton>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default Header;