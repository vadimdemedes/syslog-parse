# syslog-parse [![Build Status](https://github.com/vadimdemedes/syslog-parse/workflows/test/badge.svg)](https://github.com/vadimdemedes/syslog-parse/actions)

> Parse syslog-formatted messages.

## Installation

```
$ npm install --save syslog-parse
```

## Usage

```js
import parse from 'syslog-parse';

const log = parse(
	'<38>Feb 05 01:02:03 abc system[253]: Listening at 0.0.0.0:3000',
);

/*
log = {
  priority: 38,
  facilityCode: 4,
  facility: 'auth',
  severityCode: 6,
  severity: 'info',
  time: Thu Feb 05 2015 01:02:03 GMT+0100 (CET),
  host: 'abc',
  process: 'system',
  pid: 253,
  message: 'Listening at 0.0.0.0:3000'
}
*/
```

## API

### parse(input)

If `input` can't be parsed, it returns `undefined`. Otherwise it returns an object.

### input

Type: `string`

Log string.
