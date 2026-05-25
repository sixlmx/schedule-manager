/**
 * @import * as SubjectTypes from './types/subjects.js'
 */

/**
 * @returns {Promise<SubjectTypes.SubjectDTO[]|void>}
 */

async function fetchSubjects() {
  try {
    const response = await fetch('/apiv1/subjects');
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
 * @param {SubjectTypes.CreateSubjectBody} data
 * @returns {Promise<SubjectTypes.SubjectActionResult>}
 */

async function createSubject(data) {
  try {
    const response = await fetch('/apiv1/subjects', {
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
 * @param {SubjectTypes.UpdateSubjectBody} data
 * @returns {Promise<SubjectTypes.SubjectActionResult>}
 */

async function updateSubject(data) {
  try {
    const response = await fetch('/apiv1/subjects', {
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
 * @param {number} subjectId
 * @returns {Promise<SubjectTypes.SubjectActionResult>}
 */

async function deleteSubject(subjectId) {
  try {
    const response = await fetch('/apiv1/subjects', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subjectId),
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

export { fetchSubjects, createSubject, updateSubject, deleteSubject };
