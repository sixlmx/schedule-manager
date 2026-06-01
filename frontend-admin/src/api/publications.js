async function fetchPublications() {
  try {
    const response = await fetch('/apiv1/publications');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(1, data);
    return data;
  }
  catch (error) {
    console.error('Fetch error:', error);
  }
}

export { fetchPublications };
