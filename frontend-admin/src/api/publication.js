async function fetchPublicationState() {
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

async function deletePublication() {
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

async function updatePublicationSettings(settings) {
  try {
    const response = await fetch('/apiv1/publication/settings', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
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
  deletePublication,
  fetchPublicationState,
  publishPeriodLessons,
  updatePublicationSettings,
};
