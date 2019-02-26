import React from 'react';
import { Redirect } from 'react-router';
import { useQuery } from 'react-apollo-hooks';
import { useTranslation } from 'react-i18next';

import Typography from '@material-ui/core/Typography';
import Logo from '../Logo/Logo';
import mainPageStyles from './MainPage.style';
import mockup from './mockup.png';
import LanguageSelect from './LanguageSelect';
import LinkButton from '../LinkButtons/LinkButton';

import { GET_LOGIN_STATUS, IGetLoginStatusRes } from '../App.apollo'; //remove

const MainPage = () => {
	const classes = mainPageStyles();
	const [t] = useTranslation();
	const { app: { isLoggedIn } } = useQuery<IGetLoginStatusRes>(GET_LOGIN_STATUS).data!;

	if (isLoggedIn) return <Redirect to={'/chat'} />;

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Logo size={4} />
				<LanguageSelect />
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
							<LinkButton to='register' children={t('mainPage.registerBtn')} />
							<LinkButton to='login' variant='contained' children={t('mainPage.signInBtn')} />
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
