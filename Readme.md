# syslog-parse

Parse syslog-formatted messages.

[![Circle CI](https://circleci.com/gh/vdemedes/syslog-parse.svg?style=svg)](https://circleci.com/gh/vdemedes/syslog-parse)

### Installation

```
$ npm install syslog-parse --save
```

### Usage

```javascript
var parse = require('syslog-parse');

var log = parse('<38>Feb 01:02:03 abc system[253]: Listening at 0.0.0.0:3000');

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

[![Circle CI](https://circleci.com/gh/vdemedes/syslog-parse.svg?style=svg)](https://circleci.com/gh/vdemedes/syslog-parse)

Run tests using:

```
$ npm test
```

### License

WTFPL – Do What the Fuck You Want to Public License
