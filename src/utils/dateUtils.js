const parseMeetingDate = meeting => {
	if (!meeting?.date) {
		return null;
	}

	const dateMatch = String(meeting.date).match(
		/^(\w+)\s+(\d{1,2}),\s*(\d{4})$/,
	);
	if (!dateMatch) {
		return null;
	}

	const monthIndex = [
		'jan',
		'feb',
		'mar',
		'apr',
		'may',
		'jun',
		'jul',
		'aug',
		'sep',
		'oct',
		'nov',
		'dec',
	].indexOf(dateMatch[1].slice(0, 3).toLowerCase());
	if (monthIndex < 0) {
		return null;
	}

	const timeMatch = String(meeting.time || '12:00 AM').match(
		/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i,
	);
	if (!timeMatch) {
		return null;
	}

	let hours = Number(timeMatch[1]);
	const minutes = Number(timeMatch[2]);
	if (hours < 1 || hours > 12 || minutes > 59) {
		return null;
	}
	if (timeMatch[3].toUpperCase() === 'PM' && hours !== 12) {
		hours += 12;
	}
	if (timeMatch[3].toUpperCase() === 'AM' && hours === 12) {
		hours = 0;
	}

	const dateTime = new Date(
		Number(dateMatch[3]),
		monthIndex,
		Number(dateMatch[2]),
		hours,
		minutes,
	);
	return Number.isNaN(dateTime.getTime()) ? null : dateTime;
};

const isUpcomingMeeting = (meeting, now = new Date()) => {
	const meetingDate = parseMeetingDate(meeting);
	return Boolean(meetingDate && meetingDate.getTime() > now.getTime());
};

export {isUpcomingMeeting, parseMeetingDate};
