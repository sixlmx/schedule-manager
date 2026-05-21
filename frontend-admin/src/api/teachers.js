/**
 * @typedef {object} TeacherDTO
 * @property {number} id
 * @property {string|null} name
 * @property {string|null} fio
 * @property {string|null} position
 * @property {string|null} color
 */

/**
 * @typedef {object} CreateTeacherBody
 * @property {string} fio
 * @property {string} abbr
 * @property {string|null} position
 */

/**
 * @typedef {object} UpdateTeacherBody
 * @property {number} id
 * @property {string} fio
 * @property {string} abbr
 * @property {string|null} position
 */

/**
 * @typedef {object} TeacherActionResult
 * @property {'success'|'error'} type
 * @property {string} message
 */

/**
 * @returns {Promise<TeacherDTO[]|void>}
 */

async function fetchTeachers() {
  try {
    const response = await fetch('/apiv1/teachers');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('Fetch error:', error);
  }
}

/**
 * @param {CreateTeacherBody} data
 * @returns {Promise<TeacherActionResult>}
 */

async function createTeacher(data) {
  try {
    const response = await fetch('/apiv1/teachers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const message = await response.json();
    return { type: 'success', ...message };
  }
  catch (error) {
    return { type: 'error', message: error.message };
  }
}

/**
 * @param {UpdateTeacherBody} data
 * @returns {Promise<TeacherActionResult>}
 */

async function updateTeacher(data) {
  try {
    const response = await fetch('/apiv1/teachers', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const message = await response.json();
    return { type: 'success', ...message };
  }
  catch (error) {
    return { type: 'error', message: error.message };
  }
}

/**
 * @param {number} teacherId
 * @returns {Promise<TeacherActionResult>}
 */

async function deleteTeacher(teacherId) {
  try {
    const response = await fetch('/apiv1/teachers', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teacherId),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const message = await response.json();
    return { type: 'success', ...message };
  }
  catch (error) {
    return { type: 'error', message: error.message };
  }
}

export { fetchTeachers, createTeacher, updateTeacher, deleteTeacher };
