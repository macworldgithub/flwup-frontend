/**
 * Boran Motors CRM - Main Application Controller
 * Inspired by FLWUP & Harmony CRM Sales Floor
 * System of Record: Pentana DMS
 * Database Backend: MongoDB on Localhost with RESTful CRUD APIs
 */

import api from './services/api.js';
import { 
  crmData as fallbackData, 
  leads as fallbackLeads, 
  rooftops as fallbackRooftops, 
  reports as fallbackReports, 
  catalog as fallbackCatalog, 
  filterOptions as fallbackFilters, 
  orgInfo as fallbackOrg 
} from './data/store.js';

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
    // Dynamic data populated from local database APIs
    this.leads = [...fallbackLeads];
    this.rooftops = [...fallbackRooftops];
    this.reports = { ...fallbackReports };
    this.catalog = { ...fallbackCatalog };
    this.filterOptions = { ...fallbackFilters };
    this.orgInfo = { ...fallbackOrg };

    this.state = {
      activeTab: 'network', // 'network' | 'rooftops' | 'reports'
      sidebarCollapsed: false,
      mobileSidebarOpen: false,
      
      // Database connection state
      dbConnected: true,
      dbInfo: { type: 'MongoDB', host: '127.0.0.1', port: 27017 },
      isLoading: true,

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

      totalCount: this.leads.length
    };

    this.rootEl = document.getElementById('app');
    this.init();
  }

  async init() {
    this.renderLayout();
    this.setupGlobalShortcuts();
    this.setupToastContainer();
    this.setupModalMount();

    // Fetch live data from MongoDB REST APIs
    await this.fetchDataFromBackend();

    this.update();
  }

  setupToastContainer() {
    if (!document.getElementById('crm-toast-container')) {
      const container = document.createElement('div');
      container.id = 'crm-toast-container';
      container.className = 'crm-toast-container';
      document.body.appendChild(container);
    }
  }

  setupModalMount() {
    if (!document.getElementById('crm-modal-mount')) {
      const mount = document.createElement('div');
      mount.id = 'crm-modal-mount';
      document.body.appendChild(mount);
    }
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('crm-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'crm-toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: ${type === 'error' ? '#ef4444' : '#10b981'};">
        ${type === 'error' 
          ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
          : '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
        }
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  async fetchDataFromBackend() {
    try {
      console.log('🔄 Fetching CRM data from local MongoDB backend APIs...');
      
      const [healthRes, leadsRes, rooftopsRes, reportsRes, catalogRes, filtersRes, orgRes] = await Promise.allSettled([
        api.getHealth(),
        api.getLeads({ limit: 'all' }),
        api.getRooftops(),
        api.getReports(),
        api.getCatalog(),
        api.getFilterOptions(),
        api.getOrganization()
      ]);

      // Leads
      if (leadsRes.status === 'fulfilled' && leadsRes.value?.data) {
        this.leads = leadsRes.value.data;
        this.state.totalCount = leadsRes.value.total || this.leads.length;
        console.log(`✅ Loaded ${this.leads.length} leads from MongoDB database.`);
      }

      // Rooftops
      if (rooftopsRes.status === 'fulfilled' && Array.isArray(rooftopsRes.value)) {
        this.rooftops = rooftopsRes.value;
      }

      // Reports
      if (reportsRes.status === 'fulfilled' && reportsRes.value) {
        this.reports = reportsRes.value;
      }

      // Catalog
      if (catalogRes.status === 'fulfilled' && catalogRes.value) {
        this.catalog = catalogRes.value;
      }

      // Filters
      if (filtersRes.status === 'fulfilled' && filtersRes.value) {
        this.filterOptions = filtersRes.value;
      }

      // Organization
      if (orgRes.status === 'fulfilled' && orgRes.value) {
        this.orgInfo = orgRes.value;
      }

      // DB Status
      if (healthRes.status === 'fulfilled' && healthRes.value?.database) {
        this.state.dbConnected = healthRes.value.database.status === 'connected';
        this.state.dbInfo = healthRes.value.database;
      } else {
        this.state.dbConnected = true;
      }

    } catch (error) {
      console.warn('⚠️ Could not connect to API backend, using fallback store:', error);
      this.state.dbConnected = false;
      this.showToast('Backend API unavailable. Using cached memory data.', 'error');
    } finally {
      this.state.isLoading = false;
    }
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
        this.closeNewLeadModal();
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
              <span class="module-tab-pill" id="leads-count-pill">${this.leads.length}</span>
            </button>
            <button class="module-tab-btn ${this.state.activeTab === 'rooftops' ? 'active' : ''}" data-tab="rooftops">
              <span>Dealership Rooftops</span>
              <span class="module-tab-pill" id="rooftops-count-pill">${this.rooftops.length}</span>
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
    let result = this.leads;

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
      },
      () => {
        this.openNewLeadModal();
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
    const inspectedLead = this.leads.find(l => l.deal_id === this.state.inspectedLeadId);
    
    renderLeadDrawer(drawerMount, inspectedLead, {
      onClose: () => {
        this.state.inspectedLeadId = null;
        this.updateDrawer();
      },
      onToggleAI: async (dealId, newStatus) => {
        const target = this.leads.find(l => l.deal_id === dealId);
        if (target) {
          target.ai_status = newStatus;
          // Log to local diary
          target.diary_entries = target.diary_entries || [];
          target.diary_entries.unshift({
            date: new Date().toISOString(),
            user: this.orgInfo.current_user?.name || 'Sales Staff',
            note: newStatus === 'off' 
              ? 'AI Auto Follow-Up turned OFF by sales staff (direct contact in progress).' 
              : 'AI Auto Follow-Up turned ON by sales staff (cadence resumed).'
          });

          // Sync with MongoDB API
          try {
            await api.toggleLeadAI(dealId, newStatus, this.orgInfo.current_user?.name || 'Sales Staff');
            this.showToast(`AI Auto Follow-up ${newStatus === 'off' ? 'paused' : 'resumed'} in database.`);
          } catch (err) {
            console.error('API toggle error:', err);
          }

          this.updateDrawer();
          this.updateTabContent();
        }
      },
      onAddDiaryEntry: async (dealId, noteText) => {
        const target = this.leads.find(l => l.deal_id === dealId);
        if (target) {
          target.diary_entries = target.diary_entries || [];
          target.diary_entries.unshift({
            date: new Date().toISOString(),
            user: this.orgInfo.current_user?.name || 'Sales Staff',
            note: noteText
          });

          // Sync with MongoDB API
          try {
            await api.addLeadDiaryEntry(dealId, noteText, this.orgInfo.current_user?.name || 'Sales Staff');
            this.showToast('Diary entry saved to database.');
          } catch (err) {
            console.error('API diary error:', err);
          }

          this.updateDrawer();
        }
      },
      onUpdateQueuedMessage: async (dealId, msgId, newContent, isCancelled) => {
        const target = this.leads.find(l => l.deal_id === dealId);
        if (target && target.ai_queued_messages) {
          if (isCancelled) {
            target.ai_queued_messages = target.ai_queued_messages.filter(m => m.id !== msgId);
          } else {
            const msg = target.ai_queued_messages.find(m => m.id === msgId);
            if (msg) msg.content = newContent;
          }

          // Sync with MongoDB API
          try {
            await api.updateLeadQueuedMessage(dealId, msgId, newContent, isCancelled);
            this.showToast(isCancelled ? 'Scheduled SMS cancelled in database.' : 'Scheduled SMS updated in database.');
          } catch (err) {
            console.error('API queued message error:', err);
          }

          this.updateDrawer();
        }
      },
      onDeleteLead: async (dealId) => {
        try {
          await api.deleteLead(dealId);
          this.leads = this.leads.filter(l => l.deal_id !== dealId);
          this.state.totalCount = this.leads.length;
          this.state.inspectedLeadId = null;
          this.showToast(`Lead ${dealId} permanently deleted from database.`, 'success');
          this.update();
        } catch (err) {
          console.error('API delete error:', err);
          this.showToast('Failed to delete lead from database: ' + err.message, 'error');
        }
      }
    });
  }

  openNewLeadModal() {
    const mount = document.getElementById('crm-modal-mount');
    if (!mount) return;

    mount.innerHTML = `
      <div class="crm-modal-backdrop open" id="new-lead-modal-backdrop">
        <div class="crm-modal-card">
          <div class="crm-modal-header">
            <h3 class="crm-modal-title">Create New Lead (Database CRUD)</h3>
            <button class="drawer-close-btn" id="btn-close-lead-modal">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <form id="new-lead-form">
            <div class="crm-modal-body">
              <div class="form-group-grid">
                <div class="form-field">
                  <label for="lead-input-name">Customer Name *</label>
                  <input type="text" class="form-input" id="lead-input-name" required placeholder="e.g. Jason Miller" />
                </div>
                <div class="form-field">
                  <label for="lead-input-phone">Phone Number</label>
                  <input type="text" class="form-input" id="lead-input-phone" placeholder="e.g. 0412 345 678" />
                </div>
              </div>

              <div class="form-group-grid">
                <div class="form-field">
                  <label for="lead-input-email">Email Address</label>
                  <input type="email" class="form-input" id="lead-input-email" placeholder="e.g. jason.m@example.com" />
                </div>
                <div class="form-field">
                  <label for="lead-input-dealership">Dealership Rooftop</label>
                  <select class="form-select" id="lead-input-dealership">
                    <option value="South Morang Kia">South Morang Kia</option>
                    <option value="South Morang Hyundai">South Morang Hyundai</option>
                    <option value="BYD South Morang">BYD South Morang</option>
                    <option value="Chery South Morang">Chery South Morang</option>
                  </select>
                </div>
              </div>

              <div class="form-group-grid">
                <div class="form-field">
                  <label for="lead-input-make">Vehicle Make</label>
                  <select class="form-select" id="lead-input-make">
                    <option value="Kia">Kia</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="BYD">BYD</option>
                    <option value="Chery">Chery</option>
                  </select>
                </div>
                <div class="form-field">
                  <label for="lead-input-model">Vehicle Model</label>
                  <input type="text" class="form-input" id="lead-input-model" placeholder="e.g. EV6 GT / Tucson / Seal" />
                </div>
              </div>

              <div class="form-group-grid">
                <div class="form-field">
                  <label for="lead-input-owner">Assigned Sales Rep</label>
                  <input type="text" class="form-input" id="lead-input-owner" value="Sarah Jenkins" />
                </div>
                <div class="form-field">
                  <label for="lead-input-store">Pentana Store Code</label>
                  <select class="form-select" id="lead-input-store">
                    <option value="Store 70">Store 70</option>
                    <option value="Store 40">Store 40</option>
                  </select>
                </div>
              </div>

              <div class="form-group-grid">
                <div class="form-field">
                  <label for="lead-input-status">Lead Status</label>
                  <select class="form-select" id="lead-input-status">
                    <option value="following_up">Following Up</option>
                    <option value="deposit_taken">Deposit Taken</option>
                    <option value="sold">Sold</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
                <div class="form-field">
                  <label for="lead-input-ai">AI Follow-Up Status</label>
                  <select class="form-select" id="lead-input-ai">
                    <option value="active">Active (Smart Follow-Up)</option>
                    <option value="off">Off (Direct Touch)</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="crm-modal-footer">
              <button type="button" class="btn-secondary" id="btn-cancel-lead-modal">Cancel</button>
              <button type="submit" class="btn-primary" id="btn-submit-lead-modal">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span>Save to Database</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    mount.querySelector('#btn-close-lead-modal')?.addEventListener('click', () => this.closeNewLeadModal());
    mount.querySelector('#btn-cancel-lead-modal')?.addEventListener('click', () => this.closeNewLeadModal());
    mount.querySelector('#new-lead-modal-backdrop')?.addEventListener('click', (e) => {
      if (e.target.id === 'new-lead-modal-backdrop') this.closeNewLeadModal();
    });

    mount.querySelector('#new-lead-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const customer_name = document.getElementById('lead-input-name')?.value?.trim();
      const phone = document.getElementById('lead-input-phone')?.value?.trim();
      const email = document.getElementById('lead-input-email')?.value?.trim();
      const dealership_name = document.getElementById('lead-input-dealership')?.value;
      const vehicle_make = document.getElementById('lead-input-make')?.value;
      const vehicle_model = document.getElementById('lead-input-model')?.value?.trim();
      const owner_name = document.getElementById('lead-input-owner')?.value?.trim();
      const store_code = document.getElementById('lead-input-store')?.value;
      const status = document.getElementById('lead-input-status')?.value;
      const ai_status = document.getElementById('lead-input-ai')?.value;

      if (!customer_name) return;

      const leadPayload = {
        customer_name,
        customer_phone: phone,
        customer_email: email,
        dealership_name,
        vehicle_make,
        vehicle_model: vehicle_model || 'Model Inquiry',
        owner_name: owner_name || 'Unassigned',
        store_code,
        status,
        ai_status,
        source: 'manual'
      };

      try {
        const created = await api.createLead(leadPayload);
        this.leads.unshift(created);
        this.state.totalCount = this.leads.length;
        this.closeNewLeadModal();
        this.showToast(`Lead for "${customer_name}" saved to database successfully!`, 'success');
        this.update();
        
        // Open drawer for the newly created lead
        if (created.deal_id) {
          this.state.inspectedLeadId = created.deal_id;
          this.updateDrawer();
        }
      } catch (err) {
        console.error('Error creating lead:', err);
        this.showToast('Failed to create lead: ' + err.message, 'error');
      }
    });
  }

  closeNewLeadModal() {
    const mount = document.getElementById('crm-modal-mount');
    if (mount) mount.innerHTML = '';
  }

  updateTabContent() {
    const tabMount = document.getElementById('tab-content-mount');
    if (!tabMount) return;

    // Update count pill in tabs
    const leadsPill = document.getElementById('leads-count-pill');
    if (leadsPill) leadsPill.textContent = this.leads.length;
    const roofPill = document.getElementById('rooftops-count-pill');
    if (roofPill) roofPill.textContent = this.rooftops.length;

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
        this.filterOptions,
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
          const selected = this.leads.filter(l => this.state.selectedLeadIds.has(l.deal_id));
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
      renderRooftopsView(tabMount, this.rooftops, this.leads, (dealershipName) => {
        this.navigateTab('network', { dealership: dealershipName });
      });
    } else if (this.state.activeTab === 'reports') {
      renderReportsView(tabMount, this.reports, this.catalog, this.state.activeReportPreset, (presetId) => {
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

// Launch CRM App connected to Localhost MongoDB APIs
new BoranMotorsApp();
