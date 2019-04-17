import React, { memo } from 'react';
import twemoji from 'twemoji';
import clsx from 'clsx';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import tweTypoStyles from './TweTypography.style';

interface ITweTypography extends TypographyProps {
	text?: string;
	textCursor?: boolean;
}
const TweTypography = memo(({ text, textCursor, ...props }: ITweTypography) => {
	if (!text) return null;
	const classes = tweTypoStyles();
	const parsedText = twemoji.parse(text, {
		folder: 'svg',
		ext: '.svg',
		className: clsx(classes.emoji, textCursor && classes.cursor)
	});
	return <Typography {...props} dangerouslySetInnerHTML={{ __html: parsedText }} />;
});

export default TweTypography;
