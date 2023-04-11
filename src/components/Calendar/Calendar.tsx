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

const getRandomKey = (): number =>
	Math.floor(Math.random() * 1000) * new Date().getTime();

export default function Calendar() {
	const [month, setMonth] = useState(getMonthNumber(new Date()));
	const [year, setYear] = useState(new Date().getFullYear());
	const [days, setDays] = useState<number[]>([]);

	const setUpCalendar = () => {
		let calDays: number[] = [];
		const firstDay = firstDayOfDate(new Date(year, month));
		const lastDay = daysInMonth(new Date(year, month + 1, 0));
		const lastDayPrevMonth = daysInMonth(new Date(year, month, 0));
		let firsDayOfCalendar = lastDayPrevMonth - firstDay + 1;
		let dayOfMonth = 1;

		while (firsDayOfCalendar <= lastDayPrevMonth) {
			calDays.push(firsDayOfCalendar);
			firsDayOfCalendar++;
		}

		while (dayOfMonth <= lastDay) {
			calDays.push(dayOfMonth);
			dayOfMonth++;
		}

		setDays(calDays);
		calDays = [];
		return;
	};

	useEffect(() => {
		setUpCalendar();
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

	const renderCalendar = () => {
		const calendar = days.map((day, idx) => {
			return (
				<div
					key={getRandomKey() + idx + day}
					className={day == 12 ? `${styles.today}` : ''}
				>
					{day}
				</div>
			);
		});
		return calendar;
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
			</div>
			<div className={styles.calendar__numbers}>{renderCalendar()}</div>
		</div>
	);
}
