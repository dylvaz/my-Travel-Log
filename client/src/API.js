const API_URL = 'http://localhost:4111';

export async function listLogEntries() {
  try {
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export async function createLogEntry(entry) {
  try {
    const response = await fetch(`${API_URL}/api/logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    return response.json();
  } catch (err) {
    console.error(err);
  }
}
