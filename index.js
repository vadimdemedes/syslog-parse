/**
 * parse syslog-formatted messages
 */

module.exports = function parse (log) {
  const parts = /(\<[0-9]+\>)?([a-z]{3})\s+([0-9]{1,2})\s+([0-9]{2})\:([0-9]{2})\:([0-9]{2})(\s+[\w\.\-]+)?\s+([\w\-\(\)]+)(?:\[([a-z0-9\-\.]+)\])?\:(.+)/i.exec(log.trim());
  
  if (!parts) return {};
  
  const priority = +(parts[1] || '').replace(/[^0-9]/g, '');
  const facilityCode = priority >> 3;
  const facility = FACILITY[facilityCode];
  const severityCode = priority & 7;
  const severity = SEVERITY[severityCode];
  
  const month = MONTHS.indexOf(parts[2]);
  const date = +parts[3];
  const hours = +parts[4];
  const minutes = +parts[5];
  const seconds = +parts[6];
  
  const time = new Date();
  time.setMonth(month);
  time.setDate(date);
  time.setHours(hours);
  time.setMinutes(minutes);
  time.setSeconds(seconds);
  
  const host = (parts[7] || '').trim();
  const process = parts[8];
  const pid = +parts[9] || parts[9];
  
  const message = parts[10].trim();
  
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
