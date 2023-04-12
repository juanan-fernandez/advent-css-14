import styles from './Calendar.module.css';
import {
	daysInMonth,
	getMonthName,
	getMonthNumber,
	getCurrentNumberDay,
	getRandomKey,
	firstDayOfDate,
} from '../../utils/date-module';
import { useEffect, useState } from 'react';

type Day = {
	day: number;
	isCurrentMonth: boolean;
};

export default function Calendar() {
	const [month, setMonth] = useState(getMonthNumber(new Date()));
	const [year, setYear] = useState(new Date().getFullYear());
	const [days, setDays] = useState<Day[]>([]);

	const setUpCalendar = () => {
		let calDays: Day[] = [];
		const firstDay = firstDayOfDate(new Date(year, month));
		const lastDay = daysInMonth(new Date(year, month + 1, 0));
		const lastDayPrevMonth = daysInMonth(new Date(year, month, 0));
		let firsDayOfCalendar = lastDayPrevMonth - firstDay + 1;
		let dayOfMonth = 1;

		while (firsDayOfCalendar <= lastDayPrevMonth) {
			calDays.push({ day: firsDayOfCalendar, isCurrentMonth: false });
			firsDayOfCalendar++;
		}

		while (dayOfMonth <= lastDay) {
			calDays.push({ day: dayOfMonth, isCurrentMonth: true });
			dayOfMonth++;
		}

		setDays(calDays);
		calDays = [];
		return;
	};

	const itsTodaysDate = (dayCal: number) => {
		const today = new Date(
			new Date().getFullYear(),
			getMonthNumber(new Date()),
			getCurrentNumberDay(new Date())
		);
		const calDay = new Date(year, month, dayCal);

		return today.getTime() === calDay.getTime();
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
					key={getRandomKey() + idx + day.day}
					className={`${itsTodaysDate(day.day) ? styles.today : ''} ${
						day.isCurrentMonth ? '' : styles['day--not-current-month']
					}`}
				>
					{day.day}
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
