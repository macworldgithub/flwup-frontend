/**
 * Boran Motors CRM - Lead Detail Slide-over Drawer Component
 * Pentana DMS System of Record & Harmony Sales Floor Workflow
 */

export function renderLeadDrawer(container, lead, { onClose, onToggleAI, onAddDiaryEntry, onUpdateQueuedMessage, onDeleteLead, onUpdateStatus }) {
  if (!lead) {
    container.innerHTML = `
      <div class="drawer-backdrop" id="lead-drawer-backdrop">
        <div class="lead-drawer"></div>
      </div>
    `;
    return;
  }

  const formatDateTime = (str) => {
    if (!str) return 'Not recorded';
    try {
      const d = new Date(str);
      return d.toLocaleString('en-AU', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
      });
    } catch {
      return str;
    }
  };

  const isAIOff = lead.ai_status === 'off';
  const diaryList = lead.diary_entries || [];
  const queuedMessages = lead.ai_queued_messages || [];
  const videosSent = lead.videos_sent || [];
  const testDrive = lead.test_drive || { status: 'none', licence_captured: false };
  const tradeIn = lead.trade_in || { status: 'none', value: null };
  const loanCar = lead.loan_car || { status: 'none' };
  const postSales = lead.post_sales_followup || { status: 'n/a' };

  container.innerHTML = `
    <div class="drawer-backdrop open" id="lead-drawer-backdrop">
      <div class="lead-drawer" onclick="event.stopPropagation()">
        
        <!-- Header -->
        <div class="drawer-header">
          <div class="drawer-header-info">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <h2 class="drawer-customer-title">${lead.customer_name || 'Customer Record'}</h2>
              <span class="status-pill ${lead.status || 'following_up'}">
                ${(lead.status || 'following_up').replace(/_/g, ' ')}
              </span>
              <span class="store-badge ${lead.store_code === 'Store 70' ? 'store-70' : 'store-40'}">
                ${lead.store_code || 'Store 70'}
              </span>
            </div>
            <div style="font-size: 12px; color: var(--bm-secondary-text); margin-top: 3px; display: flex; align-items: center; gap: 6px;">
              <span>${lead.dealership_name}</span>
              <span>·</span>
              <span style="font-weight: 600; color: var(--bm-primary-text);">${lead.vehicle_make} ${lead.vehicle_model}</span>
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
                <span class="pentana-id-text">ID: <strong>${lead.pentana_id || 'PENTANA-SYNC'}</strong></span>
                <span class="pentana-store-text">Code: <strong>${lead.store_code || 'Store 70'}</strong> (${lead.dealer_code})</span>
              </div>
            </div>
            <div class="pentana-card-grid">
              <div class="pentana-item">
                <span class="pentana-label">Sales Consultant</span>
                <span class="pentana-val">${lead.owner_name || 'Unassigned'}</span>
              </div>
              <div class="pentana-item">
                <span class="pentana-label">Source System</span>
                <span class="pentana-val">Hard Integration (Direct DMS)</span>
              </div>
              <div class="pentana-item">
                <span class="pentana-label">Lead Created</span>
                <span class="pentana-val">${formatDateTime(lead.created_at)}</span>
              </div>
              <div class="pentana-item">
                <span class="pentana-label">Stock Unit Requested</span>
                <span class="pentana-val">${lead.vehicle_make} ${lead.vehicle_model}</span>
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
                <span class="ai-toggle-label ${isAIOff ? 'off' : 'active'}">
                  ${isAIOff ? 'AI Follow-up Paused (OFF)' : 'AI Follow-up Active (ON)'}
                </span>
                <button class="ai-toggle-btn ${isAIOff ? 'is-off' : 'is-active'}" id="btn-toggle-ai" title="Toggle AI Auto Follow-up for this customer">
                  <div class="ai-toggle-knob"></div>
                  <span>${isAIOff ? 'TURN ON' : 'STOP AI'}</span>
                </button>
              </div>
            </div>

            <div class="ai-status-banner ${isAIOff ? 'banner-off' : 'banner-active'}">
              <div class="ai-status-icon">
                ${isAIOff 
                  ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`
                  : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
                }
              </div>
              <div class="ai-status-text">
                <strong>${isAIOff ? 'Sales rep in direct touch — AI cadence stopped.' : 'AI SMS Cadence Running (Max 3/day)'}</strong>
                <p>
                  ${isAIOff 
                    ? 'AI messaging has been disabled so the sales team can communicate directly without conflicting automated messages.' 
                    : 'Scheduled after hours (after 6:00 PM). Incoming customer replies instantly notify the sales rep without auto-booking.'}
                </p>
              </div>
            </div>

            <!-- Queued & Editable Messages -->
            <div class="ai-queue-box">
              <div class="ai-queue-header">
                <span class="ai-queue-title">Queued & Editable SMS Messages</span>
                <span class="ai-queue-badge">${isAIOff ? 'Paused (0 in queue)' : `${queuedMessages.length} Pending Approval / Dispatch`}</span>
              </div>
              
              ${isAIOff ? `
                <div class="empty-queue-msg">
                  AI is currently turned off. Click "TURN ON" above to resume smart SMS follow-ups.
                </div>
              ` : (
                queuedMessages.length === 0 ? `
                  <div class="empty-queue-msg">No messages queued at this moment. Cadence is waiting for the next after-hours slot.</div>
                ` : `
                  <div class="queued-msg-list">
                    ${queuedMessages.map((msg, index) => `
                      <div class="queued-msg-card" data-msg-id="${msg.id}">
                        <div class="queued-msg-meta">
                          <span class="queued-type-tag">SMS Sequence #${index + 1}</span>
                          <span class="queued-time-tag">Scheduled: After Hours (6:30 PM)</span>
                          <span class="queued-edit-indicator">✎ Editable by Sales</span>
                        </div>
                        <textarea class="queued-msg-textarea" id="queued-msg-text-${msg.id}" rows="2">${msg.content}</textarea>
                        <div class="queued-msg-actions">
                          <button class="btn-msg-save" data-msg-id="${msg.id}">Save Edit</button>
                          <button class="btn-msg-send-now" data-msg-id="${msg.id}">Send SMS Now</button>
                          <button class="btn-msg-dismiss" data-msg-id="${msg.id}">Cancel SMS</button>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                `
              )}
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
              <div class="sales-app-card ${testDrive.licence_captured ? 'active' : ''}">
                <div class="sales-app-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><line x1="15" y1="8" x2="17" y2="8"/><line x1="15" y1="12" x2="17" y2="12"/>
                  </svg>
                </div>
                <div class="sales-app-info">
                  <span class="sales-app-label">Driver's Licence</span>
                  <span class="sales-app-val ${testDrive.licence_captured ? 'verified' : 'pending'}">
                    ${testDrive.licence_captured ? '✓ Photographed & Captured' : '○ Pending Mobile Scan'}
                  </span>
                  <span class="sales-app-sub">Reused for Test Drive & Loan Cars</span>
                </div>
              </div>

              <!-- Test Drive -->
              <div class="sales-app-card ${testDrive.status === 'completed' ? 'active' : ''}">
                <div class="sales-app-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                  </svg>
                </div>
                <div class="sales-app-info">
                  <span class="sales-app-label">Test Drive</span>
                  <span class="sales-app-val">
                    ${testDrive.status === 'completed' ? '✓ Completed' : (testDrive.status === 'scheduled' ? '⏱ Scheduled' : 'Not Requested')}
                  </span>
                  <span class="sales-app-sub">${testDrive.licence_captured ? 'DMS Agreement Linked' : 'Requires Licence'}</span>
                </div>
              </div>

              <!-- Trade-in Valuation -->
              <div class="sales-app-card ${tradeIn.status === 'valued' ? 'active' : ''}">
                <div class="sales-app-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div class="sales-app-info">
                  <span class="sales-app-label">Trade-In Appraisal</span>
                  <span class="sales-app-val">
                    ${tradeIn.status === 'valued' ? (tradeIn.value ? `$${tradeIn.value.toLocaleString()}` : 'Appraisal Logged') : 'No Trade Logged'}
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
                  <span class="sales-app-val">${loanCar.status === 'assigned' ? 'Assigned' : 'None Active'}</span>
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
              ${videosSent.length > 0 ? videosSent.map(v => `
                <div class="video-thread-item">
                  <div class="video-thumb-preview">
                    <div class="video-play-badge">▶</div>
                    <span class="video-snippet-tag">Snippet Blend (No time cap)</span>
                  </div>
                  <div class="video-info">
                    <span class="video-title">Personalized Walkaround — ${lead.vehicle_make} ${lead.vehicle_model}</span>
                    <span class="video-meta">Sent via SMS to customer • Back office verified</span>
                    <span class="video-status-text ${v.interacted ? 'viewed' : ''}">
                      ${v.interacted ? `👁 Customer viewed video on ${formatDateTime(v.interacted_at)}` : '⏳ Delivered via SMS (Pending view)'}
                    </span>
                  </div>
                </div>
              `).join('') : `
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
              ${diaryList.length === 0 ? `
                <div class="diary-empty-note">No diary entries recorded yet.</div>
              ` : diaryList.map(entry => `
                <div class="diary-entry-card">
                  <div class="diary-entry-header">
                    <span class="diary-author">${entry.user || 'Sales Rep'}</span>
                    <span class="diary-date">${formatDateTime(entry.date)}</span>
                  </div>
                  <div class="diary-content">${entry.note}</div>
                </div>
              `).join('')}
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
                <strong>${lead.status === 'sold' ? 'Active 4-Stage Cadence (1W / 1M / 6M / 1Y)' : 'Pending Vehicle Sale & Delivery'}</strong>
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
          <div style="display: flex; gap: 8px;">
            <button class="btn-danger-outline" id="btn-delete-lead-drawer" style="display: flex; align-items: center; gap: 6px; padding: 7px 12px; border-radius: 6px; border: 1px solid #ef4444; background: rgba(239, 68, 68, 0.08); color: #ef4444; font-size: 13px; font-weight: 600; cursor: pointer;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              <span>Delete Lead</span>
            </button>
            <button class="btn-primary-red" id="btn-close-drawer-bottom">
              <span>Done</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach event handlers
  container.querySelector('#lead-drawer-backdrop')?.addEventListener('click', onClose);
  container.querySelector('#btn-drawer-close')?.addEventListener('click', onClose);
  container.querySelector('#btn-close-drawer-bottom')?.addEventListener('click', onClose);

  // Delete Lead
  container.querySelector('#btn-delete-lead-drawer')?.addEventListener('click', () => {
    if (confirm(`Are you sure you want to permanently delete lead ${lead.customer_name} (${lead.deal_id}) from the database?`)) {
      if (onDeleteLead) {
        onDeleteLead(lead.deal_id);
      }
    }
  });

  // Copy Pentana ID
  container.querySelector('#btn-copy-pentana-id')?.addEventListener('click', () => {
    const idToCopy = lead.pentana_id || lead.deal_id;
    navigator.clipboard.writeText(idToCopy);
    alert('Pentana ID copied to clipboard: ' + idToCopy);
  });

  // AI Toggle Button
  container.querySelector('#btn-toggle-ai')?.addEventListener('click', () => {
    const newStatus = isAIOff ? 'active' : 'off';
    if (onToggleAI) {
      onToggleAI(lead.deal_id, newStatus);
    }
  });

  // Add Diary Note
  const diaryBtn = container.querySelector('#btn-add-diary-note');
  const diaryInput = container.querySelector('#diary-note-input');
  const diaryCategory = container.querySelector('#diary-category-select');

  const submitDiaryNote = () => {
    const text = diaryInput?.value?.trim();
    if (!text) return;
    const fullNote = `[${diaryCategory?.value || 'General Note'}] ${text}`;
    if (onAddDiaryEntry) {
      onAddDiaryEntry(lead.deal_id, fullNote);
    }
    if (diaryInput) diaryInput.value = '';
  };

  diaryBtn?.addEventListener('click', submitDiaryNote);
  diaryInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitDiaryNote();
  });

  // Save Queued Message Edits
  container.querySelectorAll('.btn-msg-save').forEach(btn => {
    btn.addEventListener('click', () => {
      const msgId = btn.getAttribute('data-msg-id');
      const textarea = container.querySelector(`#queued-msg-text-${msgId}`);
      if (textarea && onUpdateQueuedMessage) {
        onUpdateQueuedMessage(lead.deal_id, Number(msgId), textarea.value);
        alert('Queued AI SMS updated successfully.');
      }
    });
  });

  // Send SMS Now
  container.querySelectorAll('.btn-msg-send-now').forEach(btn => {
    btn.addEventListener('click', () => {
      const msgId = btn.getAttribute('data-msg-id');
      const textarea = container.querySelector(`#queued-msg-text-${msgId}`);
      alert(`SMS sent to customer: "${textarea?.value || ''}"`);
      if (onAddDiaryEntry) {
        onAddDiaryEntry(lead.deal_id, `[SMS Sent Instantly] ${textarea?.value || ''}`);
      }
    });
  });

  // Cancel SMS
  container.querySelectorAll('.btn-msg-dismiss').forEach(btn => {
    btn.addEventListener('click', () => {
      const msgId = btn.getAttribute('data-msg-id');
      if (confirm('Cancel this scheduled SMS message?')) {
        if (onUpdateQueuedMessage) {
          onUpdateQueuedMessage(lead.deal_id, Number(msgId), null, true); // remove
        }
      }
    });
  });

  // Mock record video
  container.querySelector('#btn-mock-record-video')?.addEventListener('click', () => {
    const videoUrl = prompt('Enter walkaround video title or notes to send via SMS thread:', '60s Walkaround of ' + lead.vehicle_make + ' ' + lead.vehicle_model);
    if (videoUrl) {
      lead.videos_sent = lead.videos_sent || [];
      lead.videos_sent.push({
        id: 'v-' + Date.now(),
        sent_via: 'sms',
        interacted: false,
        interacted_at: null,
        is_snippet_blend: true,
        no_time_cap: true
      });
      if (onAddDiaryEntry) {
        onAddDiaryEntry(lead.deal_id, `[Video SMS Walkaround Sent] Video uploaded and sent on unified customer SMS thread: "${videoUrl}"`);
      }
    }
  });
}
