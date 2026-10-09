/**
 * Boran Motors CRM - Main Application Controller
 * Inspired by FLWUP & Harmony CRM Sales Floor
 * System of Record: Pentana DMS
 */

import { crmData, leads as allLeads, rooftops, reports, catalog, filterOptions, orgInfo } from './data/store.js';
import { renderSidebar } from './components/sidebar.js';
import { renderHeader } from './components/header.js';
import { renderKpiBanner } from './components/kpiBanner.js';
import { renderFilterBar } from './components/filterBar.js';
import { renderLeadTable } from './components/leadTable.js';
import { renderLeadDrawer } from './components/leadDrawer.js';
import { renderRooftopsView } from './components/rooftopsView.js';
import { renderReportsView } from './components/reportsView.js';
import { exportLeadsToCSV } from './components/exportUtil.js';

class BoranMotorsApp {
  constructor() {
    this.state = {
      activeTab: 'network', // 'network' | 'rooftops' | 'reports'
      sidebarCollapsed: false,
      mobileSidebarOpen: false,
      
      // Filters
      searchQuery: '',
      storeFilter: 'all',
      aiFilter: 'all',
      dealershipFilter: 'all',
      statusFilter: 'all',
      ownerFilter: 'all',
      makeFilter: 'all',
      speedFilter: 'all',
      followUpFilter: 'all',

      // Sorting
      sortField: 'created_at',
      sortDirection: 'desc',

      // Pagination
      currentPage: 1,
      pageSize: 25,

      // Selections & Inspector
      selectedLeadIds: new Set(),
      inspectedLeadId: null,

      // Reports Tab
      activeReportPreset: 'network_scoreboard',

      totalCount: allLeads.length
    };

    this.rootEl = document.getElementById('app');
    this.init();
  }

  init() {
    this.renderLayout();
    this.setupGlobalShortcuts();
    this.update();
  }

  setupGlobalShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Focus search on '/'
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.getElementById('global-header-search') || document.getElementById('filter-search-input');
        searchInput?.focus();
      }

      // Close drawer on Escape
      if (e.key === 'Escape') {
        if (this.state.inspectedLeadId) {
          this.state.inspectedLeadId = null;
          this.updateDrawer();
        }
        if (this.state.mobileSidebarOpen) {
          this.state.mobileSidebarOpen = false;
          this.updateSidebar();
        }
      }
    });
  }

  renderLayout() {
    this.rootEl.innerHTML = `
      <div id="sidebar-mount"></div>
      <div class="mobile-sidebar-overlay" id="mobile-sidebar-overlay"></div>
      <main class="main-content">
        <div id="header-mount"></div>
        <div class="page-container" id="page-content-mount">
          <!-- Module Navigation Tabs -->
          <nav class="module-tabs-nav">
            <button class="module-tab-btn ${this.state.activeTab === 'network' ? 'active' : ''}" data-tab="network">
              <span>Network Leads</span>
              <span class="module-tab-pill" id="leads-count-pill">${allLeads.length}</span>
            </button>
            <button class="module-tab-btn ${this.state.activeTab === 'rooftops' ? 'active' : ''}" data-tab="rooftops">
              <span>Dealership Rooftops</span>
              <span class="module-tab-pill">${rooftops.length}</span>
            </button>
            <button class="module-tab-btn ${this.state.activeTab === 'reports' ? 'active' : ''}" data-tab="reports">
              <span>Scoreboards & Reports</span>
              <span class="module-tab-pill">14</span>
            </button>
          </nav>

          <!-- KPI Summary -->
          <div id="kpi-banner-mount"></div>

          <!-- Dynamic Tab Content -->
          <div id="tab-content-mount"></div>
        </div>
      </main>

      <!-- Slide-over Drawer Mount -->
      <div id="drawer-mount"></div>
    `;

    // Tab switcher events
    this.rootEl.querySelectorAll('.module-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.navigateTab(tab);
      });
    });

    // Mobile overlay close
    document.getElementById('mobile-sidebar-overlay')?.addEventListener('click', () => {
      this.state.mobileSidebarOpen = false;
      document.getElementById('mobile-sidebar-overlay')?.classList.remove('visible');
      this.updateSidebar();
    });
  }

  navigateTab(tab, options = {}) {
    this.state.activeTab = tab;
    if (options.dealership) {
      this.state.dealershipFilter = options.dealership;
    }
    if (options.resetPage !== false) {
      this.state.currentPage = 1;
    }

    // Update tab bar active styles
    this.rootEl.querySelectorAll('.module-tab-btn').forEach(b => {
      if (b.getAttribute('data-tab') === tab) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    this.update();
  }

  getFilteredAndSortedLeads() {
    let result = allLeads;

    // 1. Text Search
    if (this.state.searchQuery.trim()) {
      const q = this.state.searchQuery.toLowerCase().trim();
      result = result.filter(l => {
        return (
          (l.customer_name && l.customer_name.toLowerCase().includes(q)) ||
          (l.deal_id && l.deal_id.toLowerCase().includes(q)) ||
          (l.pentana_id && l.pentana_id.toLowerCase().includes(q)) ||
          (l.store_code && l.store_code.toLowerCase().includes(q)) ||
          (l.vehicle_make && l.vehicle_make.toLowerCase().includes(q)) ||
          (l.vehicle_model && l.vehicle_model.toLowerCase().includes(q)) ||
          (l.owner_name && l.owner_name.toLowerCase().includes(q)) ||
          (l.dealership_name && l.dealership_name.toLowerCase().includes(q)) ||
          (l.dealer_code && l.dealer_code.toLowerCase().includes(q)) ||
          (l.source && l.source.toLowerCase().includes(q))
        );
      });
    }

    // 2. Store Code Filter (Store 70 vs Store 40)
    if (this.state.storeFilter && this.state.storeFilter !== 'all') {
      result = result.filter(l => l.store_code === this.state.storeFilter);
    }

    // 3. AI Status Filter (Active vs Off)
    if (this.state.aiFilter && this.state.aiFilter !== 'all') {
      result = result.filter(l => l.ai_status === this.state.aiFilter);
    }

    // 4. Dealership Filter
    if (this.state.dealershipFilter !== 'all') {
      result = result.filter(l => l.dealership_name === this.state.dealershipFilter);
    }

    // 5. Status Filter
    if (this.state.statusFilter !== 'all') {
      result = result.filter(l => l.status === this.state.statusFilter);
    }

    // 6. Sales Rep / Owner Filter
    if (this.state.ownerFilter !== 'all') {
      result = result.filter(l => l.owner_name === this.state.ownerFilter);
    }

    // 7. Vehicle Make Filter
    if (this.state.makeFilter !== 'all') {
      result = result.filter(l => l.vehicle_make === this.state.makeFilter);
    }

    // 8. Speed to Contact SLA Filter
    if (this.state.speedFilter !== 'all') {
      if (this.state.speedFilter === 'fast') {
        result = result.filter(l => l.minutes_to_first_contact !== null && l.minutes_to_first_contact <= 15);
      } else if (this.state.speedFilter === 'moderate') {
        result = result.filter(l => l.minutes_to_first_contact !== null && l.minutes_to_first_contact > 15 && l.minutes_to_first_contact <= 60);
      } else if (this.state.speedFilter === 'slow') {
        result = result.filter(l => l.minutes_to_first_contact !== null && l.minutes_to_first_contact > 60);
      } else if (this.state.speedFilter === 'untouched') {
        result = result.filter(l => l.minutes_to_first_contact === null || !l.first_contact_at);
      }
    }

    // Sorting
    const field = this.state.sortField;
    const dir = this.state.sortDirection === 'asc' ? 1 : -1;

    result = [...result].sort((a, b) => {
      let valA = a[field];
      let valB = b[field];

      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      if (typeof valA === 'number' && typeof valB === 'number') {
        return (valA - valB) * dir;
      }

      return String(valA).localeCompare(String(valB)) * dir;
    });

    return result;
  }

  handleSort(field) {
    if (this.state.sortField === field) {
      this.state.sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.state.sortField = field;
      this.state.sortDirection = 'desc';
    }
    this.update();
  }

  handleFilterChange(newFilters) {
    Object.assign(this.state, newFilters);
    this.state.currentPage = 1;
    this.update();
  }

  handleResetFilters() {
    this.state.searchQuery = '';
    this.state.storeFilter = 'all';
    this.state.aiFilter = 'all';
    this.state.dealershipFilter = 'all';
    this.state.statusFilter = 'all';
    this.state.ownerFilter = 'all';
    this.state.makeFilter = 'all';
    this.state.speedFilter = 'all';
    this.state.followUpFilter = 'all';
    this.state.currentPage = 1;
    this.update();
  }

  updateSidebar() {
    const sidebarMount = document.getElementById('sidebar-mount');
    if (!sidebarMount) return;
    renderSidebar(
      sidebarMount, 
      this.state, 
      (tab, opts) => this.navigateTab(tab, opts),
      () => {
        this.state.sidebarCollapsed = !this.state.sidebarCollapsed;
        this.updateSidebar();
      }
    );

    const overlay = document.getElementById('mobile-sidebar-overlay');
    if (overlay) {
      if (this.state.mobileSidebarOpen) {
        overlay.classList.add('visible');
      } else {
        overlay.classList.remove('visible');
      }
    }
  }

  updateHeader() {
    const headerMount = document.getElementById('header-mount');
    if (!headerMount) return;
    renderHeader(
      headerMount,
      this.state,
      (q) => {
        this.state.searchQuery = q;
        this.state.currentPage = 1;
        this.updateTabContent();
        this.updateKpis();
      },
      () => {
        const filtered = this.getFilteredAndSortedLeads();
        exportLeadsToCSV(filtered, `boran_motors_leads_${new Date().toISOString().slice(0,10)}.csv`);
      },
      () => {
        this.state.mobileSidebarOpen = !this.state.mobileSidebarOpen;
        this.updateSidebar();
      }
    );
  }

  updateKpis() {
    const kpiMount = document.getElementById('kpi-banner-mount');
    if (!kpiMount) return;
    const filtered = this.getFilteredAndSortedLeads();
    renderKpiBanner(kpiMount, filtered);
  }

  updateDrawer() {
    const drawerMount = document.getElementById('drawer-mount');
    if (!drawerMount) return;
    const inspectedLead = allLeads.find(l => l.deal_id === this.state.inspectedLeadId);
    
    renderLeadDrawer(drawerMount, inspectedLead, {
      onClose: () => {
        this.state.inspectedLeadId = null;
        this.updateDrawer();
      },
      onToggleAI: (dealId, newStatus) => {
        const target = allLeads.find(l => l.deal_id === dealId);
        if (target) {
          target.ai_status = newStatus;
          // Also log to diary
          target.diary_entries = target.diary_entries || [];
          target.diary_entries.unshift({
            date: new Date().toISOString(),
            user: orgInfo.current_user?.name || 'Sales Staff',
            note: newStatus === 'off' 
              ? 'AI Auto Follow-Up turned OFF by sales staff (direct contact in progress).' 
              : 'AI Auto Follow-Up turned ON by sales staff (cadence resumed).'
          });
          this.updateDrawer();
          this.updateTabContent();
        }
      },
      onAddDiaryEntry: (dealId, noteText) => {
        const target = allLeads.find(l => l.deal_id === dealId);
        if (target) {
          target.diary_entries = target.diary_entries || [];
          target.diary_entries.unshift({
            date: new Date().toISOString(),
            user: orgInfo.current_user?.name || 'Sales Staff',
            note: noteText
          });
          this.updateDrawer();
        }
      },
      onUpdateQueuedMessage: (dealId, msgId, newContent, isCancelled) => {
        const target = allLeads.find(l => l.deal_id === dealId);
        if (target && target.ai_queued_messages) {
          if (isCancelled) {
            target.ai_queued_messages = target.ai_queued_messages.filter(m => m.id !== msgId);
          } else {
            const msg = target.ai_queued_messages.find(m => m.id === msgId);
            if (msg) msg.content = newContent;
          }
          this.updateDrawer();
        }
      }
    });
  }

  updateTabContent() {
    const tabMount = document.getElementById('tab-content-mount');
    if (!tabMount) return;

    if (this.state.activeTab === 'network') {
      const filteredLeads = this.getFilteredAndSortedLeads();
      const startIdx = (this.state.currentPage - 1) * this.state.pageSize;
      const paginatedLeads = filteredLeads.slice(startIdx, startIdx + this.state.pageSize);

      tabMount.innerHTML = `
        <div id="filter-bar-mount"></div>
        <div id="table-mount" style="margin-top: 14px;"></div>
      `;

      const filterMount = tabMount.querySelector('#filter-bar-mount');
      const tableMount = tabMount.querySelector('#table-mount');

      renderFilterBar(
        filterMount,
        this.state,
        filterOptions,
        (changes) => this.handleFilterChange(changes),
        () => this.handleResetFilters()
      );

      renderLeadTable(tableMount, {
        leads: paginatedLeads,
        totalFilteredCount: filteredLeads.length,
        currentPage: this.state.currentPage,
        pageSize: this.state.pageSize,
        sortField: this.state.sortField,
        sortDirection: this.state.sortDirection,
        selectedLeadIds: this.state.selectedLeadIds,
        onSort: (field) => this.handleSort(field),
        onPageChange: (p) => {
          this.state.currentPage = p;
          this.updateTabContent();
        },
        onPageSizeChange: (size) => {
          this.state.pageSize = size;
          this.state.currentPage = 1;
          this.updateTabContent();
        },
        onSelectLead: (id, isSelected) => {
          if (isSelected) {
            this.state.selectedLeadIds.add(id);
          } else {
            this.state.selectedLeadIds.delete(id);
          }
          this.updateTabContent();
        },
        onSelectAll: (selectAll) => {
          if (selectAll) {
            paginatedLeads.forEach(l => this.state.selectedLeadIds.add(l.deal_id));
          } else {
            this.state.selectedLeadIds.clear();
          }
          this.updateTabContent();
        },
        onInspectLead: (id) => {
          this.state.inspectedLeadId = id;
          this.updateDrawer();
        },
        onExportSelected: () => {
          const selected = allLeads.filter(l => this.state.selectedLeadIds.has(l.deal_id));
          exportLeadsToCSV(selected, `boran_motors_selected_${selected.length}_leads.csv`);
        }
      });

      // Bind row clicks and view buttons for drawer opening
      tableMount.querySelectorAll('.lead-row').forEach(row => {
        row.addEventListener('click', () => {
          const dealId = row.getAttribute('data-deal-id');
          if (dealId) {
            this.state.inspectedLeadId = dealId;
            this.updateDrawer();
          }
        });
      });

      tableMount.querySelectorAll('.btn-view-lead').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const dealId = btn.getAttribute('data-deal-id');
          if (dealId) {
            this.state.inspectedLeadId = dealId;
            this.updateDrawer();
          }
        });
      });

      // Bind select row checkboxes
      tableMount.querySelectorAll('.lead-row-checkbox').forEach(chk => {
        chk.addEventListener('change', (e) => {
          e.stopPropagation();
          const dealId = chk.getAttribute('data-deal-id');
          if (e.target.checked) {
            this.state.selectedLeadIds.add(dealId);
          } else {
            this.state.selectedLeadIds.delete(dealId);
          }
          this.updateTabContent();
        });
      });

      tableMount.querySelector('#select-all-leads')?.addEventListener('change', (e) => {
        if (e.target.checked) {
          paginatedLeads.forEach(l => this.state.selectedLeadIds.add(l.deal_id));
        } else {
          this.state.selectedLeadIds.clear();
        }
        this.updateTabContent();
      });

      tableMount.querySelector('#page-size-select')?.addEventListener('change', (e) => {
        this.state.pageSize = Number(e.target.value);
        this.state.currentPage = 1;
        this.updateTabContent();
      });

      tableMount.querySelector('#btn-page-first')?.addEventListener('click', () => {
        this.state.currentPage = 1;
        this.updateTabContent();
      });

      tableMount.querySelector('#btn-page-prev')?.addEventListener('click', () => {
        if (this.state.currentPage > 1) {
          this.state.currentPage--;
          this.updateTabContent();
        }
      });

      tableMount.querySelector('#btn-page-next')?.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredLeads.length / this.state.pageSize);
        if (this.state.currentPage < totalPages) {
          this.state.currentPage++;
          this.updateTabContent();
        }
      });

      tableMount.querySelector('#btn-page-last')?.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredLeads.length / this.state.pageSize);
        this.state.currentPage = totalPages;
        this.updateTabContent();
      });

      tableMount.querySelectorAll('.page-btn[data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.state.currentPage = Number(btn.getAttribute('data-page'));
          this.updateTabContent();
        });
      });

      tableMount.querySelectorAll('th.sortable').forEach(th => {
        th.addEventListener('click', () => {
          const field = th.getAttribute('data-sort');
          if (field) this.handleSort(field);
        });
      });

    } else if (this.state.activeTab === 'rooftops') {
      renderRooftopsView(tabMount, rooftops, allLeads, (dealershipName) => {
        this.navigateTab('network', { dealership: dealershipName });
      });
    } else if (this.state.activeTab === 'reports') {
      renderReportsView(tabMount, reports, catalog, this.state.activeReportPreset, (presetId) => {
        this.state.activeReportPreset = presetId;
        this.updateTabContent();
      });
    }
  }

  update() {
    this.updateSidebar();
    this.updateHeader();
    this.updateKpis();
    this.updateTabContent();
    this.updateDrawer();
  }
}

// Launch CRM App
new BoranMotorsApp();
