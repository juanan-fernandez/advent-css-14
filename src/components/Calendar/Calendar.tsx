import styles from './Calendar.module.css';
import { useEffect, useState } from 'react';

const getMonthName = (month: number): string => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	return months[month].toUpperCase();
};

const getMonthNumber = (dateParam: Date): number => dateParam.getMonth();

const firstDayOfDate = (dateParam: Date): number => dateParam.getDay();

const daysInMonth = (dateParam: Date): number => dateParam.getDate();

export default function Calendar() {
	const [month, setMonth] = useState(getMonthNumber(new Date()));
	const [year, setYear] = useState(new Date().getFullYear());

	const renderCalendar = () => {
		let stringCalendar = '';
		const firstDay = firstDayOfDate(new Date(year, month));
		const lastDay = daysInMonth(new Date(year, month + 1, 0));
		//const daysInMonth = lastDay - firstDay + 1;

		for (let i = 0; i <= lastDay; i++) {
			if (i < firstDay) {
				stringCalendar += '<div class="calendar-day-empty">&nbsp;</div>';
			} else {
				stringCalendar += '<div class="calendar-day">' + i + '</div>';
			}
		}
		console.log(stringCalendar);

		return stringCalendar;
	};

	useEffect(() => {
		renderCalendar();
	}, [month, year]);

	const prevMonth = () => {
		if (month === 0) {
			setMonth(11);
			setYear(year - 1);
			return;
		}
		setMonth(prv => prv - 1);
		return;
	};

	const nextMonth = () => {
		if (month === 11) {
			setMonth(0);
			setYear(prv => prv + 1);
			return;
		}
		setMonth(prv => prv + 1);
		return;
	};

	return (
		<div className={styles.calendar}>
			<div className={styles.calendar__date}>
				<button onClick={prevMonth}>
					<img src='/images/previous.svg' alt='Prev month' />
				</button>
				{getMonthName(month)} - {year}
				<button onClick={nextMonth}>
					<img src='/images/next.svg' alt='Next month' />
				</button>
			</div>
			<div className={styles.calendar__days}>
				<div>S</div>
				<div>M</div>
				<div>T</div>
				<div>W</div>
				<div>T</div>
				<div>F</div>
				<div>S</div>
				{renderCalendar()}
			</div>
		</div>
	);
}
