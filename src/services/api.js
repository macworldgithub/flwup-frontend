/**
 * Boran Motors CRM - Frontend API Client
 * Connects to Local Backend REST APIs and MongoDB
 */

const API_BASE = '/api';

/**
 * Helper to perform fetch requests with error handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.error || `HTTP error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.error(`API Error [${options.method || 'GET'} ${url}]:`, err);
    throw err;
  }
}

export const api = {
  // System Health
  async getHealth() {
    return request('/health');
  },

  // Organization
  async getOrganization() {
    const res = await request('/organization');
    return res.data;
  },

  // Real-time KPIs
  async getKPIs() {
    const res = await request('/kpis');
    return res.data;
  },

  // Dynamic filter dropdowns
  async getFilterOptions() {
    const res = await request('/filters');
    return res.data;
  },

  // Rooftops / Dealerships
  async getRooftops() {
    const res = await request('/rooftops');
    return res.data || [];
  },

  async createRooftop(data) {
    return request('/rooftops', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // Reports
  async getReports() {
    const res = await request('/reports');
    return res.data || {};
  },

  async getReportPreset(preset) {
    const res = await request(`/reports/${preset}`);
    return res.data;
  },

  async getCatalog() {
    const res = await request('/reports/catalog/all');
    return res.data || {};
  },

  // Leads (Full CRUD)
  async getLeads(params = {}) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        searchParams.append(key, val);
      }
    });

    const queryStr = searchParams.toString();
    const endpoint = `/leads${queryStr ? `?${queryStr}` : ''}`;
    return request(endpoint);
  },

  async getLeadById(id) {
    const res = await request(`/leads/${id}`);
    return res.data;
  },

  async createLead(leadData) {
    const res = await request('/leads', {
      method: 'POST',
      body: JSON.stringify(leadData)
    });
    return res.data;
  },

  async updateLead(id, leadData) {
    const res = await request(`/leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(leadData)
    });
    return res.data;
  },

  async deleteLead(id) {
    return request(`/leads/${id}`, {
      method: 'DELETE'
    });
  },

  async toggleLeadAI(id, ai_status, user) {
    const res = await request(`/leads/${id}/ai-status`, {
      method: 'PATCH',
      body: JSON.stringify({ ai_status, user })
    });
    return res.data;
  },

  async addLeadDiaryEntry(id, note, user) {
    const res = await request(`/leads/${id}/diary`, {
      method: 'POST',
      body: JSON.stringify({ note, user })
    });
    return res.data;
  },

  async updateLeadQueuedMessage(id, msgId, content, is_cancelled = false) {
    const res = await request(`/leads/${id}/queued-messages/${msgId}`, {
      method: 'PUT',
      body: JSON.stringify({ content, is_cancelled })
    });
    return res.data;
  }
};

export default api;
