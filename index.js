/**
 * parse syslog-formatted messages
 */

module.exports = function parse (log) {
  var parts = /(\<[0-9]+\>)?([a-z]{3})\s+([0-9]{1,2})\s+([0-9]{2})\:([0-9]{2})\:([0-9]{2})(\s+[a-z\.\-]+)?\s+([a-z0-9]+)\[([a-z0-9\-\.]+)\]\:(.+)/i.exec(log.trim());
  if (!parts) parts = /(\<[0-9]+\>)?([a-z]{3})\s+([0-9]{1,2})\s+([0-9]{2})\:([0-9]{2})\:([0-9]{2})(\s+[a-z\.\-]+)?\s+(.+)/i.exec(log.trim());
  if (!parts) return {};
  
  var priority = +(parts[1] || '').replace(/[^0-9]/g, '');
  var facilityCode = priority >> 3;
  var facility = FACILITY[facilityCode];
  var severityCode = priority & 7;
  var severity = SEVERITY[severityCode];
  
  var month = MONTHS.indexOf(parts[2]);
  var date = +parts[3];
  var hours = +parts[4];
  var minutes = +parts[5];
  var seconds = +parts[6];
  
  var time = new Date();
  time.setMonth(month);
  time.setDate(date);
  time.setHours(hours);
  time.setMinutes(minutes);
  time.setSeconds(seconds);
  
  var host = (parts[7] || '').trim();
  var process = parts[8] || '';
  var pid = +parts[9] || parts[9] || '';
                                                                                                                                                                
  var message = parts[ parts.length-1 ].trim();
  
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

const FACILITY = [
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

const SEVERITY = [
  'emerg',
  'alert',
  'crit',
  'err',
  'warning',
  'notice',
  'info',
  'debug'
];

const MONTHS = [
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
