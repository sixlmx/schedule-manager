/**
 * Response item for api/subjects/fetchSubjects.
 *
 * @typedef {object} SubjectDTO
 * @property {number} id
 * @property {string} name
 * @property {string} abbreviation
 */

/**
 * Request body for api/subjects/createSubject.
 *
 * @typedef {object} CreateSubjectBody
 * @property {string} name
 * @property {string} abbreviation
 */

/**
 * Request body for api/subjects/updateSubject.
 *
 * @typedef {object} UpdateSubjectBody
 * @property {number} id
 * @property {string} name
 * @property {string} abbreviation
 */

/**
 * Return value for api/subjects/createSubject, api/subjects/updateSubject and api/subjects/deleteSubject.
 *
 * @typedef {object} SubjectActionResult
 * @property {'success'|'error'} type
 * @property {string} message
 */

export {};
