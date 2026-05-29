async function fetchPublishedSchedules() {
  try {
    const response = await fetch('/apiv1/publication');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
  catch (error) {
    return { type: 'error', message: error.message };
  }
}

async function publishPeriodLessons() {
  try {
    const response = await fetch('/apiv1/publication', {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
  catch (error) {
    return { type: 'error', message: error.message };
  }
}

async function clearPublishedLessons() {
  try {
    const response = await fetch('/apiv1/publication', {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
  catch (error) {
    return { type: 'error', message: error.message };
  }
}

export {
  clearPublishedLessons,
  fetchPublishedSchedules,
  publishPeriodLessons,
};
