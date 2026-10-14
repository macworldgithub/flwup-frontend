/**
 * Boran Motors CRM - Top Header Component
 * Displays live database connection status, Swagger Docs link, New Lead creation, and Search
 */

export function renderHeader(container, state, onSearch, onExport, onToggleMobileNav, onCreateLeadClick) {
  container.innerHTML = `
    <header class="top-header">
      <div class="header-left">
        <button class="mobile-menu-btn" id="mobile-menu-toggle" aria-label="Open Navigation">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div class="page-title-area">
          <h1 class="page-title">Network Management</h1>
          <span class="page-subtitle">Boran Motors Automotive Group · 4 Rooftops · Pentana DMS Synced</span>
        </div>
      </div>

      <div class="header-center">
        <div class="global-search-wrapper">
          <svg class="search-icon-inside" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            class="global-search-input" 
            id="global-header-search" 
            placeholder="Search leads, customer names, vehicles, reps..." 
            value="${state.searchQuery || ''}"
          />
          <kbd class="search-shortcut-kbd">/</kbd>
        </div>
      </div>

      <div class="header-right">
        <!-- New Lead Action Button (Create in Database) -->
        <button class="btn-primary" id="btn-header-new-lead" title="Create New Lead in Database (CRUD)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>New Lead</span>
        </button>

        <!-- Export CSV Button -->
        <button class="btn-icon-secondary" id="btn-header-export" title="Export Current Records to CSV">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>Export CSV</span>
        </button>
      </div>
    </header>
  `;

  // Attach search input listener
  const searchInput = container.querySelector('#global-header-search');
  searchInput?.addEventListener('input', (e) => {
    onSearch(e.target.value);
  });

  // Attach mobile toggle
  container.querySelector('#mobile-menu-toggle')?.addEventListener('click', onToggleMobileNav);

  // Attach export button
  container.querySelector('#btn-header-export')?.addEventListener('click', onExport);

  // Attach new lead button
  container.querySelector('#btn-header-new-lead')?.addEventListener('click', () => {
    if (onCreateLeadClick) onCreateLeadClick();
  });
}
