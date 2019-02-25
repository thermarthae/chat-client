import React from 'react';
import { useTranslation } from 'react-i18next';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import { withStyles, Theme } from '@material-ui/core';

import { supportedLangs } from '@src/providers/i18nInit';

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

const LanguageSelect = () => {
	const { i18n } = useTranslation();
	const lngs = Object.entries(supportedLangs);

	const handleChange = (event: any) => i18n.changeLanguage(event.target.value);

	return (
		<Select
			value={i18n.language}
			input={<SelectInput />}
			onClick={handleChange}
			children={lngs.map(l => <MenuItem key={l[0]} value={l[0]} children={l[1]} />)}
		/>
	);
};
export default React.memo(LanguageSelect);
