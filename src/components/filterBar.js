/**
 * Boran Motors CRM - Filter Toolbar Component
 */

export function renderFilterBar(container, state, filterOptions, onFilterChange, onReset) {
  const dealerships = filterOptions.dealerships || [];
  const statuses = filterOptions.statuses || [];
  const owners = filterOptions.owners || [];
  const makes = filterOptions.makes || [];

  const hasActiveFilters = 
    state.searchQuery || 
    state.dealershipFilter !== 'all' || 
    state.statusFilter !== 'all' || 
    state.ownerFilter !== 'all' || 
    state.makeFilter !== 'all' ||
    state.speedFilter !== 'all' ||
    (state.storeFilter && state.storeFilter !== 'all') ||
    (state.aiFilter && state.aiFilter !== 'all');

  container.innerHTML = `
    <div class="filter-toolbar-card">
      <div class="filter-row-primary">
        <!-- Search Input -->
        <div class="filter-search-box">
          <input 
            type="text" 
            class="filter-search-input" 
            id="filter-search-input" 
            placeholder="Search customer, Pentana ID, vehicle, rep..." 
            value="${state.searchQuery || ''}"
          />
        </div>

        <!-- Store Selector (Store 70 / Store 40) -->
        <select class="filter-select" id="filter-store-select">
          <option value="all" ${state.storeFilter === 'all' ? 'selected' : ''}>All Stores</option>
          <option value="Store 70" ${state.storeFilter === 'Store 70' ? 'selected' : ''}>Store 70 (Main)</option>
          <option value="Store 40" ${state.storeFilter === 'Store 40' ? 'selected' : ''}>Store 40 (Secondary)</option>
        </select>

        <!-- AI Follow-up Status -->
        <select class="filter-select" id="filter-ai-select">
          <option value="all" ${state.aiFilter === 'all' ? 'selected' : ''}>All AI Statuses</option>
          <option value="active" ${state.aiFilter === 'active' ? 'selected' : ''}>⚡ AI Active (SMS on)</option>
          <option value="off" ${state.aiFilter === 'off' ? 'selected' : ''}>● AI Off (Sales Rep in touch)</option>
        </select>

        <!-- Dealership Selector -->
        <select class="filter-select" id="filter-dealership-select">
          <option value="all" ${state.dealershipFilter === 'all' ? 'selected' : ''}>All Dealerships (${dealerships.length})</option>
          ${dealerships.map(d => `<option value="${d}" ${state.dealershipFilter === d ? 'selected' : ''}>${d}</option>`).join('')}
        </select>

        <!-- Status Selector -->
        <select class="filter-select" id="filter-status-select">
          <option value="all" ${state.statusFilter === 'all' ? 'selected' : ''}>All Statuses</option>
          <option value="new_lead" ${state.statusFilter === 'new_lead' ? 'selected' : ''}>New Lead</option>
          <option value="following_up" ${state.statusFilter === 'following_up' ? 'selected' : ''}>Following Up</option>
          <option value="sold" ${state.statusFilter === 'sold' ? 'selected' : ''}>Sold</option>
          <option value="lost" ${state.statusFilter === 'lost' ? 'selected' : ''}>Lost</option>
        </select>

        <!-- Sales Rep Selector -->
        <select class="filter-select" id="filter-owner-select">
          <option value="all" ${state.ownerFilter === 'all' ? 'selected' : ''}>All Sales Reps (${owners.length})</option>
          ${owners.map(o => `<option value="${o}" ${state.ownerFilter === o ? 'selected' : ''}>${o}</option>`).join('')}
        </select>

        <!-- Vehicle Make Selector -->
        <select class="filter-select" id="filter-make-select">
          <option value="all" ${state.makeFilter === 'all' ? 'selected' : ''}>All Makes</option>
          ${makes.map(m => `<option value="${m}" ${state.makeFilter === m ? 'selected' : ''}>${m}</option>`).join('')}
        </select>

        <!-- Speed to Contact SLA -->
        <select class="filter-select" id="filter-speed-select">
          <option value="all" ${state.speedFilter === 'all' ? 'selected' : ''}>All Response Speeds</option>
          <option value="fast" ${state.speedFilter === 'fast' ? 'selected' : ''}>⚡ Fast (&le; 15 mins)</option>
          <option value="moderate" ${state.speedFilter === 'moderate' ? 'selected' : ''}>⏱ Moderate (16–60 mins)</option>
          <option value="slow" ${state.speedFilter === 'slow' ? 'selected' : ''}>⌛ Slow (&gt; 60 mins)</option>
          <option value="untouched" ${state.speedFilter === 'untouched' ? 'selected' : ''}>○ Untouched</option>
        </select>

        <!-- Reset Button -->
        ${hasActiveFilters ? `
          <button class="btn-filter-reset" id="btn-reset-filters" title="Clear all active filters">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span>Reset</span>
          </button>
        ` : ''}
      </div>

      <!-- Quick Rooftop Filter Chips -->
      <div class="filter-pills-row">
        <span class="filter-pill-label">Rooftop Quick Filter:</span>
        <button class="dealership-chip-btn ${state.dealershipFilter === 'all' ? 'active' : ''}" data-d="all">
          All Rooftops
        </button>
        ${dealerships.map(d => `
          <button class="dealership-chip-btn ${state.dealershipFilter === d ? 'active' : ''}" data-d="${d}">
            ${d}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Attach event listeners
  const searchInp = container.querySelector('#filter-search-input');
  searchInp?.addEventListener('input', (e) => {
    onFilterChange({ searchQuery: e.target.value });
  });

  container.querySelector('#filter-store-select')?.addEventListener('change', (e) => {
    onFilterChange({ storeFilter: e.target.value });
  });

  container.querySelector('#filter-ai-select')?.addEventListener('change', (e) => {
    onFilterChange({ aiFilter: e.target.value });
  });

  container.querySelector('#filter-dealership-select')?.addEventListener('change', (e) => {
    onFilterChange({ dealershipFilter: e.target.value });
  });

  container.querySelector('#filter-status-select')?.addEventListener('change', (e) => {
    onFilterChange({ statusFilter: e.target.value });
  });

  container.querySelector('#filter-owner-select')?.addEventListener('change', (e) => {
    onFilterChange({ ownerFilter: e.target.value });
  });

  container.querySelector('#filter-make-select')?.addEventListener('change', (e) => {
    onFilterChange({ makeFilter: e.target.value });
  });

  container.querySelector('#filter-speed-select')?.addEventListener('change', (e) => {
    onFilterChange({ speedFilter: e.target.value });
  });

  container.querySelector('#btn-reset-filters')?.addEventListener('click', onReset);

  container.querySelectorAll('.dealership-chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const d = btn.getAttribute('data-d');
      onFilterChange({ dealershipFilter: d });
    });
  });
}
