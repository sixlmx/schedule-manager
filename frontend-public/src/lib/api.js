import { getMondayDate } from './helpers/dateHelpers';
import { parseUrl } from './helpers/urlHelpers';

export async function fetchTeachers() {
  try {
    const response = await fetch('/apiv1/teachers');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    throw new Error('cannot connect to server', { cause: error });
  }
}

export async function fetchGroups() {
  try {
    const response = await fetch('/apiv1/groups');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    throw new Error('cannot connect to server', { cause: error });
  }
}

export async function fetchLessons(category) {
  const { id, publicId } = parseUrl(window.location.href);
  const date = getMondayDate();
  const searchParams = new URLSearchParams({ id, date });

  if (publicId) {
    searchParams.set('publicId', publicId);
  }

  try {
    const response = await fetch(`/apiv1/${category}/lessons?${searchParams.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    throw new Error('cannot connect to server', { cause: error });
  }
}
