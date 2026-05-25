/**
 * Response item for api/schedules/fetchSchedules.
 *
 * @typedef {object} ScheduleDTO
 * @property {number} id
 * @property {string} name
 * @property {string} created
 * @property {number} lessonsInDay
 * @property {number[]} weekdays
 * @property {string|null} start_date
 * @property {string} type
 */

/**
 * Request body for api/schedules/createSchedule.
 *
 * @typedef {object} CreateScheduleBody
 * @property {string} name
 * @property {number} lessonsInDay
 * @property {string} type
 * @property {string|null} startDate
 * @property {number[]} weekdays
 */

/**
 * Request body for api/schedules/updateSchedule.
 *
 * @typedef {object} UpdateScheduleBody
 * @property {number} id
 * @property {string} name
 * @property {number} lessonsInDay
 * @property {string} type
 * @property {string|null} startDate
 * @property {number[]} weekdays
 */

/**
 * Return value for api/schedules/createSchedule, api/schedules/updateSchedule and api/schedules/deleteSchedule.
 *
 * @typedef {object} ScheduleActionResult
 * @property {'success'|'error'} type
 * @property {string} message
 */

export {};
