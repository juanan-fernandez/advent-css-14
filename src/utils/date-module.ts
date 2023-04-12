export const getMonthName = (month: number): string => {
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

export const getMonthNumber = (dateParam: Date): number => dateParam.getMonth();

export const getCurrentNumberDay = (dateParam: Date): number => dateParam.getDate();

export const firstDayOfDate = (dateParam: Date): number => dateParam.getDay();

export const daysInMonth = (dateParam: Date): number => dateParam.getDate();

export const getRandomKey = (): number =>
	Math.floor(Math.random() * 1000) * new Date().getTime();
