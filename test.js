import omit from 'lodash.omit';
import test from 'ava';
import parse from './dist/index.js';

test('parse non-matching message', t => {
	t.is(parse(''), undefined);
});

test('parse with hostname', t => {
	const message =
		'<38>Feb 07 01:02:03 abc system[253]: Listening at 0.0.0.0:3000';

	const log = parse(message);
	const {time} = log;
	const props = omit(log, 'time');

	t.deepEqual(props, {
		priority: 38,
		facilityCode: 4,
		facility: 'auth',
		severityCode: 6,
		severity: 'info',
		host: 'abc',
		process: 'system',
		pid: 253,
		message: 'Listening at 0.0.0.0:3000',
	});

	t.is(time.getMonth(), 1);
	t.is(time.getDate(), 7);
	t.is(time.getHours(), 1);
	t.is(time.getMinutes(), 2);
	t.is(time.getSeconds(), 3);
});

test('parse without hostname', t => {
	const message = '<38>Feb 07 01:02:03 system[253]: Listening at 0.0.0.0:3000';
	const log = parse(message);
	const {time} = log;
	const props = omit(log, 'time');

	t.deepEqual(props, {
		priority: 38,
		facilityCode: 4,
		facility: 'auth',
		severityCode: 6,
		severity: 'info',
		host: '',
		process: 'system',
		pid: 253,
		message: 'Listening at 0.0.0.0:3000',
	});

	t.is(time.getMonth(), 1);
	t.is(time.getDate(), 7);
	t.is(time.getHours(), 1);
	t.is(time.getMinutes(), 2);
	t.is(time.getSeconds(), 3);
});

test('parse without priority', t => {
	const message = 'Feb 07 01:02:03 system[253]: Listening at 0.0.0.0:3000';
	const log = parse(message);
	const {time} = log;
	const props = omit(log, 'time');

	t.deepEqual(props, {
		priority: 0,
		facilityCode: 0,
		facility: 'kern',
		severityCode: 0,
		severity: 'emerg',
		host: '',
		process: 'system',
		pid: 253,
		message: 'Listening at 0.0.0.0:3000',
	});

	t.is(time.getMonth(), 1);
	t.is(time.getDate(), 7);
	t.is(time.getHours(), 1);
	t.is(time.getMinutes(), 2);
	t.is(time.getSeconds(), 3);
});

test('parse with host-digits, no-pid and process-dashes', t => {
	const message =
		'Feb 07 01:02:03 abc123 systemd-logind: Removed session c160.';

	const log = parse(message);
	const {time} = log;
	const props = omit(log, 'time');

	t.deepEqual(props, {
		priority: 0,
		facilityCode: 0,
		facility: 'kern',
		severityCode: 0,
		severity: 'emerg',
		host: 'abc123',
		process: 'systemd-logind',
		message: 'Removed session c160.',
	});

	t.is(time.getMonth(), 1);
	t.is(time.getDate(), 7);
	t.is(time.getHours(), 1);
	t.is(time.getMinutes(), 2);
	t.is(time.getSeconds(), 3);
});

test('parse with host-underscores and process-underscores', t => {
	const message =
		'Feb 07 01:02:03 abc_123 wpa_supplicant: wlan0: Could not connect to kernel driver';

	const log = parse(message);
	const {time} = log;
	const props = omit(log, 'time');

	t.deepEqual(props, {
		priority: 0,
		facilityCode: 0,
		facility: 'kern',
		severityCode: 0,
		severity: 'emerg',
		host: 'abc_123',
		process: 'wpa_supplicant',
		message: 'wlan0: Could not connect to kernel driver',
	});

	t.is(time.getMonth(), 1);
	t.is(time.getDate(), 7);
	t.is(time.getHours(), 1);
	t.is(time.getMinutes(), 2);
	t.is(time.getSeconds(), 3);
});

test('parse process with slash', t => {
	const message =
		'<38>Feb 07 01:02:03 abc1 docker.2/6e6ea36be53a[253]: Listening at 0.0.0.0:3000';

	const log = parse(message);
	const {time} = log;
	const props = omit(log, 'time');

	t.deepEqual(props, {
		priority: 38,
		facilityCode: 4,
		facility: 'auth',
		severityCode: 6,
		severity: 'info',
		host: 'abc1',
		pid: 253,
		process: 'docker.2/6e6ea36be53a',
		message: 'Listening at 0.0.0.0:3000',
	});

	t.is(time.getMonth(), 1);
	t.is(time.getDate(), 7);
	t.is(time.getHours(), 1);
	t.is(time.getMinutes(), 2);
	t.is(time.getSeconds(), 3);
});

test('parse with missing pid', t => {
	const message = '<38>Feb 07 01:02:03 abc system: Listening at 0.0.0.0:3000';
	const log = parse(message);
	const {time} = log;
	const props = omit(log, 'time');

	t.deepEqual(props, {
		priority: 38,
		facilityCode: 4,
		facility: 'auth',
		severityCode: 6,
		severity: 'info',
		host: 'abc',
		process: 'system',
		message: 'Listening at 0.0.0.0:3000',
	});

	t.is(time.getMonth(), 1);
	t.is(time.getDate(), 7);
	t.is(time.getHours(), 1);
	t.is(time.getMinutes(), 2);
	t.is(time.getSeconds(), 3);
});
