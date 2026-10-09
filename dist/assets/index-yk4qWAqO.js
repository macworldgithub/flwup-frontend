import{l as L,r as H,c as V,a as j,o as U,f as Q}from"./data-DB_ykkT0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();function G(r,e,n,i){var l;const t=e.sidebarCollapsed,a=e.activeTab;r.innerHTML=`
    <aside class="sidebar ${t?"collapsed":""} ${e.mobileSidebarOpen?"mobile-open":""}" id="app-sidebar">
      <div class="sidebar-header">
        <div class="brand-lockup">
          <div class="brand-logo-badge">BM</div>
          ${t?"":`
            <div class="brand-text">
              <span class="brand-title">BORAN MOTORS</span>
              <span class="brand-subtitle">Network CRM</span>
            </div>
          `}
        </div>
        <button class="sidebar-toggle-btn" id="btn-sidebar-toggle" title="${t?"Expand Sidebar":"Collapse Sidebar"}">
          ${t?"→":"←"}
        </button>
      </div>

      <div class="sidebar-content">
        <!-- User Profile Card -->
        ${t?"":`
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
        `}

        <!-- Primary Navigation -->
        <div class="nav-section">
          ${t?"":'<div class="nav-section-label">Execution Layer</div>'}
          <ul class="nav-list">
            <li>
              <button class="nav-item-btn ${a==="network"?"active":""}" data-tab="network" title="Network Leads">
                <svg class="nav-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                ${t?"":"<span>Network Leads</span>"}
                ${t?"":`<span class="nav-badge">${e.totalCount||1601}</span>`}
              </button>
            </li>
            <li>
              <button class="nav-item-btn ${a==="rooftops"?"active":""}" data-tab="rooftops" title="Dealership Rooftops">
                <svg class="nav-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                ${t?"":"<span>Rooftops</span>"}
                ${t?"":'<span class="nav-badge">4</span>'}
              </button>
            </li>
            <li>
              <button class="nav-item-btn ${a==="reports"?"active":""}" data-tab="reports" title="Network Scoreboards">
                <svg class="nav-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                ${t?"":"<span>Scoreboards & Reports</span>"}
                ${t?"":'<span class="nav-badge">14</span>'}
              </button>
            </li>
          </ul>
        </div>

        <!-- Dealership Fast Switcher -->
        ${t?"":`
          <div class="nav-section">
            <div class="nav-section-label">Dealerships</div>
            <ul class="nav-list">
              <li>
                <button class="nav-item-btn ${e.dealershipFilter==="BYD South Morang"?"active":""}" data-dealership="BYD South Morang">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: #0284C7;"></span>
                  <span>BYD South Morang</span>
                </button>
              </li>
              <li>
                <button class="nav-item-btn ${e.dealershipFilter==="Chery South Morang"?"active":""}" data-dealership="Chery South Morang">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: #C8102E;"></span>
                  <span>Chery South Morang</span>
                </button>
              </li>
              <li>
                <button class="nav-item-btn ${e.dealershipFilter==="South Morang Hyundai"?"active":""}" data-dealership="South Morang Hyundai">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: #0F766E;"></span>
                  <span>South Morang Hyundai</span>
                </button>
              </li>
              <li>
                <button class="nav-item-btn ${e.dealershipFilter==="South Morang Kia"?"active":""}" data-dealership="South Morang Kia">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: #991B1B;"></span>
                  <span>South Morang Kia</span>
                </button>
              </li>
            </ul>
          </div>
        `}
      </div>

      <!-- Footer Sync -->
      <div class="sidebar-footer">
        <div class="sync-status-indicator">
          <div class="sync-pulse"></div>
          ${t?"":"<span>Live · 1,601 Leads</span>"}
        </div>
      </div>
    </aside>
  `,(l=r.querySelector("#btn-sidebar-toggle"))==null||l.addEventListener("click",i),r.querySelectorAll(".nav-item-btn[data-tab]").forEach(o=>{o.addEventListener("click",u=>{const c=o.getAttribute("data-tab");n(c)})}),r.querySelectorAll(".nav-item-btn[data-dealership]").forEach(o=>{o.addEventListener("click",u=>{const c=o.getAttribute("data-dealership");n("network",{dealership:c})})})}function K(r,e,n,i,t,a){var o,u;r.innerHTML=`
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
          <span class="page-subtitle">Boran Motors Automotive Group · 4 Rooftops</span>
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
            value="${e.searchQuery||""}"
          />
          <kbd class="search-shortcut-kbd">/</kbd>
        </div>
      </div>

      <div class="header-right">
        <!-- Date Range Badge -->
        <div class="date-range-badge" title="Active reporting window">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>Jul 10 – Oct 07, 2026 (90d)</span>
        </div>

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
  `;const l=r.querySelector("#global-header-search");l==null||l.addEventListener("input",c=>{n(c.target.value)}),(o=r.querySelector("#mobile-menu-toggle"))==null||o.addEventListener("click",t),(u=r.querySelector("#btn-header-export"))==null||u.addEventListener("click",i)}function Y(r,e){const n=e.length;if(n===0){r.innerHTML=`
      <div class="kpi-grid">
        <div class="kpi-card highlight">
          <div class="kpi-header">
            <span class="kpi-title">Total Leads</span>
          </div>
          <div class="kpi-value">0</div>
          <span class="kpi-subtext">No leads in current view</span>
        </div>
      </div>
    `;return}const i=e.filter(s=>s.first_contact_at||s.minutes_to_first_contact!==null).length,t=(i/n*100).toFixed(1),a=e.filter(s=>s.minutes_to_first_contact!==null&&s.minutes_to_first_contact<=15).length,l=(a/n*100).toFixed(1),o=e.map(s=>s.minutes_to_first_contact).filter(s=>typeof s=="number"&&s>=0).sort((s,p)=>s-p),u=o.length>0?o[Math.floor(o.length/2)]:0,c=e.filter(s=>s.first_reply_at!==null).length,m=(c/n*100).toFixed(1),f=e.filter(s=>s.status==="sold"||s.sold_at!==null).length,g=(f/n*100).toFixed(1);r.innerHTML=`
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
        <div class="kpi-value">${n.toLocaleString()}</div>
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
        <div class="kpi-value">${t}%</div>
        <span class="kpi-subtext">${i} of ${n} actioned</span>
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
        <div class="kpi-value">${l}%</div>
        <span class="kpi-subtext">${a} under 15 mins</span>
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
        <div class="kpi-value">${u}m</div>
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
        <div class="kpi-value">${m}%</div>
        <span class="kpi-subtext">${c} two-way replies</span>
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
        <div class="kpi-value">${g}%</div>
        <span class="kpi-subtext">${f} vehicles sold</span>
      </div>
    </div>
  `}function W(r,e,n,i,t){var m,f,g,s,p,b,k,$;const a=n.dealerships||[],l=n.owners||[],o=n.makes||[],u=e.searchQuery||e.dealershipFilter!=="all"||e.statusFilter!=="all"||e.ownerFilter!=="all"||e.makeFilter!=="all"||e.speedFilter!=="all"||e.storeFilter&&e.storeFilter!=="all"||e.aiFilter&&e.aiFilter!=="all";r.innerHTML=`
    <div class="filter-toolbar-card">
      <div class="filter-row-primary">
        <!-- Search Input -->
        <div class="filter-search-box">
          <input 
            type="text" 
            class="filter-search-input" 
            id="filter-search-input" 
            placeholder="Search customer, Pentana ID, vehicle, rep..." 
            value="${e.searchQuery||""}"
          />
        </div>

        <!-- Store Selector (Store 70 / Store 40) -->
        <select class="filter-select" id="filter-store-select">
          <option value="all" ${e.storeFilter==="all"?"selected":""}>All Stores</option>
          <option value="Store 70" ${e.storeFilter==="Store 70"?"selected":""}>Store 70 (Main)</option>
          <option value="Store 40" ${e.storeFilter==="Store 40"?"selected":""}>Store 40 (Secondary)</option>
        </select>

        <!-- AI Follow-up Status -->
        <select class="filter-select" id="filter-ai-select">
          <option value="all" ${e.aiFilter==="all"?"selected":""}>All AI Statuses</option>
          <option value="active" ${e.aiFilter==="active"?"selected":""}>⚡ AI Active (SMS on)</option>
          <option value="off" ${e.aiFilter==="off"?"selected":""}>● AI Off (Sales Rep in touch)</option>
        </select>

        <!-- Dealership Selector -->
        <select class="filter-select" id="filter-dealership-select">
          <option value="all" ${e.dealershipFilter==="all"?"selected":""}>All Dealerships (${a.length})</option>
          ${a.map(h=>`<option value="${h}" ${e.dealershipFilter===h?"selected":""}>${h}</option>`).join("")}
        </select>

        <!-- Status Selector -->
        <select class="filter-select" id="filter-status-select">
          <option value="all" ${e.statusFilter==="all"?"selected":""}>All Statuses</option>
          <option value="new_lead" ${e.statusFilter==="new_lead"?"selected":""}>New Lead</option>
          <option value="following_up" ${e.statusFilter==="following_up"?"selected":""}>Following Up</option>
          <option value="sold" ${e.statusFilter==="sold"?"selected":""}>Sold</option>
          <option value="lost" ${e.statusFilter==="lost"?"selected":""}>Lost</option>
        </select>

        <!-- Sales Rep Selector -->
        <select class="filter-select" id="filter-owner-select">
          <option value="all" ${e.ownerFilter==="all"?"selected":""}>All Sales Reps (${l.length})</option>
          ${l.map(h=>`<option value="${h}" ${e.ownerFilter===h?"selected":""}>${h}</option>`).join("")}
        </select>

        <!-- Vehicle Make Selector -->
        <select class="filter-select" id="filter-make-select">
          <option value="all" ${e.makeFilter==="all"?"selected":""}>All Makes</option>
          ${o.map(h=>`<option value="${h}" ${e.makeFilter===h?"selected":""}>${h}</option>`).join("")}
        </select>

        <!-- Speed to Contact SLA -->
        <select class="filter-select" id="filter-speed-select">
          <option value="all" ${e.speedFilter==="all"?"selected":""}>All Response Speeds</option>
          <option value="fast" ${e.speedFilter==="fast"?"selected":""}>⚡ Fast (&le; 15 mins)</option>
          <option value="moderate" ${e.speedFilter==="moderate"?"selected":""}>⏱ Moderate (16–60 mins)</option>
          <option value="slow" ${e.speedFilter==="slow"?"selected":""}>⌛ Slow (&gt; 60 mins)</option>
          <option value="untouched" ${e.speedFilter==="untouched"?"selected":""}>○ Untouched</option>
        </select>

        <!-- Reset Button -->
        ${u?`
          <button class="btn-filter-reset" id="btn-reset-filters" title="Clear all active filters">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span>Reset</span>
          </button>
        `:""}
      </div>

      <!-- Quick Rooftop Filter Chips -->
      <div class="filter-pills-row">
        <span class="filter-pill-label">Rooftop Quick Filter:</span>
        <button class="dealership-chip-btn ${e.dealershipFilter==="all"?"active":""}" data-d="all">
          All Rooftops
        </button>
        ${a.map(h=>`
          <button class="dealership-chip-btn ${e.dealershipFilter===h?"active":""}" data-d="${h}">
            ${h}
          </button>
        `).join("")}
      </div>
    </div>
  `;const c=r.querySelector("#filter-search-input");c==null||c.addEventListener("input",h=>{i({searchQuery:h.target.value})}),(m=r.querySelector("#filter-store-select"))==null||m.addEventListener("change",h=>{i({storeFilter:h.target.value})}),(f=r.querySelector("#filter-ai-select"))==null||f.addEventListener("change",h=>{i({aiFilter:h.target.value})}),(g=r.querySelector("#filter-dealership-select"))==null||g.addEventListener("change",h=>{i({dealershipFilter:h.target.value})}),(s=r.querySelector("#filter-status-select"))==null||s.addEventListener("change",h=>{i({statusFilter:h.target.value})}),(p=r.querySelector("#filter-owner-select"))==null||p.addEventListener("change",h=>{i({ownerFilter:h.target.value})}),(b=r.querySelector("#filter-make-select"))==null||b.addEventListener("change",h=>{i({makeFilter:h.target.value})}),(k=r.querySelector("#filter-speed-select"))==null||k.addEventListener("change",h=>{i({speedFilter:h.target.value})}),($=r.querySelector("#btn-reset-filters"))==null||$.addEventListener("click",t),r.querySelectorAll(".dealership-chip-btn").forEach(h=>{h.addEventListener("click",()=>{const C=h.getAttribute("data-d");i({dealershipFilter:C})})})}function J(r,{leads:e,totalFilteredCount:n,currentPage:i,pageSize:t,sortField:a,sortDirection:l,selectedLeadIds:o,onSort:u,onPageChange:c,onPageSizeChange:m,onSelectLead:f,onSelectAll:g,onInspectLead:s,onExportSelected:p}){var S,w,I,R,B,P,N,O;if(n===0){r.innerHTML=`
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
    `;return}const b=(i-1)*t,k=Math.min(b+t,n),$=Math.ceil(n/t),h=e.length>0&&e.every(d=>o.has(d.deal_id)),C=o.size>0,M=(d="")=>{const y=d.toLowerCase();return y.includes("byd")?"byd":y.includes("chery")?"chery":y.includes("hyundai")?"hyundai":y.includes("kia")?"kia":"byd"},q=(d,y)=>{if(d==null)return'<span class="speed-badge untouched">○ Untouched</span>';if(d<=15)return`<span class="speed-badge fast">⚡ ${d}m</span>`;if(d<=60)return`<span class="speed-badge moderate">⏱ ${d}m</span>`;const _=Math.round(d/60);return`<span class="speed-badge slow">⌛ ${_>24?Math.round(_/24)+"d":_+"h"}</span>`},T=d=>{if(!d)return"—";try{return new Date(d).toLocaleDateString("en-AU",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return d.slice(0,10)}},x=d=>a!==d?'<span class="sort-icon">↕</span>':`<span class="sort-icon">${l==="asc"?"↑":"↓"}</span>`;r.innerHTML=`
    <div class="table-card">
      <!-- Batch Action Bar when rows selected -->
      ${C?`
        <div class="batch-actions-bar">
          <span class="batch-selection-count">${o.size} lead${o.size>1?"s":""} selected</span>
          <div class="batch-actions-group">
            <button class="btn-batch-action" id="btn-batch-export">Export Selected CSV</button>
            <button class="btn-batch-action" id="btn-batch-clear">Deselect All</button>
          </div>
        </div>
      `:""}

      <div class="table-responsive-wrapper">
        <table class="crm-table">
          <thead>
            <tr>
              <th style="width: 36px; text-align: center;">
                <input type="checkbox" id="select-all-leads" ${h?"checked":""} />
              </th>
              <th class="sortable ${a==="store_code"?"sorted":""}" data-sort="store_code">
                Store ${x("store_code")}
              </th>
              <th class="sortable ${a==="ai_status"?"sorted":""}" data-sort="ai_status">
                AI Cadence ${x("ai_status")}
              </th>
              <th class="sortable ${a==="customer_name"?"sorted":""}" data-sort="customer_name">
                Customer ${x("customer_name")}
              </th>
              <th class="sortable ${a==="dealership_name"?"sorted":""}" data-sort="dealership_name">
                Dealership Rooftop ${x("dealership_name")}
              </th>
              <th class="sortable ${a==="vehicle_make"?"sorted":""}" data-sort="vehicle_make">
                Vehicle ${x("vehicle_make")}
              </th>
              <th class="sortable ${a==="owner_name"?"sorted":""}" data-sort="owner_name">
                Assigned Rep ${x("owner_name")}
              </th>
              <th class="sortable ${a==="minutes_to_first_contact"?"sorted":""}" data-sort="minutes_to_first_contact">
                Speed to Lead ${x("minutes_to_first_contact")}
              </th>
              <th class="sortable ${a==="status"?"sorted":""}" data-sort="status">
                Status ${x("status")}
              </th>
              <th class="sortable ${a==="created_at"?"sorted":""}" data-sort="created_at">
                Created ${x("created_at")}
              </th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${e.map(d=>{const y=o.has(d.deal_id),_=d.ai_status==="off",A=(d.owner_name||"U").split(" ").map(F=>F[0]).join("").slice(0,2).toUpperCase();return`
                <tr class="lead-row ${y?"selected":""}" data-deal-id="${d.deal_id}">
                  <td style="text-align: center;" onclick="event.stopPropagation()">
                    <input type="checkbox" class="lead-row-checkbox" data-deal-id="${d.deal_id}" ${y?"checked":""} />
                  </td>
                  <td>
                    <span class="store-badge ${d.store_code==="Store 70"?"store-70":"store-40"}">
                      ${d.store_code||"Store 70"}
                    </span>
                  </td>
                  <td>
                    <span class="ai-table-pill ${_?"off":"active"}">
                      ${_?"● AI OFF":"⚡ AI ACTIVE"}
                    </span>
                  </td>
                  <td>
                    <div class="customer-cell">
                      <span class="customer-name">${d.customer_name||"Anonymous"}</span>
                      <span class="deal-id-subtext">ID: ${(d.deal_id||"").slice(0,8)}...</span>
                    </div>
                  </td>
                  <td>
                    <span class="dealership-badge ${M(d.dealership_name)}">
                      ${d.dealership_name}
                    </span>
                  </td>
                  <td>
                    <div class="vehicle-cell">
                      <span class="vehicle-make-model">${d.vehicle_make} ${d.vehicle_model}</span>
                      <span class="vehicle-dealer-code">${d.dealer_code||"BOORAN"}</span>
                    </div>
                  </td>
                  <td>
                    <div class="rep-cell">
                      <div class="rep-avatar">${A}</div>
                      <span class="rep-name">${d.owner_name||"Unassigned"}</span>
                    </div>
                  </td>
                  <td>
                    ${q(d.minutes_to_first_contact,d.had_contact_opportunity)}
                  </td>
                  <td>
                    <span class="status-pill ${d.status||"following_up"}">
                      ${(d.status||"following_up").replace(/_/g," ")}
                    </span>
                  </td>
                  <td>
                    <span style="font-size: 12px; color: var(--bm-secondary-text);" title="${d.created_at}">
                      ${T(d.created_at)}
                    </span>
                  </td>
                  <td style="text-align: right;" onclick="event.stopPropagation()">
                    <button class="btn-view-lead" data-deal-id="${d.deal_id}" title="Inspect Lead Details">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div class="table-pagination-footer">
        <div class="pagination-info">
          Showing <strong>${b+1}</strong> to <strong>${k}</strong> of <strong>${n.toLocaleString()}</strong> records
        </div>

        <div class="pagination-controls">
          <div class="page-size-selector-wrap">
            <span>Per page:</span>
            <select class="page-size-select" id="page-size-select">
              <option value="10" ${t===10?"selected":""}>10</option>
              <option value="25" ${t===25?"selected":""}>25</option>
              <option value="50" ${t===50?"selected":""}>50</option>
              <option value="100" ${t===100?"selected":""}>100</option>
            </select>
          </div>

          <div class="pagination-btn-group">
            <button class="page-btn" id="btn-page-first" ${i===1?"disabled":""} title="First Page">&laquo;</button>
            <button class="page-btn" id="btn-page-prev" ${i===1?"disabled":""} title="Previous Page">&lsaquo;</button>
            
            ${v(i,$)}

            <button class="page-btn" id="btn-page-next" ${i===$?"disabled":""} title="Next Page">&rsaquo;</button>
            <button class="page-btn" id="btn-page-last" ${i===$?"disabled":""} title="Last Page">&raquo;</button>
          </div>
        </div>
      </div>
    </div>
  `;function v(d,y){if(y<=1)return'<button class="page-btn active">1</button>';const _=[],A=5;let F=Math.max(1,d-2),D=Math.min(y,F+A-1);D-F<A-1&&(F=Math.max(1,D-A+1));for(let E=F;E<=D;E++)_.push(`
        <button class="page-btn ${E===d?"active":""}" data-page="${E}">
          ${E}
        </button>
      `);return _.join("")}r.querySelectorAll("th.sortable").forEach(d=>{d.addEventListener("click",()=>{const y=d.getAttribute("data-sort");u(y)})}),(S=r.querySelector("#select-all-leads"))==null||S.addEventListener("change",d=>{g(d.target.checked)}),r.querySelectorAll(".lead-row-checkbox").forEach(d=>{d.addEventListener("change",y=>{const _=d.getAttribute("data-deal-id");f(_,d.checked)})}),r.querySelectorAll(".lead-row").forEach(d=>{d.addEventListener("click",()=>{const y=d.getAttribute("data-deal-id");s(y)})}),r.querySelectorAll(".btn-view-lead").forEach(d=>{d.addEventListener("click",y=>{y.stopPropagation();const _=d.getAttribute("data-deal-id");s(_)})}),(w=r.querySelector("#page-size-select"))==null||w.addEventListener("change",d=>{m(parseInt(d.target.value,10))}),(I=r.querySelector("#btn-page-first"))==null||I.addEventListener("click",()=>c(1)),(R=r.querySelector("#btn-page-prev"))==null||R.addEventListener("click",()=>c(i-1)),(B=r.querySelector("#btn-page-next"))==null||B.addEventListener("click",()=>c(i+1)),(P=r.querySelector("#btn-page-last"))==null||P.addEventListener("click",()=>c($)),r.querySelectorAll(".page-btn[data-page]").forEach(d=>{d.addEventListener("click",()=>{const y=parseInt(d.getAttribute("data-page"),10);c(y)})}),(N=r.querySelector("#btn-batch-export"))==null||N.addEventListener("click",p),(O=r.querySelector("#btn-batch-clear"))==null||O.addEventListener("click",()=>g(!1))}function X(r,e,{onClose:n,onToggleAI:i,onAddDiaryEntry:t,onUpdateQueuedMessage:a}){var h,C,M,q,T,x;if(!e){r.innerHTML=`
      <div class="drawer-backdrop" id="lead-drawer-backdrop">
        <div class="lead-drawer"></div>
      </div>
    `;return}const l=v=>{if(!v)return"Not recorded";try{return new Date(v).toLocaleString("en-AU",{weekday:"short",month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return v}},o=e.ai_status==="off",u=e.diary_entries||[],c=e.ai_queued_messages||[],m=e.videos_sent||[],f=e.test_drive||{status:"none",licence_captured:!1},g=e.trade_in||{status:"none",value:null},s=e.loan_car||{status:"none"};e.post_sales_followup,r.innerHTML=`
    <div class="drawer-backdrop open" id="lead-drawer-backdrop">
      <div class="lead-drawer" onclick="event.stopPropagation()">
        
        <!-- Header -->
        <div class="drawer-header">
          <div class="drawer-header-info">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <h2 class="drawer-customer-title">${e.customer_name||"Customer Record"}</h2>
              <span class="status-pill ${e.status||"following_up"}">
                ${(e.status||"following_up").replace(/_/g," ")}
              </span>
              <span class="store-badge ${e.store_code==="Store 70"?"store-70":"store-40"}">
                ${e.store_code||"Store 70"}
              </span>
            </div>
            <div style="font-size: 12px; color: var(--bm-secondary-text); margin-top: 3px; display: flex; align-items: center; gap: 6px;">
              <span>${e.dealership_name}</span>
              <span>·</span>
              <span style="font-weight: 600; color: var(--bm-primary-text);">${e.vehicle_make} ${e.vehicle_model}</span>
              <span>·</span>
              <span class="pentana-synced-badge">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                Pentana DMS Hard Synced
              </span>
            </div>
          </div>
          <button class="drawer-close-btn" id="btn-drawer-close" title="Close Drawer (Esc)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="drawer-body">

          <!-- Pentana System of Record Card -->
          <div class="pentana-record-card">
            <div class="pentana-card-header">
              <div class="pentana-brand-logo">
                <span class="pentana-tag">PENTANA DMS</span>
                <span class="pentana-sub">System of Record</span>
              </div>
              <div class="pentana-ids">
                <span class="pentana-id-text">ID: <strong>${e.pentana_id||"PENTANA-SYNC"}</strong></span>
                <span class="pentana-store-text">Code: <strong>${e.store_code||"Store 70"}</strong> (${e.dealer_code})</span>
              </div>
            </div>
            <div class="pentana-card-grid">
              <div class="pentana-item">
                <span class="pentana-label">Sales Consultant</span>
                <span class="pentana-val">${e.owner_name||"Unassigned"}</span>
              </div>
              <div class="pentana-item">
                <span class="pentana-label">Source System</span>
                <span class="pentana-val">Hard Integration (Direct DMS)</span>
              </div>
              <div class="pentana-item">
                <span class="pentana-label">Lead Created</span>
                <span class="pentana-val">${l(e.created_at)}</span>
              </div>
              <div class="pentana-item">
                <span class="pentana-label">Stock Unit Requested</span>
                <span class="pentana-val">${e.vehicle_make} ${e.vehicle_model}</span>
              </div>
            </div>
          </div>

          <!-- AI Follow-up & SMS Control Center -->
          <div class="drawer-section ai-control-section">
            <div class="section-header-flex">
              <span class="drawer-section-title">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                AI SMS Follow-Up Controller
              </span>
              
              <!-- AI OFF BUTTON / TOGGLE -->
              <div class="ai-toggle-wrapper">
                <span class="ai-toggle-label ${o?"off":"active"}">
                  ${o?"AI Follow-up Paused (OFF)":"AI Follow-up Active (ON)"}
                </span>
                <button class="ai-toggle-btn ${o?"is-off":"is-active"}" id="btn-toggle-ai" title="Toggle AI Auto Follow-up for this customer">
                  <div class="ai-toggle-knob"></div>
                  <span>${o?"TURN ON":"STOP AI"}</span>
                </button>
              </div>
            </div>

            <div class="ai-status-banner ${o?"banner-off":"banner-active"}">
              <div class="ai-status-icon">
                ${o?'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>':'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'}
              </div>
              <div class="ai-status-text">
                <strong>${o?"Sales rep in direct touch — AI cadence stopped.":"AI SMS Cadence Running (Max 3/day)"}</strong>
                <p>
                  ${o?"AI messaging has been disabled so the sales team can communicate directly without conflicting automated messages.":"Scheduled after hours (after 6:00 PM). Incoming customer replies instantly notify the sales rep without auto-booking."}
                </p>
              </div>
            </div>

            <!-- Queued & Editable Messages -->
            <div class="ai-queue-box">
              <div class="ai-queue-header">
                <span class="ai-queue-title">Queued & Editable SMS Messages</span>
                <span class="ai-queue-badge">${o?"Paused (0 in queue)":`${c.length} Pending Approval / Dispatch`}</span>
              </div>
              
              ${o?`
                <div class="empty-queue-msg">
                  AI is currently turned off. Click "TURN ON" above to resume smart SMS follow-ups.
                </div>
              `:c.length===0?`
                  <div class="empty-queue-msg">No messages queued at this moment. Cadence is waiting for the next after-hours slot.</div>
                `:`
                  <div class="queued-msg-list">
                    ${c.map((v,S)=>`
                      <div class="queued-msg-card" data-msg-id="${v.id}">
                        <div class="queued-msg-meta">
                          <span class="queued-type-tag">SMS Sequence #${S+1}</span>
                          <span class="queued-time-tag">Scheduled: After Hours (6:30 PM)</span>
                          <span class="queued-edit-indicator">✎ Editable by Sales</span>
                        </div>
                        <textarea class="queued-msg-textarea" id="queued-msg-text-${v.id}" rows="2">${v.content}</textarea>
                        <div class="queued-msg-actions">
                          <button class="btn-msg-save" data-msg-id="${v.id}">Save Edit</button>
                          <button class="btn-msg-send-now" data-msg-id="${v.id}">Send SMS Now</button>
                          <button class="btn-msg-dismiss" data-msg-id="${v.id}">Cancel SMS</button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}
            </div>
          </div>

          <!-- Sales Floor Mobility App (Licence, Test Drive, Trade-in) -->
          <div class="drawer-section">
            <span class="drawer-section-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              Sales Floor Mobile App Integration
            </span>
            <div class="sales-app-grid">
              <!-- Driver Licence -->
              <div class="sales-app-card ${f.licence_captured?"active":""}">
                <div class="sales-app-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><line x1="15" y1="8" x2="17" y2="8"/><line x1="15" y1="12" x2="17" y2="12"/>
                  </svg>
                </div>
                <div class="sales-app-info">
                  <span class="sales-app-label">Driver's Licence</span>
                  <span class="sales-app-val ${f.licence_captured?"verified":"pending"}">
                    ${f.licence_captured?"✓ Photographed & Captured":"○ Pending Mobile Scan"}
                  </span>
                  <span class="sales-app-sub">Reused for Test Drive & Loan Cars</span>
                </div>
              </div>

              <!-- Test Drive -->
              <div class="sales-app-card ${f.status==="completed"?"active":""}">
                <div class="sales-app-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                  </svg>
                </div>
                <div class="sales-app-info">
                  <span class="sales-app-label">Test Drive</span>
                  <span class="sales-app-val">
                    ${f.status==="completed"?"✓ Completed":f.status==="scheduled"?"⏱ Scheduled":"Not Requested"}
                  </span>
                  <span class="sales-app-sub">${f.licence_captured?"DMS Agreement Linked":"Requires Licence"}</span>
                </div>
              </div>

              <!-- Trade-in Valuation -->
              <div class="sales-app-card ${g.status==="valued"?"active":""}">
                <div class="sales-app-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div class="sales-app-info">
                  <span class="sales-app-label">Trade-In Appraisal</span>
                  <span class="sales-app-val">
                    ${g.status==="valued"?g.value?`$${g.value.toLocaleString()}`:"Appraisal Logged":"No Trade Logged"}
                  </span>
                  <span class="sales-app-sub">Photographed via Sales App</span>
                </div>
              </div>

              <!-- Loan Car Allocation -->
              <div class="sales-app-card">
                <div class="sales-app-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  </svg>
                </div>
                <div class="sales-app-info">
                  <span class="sales-app-label">Loan Vehicle</span>
                  <span class="sales-app-val">${s.status==="assigned"?"Assigned":"None Active"}</span>
                  <span class="sales-app-sub">Delivery Centre Fleet</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Video Sent on SMS Thread (Unified Thread) -->
          <div class="drawer-section">
            <div class="section-header-flex">
              <span class="drawer-section-title">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
                Video Walkaround on SMS Thread
              </span>
              <button class="btn-action-small" id="btn-mock-record-video">
                <span>+ Send Video SMS</span>
              </button>
            </div>

            <div class="video-thread-container">
              ${m.length>0?m.map(v=>`
                <div class="video-thread-item">
                  <div class="video-thumb-preview">
                    <div class="video-play-badge">▶</div>
                    <span class="video-snippet-tag">Snippet Blend (No time cap)</span>
                  </div>
                  <div class="video-info">
                    <span class="video-title">Personalized Walkaround — ${e.vehicle_make} ${e.vehicle_model}</span>
                    <span class="video-meta">Sent via SMS to customer • Back office verified</span>
                    <span class="video-status-text ${v.interacted?"viewed":""}">
                      ${v.interacted?`👁 Customer viewed video on ${l(v.interacted_at)}`:"⏳ Delivered via SMS (Pending view)"}
                    </span>
                  </div>
                </div>
              `).join(""):`
                <div class="video-empty-state">
                  <span>No video walkaround sent yet on this SMS thread. Click <strong>+ Send Video SMS</strong> to create a personalized walkaround.</span>
                </div>
              `}
            </div>
          </div>

          <!-- Sales Diary System (Sales Staff Log & Progress) -->
          <div class="drawer-section">
            <span class="drawer-section-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              Sales Staff Diary & Activity Log
            </span>

            <!-- Add Note Form -->
            <div class="diary-add-form">
              <div class="diary-input-row">
                <select class="diary-category-select" id="diary-category-select">
                  <option value="Showroom Visit">Showroom Visit</option>
                  <option value="Phone Call">Phone Call</option>
                  <option value="Price Negotiation">Price Negotiation</option>
                  <option value="Test Drive Update">Test Drive Update</option>
                  <option value="Delivery Note">Delivery Note</option>
                  <option value="General Note">General Note</option>
                </select>
                <input type="text" class="diary-input-text" id="diary-note-input" placeholder="Log progress, notes, or customer interaction..." />
                <button class="btn-primary-red" id="btn-add-diary-note">Log to Diary</button>
              </div>
            </div>

            <!-- Diary Entries Feed -->
            <div class="diary-timeline-feed">
              ${u.length===0?`
                <div class="diary-empty-note">No diary entries recorded yet.</div>
              `:u.map(v=>`
                <div class="diary-entry-card">
                  <div class="diary-entry-header">
                    <span class="diary-author">${v.user||"Sales Rep"}</span>
                    <span class="diary-date">${l(v.date)}</span>
                  </div>
                  <div class="diary-content">${v.note}</div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Post-Sales Follow-Up Tracker -->
          <div class="drawer-section">
            <span class="drawer-section-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Post-Sales Follow-Up Schedule
            </span>
            <div class="post-sales-box">
              <div class="post-sales-status">
                <span>Delivery & Handover Follow-Up:</span>
                <strong>${e.status==="sold"?"Active 4-Stage Cadence (1W / 1M / 6M / 1Y)":"Pending Vehicle Sale & Delivery"}</strong>
              </div>
              <span style="font-size: 11.5px; color: var(--bm-secondary-text); margin-top: 4px; display: block;">
                Automated customer satisfaction check and service reminder triggers linked to Pentana sold stock records.
              </span>
            </div>
          </div>

        </div>

        <!-- Footer Actions -->
        <div class="drawer-footer">
          <button class="btn-icon-secondary" id="btn-copy-pentana-id">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy Pentana ID</span>
          </button>
          <button class="btn-primary-red" id="btn-close-drawer-bottom">
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  `,(h=r.querySelector("#lead-drawer-backdrop"))==null||h.addEventListener("click",n),(C=r.querySelector("#btn-drawer-close"))==null||C.addEventListener("click",n),(M=r.querySelector("#btn-close-drawer-bottom"))==null||M.addEventListener("click",n),(q=r.querySelector("#btn-copy-pentana-id"))==null||q.addEventListener("click",()=>{const v=e.pentana_id||e.deal_id;navigator.clipboard.writeText(v),alert("Pentana ID copied to clipboard: "+v)}),(T=r.querySelector("#btn-toggle-ai"))==null||T.addEventListener("click",()=>{const v=o?"active":"off";i&&i(e.deal_id,v)});const p=r.querySelector("#btn-add-diary-note"),b=r.querySelector("#diary-note-input"),k=r.querySelector("#diary-category-select"),$=()=>{var w;const v=(w=b==null?void 0:b.value)==null?void 0:w.trim();if(!v)return;const S=`[${(k==null?void 0:k.value)||"General Note"}] ${v}`;t&&t(e.deal_id,S),b&&(b.value="")};p==null||p.addEventListener("click",$),b==null||b.addEventListener("keydown",v=>{v.key==="Enter"&&$()}),r.querySelectorAll(".btn-msg-save").forEach(v=>{v.addEventListener("click",()=>{const S=v.getAttribute("data-msg-id"),w=r.querySelector(`#queued-msg-text-${S}`);w&&a&&(a(e.deal_id,Number(S),w.value),alert("Queued AI SMS updated successfully."))})}),r.querySelectorAll(".btn-msg-send-now").forEach(v=>{v.addEventListener("click",()=>{const S=v.getAttribute("data-msg-id"),w=r.querySelector(`#queued-msg-text-${S}`);alert(`SMS sent to customer: "${(w==null?void 0:w.value)||""}"`),t&&t(e.deal_id,`[SMS Sent Instantly] ${(w==null?void 0:w.value)||""}`)})}),r.querySelectorAll(".btn-msg-dismiss").forEach(v=>{v.addEventListener("click",()=>{const S=v.getAttribute("data-msg-id");confirm("Cancel this scheduled SMS message?")&&a&&a(e.deal_id,Number(S),null,!0)})}),(x=r.querySelector("#btn-mock-record-video"))==null||x.addEventListener("click",()=>{const v=prompt("Enter walkaround video title or notes to send via SMS thread:","60s Walkaround of "+e.vehicle_make+" "+e.vehicle_model);v&&(e.videos_sent=e.videos_sent||[],e.videos_sent.push({id:"v-"+Date.now(),sent_via:"sms",interacted:!1,interacted_at:null,is_snippet_blend:!0,no_time_cap:!0}),t&&t(e.deal_id,`[Video SMS Walkaround Sent] Video uploaded and sent on unified customer SMS thread: "${v}"`))})}function Z(r,e,n,i){const t={};e.forEach(l=>{const o=n.filter(p=>p.dealership_id===l.id||p.dealership_name===l.name),u=o.length,c=o.filter(p=>p.minutes_to_first_contact!==null&&p.minutes_to_first_contact<=15).length,m=u>0?(c/u*100).toFixed(1):0,f=o.filter(p=>p.status==="sold").length,g=u>0?(f/u*100).toFixed(1):0,s=Array.from(new Set(o.map(p=>p.owner_name).filter(Boolean)));t[l.id]={...l,leadCount:u,fastRate:m,soldCount:f,soldRate:g,repsCount:s.length,topRep:s[0]||"Unassigned"}});const a=(l="")=>{const o=l.toLowerCase();return o.includes("byd")?{color:"#0284C7",bg:"#E0F2FE",initial:"BYD"}:o.includes("chery")?{color:"#C8102E",bg:"#FEE2E2",initial:"CH"}:o.includes("hyundai")?{color:"#0F766E",bg:"#CCFBF1",initial:"HY"}:o.includes("kia")?{color:"#991B1B",bg:"#FFE4E6",initial:"KIA"}:{color:"#C8102E",bg:"#FEE2E2",initial:"BM"}};r.innerHTML=`
    <div class="rooftops-container" style="display: flex; flex-direction: column; gap: 20px;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h2 style="font-family: var(--font-heading); font-size: 18px; font-weight: 700; color: var(--bm-primary-text);">
            Dealership Rooftops (${e.length})
          </h2>
          <p style="font-size: 12.5px; color: var(--bm-secondary-text);">
            Active dealership network participating in automated sales execution and follow-up cadences.
          </p>
        </div>
      </div>

      <div class="rooftops-grid">
        ${e.map(l=>{const o=t[l.id]||{},u=a(l.name);return`
            <div class="rooftop-card">
              <div class="rooftop-card-header">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: ${u.bg}; color: ${u.color}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px; font-family: var(--font-heading);">
                    ${u.initial}
                  </div>
                  <div>
                    <h3 class="rooftop-brand-title">${l.name}</h3>
                    <span style="font-size: 11px; color: var(--bm-secondary-text);">ID: ${l.id.slice(0,8)}...</span>
                  </div>
                </div>
                <span class="rooftop-tier-badge ${l.tier||"pro"}">${l.tier||"PRO"}</span>
              </div>

              <div class="rooftop-metrics-row">
                <div class="rooftop-metric-item">
                  <span class="rooftop-metric-val">${o.leadCount||0}</span>
                  <span class="rooftop-metric-lbl">Total Leads</span>
                </div>
                <div class="rooftop-metric-item">
                  <span class="rooftop-metric-val" style="color: #059669;">${o.fastRate}%</span>
                  <span class="rooftop-metric-lbl">&le;15m Response</span>
                </div>
                <div class="rooftop-metric-item">
                  <span class="rooftop-metric-val" style="color: var(--bm-primary-red);">${o.soldRate}%</span>
                  <span class="rooftop-metric-lbl">Sold Rate</span>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: var(--bm-secondary-text);">
                <div style="display: flex; justify-content: space-between;">
                  <span>Post-Sale Follow-up Cadence:</span>
                  <strong style="color: ${l.has_post_sale_template?"#059669":"#9CA3AF"};">
                    ${l.has_post_sale_template?"✓ Enabled":"○ Disabled"}
                  </strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Active Sales Floor Reps:</span>
                  <strong style="color: var(--bm-primary-text);">${o.repsCount} Reps</strong>
                </div>
              </div>

              <div class="rooftop-card-actions">
                <span style="font-size: 11.5px; color: var(--bm-secondary-text);">Status: <strong style="color: #059669;">Active</strong></span>
                <button class="btn-primary-red" style="height: 32px; font-size: 12px; padding: 0 12px;" data-rooftop-name="${l.name}">
                  <span>View Leads &rarr;</span>
                </button>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,r.querySelectorAll("button[data-rooftop-name]").forEach(l=>{l.addEventListener("click",()=>{const o=l.getAttribute("data-rooftop-name");i(o)})})}function ee(r,e,n,i="network_scoreboard",t){var g;const a=[{id:"network_scoreboard",name:"Network Scoreboard",icon:"🏆"},{id:"rep_scorecard",name:"Sales Rep Leaderboard",icon:"👤"},{id:"speed_to_lead",name:"Speed to Lead",icon:"⚡"},{id:"contact_coverage",name:"Contact Coverage",icon:"🎯"},{id:"model_demand",name:"Vehicle Model Demand",icon:"🚗"},{id:"sold_model_mix",name:"Sold Model Mix",icon:"💎"},{id:"lost_reasons",name:"Lost Deal Reasons",icon:"📉"},{id:"source_roi",name:"Lead Source ROI",icon:"📊"},{id:"settled_ratio_trend",name:"Lead-to-Sold Trend",icon:"📈"},{id:"conversation_to_appointment",name:"Conversation to Appt",icon:"📅"},{id:"speed_vs_close",name:"Speed vs Close Rate",icon:"⏱"},{id:"persistence",name:"Follow-up Persistence",icon:"🔄"},{id:"response_gaps",name:"Response Gaps",icon:"⏳"},{id:"untouched_leads",name:"Untouched Leads",icon:"⚠️"}],l=e[i]||e.network_scoreboard||{},o=((g=n==null?void 0:n.presets)==null?void 0:g.find(s=>s.id===i))||{},u=l.columns||[],c=l.rows||(Array.isArray(l)?l:[]),m=l.totals||null,f=(s,p)=>{if(s==null)return"—";if(p.format==="percent"){const b=typeof s=="number"?s<=1?s*100:s:parseFloat(s);return isNaN(b)?s:`${b.toFixed(1)}%`}return p.format==="minutes"?`${Math.round(s)}m`:p.format==="integer"&&typeof s=="number"?s.toLocaleString():s};r.innerHTML=`
    <div class="reports-container">
      <!-- Report Selector Pills -->
      <div class="reports-nav-pills">
        ${a.map(s=>`
          <button class="report-nav-pill ${i===s.id?"active":""}" data-preset="${s.id}">
            <span>${s.icon}</span>
            <span>${s.name}</span>
          </button>
        `).join("")}
      </div>

      <!-- Main Report Card -->
      <div class="report-card-main">
        <div class="report-meta-header">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
            <div>
              <h2 class="report-heading">${o.name||i.replace(/_/g," ").toUpperCase()}</h2>
              <p class="report-question">${o.question||"Executive reporting analysis across Boran Motors dealerships."}</p>
            </div>
            <span class="dealership-badge" style="background: var(--bm-light-red); color: var(--bm-primary-red); font-size: 12px; padding: 4px 10px;">
              Executive Preset
            </span>
          </div>
        </div>

        ${o.so_what?`
          <div class="report-insight-box">
            <div class="report-insight-title">Strategic Dealership Insight</div>
            ${o.so_what}
          </div>
        `:""}

        <!-- Report Data Table -->
        <div class="table-responsive-wrapper" style="border: 1px solid var(--bm-border-grey); border-radius: var(--radius-md);">
          <table class="crm-table">
            <thead>
              <tr>
                ${u.map(s=>`
                  <th style="${s.format==="integer"||s.format==="percent"||s.format==="minutes"?"text-align: right;":"text-align: left;"}">
                    ${s.label||s.key}
                  </th>
                `).join("")}
              </tr>
            </thead>
            <tbody>
              ${c.length===0?`
                <tr>
                  <td colspan="${u.length||1}" style="text-align: center; padding: 32px; color: var(--bm-secondary-text);">
                    No data available for this report period.
                  </td>
                </tr>
              `:c.map(s=>`
                <tr class="lead-row" style="cursor: default;">
                  ${u.map(p=>{const b=s[p.key],k=p.format==="integer"||p.format==="percent"||p.format==="minutes",$=p.key.includes("rate")||p.key.includes("close")||p.key.includes("sold");return`
                      <td style="${k?"text-align: right;":"text-align: left;"}">
                        <span style="${$?"font-weight: 700; color: var(--bm-primary-red);":""}">
                          ${f(b,p)}
                        </span>
                      </td>
                    `}).join("")}
                </tr>
              `).join("")}
            </tbody>
            ${m?`
              <tfoot>
                <tr style="background: var(--bm-light-grey); font-weight: 700; border-top: 2px solid var(--bm-border-grey);">
                  ${u.map((s,p)=>{const b=s.format==="integer"||s.format==="percent"||s.format==="minutes";if(p===0)return"<td>Group Totals / Average</td>";const k=m[s.key];return`
                      <td style="${b?"text-align: right;":"text-align: left;"}">
                        ${f(k,s)}
                      </td>
                    `}).join("")}
                </tr>
              </tfoot>
            `:""}
          </table>
        </div>
      </div>
    </div>
  `,r.querySelectorAll(".report-nav-pill").forEach(s=>{s.addEventListener("click",()=>{const p=s.getAttribute("data-preset");t(p)})})}function z(r,e="boran_motors_network_leads.csv"){if(!r||!r.length){alert("No records available to export.");return}const n=["Deal ID","Dealership Name","Dealer Code","Customer Name","Vehicle Make","Vehicle Model","Assigned Owner","Source","Status","Created At","First Contact At","Minutes to First Contact","First Touch At","Minutes to First Touch","Follow Ups Sent","First Reply At","Sold At","Lost Reason","Days to Sold"],i=c=>{if(c==null)return"";const m=String(c).trim();return m.includes(",")||m.includes('"')||m.includes(`
`)?`"${m.replace(/"/g,'""')}"`:m},t=r.map(c=>[i(c.deal_id),i(c.dealership_name),i(c.dealer_code),i(c.customer_name),i(c.vehicle_make),i(c.vehicle_model),i(c.owner_name),i(c.source),i(c.status),i(c.created_at),i(c.first_contact_at),i(c.minutes_to_first_contact),i(c.first_touch_at),i(c.minutes_to_first_touch),i(c.follow_ups_sent),i(c.first_reply_at),i(c.sold_at),i(c.lost_reason),i(c.days_to_sold)]),a=[n.join(","),...t.map(c=>c.join(","))].join(`\r
`),l=new Blob([a],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(l),u=document.createElement("a");u.setAttribute("href",o),u.setAttribute("download",e),document.body.appendChild(u),u.click(),document.body.removeChild(u),URL.revokeObjectURL(o)}class te{constructor(){this.state={activeTab:"network",sidebarCollapsed:!1,mobileSidebarOpen:!1,searchQuery:"",storeFilter:"all",aiFilter:"all",dealershipFilter:"all",statusFilter:"all",ownerFilter:"all",makeFilter:"all",speedFilter:"all",followUpFilter:"all",sortField:"created_at",sortDirection:"desc",currentPage:1,pageSize:25,selectedLeadIds:new Set,inspectedLeadId:null,activeReportPreset:"network_scoreboard",totalCount:L.length},this.rootEl=document.getElementById("app"),this.init()}init(){this.renderLayout(),this.setupGlobalShortcuts(),this.update()}setupGlobalShortcuts(){window.addEventListener("keydown",e=>{var n,i;if(e.key==="/"&&((n=document.activeElement)==null?void 0:n.tagName)!=="INPUT"&&((i=document.activeElement)==null?void 0:i.tagName)!=="TEXTAREA"){e.preventDefault();const t=document.getElementById("global-header-search")||document.getElementById("filter-search-input");t==null||t.focus()}e.key==="Escape"&&(this.state.inspectedLeadId&&(this.state.inspectedLeadId=null,this.updateDrawer()),this.state.mobileSidebarOpen&&(this.state.mobileSidebarOpen=!1,this.updateSidebar()))})}renderLayout(){var e;this.rootEl.innerHTML=`
      <div id="sidebar-mount"></div>
      <div class="mobile-sidebar-overlay" id="mobile-sidebar-overlay"></div>
      <main class="main-content">
        <div id="header-mount"></div>
        <div class="page-container" id="page-content-mount">
          <!-- Module Navigation Tabs -->
          <nav class="module-tabs-nav">
            <button class="module-tab-btn ${this.state.activeTab==="network"?"active":""}" data-tab="network">
              <span>Network Leads</span>
              <span class="module-tab-pill" id="leads-count-pill">${L.length}</span>
            </button>
            <button class="module-tab-btn ${this.state.activeTab==="rooftops"?"active":""}" data-tab="rooftops">
              <span>Dealership Rooftops</span>
              <span class="module-tab-pill">${H.length}</span>
            </button>
            <button class="module-tab-btn ${this.state.activeTab==="reports"?"active":""}" data-tab="reports">
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
    `,this.rootEl.querySelectorAll(".module-tab-btn").forEach(n=>{n.addEventListener("click",()=>{const i=n.getAttribute("data-tab");this.navigateTab(i)})}),(e=document.getElementById("mobile-sidebar-overlay"))==null||e.addEventListener("click",()=>{var n;this.state.mobileSidebarOpen=!1,(n=document.getElementById("mobile-sidebar-overlay"))==null||n.classList.remove("visible"),this.updateSidebar()})}navigateTab(e,n={}){this.state.activeTab=e,n.dealership&&(this.state.dealershipFilter=n.dealership),n.resetPage!==!1&&(this.state.currentPage=1),this.rootEl.querySelectorAll(".module-tab-btn").forEach(i=>{i.getAttribute("data-tab")===e?i.classList.add("active"):i.classList.remove("active")}),this.update()}getFilteredAndSortedLeads(){let e=L;if(this.state.searchQuery.trim()){const t=this.state.searchQuery.toLowerCase().trim();e=e.filter(a=>a.customer_name&&a.customer_name.toLowerCase().includes(t)||a.deal_id&&a.deal_id.toLowerCase().includes(t)||a.pentana_id&&a.pentana_id.toLowerCase().includes(t)||a.store_code&&a.store_code.toLowerCase().includes(t)||a.vehicle_make&&a.vehicle_make.toLowerCase().includes(t)||a.vehicle_model&&a.vehicle_model.toLowerCase().includes(t)||a.owner_name&&a.owner_name.toLowerCase().includes(t)||a.dealership_name&&a.dealership_name.toLowerCase().includes(t)||a.dealer_code&&a.dealer_code.toLowerCase().includes(t)||a.source&&a.source.toLowerCase().includes(t))}this.state.storeFilter&&this.state.storeFilter!=="all"&&(e=e.filter(t=>t.store_code===this.state.storeFilter)),this.state.aiFilter&&this.state.aiFilter!=="all"&&(e=e.filter(t=>t.ai_status===this.state.aiFilter)),this.state.dealershipFilter!=="all"&&(e=e.filter(t=>t.dealership_name===this.state.dealershipFilter)),this.state.statusFilter!=="all"&&(e=e.filter(t=>t.status===this.state.statusFilter)),this.state.ownerFilter!=="all"&&(e=e.filter(t=>t.owner_name===this.state.ownerFilter)),this.state.makeFilter!=="all"&&(e=e.filter(t=>t.vehicle_make===this.state.makeFilter)),this.state.speedFilter!=="all"&&(this.state.speedFilter==="fast"?e=e.filter(t=>t.minutes_to_first_contact!==null&&t.minutes_to_first_contact<=15):this.state.speedFilter==="moderate"?e=e.filter(t=>t.minutes_to_first_contact!==null&&t.minutes_to_first_contact>15&&t.minutes_to_first_contact<=60):this.state.speedFilter==="slow"?e=e.filter(t=>t.minutes_to_first_contact!==null&&t.minutes_to_first_contact>60):this.state.speedFilter==="untouched"&&(e=e.filter(t=>t.minutes_to_first_contact===null||!t.first_contact_at)));const n=this.state.sortField,i=this.state.sortDirection==="asc"?1:-1;return e=[...e].sort((t,a)=>{let l=t[n],o=a[n];return l==null?1:o==null?-1:typeof l=="number"&&typeof o=="number"?(l-o)*i:String(l).localeCompare(String(o))*i}),e}handleSort(e){this.state.sortField===e?this.state.sortDirection=this.state.sortDirection==="asc"?"desc":"asc":(this.state.sortField=e,this.state.sortDirection="desc"),this.update()}handleFilterChange(e){Object.assign(this.state,e),this.state.currentPage=1,this.update()}handleResetFilters(){this.state.searchQuery="",this.state.storeFilter="all",this.state.aiFilter="all",this.state.dealershipFilter="all",this.state.statusFilter="all",this.state.ownerFilter="all",this.state.makeFilter="all",this.state.speedFilter="all",this.state.followUpFilter="all",this.state.currentPage=1,this.update()}updateSidebar(){const e=document.getElementById("sidebar-mount");if(!e)return;G(e,this.state,(i,t)=>this.navigateTab(i,t),()=>{this.state.sidebarCollapsed=!this.state.sidebarCollapsed,this.updateSidebar()});const n=document.getElementById("mobile-sidebar-overlay");n&&(this.state.mobileSidebarOpen?n.classList.add("visible"):n.classList.remove("visible"))}updateHeader(){const e=document.getElementById("header-mount");e&&K(e,this.state,n=>{this.state.searchQuery=n,this.state.currentPage=1,this.updateTabContent(),this.updateKpis()},()=>{const n=this.getFilteredAndSortedLeads();z(n,`boran_motors_leads_${new Date().toISOString().slice(0,10)}.csv`)},()=>{this.state.mobileSidebarOpen=!this.state.mobileSidebarOpen,this.updateSidebar()})}updateKpis(){const e=document.getElementById("kpi-banner-mount");if(!e)return;const n=this.getFilteredAndSortedLeads();Y(e,n)}updateDrawer(){const e=document.getElementById("drawer-mount");if(!e)return;const n=L.find(i=>i.deal_id===this.state.inspectedLeadId);X(e,n,{onClose:()=>{this.state.inspectedLeadId=null,this.updateDrawer()},onToggleAI:(i,t)=>{var l;const a=L.find(o=>o.deal_id===i);a&&(a.ai_status=t,a.diary_entries=a.diary_entries||[],a.diary_entries.unshift({date:new Date().toISOString(),user:(l=U.current_user)==null?void 0:l.name,note:t==="off"?"AI Auto Follow-Up turned OFF by sales staff (direct contact in progress).":"AI Auto Follow-Up turned ON by sales staff (cadence resumed)."}),this.updateDrawer(),this.updateTabContent())},onAddDiaryEntry:(i,t)=>{var l;const a=L.find(o=>o.deal_id===i);a&&(a.diary_entries=a.diary_entries||[],a.diary_entries.unshift({date:new Date().toISOString(),user:(l=U.current_user)==null?void 0:l.name,note:t}),this.updateDrawer())},onUpdateQueuedMessage:(i,t,a,l)=>{const o=L.find(u=>u.deal_id===i);if(o&&o.ai_queued_messages){if(l)o.ai_queued_messages=o.ai_queued_messages.filter(u=>u.id!==t);else{const u=o.ai_queued_messages.find(c=>c.id===t);u&&(u.content=a)}this.updateDrawer()}}})}updateTabContent(){var n,i,t,a,l,o;const e=document.getElementById("tab-content-mount");if(e)if(this.state.activeTab==="network"){const u=this.getFilteredAndSortedLeads(),c=(this.state.currentPage-1)*this.state.pageSize,m=u.slice(c,c+this.state.pageSize);e.innerHTML=`
        <div id="filter-bar-mount"></div>
        <div id="table-mount" style="margin-top: 14px;"></div>
      `;const f=e.querySelector("#filter-bar-mount"),g=e.querySelector("#table-mount");W(f,this.state,Q,s=>this.handleFilterChange(s),()=>this.handleResetFilters()),J(g,{leads:m,totalFilteredCount:u.length,currentPage:this.state.currentPage,pageSize:this.state.pageSize,sortField:this.state.sortField,sortDirection:this.state.sortDirection,selectedLeadIds:this.state.selectedLeadIds,onSort:s=>this.handleSort(s),onPageChange:s=>{this.state.currentPage=s,this.updateTabContent()},onPageSizeChange:s=>{this.state.pageSize=s,this.state.currentPage=1,this.updateTabContent()},onSelectLead:(s,p)=>{p?this.state.selectedLeadIds.add(s):this.state.selectedLeadIds.delete(s),this.updateTabContent()},onSelectAll:s=>{s?m.forEach(p=>this.state.selectedLeadIds.add(p.deal_id)):this.state.selectedLeadIds.clear(),this.updateTabContent()},onInspectLead:s=>{this.state.inspectedLeadId=s,this.updateDrawer()},onExportSelected:()=>{const s=L.filter(p=>this.state.selectedLeadIds.has(p.deal_id));z(s,`boran_motors_selected_${s.length}_leads.csv`)}}),g.querySelectorAll(".lead-row").forEach(s=>{s.addEventListener("click",()=>{const p=s.getAttribute("data-deal-id");p&&(this.state.inspectedLeadId=p,this.updateDrawer())})}),g.querySelectorAll(".btn-view-lead").forEach(s=>{s.addEventListener("click",p=>{p.stopPropagation();const b=s.getAttribute("data-deal-id");b&&(this.state.inspectedLeadId=b,this.updateDrawer())})}),g.querySelectorAll(".lead-row-checkbox").forEach(s=>{s.addEventListener("change",p=>{p.stopPropagation();const b=s.getAttribute("data-deal-id");p.target.checked?this.state.selectedLeadIds.add(b):this.state.selectedLeadIds.delete(b),this.updateTabContent()})}),(n=g.querySelector("#select-all-leads"))==null||n.addEventListener("change",s=>{s.target.checked?m.forEach(p=>this.state.selectedLeadIds.add(p.deal_id)):this.state.selectedLeadIds.clear(),this.updateTabContent()}),(i=g.querySelector("#page-size-select"))==null||i.addEventListener("change",s=>{this.state.pageSize=Number(s.target.value),this.state.currentPage=1,this.updateTabContent()}),(t=g.querySelector("#btn-page-first"))==null||t.addEventListener("click",()=>{this.state.currentPage=1,this.updateTabContent()}),(a=g.querySelector("#btn-page-prev"))==null||a.addEventListener("click",()=>{this.state.currentPage>1&&(this.state.currentPage--,this.updateTabContent())}),(l=g.querySelector("#btn-page-next"))==null||l.addEventListener("click",()=>{const s=Math.ceil(u.length/this.state.pageSize);this.state.currentPage<s&&(this.state.currentPage++,this.updateTabContent())}),(o=g.querySelector("#btn-page-last"))==null||o.addEventListener("click",()=>{const s=Math.ceil(u.length/this.state.pageSize);this.state.currentPage=s,this.updateTabContent()}),g.querySelectorAll(".page-btn[data-page]").forEach(s=>{s.addEventListener("click",()=>{this.state.currentPage=Number(s.getAttribute("data-page")),this.updateTabContent()})}),g.querySelectorAll("th.sortable").forEach(s=>{s.addEventListener("click",()=>{const p=s.getAttribute("data-sort");p&&this.handleSort(p)})})}else this.state.activeTab==="rooftops"?Z(e,H,L,u=>{this.navigateTab("network",{dealership:u})}):this.state.activeTab==="reports"&&ee(e,j,V,this.state.activeReportPreset,u=>{this.state.activeReportPreset=u,this.updateTabContent()})}update(){this.updateSidebar(),this.updateHeader(),this.updateKpis(),this.updateTabContent(),this.updateDrawer()}}new te;
