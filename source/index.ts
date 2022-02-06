const regex = new RegExp(
	[
		/(<\d+>)?/, // 1 - optional priority
		/([a-z]{3})\s+/, // 2 - month
		/(\d{1,2})\s+/, // 3 - date
		/(\d{2}):/, // 4 - hours
		/(\d{2}):/, // 5 - minutes
		/(\d{2})/, // 6 - seconds
		/(\s+[\w.-]+)?\s+/, // 7 - host
		/([\w\-().\d/]+)/, // 8 - process
		/(?:\[([a-z\d-.]+)])?:/, // 9 - optional pid
		/(.+)/, // 10  message
	]
		.map(regex => regex.source)
		.join(''),
	'i',
);

export type Facility =
	| 'kern'
	| 'user'
	| 'mail'
	| 'daemon'
	| 'auth'
	| 'syslog'
	| 'lpr'
	| 'news'
	| 'uucp'
	| 'cron'
	| 'authpriv'
	| 'ftp'
	| 'ntp'
	| 'logaudit'
	| 'logalert'
	| 'clock'
	| 'local0'
	| 'local1'
	| 'local2'
	| 'local3'
	| 'local4'
	| 'local5'
	| 'local6'
	| 'local7';

const facilities: Facility[] = [
	'kern',
	'user',
	'mail',
	'daemon',
	'auth',
	'syslog',
	'lpr',
	'news',
	'uucp',
	'cron',
	'authpriv',
	'ftp',
	'ntp',
	'logaudit',
	'logalert',
	'clock',
	'local0',
	'local1',
	'local2',
	'local3',
	'local4',
	'local5',
	'local6',
	'local7',
];

export type Severity =
	| 'emerg'
	| 'alert'
	| 'crit'
	| 'err'
	| 'warning'
	| 'notice'
	| 'info'
	| 'debug';

const severities: Severity[] = [
	'emerg',
	'alert',
	'crit',
	'err',
	'warning',
	'notice',
	'info',
	'debug',
];

const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

export interface Syslog {
	priority: number;
	facilityCode: number;
	facility: Facility;
	severityCode: number;
	severity: Severity;
	time: Date;
	host: string;
	process: string;
	pid?: number;
	message: string;
}

const syslogParse = (log: string): Syslog | undefined => {
	const parts = regex.exec(log.trim());
	if (!parts) {
		return;
	}

	const priority = Number((parts[1] ?? '').replace(/\D/g, ''));

	// eslint-disable-next-line no-bitwise
	const facilityCode = priority >> 3;
	const facility = facilities[facilityCode]!;

	// eslint-disable-next-line no-bitwise
	const severityCode = priority & 7;
	const severity = severities[severityCode]!;

	const month = months.indexOf(parts[2]!);
	const date = Number(parts[3]);
	const hours = Number(parts[4]);
	const minutes = Number(parts[5]);
	const seconds = Number(parts[6]);

	const time = new Date();
	time.setMonth(month);
	time.setDate(date);
	time.setHours(hours);
	time.setMinutes(minutes);
	time.setSeconds(seconds);

	const host = (parts[7] ?? '').trim();
	const processName = parts[8]!;
	const pid = Number(parts[9]);

	const message = (parts[10] ?? '').trim();

	const result: Syslog = {
		priority,
		facilityCode,
		facility,
		severityCode,
		severity,
		time,
		host,
		process: processName,
		message,
	};

	if (pid) {
		result.pid = pid;
	}

	return result;
};

export default syslogParse;
