/**
 * Boran Motors CRM - KPI Summary Banner Component
 */

export function renderKpiBanner(container, leads) {
  const total = leads.length;
  
  if (total === 0) {
    container.innerHTML = `
      <div class="kpi-grid">
        <div class="kpi-card highlight">
          <div class="kpi-header">
            <span class="kpi-title">Total Leads</span>
          </div>
          <div class="kpi-value">0</div>
          <span class="kpi-subtext">No leads in current view</span>
        </div>
      </div>
    `;
    return;
  }

  const contactedCount = leads.filter(l => l.first_contact_at || l.minutes_to_first_contact !== null).length;
  const contactedRate = ((contactedCount / total) * 100).toFixed(1);

  const touched15mCount = leads.filter(l => l.minutes_to_first_contact !== null && l.minutes_to_first_contact <= 15).length;
  const touched15mRate = ((touched15mCount / total) * 100).toFixed(1);

  // Median minutes to contact
  const validTimes = leads
    .map(l => l.minutes_to_first_contact)
    .filter(t => typeof t === 'number' && t >= 0)
    .sort((a, b) => a - b);
  const medianMinutes = validTimes.length > 0 
    ? validTimes[Math.floor(validTimes.length / 2)] 
    : 0;

  const repliedCount = leads.filter(l => l.first_reply_at !== null).length;
  const replyRate = ((repliedCount / total) * 100).toFixed(1);

  const soldCount = leads.filter(l => l.status === 'sold' || l.sold_at !== null).length;
  const soldRate = ((soldCount / total) * 100).toFixed(1);

  container.innerHTML = `
    <div class="kpi-grid">
      <!-- Total Leads -->
      <div class="kpi-card highlight">
        <div class="kpi-header">
          <span class="kpi-title">Network Leads</span>
          <div class="kpi-icon-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
        </div>
        <div class="kpi-value">${total.toLocaleString()}</div>
        <span class="kpi-subtext">
          <span class="kpi-badge-positive">100%</span> active cohort
        </span>
      </div>

      <!-- Contact Coverage -->
      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-title">Contact Coverage</span>
          <div class="kpi-icon-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        <div class="kpi-value">${contactedRate}%</div>
        <span class="kpi-subtext">${contactedCount} of ${total} actioned</span>
      </div>

      <!-- 15-Min Response Rate -->
      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-title">15m Response Rate</span>
          <div class="kpi-icon-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
        </div>
        <div class="kpi-value">${touched15mRate}%</div>
        <span class="kpi-subtext">${touched15mCount} under 15 mins</span>
      </div>

      <!-- Median Response -->
      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-title">Median Response</span>
          <div class="kpi-icon-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
        </div>
        <div class="kpi-value">${medianMinutes}m</div>
        <span class="kpi-subtext">Speed benchmark</span>
      </div>

      <!-- Customer Reply Rate -->
      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-title">Reply Rate</span>
          <div class="kpi-icon-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
        </div>
        <div class="kpi-value">${replyRate}%</div>
        <span class="kpi-subtext">${repliedCount} two-way replies</span>
      </div>

      <!-- Close Rate -->
      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-title">Sold Conversion</span>
          <div class="kpi-icon-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
        </div>
        <div class="kpi-value">${soldRate}%</div>
        <span class="kpi-subtext">${soldCount} vehicles sold</span>
      </div>
    </div>
  `;
}
