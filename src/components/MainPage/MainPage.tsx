import React from 'react';

import mainPageStyles from './MainPage.style';
import Logo from '../Logo/Logo';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import mockup from './mockup.png';
import { withStyles, Theme } from '@material-ui/core';

const SelectInput = withStyles(({ typography }: Theme) => ({
	root: {
		...typography.button,
		color: 'inherit',
		'& svg': {
			color: 'inherit',
		}
	},
	input: {
		paddingLeft: 8,
		'&:focus': {
			borderRadius: 4,
		},
	},
}), { name: 'Input' })(InputBase);

const fakeI18n = {
	title: 'Twój najlepszy przyjaciel.',
	subtitle: `
		Prosty i niezawodny sposób na planowanie i przesyłanie wiadomości
		tekstowych oraz organizowanie rozmów wideo. Komunikator na którym
		możesz polegać. Twój na zawsze.
	`,
	login: 'Zaloguj się',
	signIn: 'Utwórz konto',
	footer: 'Chat - All rights reserved ©',
};

const MainPage = () => {
	const classes = mainPageStyles();

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Logo size={4} />
				<Select value={'pl'} input={<SelectInput />}>
					<MenuItem value={'pl'}>Polski</MenuItem>
					<MenuItem value={'en'}>English</MenuItem>
				</Select>
			</div>
			<div className={classes.center}>
				<div className={classes.main}>
					<div className={classes.wrapper}>
						<Typography
							variant='h2'
							gutterBottom
							color='primary'
							className={classes.title}
							children={fakeI18n.title}
						/>
						<Typography
							variant='subtitle1'
							color='primary'
							children={fakeI18n.subtitle}
							className={classes.subtitle}
						/>
						<div className={classes.btns}>
							<Button color='primary' children={fakeI18n.signIn} />
							<Button variant='contained' color='primary' children={fakeI18n.login} />
						</div>
					</div>
				</div>
				<div className={classes.aside}>
					<img
						src={mockup}
						className={classes.img}
						width={210}
						height={428}
					/>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
