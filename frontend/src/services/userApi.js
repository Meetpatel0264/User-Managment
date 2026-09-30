const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });
  } catch {
    throw new Error(
      "Unable to connect to the server. Please make sure the backend is running."
    );
  }

  let body = null;

  try {
    body = await response.json();
  } catch {
    // Keep body null when server returns no JSON.
  }

  if (!response.ok) {
    const message =
      body?.message ||
      body?.errors?.join(", ") ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return body;
}

export const getUsers = () => request("/users");

export const getUserById = (id) => request(`/users/${id}`);

export const createUser = (data) =>
  request("/users", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const updateUser = (id, data) =>
  request(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

export const deleteUser = (id) =>
  request(`/users/${id}`, {
    method: "DELETE"
  });