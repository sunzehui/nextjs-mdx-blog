import { formatDistanceToNow, parseISO, millisecondsToMinutes, isWithinInterval, format } from 'date-fns';
import { zhCN } from 'date-fns/locale'


export function getTimeZone() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timeZone;
}

export function fromNow(date: string | Date) {
  let d = date
  if (date instanceof String) {
    d = new Date(date)
  }
  const now = new Date();
  if (isWithinInterval(d as Date, { start: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), end: now })) {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: zhCN });
  } else {
    return format(d as Date, 'yyyy-MM-dd', {
      locale: zhCN
    }); // 超过3天，显示原格式
  }
}
export function dateFormat(_date: string | Date) {
  let date = _date;
  if (!date) {
    return null
  }
  if (typeof _date === 'string') {
    date = parseISO(_date);
  }

  return format(date as Date, 'yyyy-MM-dd', {
    locale: zhCN
  });
}

export function durationFormat(time: number) {
  const d = millisecondsToMinutes(time);
  return d + '分钟';
}

export function time2timestamp(time: string | Date) {
  if (time instanceof Date) {
    return time.getTime();
  }
  return new Date(time).getTime();
}
