/**
 * Response item for api/workloads/fetchWorkloads.
 *
 * @typedef {object} WorkloadDTO
 * @property {number} workloadId
 * @property {number} scheduleId
 * @property {number} groupId
 * @property {string} groupName
 * @property {string|null} groupAbbr
 * @property {number} teacherId
 * @property {string|null} teacherName
 * @property {string|null} teacherPosition
 * @property {number} subjectId
 * @property {string} subjectName
 * @property {string|null} subjectAbbr
 * @property {number} lessonsPerWeek
 */

/**
 * Request body for api/workloads/createWorkload.
 *
 * @typedef {object} CreateWorkloadBody
 * @property {string} groupId
 * @property {string} teacherId
 * @property {string} subjectId
 * @property {string} lessonsPerWeek
 * @property {string|number} scheduleId
 */

/**
 * Return value for api/workloads/createWorkload, api/workloads/deleteWorkload and api/workloads/decrementWorkload.
 *
 * @typedef {object} WorkloadActionResult
 * @property {'success'|'error'} type
 * @property {string} message
 * @property {number} [id]
 */

export {};
