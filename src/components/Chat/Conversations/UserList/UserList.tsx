import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import OptionList from '@src/components/OptionList/OptionList';

import Line from '../Line/Line';
import { IUser } from '../Searchbox/Searchbox.apollo';
import List from '../List';


interface IUserListProps {
	userArr: IUser[];
}
const UserList = ({ userArr }: IUserListProps) => {
	const [t] = useTranslation();
	const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

	const handleMenuClose = () => setMenuAnchorEl(null);
	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setMenuAnchorEl(event.currentTarget);
	};

	return (
		<List>
			{userArr.map(item =>
				<Link to={'/chat/' + item._id} key={item._id}>
					<Line
						key={item._id}
						avatar={item.name[0]}
						name={item.name}
						handleMenuClick={handleMenuClick}
					/>
				</Link>
			)}
			<Menu open={!!menuAnchorEl} anchorEl={menuAnchorEl} onClose={handleMenuClose}>
				<OptionList onClick={handleMenuClose}>
					<Typography children={t('optionList.delete')} />
				</OptionList>
			</Menu>
		</List>
	);
};

export default React.memo(UserList);
