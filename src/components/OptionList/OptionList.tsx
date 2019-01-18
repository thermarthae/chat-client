import { Theme } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import { styled } from '@material-ui/styles';

const OptionList = styled(MenuItem)(({ theme: { palette } }: { theme: Theme }) => ({
	color: palette.text.primary,
	height: 'auto',
	fontSize: 'inherit',
	fontFamily: 'inherit',
	lineHeight: 'inherit',
}), { name: 'OptionList' });
export default OptionList;
