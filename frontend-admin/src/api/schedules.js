/**
 * @import * as ScheduleTypes from './types/schedules.js'
 */

/**
 * @returns {Promise<ScheduleTypes.ScheduleDTO[]|void>}
 */

async function fetchSchedules() {
  try {
    const response = await fetch('/apiv1/schedules');
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
 * @param {ScheduleTypes.CreateScheduleBody} data
 * @returns {Promise<ScheduleTypes.ScheduleActionResult>}
 */

async function createSchedule(data) {
  try {
    const response = await fetch('/apiv1/schedules', {
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
 * @param {ScheduleTypes.UpdateScheduleBody} data
 * @returns {Promise<ScheduleTypes.ScheduleActionResult>}
 */

async function updateSchedule(data) {
  try {
    const response = await fetch('/apiv1/schedules', {
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
 * @param {number} scheduleId
 * @returns {Promise<ScheduleTypes.ScheduleActionResult>}
 */

async function deleteSchedule(scheduleId) {
  try {
    const response = await fetch('/apiv1/schedules', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scheduleId),
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

export { fetchSchedules, createSchedule, updateSchedule, deleteSchedule };
