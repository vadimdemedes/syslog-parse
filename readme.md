# syslog-parse [![Build Status](https://travis-ci.org/vadimdemedes/syslog-parse.svg?branch=master)](https://travis-ci.org/vadimdemedes/syslog-parse)

> Parse syslog-formatted messages.


## Installation

```
$ npm install --save syslog-parse
```

## Usage

```js
const parse = require('syslog-parse');

const log = parse('<38>Feb 05 01:02:03 abc system[253]: Listening at 0.0.0.0:3000');

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


## License

MIT © [Vadim Demedes](https://vadimdemedes.com)
