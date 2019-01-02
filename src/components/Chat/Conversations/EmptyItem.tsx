import React from 'react';

const EmptyItem: React.SFC<any> = ({ children }) => {
	return (
		<div className='item--empty align--center'>
			{children}
		</div>
	);
};

export default EmptyItem;
