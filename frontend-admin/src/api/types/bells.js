/**
 * Response schedule for api/bells/fetchBellsByScheduleId.
 *
 * @typedef {object} BellScheduleDTO
 * @property {number} id
 * @property {string} name
 * @property {number} lessonsInDay
 * @property {number[]} weekdays
 */

/**
 * Response bell item for api/bells/fetchBellsByScheduleId.
 *
 * @typedef {object} BellDTO
 * @property {number} id
 * @property {number} scheduleId
 * @property {number} lessonNumber
 * @property {string} startTime
 * @property {string} endTime
 */

/**
 * Return value for api/bells/fetchBellsByScheduleId.
 *
 * @typedef {object} BellsByScheduleResult
 * @property {BellScheduleDTO|undefined} schedule
 * @property {BellDTO[]} bells
 */

/**
 * Request item for api/bells/updateBellsByScheduleId.
 *
 * @typedef {object} UpdateBellBody
 * @property {number} lessonNumber
 * @property {string} startTime
 * @property {string} endTime
 */

/**
 * Return value for api/bells/updateBellsByScheduleId.
 *
 * @typedef {object} BellActionResult
 * @property {'success'|'error'} type
 * @property {string} message
 */

export {};
