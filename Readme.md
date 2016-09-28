# syslog-parse [![Build Status](https://travis-ci.org/vdemedes/syslog-parse.svg?branch=master)](https://travis-ci.org/vdemedes/syslog-parse)

Parse syslog-formatted messages.


### Installation

```
$ npm install syslog-parse --save
```

### Usage

```javascript
var parse = require('syslog-parse');

var log = parse('<38>Feb 05 01:02:03 abc system[253]: Listening at 0.0.0.0:3000');

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

### Tests

Run tests using:

```
$ npm test
```

### License

WTFPL – Do What the Fuck You Want to Public License
