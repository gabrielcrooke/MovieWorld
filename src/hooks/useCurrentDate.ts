import {useState, useEffect} from 'react';

export function useCurrentDate() {
  const [date, setDate] = useState('');

  useEffect(() => {
    const fullDate = new Date();
    const year = fullDate.getFullYear().toString();
    const getMonth = fullDate.getMonth() + 1;
    const month = getMonth > 9 ? getMonth.toString() : `0${getMonth}`;
    const getDay = fullDate.getDate();
    const day = getDay > 9 ? getDay.toString() : `0${getDay}`;
    setDate(`${year}-${month}-${day}`);
  }, []);

  return date;
}
