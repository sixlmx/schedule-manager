/**
 * @import * as TeacherTypes from './types/teachers.js'
 */

/**
 * @returns {Promise<TeacherTypes.TeacherDTO[]|void>}
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
 * @param {TeacherTypes.CreateTeacherBody} data
 * @returns {Promise<TeacherTypes.TeacherActionResult>}
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
 * @param {TeacherTypes.UpdateTeacherBody} data
 * @returns {Promise<TeacherTypes.TeacherActionResult>}
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
 * @returns {Promise<TeacherTypes.TeacherActionResult>}
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
