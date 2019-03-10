import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';
import messageInputStyles from './MessageInput.style';

import InputHack from './InputHack';
import { useTranslation } from 'react-i18next';


interface IMessageInputProps {
	draft: string;
}
const MessageInput = ({ draft }: IMessageInputProps) => {
	const [t] = useTranslation();
	const [text, setText] = useState<string>(draft || t('chat.mailbox.typeYourMessage'));


	const classes = messageInputStyles();

	return (
		<div className={classes.root}>
			<InputHack
				className={classes.input}
				text={text}
				setText={setText}
				btn={classes.btn}
			/>
			<IconButton className={classes.btn} /*onClick={handleSendMessage}*/>
				<Send fontSize='inherit' />
			</IconButton>
		</div>
	);
};

export default React.memo(MessageInput);
