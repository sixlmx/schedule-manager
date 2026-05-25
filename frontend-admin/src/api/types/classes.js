/**
 * Response item for api/classes/fetchClasses.
 *
 * @typedef {object} ClassDTO
 * @property {number} id
 * @property {string} name
 * @property {string|null} abbreviation
 * @property {number|null} capacity
 * @property {string|null} building
 */

/**
 * Request body for api/classes/createClass.
 *
 * @typedef {object} CreateClassBody
 * @property {string} name
 * @property {string} abbreviation
 * @property {number|null} capacity
 * @property {string} building
 */

/**
 * Request body for api/classes/updateClass.
 *
 * @typedef {object} UpdateClassBody
 * @property {number} id
 * @property {string} name
 * @property {string} abbreviation
 * @property {number|null} capacity
 * @property {string} building
 */

/**
 * Return value for api/classes/createClass, api/classes/updateClass and api/classes/deleteClass.
 *
 * @typedef {object} ClassActionResult
 * @property {'success'|'error'} type
 * @property {string} [message]
 */

export {};
