const formatApiBase = () => {
  let base = (import.meta.env.VITE_API_BASE_URL || '/api').trim();
  // Strip trailing slashes
  base = base.replace(/\/+$/, '');
  // If base is a full URL but missing /api at the end, append it automatically
  if (base.startsWith('http') && !base.endsWith('/api')) {
    base = `${base}/api`;
  }
  return base;
};

const API_BASE = formatApiBase();

const safeFetchJson = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    let data;
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await res.json();
    } else {
      const text = await res.text();
      try {
        data = JSON.parse(text);
      } catch {
        if (res.status === 500 || res.status === 503 || res.status === 502) {
          data = { message: 'Server error. Please verify backend service and database connection.' };
        } else {
          data = { message: text || `Server error (${res.status})` };
        }
      }
    }

    if (!res.ok) {
      throw new Error(data?.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (err) {
    if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError') || err.message?.includes('Load failed')) {
      throw new Error('Could not connect to backend server. Please check backend deployment status.');
    }
    throw err;
  }
};

export const api = {
  // Authentication
  async adminLogin(username, password) {
    return await safeFetchJson(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  },

  // Dashboard & Stats
  async getDashboardStats() {
    return await safeFetchJson(`${API_BASE}/dashboard/stats`);
  },

  // Birthdays
  async getTodayBirthdays() {
    return await safeFetchJson(`${API_BASE}/birthdays/today`);
  },

  // Webinar / Registrations
  async submitRegistration(formData) {
    return await safeFetchJson(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  },

  async getRegistrations(params = {}) {
    const searchParams = new URLSearchParams();
    if (params.search) searchParams.append('search', params.search);
    if (params.status && params.status !== 'all') searchParams.append('status', params.status);
    if (params.sort) searchParams.append('sort', params.sort);

    const url = `${API_BASE}/registrations${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return await safeFetchJson(url);
  },

  async updateRegistrationStatus(id, status) {
    return await safeFetchJson(`${API_BASE}/registrations/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  },

  async deleteRegistration(id) {
    return await safeFetchJson(`${API_BASE}/registrations/${id}`, {
      method: 'DELETE',
    });
  },

  // Contact Queries
  async submitContact(formData) {
    return await safeFetchJson(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  },

  async getContacts(params = {}) {
    const searchParams = new URLSearchParams();
    if (params.search) searchParams.append('search', params.search);
    if (params.status && params.status !== 'all') searchParams.append('status', params.status);
    if (params.sort) searchParams.append('sort', params.sort);

    const url = `${API_BASE}/contacts${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return await safeFetchJson(url);
  },

  async updateContactStatus(id, status) {
    return await safeFetchJson(`${API_BASE}/contacts/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  },

  async deleteContact(id) {
    return await safeFetchJson(`${API_BASE}/contacts/${id}`, {
      method: 'DELETE',
    });
  },

  // Emailing & Broadcasting
  async sendEmail({ recipients, subject, message }) {
    return await safeFetchJson(`${API_BASE}/email/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipients, subject, message }),
    });
  },

  async getEmailLogs() {
    return await safeFetchJson(`${API_BASE}/email/logs`);
  },
};
