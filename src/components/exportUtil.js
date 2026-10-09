/**
 * CSV & JSON Export Utility for Boran Motors CRM
 */

export function exportLeadsToCSV(leadsList, filename = 'boran_motors_network_leads.csv') {
  if (!leadsList || !leadsList.length) {
    alert('No records available to export.');
    return;
  }

  const headers = [
    'Deal ID',
    'Dealership Name',
    'Dealer Code',
    'Customer Name',
    'Vehicle Make',
    'Vehicle Model',
    'Assigned Owner',
    'Source',
    'Status',
    'Created At',
    'First Contact At',
    'Minutes to First Contact',
    'First Touch At',
    'Minutes to First Touch',
    'Follow Ups Sent',
    'First Reply At',
    'Sold At',
    'Lost Reason',
    'Days to Sold'
  ];

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '';
    const str = String(val).trim();
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = leadsList.map(lead => [
    escapeCSV(lead.deal_id),
    escapeCSV(lead.dealership_name),
    escapeCSV(lead.dealer_code),
    escapeCSV(lead.customer_name),
    escapeCSV(lead.vehicle_make),
    escapeCSV(lead.vehicle_model),
    escapeCSV(lead.owner_name),
    escapeCSV(lead.source),
    escapeCSV(lead.status),
    escapeCSV(lead.created_at),
    escapeCSV(lead.first_contact_at),
    escapeCSV(lead.minutes_to_first_contact),
    escapeCSV(lead.first_touch_at),
    escapeCSV(lead.minutes_to_first_touch),
    escapeCSV(lead.follow_ups_sent),
    escapeCSV(lead.first_reply_at),
    escapeCSV(lead.sold_at),
    escapeCSV(lead.lost_reason),
    escapeCSV(lead.days_to_sold)
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportLeadsToJSON(leadsList, filename = 'boran_motors_network_leads.json') {
  if (!leadsList || !leadsList.length) {
    alert('No records available to export.');
    return;
  }
  const jsonContent = JSON.stringify(leadsList, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
