export function getMondayDate(offset = 0) {
  const today = new Date();
  const day = today.getDay();
  const diff = day === 0 ? 6 : day - 1;

  today.setDate(today.getDate() - diff + (offset * 7));

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const dayOfMonth = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${dayOfMonth}`;
}

export function calcDate(startOfWeek, dayOfWeek) {
  const [year, month, day] = startOfWeek.split('-').map(Number);
  const result = new Date(Date.UTC(year, month - 1, day));

  result.setUTCDate(result.getUTCDate() + (dayOfWeek - 1));

  const resultDay = String(result.getUTCDate()).padStart(2, '0');
  const resultMonth = String(result.getUTCMonth() + 1).padStart(2, '0');
  const resultYear = result.getUTCFullYear();

  return `${resultDay}.${resultMonth}.${resultYear}`;
}

export function calcWindow(endTime, startTime) {
  function toMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const endMinutes = toMinutes(endTime);
  const startMinutes = toMinutes(startTime);
  const breakMinutes = startMinutes - endMinutes;

  const hours = Math.floor(breakMinutes / 60);
  const minutes = breakMinutes % 60;

  return `${hours} ч. ${minutes} минут`;
}
