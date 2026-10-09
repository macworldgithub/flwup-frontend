/**
 * Boran Motors CRM - Sidebar Navigation Component
 */

export function renderSidebar(container, state, onNavigate, onToggleCollapse) {
  const isCollapsed = state.sidebarCollapsed;
  const currentTab = state.activeTab;

  container.innerHTML = `
    <aside class="sidebar ${isCollapsed ? 'collapsed' : ''} ${state.mobileSidebarOpen ? 'mobile-open' : ''}" id="app-sidebar">
      <div class="sidebar-header">
        <div class="brand-lockup">
          <div class="brand-logo-badge">BM</div>
          ${!isCollapsed ? `
            <div class="brand-text">
              <span class="brand-title">BORAN MOTORS</span>
              <span class="brand-subtitle">Network CRM</span>
            </div>
          ` : ''}
        </div>
        <button class="sidebar-toggle-btn" id="btn-sidebar-toggle" title="${isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}">
          ${isCollapsed ? '→' : '←'}
        </button>
      </div>

      <div class="sidebar-content">
        <!-- User Profile Card -->
        ${!isCollapsed ? `
          <div class="user-profile-badge">
            <div class="user-avatar">MT</div>
            <div class="user-details">
              <span class="user-name">Megan Taylor</span>
              <span class="user-role-tag">
                <span class="status-dot-live"></span>
                Group Marketing
              </span>
            </div>
          </div>
        ` : ''}

        <!-- Primary Navigation -->
        <div class="nav-section">
          ${!isCollapsed ? `<div class="nav-section-label">Execution Layer</div>` : ''}
          <ul class="nav-list">
            <li>
              <button class="nav-item-btn ${currentTab === 'network' ? 'active' : ''}" data-tab="network" title="Network Leads">
                <svg class="nav-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                ${!isCollapsed ? `<span>Network Leads</span>` : ''}
                ${!isCollapsed ? `<span class="nav-badge">${state.totalCount || 1601}</span>` : ''}
              </button>
            </li>
            <li>
              <button class="nav-item-btn ${currentTab === 'rooftops' ? 'active' : ''}" data-tab="rooftops" title="Dealership Rooftops">
                <svg class="nav-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                ${!isCollapsed ? `<span>Rooftops</span>` : ''}
                ${!isCollapsed ? `<span class="nav-badge">4</span>` : ''}
              </button>
            </li>
            <li>
              <button class="nav-item-btn ${currentTab === 'reports' ? 'active' : ''}" data-tab="reports" title="Network Scoreboards">
                <svg class="nav-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                ${!isCollapsed ? `<span>Scoreboards & Reports</span>` : ''}
                ${!isCollapsed ? `<span class="nav-badge">14</span>` : ''}
              </button>
            </li>
          </ul>
        </div>

        <!-- Dealership Fast Switcher -->
        ${!isCollapsed ? `
          <div class="nav-section">
            <div class="nav-section-label">Dealerships</div>
            <ul class="nav-list">
              <li>
                <button class="nav-item-btn ${state.dealershipFilter === 'BYD South Morang' ? 'active' : ''}" data-dealership="BYD South Morang">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: #0284C7;"></span>
                  <span>BYD South Morang</span>
                </button>
              </li>
              <li>
                <button class="nav-item-btn ${state.dealershipFilter === 'Chery South Morang' ? 'active' : ''}" data-dealership="Chery South Morang">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: #C8102E;"></span>
                  <span>Chery South Morang</span>
                </button>
              </li>
              <li>
                <button class="nav-item-btn ${state.dealershipFilter === 'South Morang Hyundai' ? 'active' : ''}" data-dealership="South Morang Hyundai">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: #0F766E;"></span>
                  <span>South Morang Hyundai</span>
                </button>
              </li>
              <li>
                <button class="nav-item-btn ${state.dealershipFilter === 'South Morang Kia' ? 'active' : ''}" data-dealership="South Morang Kia">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: #991B1B;"></span>
                  <span>South Morang Kia</span>
                </button>
              </li>
            </ul>
          </div>
        ` : ''}
      </div>

      <!-- Footer Sync -->
      <div class="sidebar-footer">
        <div class="sync-status-indicator">
          <div class="sync-pulse"></div>
          ${!isCollapsed ? `<span>Live · 1,601 Leads</span>` : ''}
        </div>
      </div>
    </aside>
  `;

  // Attach event handlers
  container.querySelector('#btn-sidebar-toggle')?.addEventListener('click', onToggleCollapse);

  container.querySelectorAll('.nav-item-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tab = btn.getAttribute('data-tab');
      onNavigate(tab);
    });
  });

  container.querySelectorAll('.nav-item-btn[data-dealership]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const dName = btn.getAttribute('data-dealership');
      onNavigate('network', { dealership: dName });
    });
  });
}
