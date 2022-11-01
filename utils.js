import {DateTime} from 'luxon';

export const epochToDate = (
  timestamp: number,
  format = 'dd.MM.yyyy HH:mm:ss',
): string => {
  return DateTime.fromSeconds(timestamp).toFormat(format);
};

export const parseDate = (
  date: string,
  format = 'dd.MM.yyyy HH:mm:ss',
): string => {
  return DateTime.fromISO(date).toFormat(format);
};

export const logObject = (o, name) => {
  if (o === null || o === undefined) {
    console.log(`[${name}]: ${o}`);
    return;
  }
  Object.keys(o).forEach(k => {
    if (typeof o[k] === 'object' && o[k] !== null) {
      logObject(o[k], k);
    } else {
      console.log(`[${k}]: ${o[k]}`);
    }
  });
};

export const DateFormat = 'dd.MM.yyyy';
export const DateTimeFormat = 'dd.MM.yyyy HH:mm:ss';
