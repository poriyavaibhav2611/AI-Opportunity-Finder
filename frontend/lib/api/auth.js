const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
    credentials: 'include',
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.message || 'Failed to register');
  return data;
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.message || 'Failed to login');
  return data;
}

export async function logoutUser() {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.message || 'Failed to logout');
  return data;
}

export async function getCurrentUser() {
  // If we are using jwt stored in localstorage, we'd pass it.
  // But we are storing token in a HTTP-only cookie. We need to pass credentials if both are on same origin.
  // Wait, if frontend is 3000 and backend is 5000, credentials: 'include' is required to send cookies.
  // Let's make sure ALL fetch calls use credentials: 'include' so that the cookie is sent and received.
  
  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  
  if (response.status === 401) {
    return null; // Not authenticated
  }
  
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.message || 'Failed to get current user');
  return data.user;
}

export async function forgotPassword(email) {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
    credentials: 'omit',
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.message || 'Failed to request password reset');
  return data;
}

export async function resetPassword(resetToken, password) {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resetToken, password }),
    credentials: 'omit',
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.message || 'Failed to reset password');
  return data;
}
