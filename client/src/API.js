const API_URL = 'http://localhost:4111';

export async function listLogEntries() {
  try {
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
  } catch (err) {
    console.error(err);
  }
};
