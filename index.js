'use strict';

/**
 * parse syslog-formatted messages
 */
 
const SYSLOG_LINE_REGEX = new RegExp([
  /(\<[0-9]+\>)?/,               // 1   optional priority
  /([a-z]{3})\s+/,               // 2   month
  /([0-9]{1,2})\s+/,             // 3   date
  /([0-9]{2})\:/,                // 4   hours
  /([0-9]{2})\:/,                // 5   minutes
  /([0-9]{2})/,                  // 6   seconds
  /(\s+[\w\.\-]+)?\s+/,          // 7   host
  /([\w\-\(\)\.0-9\/]+)/,        // 8   process
  /(?:\[([a-z0-9\-\.]+)\])?\:/,  // 9   optional pid
  /(.+)/,                        // 10  message
].map(regex => regex.source).join(''), 'i');

module.exports = function parse (log) {
  const parts = SYSLOG_LINE_REGEX.exec(log.trim());
  
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
