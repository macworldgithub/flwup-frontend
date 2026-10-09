/**
 * Boran Motors CRM - Lead Data Table Component with Sorting & Pagination
 */

export function renderLeadTable(container, {
  leads,
  totalFilteredCount,
  currentPage,
  pageSize,
  sortField,
  sortDirection,
  selectedLeadIds,
  onSort,
  onPageChange,
  onPageSizeChange,
  onSelectLead,
  onSelectAll,
  onInspectLead,
  onExportSelected
}) {
  if (totalFilteredCount === 0) {
    container.innerHTML = `
      <div class="table-card">
        <div class="empty-state-box">
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3 class="empty-state-title">No matching leads found</h3>
          <p class="empty-state-desc">Try clearing search terms or adjusting the rooftop and status filters.</p>
        </div>
      </div>
    `;
    return;
  }

  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, totalFilteredCount);
  const totalPages = Math.ceil(totalFilteredCount / pageSize);

  const isAllSelected = leads.length > 0 && leads.every(l => selectedLeadIds.has(l.deal_id));
  const hasSelected = selectedLeadIds.size > 0;

  // Helper for dealership badge class
  const getDealershipClass = (name = '') => {
    const lower = name.toLowerCase();
    if (lower.includes('byd')) return 'byd';
    if (lower.includes('chery')) return 'chery';
    if (lower.includes('hyundai')) return 'hyundai';
    if (lower.includes('kia')) return 'kia';
    return 'byd';
  };

  // Helper for speed badge
  const getSpeedBadge = (mins, hadOpportunity) => {
    if (mins === null || mins === undefined) {
      return `<span class="speed-badge untouched">○ Untouched</span>`;
    }
    if (mins <= 15) {
      return `<span class="speed-badge fast">⚡ ${mins}m</span>`;
    }
    if (mins <= 60) {
      return `<span class="speed-badge moderate">⏱ ${mins}m</span>`;
    }
    const hours = Math.round(mins / 60);
    return `<span class="speed-badge slow">⌛ ${hours > 24 ? Math.round(hours / 24) + 'd' : hours + 'h'}</span>`;
  };

  // Helper for relative date
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-AU', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateStr.slice(0, 10);
    }
  };

  // Helper for sort arrow
  const getSortIcon = (field) => {
    if (sortField !== field) return `<span class="sort-icon">↕</span>`;
    return `<span class="sort-icon">${sortDirection === 'asc' ? '↑' : '↓'}</span>`;
  };

  container.innerHTML = `
    <div class="table-card">
      <!-- Batch Action Bar when rows selected -->
      ${hasSelected ? `
        <div class="batch-actions-bar">
          <span class="batch-selection-count">${selectedLeadIds.size} lead${selectedLeadIds.size > 1 ? 's' : ''} selected</span>
          <div class="batch-actions-group">
            <button class="btn-batch-action" id="btn-batch-export">Export Selected CSV</button>
            <button class="btn-batch-action" id="btn-batch-clear">Deselect All</button>
          </div>
        </div>
      ` : ''}

      <div class="table-responsive-wrapper">
        <table class="crm-table">
          <thead>
            <tr>
              <th style="width: 36px; text-align: center;">
                <input type="checkbox" id="select-all-leads" ${isAllSelected ? 'checked' : ''} />
              </th>
              <th class="sortable ${sortField === 'store_code' ? 'sorted' : ''}" data-sort="store_code">
                Store ${getSortIcon('store_code')}
              </th>
              <th class="sortable ${sortField === 'ai_status' ? 'sorted' : ''}" data-sort="ai_status">
                AI Cadence ${getSortIcon('ai_status')}
              </th>
              <th class="sortable ${sortField === 'customer_name' ? 'sorted' : ''}" data-sort="customer_name">
                Customer ${getSortIcon('customer_name')}
              </th>
              <th class="sortable ${sortField === 'dealership_name' ? 'sorted' : ''}" data-sort="dealership_name">
                Dealership Rooftop ${getSortIcon('dealership_name')}
              </th>
              <th class="sortable ${sortField === 'vehicle_make' ? 'sorted' : ''}" data-sort="vehicle_make">
                Vehicle ${getSortIcon('vehicle_make')}
              </th>
              <th class="sortable ${sortField === 'owner_name' ? 'sorted' : ''}" data-sort="owner_name">
                Assigned Rep ${getSortIcon('owner_name')}
              </th>
              <th class="sortable ${sortField === 'minutes_to_first_contact' ? 'sorted' : ''}" data-sort="minutes_to_first_contact">
                Speed to Lead ${getSortIcon('minutes_to_first_contact')}
              </th>
              <th class="sortable ${sortField === 'status' ? 'sorted' : ''}" data-sort="status">
                Status ${getSortIcon('status')}
              </th>
              <th class="sortable ${sortField === 'created_at' ? 'sorted' : ''}" data-sort="created_at">
                Created ${getSortIcon('created_at')}
              </th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${leads.map(lead => {
              const isSelected = selectedLeadIds.has(lead.deal_id);
              const isAIOff = lead.ai_status === 'off';
              const repInitials = (lead.owner_name || 'U')
                .split(' ')
                .map(n => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              return `
                <tr class="lead-row ${isSelected ? 'selected' : ''}" data-deal-id="${lead.deal_id}">
                  <td style="text-align: center;" onclick="event.stopPropagation()">
                    <input type="checkbox" class="lead-row-checkbox" data-deal-id="${lead.deal_id}" ${isSelected ? 'checked' : ''} />
                  </td>
                  <td>
                    <span class="store-badge ${lead.store_code === 'Store 70' ? 'store-70' : 'store-40'}">
                      ${lead.store_code || 'Store 70'}
                    </span>
                  </td>
                  <td>
                    <span class="ai-table-pill ${isAIOff ? 'off' : 'active'}">
                      ${isAIOff ? '● AI OFF' : '⚡ AI ACTIVE'}
                    </span>
                  </td>
                  <td>
                    <div class="customer-cell">
                      <span class="customer-name">${lead.customer_name || 'Anonymous'}</span>
                      <span class="deal-id-subtext">ID: ${(lead.deal_id || '').slice(0, 8)}...</span>
                    </div>
                  </td>
                  <td>
                    <span class="dealership-badge ${getDealershipClass(lead.dealership_name)}">
                      ${lead.dealership_name}
                    </span>
                  </td>
                  <td>
                    <div class="vehicle-cell">
                      <span class="vehicle-make-model">${lead.vehicle_make} ${lead.vehicle_model}</span>
                      <span class="vehicle-dealer-code">${lead.dealer_code || 'BOORAN'}</span>
                    </div>
                  </td>
                  <td>
                    <div class="rep-cell">
                      <div class="rep-avatar">${repInitials}</div>
                      <span class="rep-name">${lead.owner_name || 'Unassigned'}</span>
                    </div>
                  </td>
                  <td>
                    ${getSpeedBadge(lead.minutes_to_first_contact, lead.had_contact_opportunity)}
                  </td>
                  <td>
                    <span class="status-pill ${lead.status || 'following_up'}">
                      ${(lead.status || 'following_up').replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td>
                    <span style="font-size: 12px; color: var(--bm-secondary-text);" title="${lead.created_at}">
                      ${formatDate(lead.created_at)}
                    </span>
                  </td>
                  <td style="text-align: right;" onclick="event.stopPropagation()">
                    <button class="btn-view-lead" data-deal-id="${lead.deal_id}" title="Inspect Lead Details">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div class="table-pagination-footer">
        <div class="pagination-info">
          Showing <strong>${startIdx + 1}</strong> to <strong>${endIdx}</strong> of <strong>${totalFilteredCount.toLocaleString()}</strong> records
        </div>

        <div class="pagination-controls">
          <div class="page-size-selector-wrap">
            <span>Per page:</span>
            <select class="page-size-select" id="page-size-select">
              <option value="10" ${pageSize === 10 ? 'selected' : ''}>10</option>
              <option value="25" ${pageSize === 25 ? 'selected' : ''}>25</option>
              <option value="50" ${pageSize === 50 ? 'selected' : ''}>50</option>
              <option value="100" ${pageSize === 100 ? 'selected' : ''}>100</option>
            </select>
          </div>

          <div class="pagination-btn-group">
            <button class="page-btn" id="btn-page-first" ${currentPage === 1 ? 'disabled' : ''} title="First Page">&laquo;</button>
            <button class="page-btn" id="btn-page-prev" ${currentPage === 1 ? 'disabled' : ''} title="Previous Page">&lsaquo;</button>
            
            ${renderPageButtons(currentPage, totalPages)}

            <button class="page-btn" id="btn-page-next" ${currentPage === totalPages ? 'disabled' : ''} title="Next Page">&rsaquo;</button>
            <button class="page-btn" id="btn-page-last" ${currentPage === totalPages ? 'disabled' : ''} title="Last Page">&raquo;</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Helper for generating page numbers with ellipsis
  function renderPageButtons(current, total) {
    if (total <= 1) return `<button class="page-btn active">1</button>`;
    
    const pages = [];
    const maxButtons = 5;
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + maxButtons - 1);
    
    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let p = start; p <= end; p++) {
      pages.push(`
        <button class="page-btn ${p === current ? 'active' : ''}" data-page="${p}">
          ${p}
        </button>
      `);
    }
    return pages.join('');
  }

  // Attach Event Handlers
  container.querySelectorAll('th.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const field = th.getAttribute('data-sort');
      onSort(field);
    });
  });

  container.querySelector('#select-all-leads')?.addEventListener('change', (e) => {
    onSelectAll(e.target.checked);
  });

  container.querySelectorAll('.lead-row-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const id = cb.getAttribute('data-deal-id');
      onSelectLead(id, cb.checked);
    });
  });

  container.querySelectorAll('.lead-row').forEach(row => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-deal-id');
      onInspectLead(id);
    });
  });

  container.querySelectorAll('.btn-view-lead').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-deal-id');
      onInspectLead(id);
    });
  });

  container.querySelector('#page-size-select')?.addEventListener('change', (e) => {
    onPageSizeChange(parseInt(e.target.value, 10));
  });

  container.querySelector('#btn-page-first')?.addEventListener('click', () => onPageChange(1));
  container.querySelector('#btn-page-prev')?.addEventListener('click', () => onPageChange(currentPage - 1));
  container.querySelector('#btn-page-next')?.addEventListener('click', () => onPageChange(currentPage + 1));
  container.querySelector('#btn-page-last')?.addEventListener('click', () => onPageChange(totalPages));

  container.querySelectorAll('.page-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = parseInt(btn.getAttribute('data-page'), 10);
      onPageChange(p);
    });
  });

  container.querySelector('#btn-batch-export')?.addEventListener('click', onExportSelected);
  container.querySelector('#btn-batch-clear')?.addEventListener('click', () => onSelectAll(false));
}
