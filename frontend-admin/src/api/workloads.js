/**
 * @import * as WorkloadTypes from './types/workloads.js'
 */

/**
 * @param {string|number} scheduleId
 * @returns {Promise<WorkloadTypes.WorkloadDTO[]>}
 */

async function fetchWorkloads(scheduleId) {
  try {
    const response = await fetch(`/apiv1/workloads/schedule/${scheduleId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

/**
 * @param {WorkloadTypes.CreateWorkloadBody} data
 * @returns {Promise<WorkloadTypes.WorkloadActionResult>}
 */

async function createWorkload(data) {
  try {
    const response = await fetch('/apiv1/workloads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
 * @param {number} workloadId
 * @returns {Promise<WorkloadTypes.WorkloadActionResult>}
 */

async function deleteWorkload(workloadId) {
  try {
    const response = await fetch('/apiv1/workloads', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workloadId),
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
 * @param {number} workloadId
 * @returns {Promise<WorkloadTypes.WorkloadActionResult>}
 */

async function decrementWorkload(workloadId) {
  try {
    const response = await fetch(`/apiv1/workloads/${workloadId}/decrement`, {
      method: 'PATCH',
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

export { fetchWorkloads, createWorkload, deleteWorkload, decrementWorkload };
