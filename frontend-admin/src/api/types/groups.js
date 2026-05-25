/**
 * Response item for api/groups/fetchGroups.
 *
 * @typedef {object} GroupDTO
 * @property {number} id
 * @property {string} name
 * @property {string|null} abbreviation
 * @property {number} yearOfAdmission
 */

/**
 * Request body for api/groups/createGroup.
 *
 * @typedef {object} CreateGroupBody
 * @property {string} name
 * @property {string} abbreviation
 * @property {string} yearOfAdmission
 */

/**
 * Request body for api/groups/updateGroup.
 *
 * @typedef {object} UpdateGroupBody
 * @property {number} id
 * @property {string} name
 * @property {string} abbreviation
 * @property {string} yearOfAdmission
 */

/**
 * Return value for api/groups/createGroup, api/groups/updateGroup and api/groups/deleteGroup.
 *
 * @typedef {object} GroupActionResult
 * @property {'success'|'error'} type
 * @property {string} message
 */

export {};
