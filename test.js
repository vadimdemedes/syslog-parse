/**
 * Dependencies
 */

var parse = require('./');

require('chai').should();


/**
 * Tests
 */

describe ('syslog-parse', function () {
  it ('parse with hostname', function () {
    var message = '<38>Feb 07 01:02:03 abc system[253]: Listening at 0.0.0.0:3000';
    
    var log = parse(message);
    log.priority.should.equal(38);
    log.facilityCode.should.equal(4);
    log.facility.should.equal('auth');
    log.severityCode.should.equal(6);
    log.severity.should.equal('info');
    log.time.getMonth().should.equal(1);
    log.time.getDate().should.equal(7);
    log.time.getHours().should.equal(1);
    log.time.getMinutes().should.equal(2);
    log.time.getSeconds().should.equal(3);
    log.host.should.equal('abc');
    log.process.should.equal('system');
    log.pid.should.equal(253);
    log.message.should.equal('Listening at 0.0.0.0:3000');
  });
  
  it ('parse without hostname', function () {
    var message = '<38>Feb 07 01:02:03 system[253]: Listening at 0.0.0.0:3000';
    
    var log = parse(message);
    log.priority.should.equal(38);
    log.facilityCode.should.equal(4);
    log.facility.should.equal('auth');
    log.severityCode.should.equal(6);
    log.severity.should.equal('info');
    log.time.getMonth().should.equal(1);
    log.time.getDate().should.equal(7);
    log.time.getHours().should.equal(1);
    log.time.getMinutes().should.equal(2);
    log.time.getSeconds().should.equal(3);
    log.host.should.equal('');
    log.process.should.equal('system');
    log.pid.should.equal(253);
    log.message.should.equal('Listening at 0.0.0.0:3000');
  });
  
  it ('parse without priority', function () {
    var message = 'Feb 07 01:02:03 system[253]: Listening at 0.0.0.0:3000';
    
    var log = parse(message);
    log.priority.should.equal(0);
    log.time.getMonth().should.equal(1);
    log.time.getDate().should.equal(7);
    log.time.getHours().should.equal(1);
    log.time.getMinutes().should.equal(2);
    log.time.getSeconds().should.equal(3);
    log.host.should.equal('');
    log.process.should.equal('system');
    log.pid.should.equal(253);
    log.message.should.equal('Listening at 0.0.0.0:3000');
  });
  
  it ('parse non-matching message', function () {
    var log = parse('');
    
    Object.keys(log).length.should.equal(0);
  });
});
