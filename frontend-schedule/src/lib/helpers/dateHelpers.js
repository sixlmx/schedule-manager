export function getMondayDate(offset = 0) {
  const today = new Date()
  const day = today.getDay()
  const diff = day === 0 ? 6 : day - 1

  today.setDate(today.getDate() - diff + (offset * 7))

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const dayOfMonth = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${dayOfMonth}`
}

export function calcDate(startOfWeek, dayOfWeek) {
  const result = new Date(startOfWeek)

  result.setDate(result.getDate() + (dayOfWeek - 1))

  const day = String(result.getDate()).padStart(2, '0')
  const month = String(result.getMonth() + 1).padStart(2, '0')
  const year = result.getFullYear()

  return `${day}.${month}.${year}`
}

export function calcWindow(endTime, startTime) {
  function toMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const endMinutes = toMinutes(endTime);     // 16:40 = 1000 минут
  const startMinutes = toMinutes(startTime); // 19:10 = 1150 минут
  const breakMinutes = startMinutes - endMinutes; // 1150 - 1000 = 150 минут

  // Конвертируем обратно в часы и минуты
  const hours = Math.floor(breakMinutes / 60);
  const minutes = breakMinutes % 60;

  return `${hours} ч ${minutes} мин`
}
