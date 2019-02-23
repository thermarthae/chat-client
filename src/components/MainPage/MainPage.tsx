import React from 'react';
import { useTranslation } from 'react-i18next';

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

const MainPage = () => {
	const classes = mainPageStyles();
	const [t] = useTranslation();

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
							children={t('mainPage.title')}
						/>
						<Typography
							variant='subtitle1'
							color='primary'
							children={t('mainPage.subtitle')}
							className={classes.subtitle}
						/>
						<div className={classes.btns}>
							<Button color='primary' children={t('mainPage.registerBtn')} />
							<Button
								variant='contained'
								color='primary'
								children={t('mainPage.signInBtn')}
							/>
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
