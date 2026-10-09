/**
 * Boran Motors CRM - Dealership Rooftops View Component
 */

export function renderRooftopsView(container, rooftops, allLeads, onSelectRooftop) {
  // Aggregate stats per dealership
  const statsByDealership = {};

  rooftops.forEach(r => {
    const leads = allLeads.filter(l => l.dealership_id === r.id || l.dealership_name === r.name);
    const total = leads.length;
    const fastContact = leads.filter(l => l.minutes_to_first_contact !== null && l.minutes_to_first_contact <= 15).length;
    const fastRate = total > 0 ? ((fastContact / total) * 100).toFixed(1) : 0;
    const sold = leads.filter(l => l.status === 'sold').length;
    const soldRate = total > 0 ? ((sold / total) * 100).toFixed(1) : 0;
    
    // Distinct sales reps
    const reps = Array.from(new Set(leads.map(l => l.owner_name).filter(Boolean)));

    statsByDealership[r.id] = {
      ...r,
      leadCount: total,
      fastRate,
      soldCount: sold,
      soldRate,
      repsCount: reps.length,
      topRep: reps[0] || 'Unassigned'
    };
  });

  const getDealershipLogoStyle = (name = '') => {
    const lower = name.toLowerCase();
    if (lower.includes('byd')) return { color: '#0284C7', bg: '#E0F2FE', initial: 'BYD' };
    if (lower.includes('chery')) return { color: '#C8102E', bg: '#FEE2E2', initial: 'CH' };
    if (lower.includes('hyundai')) return { color: '#0F766E', bg: '#CCFBF1', initial: 'HY' };
    if (lower.includes('kia')) return { color: '#991B1B', bg: '#FFE4E6', initial: 'KIA' };
    return { color: '#C8102E', bg: '#FEE2E2', initial: 'BM' };
  };

  container.innerHTML = `
    <div class="rooftops-container" style="display: flex; flex-direction: column; gap: 20px;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h2 style="font-family: var(--font-heading); font-size: 18px; font-weight: 700; color: var(--bm-primary-text);">
            Dealership Rooftops (${rooftops.length})
          </h2>
          <p style="font-size: 12.5px; color: var(--bm-secondary-text);">
            Active dealership network participating in automated sales execution and follow-up cadences.
          </p>
        </div>
      </div>

      <div class="rooftops-grid">
        ${rooftops.map(r => {
          const stats = statsByDealership[r.id] || {};
          const logoStyle = getDealershipLogoStyle(r.name);

          return `
            <div class="rooftop-card">
              <div class="rooftop-card-header">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: ${logoStyle.bg}; color: ${logoStyle.color}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px; font-family: var(--font-heading);">
                    ${logoStyle.initial}
                  </div>
                  <div>
                    <h3 class="rooftop-brand-title">${r.name}</h3>
                    <span style="font-size: 11px; color: var(--bm-secondary-text);">ID: ${r.id.slice(0, 8)}...</span>
                  </div>
                </div>
                <span class="rooftop-tier-badge ${r.tier || 'pro'}">${r.tier || 'PRO'}</span>
              </div>

              <div class="rooftop-metrics-row">
                <div class="rooftop-metric-item">
                  <span class="rooftop-metric-val">${stats.leadCount || 0}</span>
                  <span class="rooftop-metric-lbl">Total Leads</span>
                </div>
                <div class="rooftop-metric-item">
                  <span class="rooftop-metric-val" style="color: #059669;">${stats.fastRate}%</span>
                  <span class="rooftop-metric-lbl">&le;15m Response</span>
                </div>
                <div class="rooftop-metric-item">
                  <span class="rooftop-metric-val" style="color: var(--bm-primary-red);">${stats.soldRate}%</span>
                  <span class="rooftop-metric-lbl">Sold Rate</span>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: var(--bm-secondary-text);">
                <div style="display: flex; justify-content: space-between;">
                  <span>Post-Sale Follow-up Cadence:</span>
                  <strong style="color: ${r.has_post_sale_template ? '#059669' : '#9CA3AF'};">
                    ${r.has_post_sale_template ? '✓ Enabled' : '○ Disabled'}
                  </strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Active Sales Floor Reps:</span>
                  <strong style="color: var(--bm-primary-text);">${stats.repsCount} Reps</strong>
                </div>
              </div>

              <div class="rooftop-card-actions">
                <span style="font-size: 11.5px; color: var(--bm-secondary-text);">Status: <strong style="color: #059669;">Active</strong></span>
                <button class="btn-primary-red" style="height: 32px; font-size: 12px; padding: 0 12px;" data-rooftop-name="${r.name}">
                  <span>View Leads &rarr;</span>
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Attach button events
  container.querySelectorAll('button[data-rooftop-name]').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-rooftop-name');
      onSelectRooftop(name);
    });
  });
}
