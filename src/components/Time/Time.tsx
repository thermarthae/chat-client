import React, { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import Typography, { TypographyProps } from '@material-ui/core/Typography';

const parseDate = (date: DateTime, interval = 1 * 60 * 1000) => {
	const parse = () => {
		if (date.diffNow('day').days > -2)
			return date.toRelativeCalendar() + ', ' + date.toLocaleString(DateTime.TIME_SIMPLE);
		return date.toLocaleString(DateTime.DATETIME_MED);
	};
	const [parsedDate, setParsedDate] = useState(parse());

	useEffect(() => {
		const tick = () => setParsedDate(parse());
		const id = setInterval(tick, interval);
		return () => clearInterval(id);
	}, [interval]);

	return parsedDate;
};

interface ITimeTypoProps extends TypographyProps { dateTime?: string; }
const TimeTypo = (props: ITimeTypoProps) => <Typography {...props} />;

interface ITimeProps extends TypographyProps {
	time: string;
	interval?: number;
}
const Time = memo(({ time, interval, ...props }: ITimeProps) => {
	const { i18n } = useTranslation();
	const date = DateTime.fromISO(time).setLocale(i18n.language);
	const parsedDate = parseDate(date, interval);

	return (
		<TimeTypo
			{...props}
			component='time'
			title={date.toLocaleString(DateTime.DATETIME_MED)}
			dateTime={time}
			children={parsedDate}
		/>
	);
});

export default Time;
