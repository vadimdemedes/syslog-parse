/**
 * parse syslog-formatted messages
 */

module.exports = function parse (log) {
  var parts = /(\<[0-9]+\>)?([a-z]{3})\s+([0-9]{2})\:([0-9]{2})\:([0-9]{2})(\s+[a-z\.\-]+)?\s+([a-z]+)\[([a-z0-9\.]+)\]\:(.+)/i.exec(log.trim());
  
  if (!parts) return {};
  
  var priority = +(parts[1] || '').replace(/[^0-9]/g, '');
  var facilityCode = priority >> 3;
  var facility = FACILITY[facilityCode];
  var severityCode = priority & 7;
  var severity = SEVERITY[severityCode];
  
  var month = MONTHS.indexOf(parts[2]);
  var hours = +parts[3];
  var minutes = +parts[4];
  var seconds = +parts[5];
  
  var time = new Date();
  time.setMonth(month);
  time.setHours(hours);
  time.setMinutes(minutes);
  time.setSeconds(seconds);
  
  var host = (parts[6] || '').trim();
  var process = parts[7];
  var pid = +parts[8] || parts[8];
  
  var message = parts[9].trim();
  
  return {
    priority: priority,
    facilityCode: facilityCode,
    facility: facility,
    severityCode: severityCode,
    severity: severity,
    time: time,
    host: host,
    process: process,
    pid: pid,
    message: message
  };
};


/**
 * Constants
 */

var FACILITY = [
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
  'local7'
];

var SEVERITY = [
  'emerg',
  'alert',
  'crit',
  'err',
  'warning',
  'notice',
  'info',
  'debug'
];

var MONTHS = [
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
  'Dec'
];
