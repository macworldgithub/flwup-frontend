/**
 * Boran Motors CRM - Reports & Scoreboards Component
 */

export function renderReportsView(container, reportsData, catalog, activePreset = 'network_scoreboard', onSelectPreset) {
  const presetsList = [
    { id: 'network_scoreboard', name: 'Network Scoreboard', icon: '🏆' },
    { id: 'rep_scorecard', name: 'Sales Rep Leaderboard', icon: '👤' },
    { id: 'speed_to_lead', name: 'Speed to Lead', icon: '⚡' },
    { id: 'contact_coverage', name: 'Contact Coverage', icon: '🎯' },
    { id: 'model_demand', name: 'Vehicle Model Demand', icon: '🚗' },
    { id: 'sold_model_mix', name: 'Sold Model Mix', icon: '💎' },
    { id: 'lost_reasons', name: 'Lost Deal Reasons', icon: '📉' },
    { id: 'source_roi', name: 'Lead Source ROI', icon: '📊' },
    { id: 'settled_ratio_trend', name: 'Lead-to-Sold Trend', icon: '📈' },
    { id: 'conversation_to_appointment', name: 'Conversation to Appt', icon: '📅' },
    { id: 'speed_vs_close', name: 'Speed vs Close Rate', icon: '⏱' },
    { id: 'persistence', name: 'Follow-up Persistence', icon: '🔄' },
    { id: 'response_gaps', name: 'Response Gaps', icon: '⏳' },
    { id: 'untouched_leads', name: 'Untouched Leads', icon: '⚠️' }
  ];

  const currentReport = reportsData[activePreset] || reportsData['network_scoreboard'] || {};
  const currentCatalogPreset = catalog?.presets?.find(p => p.id === activePreset) || {};

  const columns = currentReport.columns || [];
  const rows = currentReport.rows || (Array.isArray(currentReport) ? currentReport : []);
  const totals = currentReport.totals || null;

  // Format cell value according to column kind / format
  const formatCell = (val, col) => {
    if (val === null || val === undefined) return '—';
    if (col.format === 'percent') {
      const num = typeof val === 'number' ? (val <= 1 ? val * 100 : val) : parseFloat(val);
      return isNaN(num) ? val : `${num.toFixed(1)}%`;
    }
    if (col.format === 'minutes') {
      return `${Math.round(val)}m`;
    }
    if (col.format === 'integer') {
      return typeof val === 'number' ? val.toLocaleString() : val;
    }
    return val;
  };

  container.innerHTML = `
    <div class="reports-container">
      <!-- Report Selector Pills -->
      <div class="reports-nav-pills">
        ${presetsList.map(p => `
          <button class="report-nav-pill ${activePreset === p.id ? 'active' : ''}" data-preset="${p.id}">
            <span>${p.icon}</span>
            <span>${p.name}</span>
          </button>
        `).join('')}
      </div>

      <!-- Main Report Card -->
      <div class="report-card-main">
        <div class="report-meta-header">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
            <div>
              <h2 class="report-heading">${currentCatalogPreset.name || activePreset.replace(/_/g, ' ').toUpperCase()}</h2>
              <p class="report-question">${currentCatalogPreset.question || 'Executive reporting analysis across Boran Motors dealerships.'}</p>
            </div>
            <span class="dealership-badge" style="background: var(--bm-light-red); color: var(--bm-primary-red); font-size: 12px; padding: 4px 10px;">
              Executive Preset
            </span>
          </div>
        </div>

        ${currentCatalogPreset.so_what ? `
          <div class="report-insight-box">
            <div class="report-insight-title">Strategic Dealership Insight</div>
            ${currentCatalogPreset.so_what}
          </div>
        ` : ''}

        <!-- Report Data Table -->
        <div class="table-responsive-wrapper" style="border: 1px solid var(--bm-border-grey); border-radius: var(--radius-md);">
          <table class="crm-table">
            <thead>
              <tr>
                ${columns.map(col => `
                  <th style="${col.format === 'integer' || col.format === 'percent' || col.format === 'minutes' ? 'text-align: right;' : 'text-align: left;'}">
                    ${col.label || col.key}
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${rows.length === 0 ? `
                <tr>
                  <td colspan="${columns.length || 1}" style="text-align: center; padding: 32px; color: var(--bm-secondary-text);">
                    No data available for this report period.
                  </td>
                </tr>
              ` : rows.map(row => `
                <tr class="lead-row" style="cursor: default;">
                  ${columns.map(col => {
                    const val = row[col.key];
                    const isNumeric = col.format === 'integer' || col.format === 'percent' || col.format === 'minutes';
                    const isHighlight = col.key.includes('rate') || col.key.includes('close') || col.key.includes('sold');
                    
                    return `
                      <td style="${isNumeric ? 'text-align: right;' : 'text-align: left;'}">
                        <span style="${isHighlight ? 'font-weight: 700; color: var(--bm-primary-red);' : ''}">
                          ${formatCell(val, col)}
                        </span>
                      </td>
                    `;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
            ${totals ? `
              <tfoot>
                <tr style="background: var(--bm-light-grey); font-weight: 700; border-top: 2px solid var(--bm-border-grey);">
                  ${columns.map((col, idx) => {
                    const isNumeric = col.format === 'integer' || col.format === 'percent' || col.format === 'minutes';
                    if (idx === 0) return `<td>Group Totals / Average</td>`;
                    const val = totals[col.key];
                    return `
                      <td style="${isNumeric ? 'text-align: right;' : 'text-align: left;'}">
                        ${formatCell(val, col)}
                      </td>
                    `;
                  }).join('')}
                </tr>
              </tfoot>
            ` : ''}
          </table>
        </div>
      </div>
    </div>
  `;

  // Attach nav pill listeners
  container.querySelectorAll('.report-nav-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const presetId = pill.getAttribute('data-preset');
      onSelectPreset(presetId);
    });
  });
}
