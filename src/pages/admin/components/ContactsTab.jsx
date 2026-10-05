import React, { useState } from 'react';
import { 
  Search, Mail, Trash2, CheckCircle2, MessageSquare, 
  Eye, X, Reply, Download, Clock, Filter 
} from 'lucide-react';
import { api } from '../../../services/api';

export default function ContactsTab({ 
  contacts = [], 
  onRefresh, 
  onSendBulkEmail, 
  onShowToast 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewModalItem, setViewModalItem] = useState(null);

  const filtered = contacts.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      item.name?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.subject?.toLowerCase().includes(term) ||
      item.message?.toLowerCase().includes(term);

    return matchesStatus && matchesSearch;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filtered.map((item) => item._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateContactStatus(id, newStatus);
      if (onShowToast) onShowToast({ type: 'success', message: `Inquiry marked as ${newStatus}` });
      onRefresh();
    } catch (err) {
      if (onShowToast) onShowToast({ type: 'error', message: err.message });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact inquiry?')) return;
    try {
      await api.deleteContact(id);
      setSelectedIds(selectedIds.filter((item) => item !== id));
      if (viewModalItem?._id === id) setViewModalItem(null);
      if (onShowToast) onShowToast({ type: 'success', message: 'Inquiry deleted successfully' });
      onRefresh();
    } catch (err) {
      if (onShowToast) onShowToast({ type: 'error', message: err.message });
    }
  };

  const handleBulkEmail = () => {
    const selectedQueries = contacts.filter((c) => selectedIds.includes(c._id));
    const emails = selectedQueries.map((c) => c.email);
    if (emails.length === 0) return;
    onSendBulkEmail(emails);
  };

  const handleExportCSV = () => {
    if (contacts.length === 0) return;
    const headers = ['Sender Name', 'Email', 'Subject', 'Message', 'Status', 'Date'];
    const rows = contacts.map(c => [
      `"${c.name || ''}"`,
      `"${c.email || ''}"`,
      `"${c.subject || ''}"`,
      `"${(c.message || '').replace(/"/g, '""')}"`,
      `"${c.status || 'unread'}"`,
      `"${new Date(c.createdAt).toLocaleString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `contact_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      
      {/* Search and Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search inquiries by name, email, subject, keyword..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 bg-slate-50/50"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 font-medium focus:outline-hidden focus:ring-2 focus:ring-slate-900"
          >
            <option value="all">All Inquiries</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>

          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkEmail}
              className="px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Selected ({selectedIds.length})</span>
            </button>
          )}

          <button
            onClick={handleExportCSV}
            title="Download CSV"
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>

      </div>

      {/* Main Inquiries Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="p-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={filtered.length > 0 && selectedIds.length === filtered.length}
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                  />
                </th>
                <th className="p-3.5">Sender Details</th>
                <th className="p-3.5">Subject</th>
                <th className="p-3.5">Message Snippet</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No contact inquiries found matching criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr 
                    key={item._id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      selectedIds.includes(item._id) ? 'bg-slate-50' : ''
                    } ${item.status === 'unread' ? 'font-medium bg-blue-50/20' : ''}`}
                  >
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item._id)}
                        onChange={() => handleToggleSelect(item._id)}
                        className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                      />
                    </td>

                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="text-slate-500 font-mono text-[11px]">{item.email}</div>
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-800 font-semibold">{item.subject || 'General Inquiry'}</span>
                    </td>

                    <td className="p-3.5 max-w-xs truncate text-slate-600">
                      {item.message}
                    </td>

                    <td className="p-3.5 text-slate-500 text-[11px] whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3.5">
                      <select
                        value={item.status || 'unread'}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className={`px-2 py-1 rounded text-[11px] font-semibold border cursor-pointer ${
                          item.status === 'replied' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : item.status === 'read'
                            ? 'bg-slate-100 text-slate-700 border-slate-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>

                    <td className="p-3.5 text-right space-x-1">
                      <button
                        onClick={() => {
                          setViewModalItem(item);
                          if (item.status === 'unread') {
                            handleStatusChange(item._id, 'read');
                          }
                        }}
                        title="View Full Message"
                        className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onSendBulkEmail([item.email], `Re: ${item.subject || 'Inquiry Response'}`)}
                        title="Reply via Email"
                        className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <Reply className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        title="Delete Inquiry"
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Showing {filtered.length} of {contacts.length} inquiries</span>
          <span>Official IIT Roorkee Desk Database</span>
        </div>
      </div>

      {/* View Message Modal */}
      {viewModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Inquiry from {viewModalItem.name}</h3>
                <p className="text-xs text-slate-500">{viewModalItem.email}</p>
              </div>
              <button 
                onClick={() => setViewModalItem(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Subject Area</span>
              <p className="text-slate-900 font-semibold">{viewModalItem.subject || 'General Inquiry'}</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1.5">Full Message</span>
              <p className="text-slate-800 whitespace-pre-line leading-relaxed">
                {viewModalItem.message}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-[11px] text-slate-400">
                Received: {new Date(viewModalItem.createdAt).toLocaleString()}
              </span>
              <button
                onClick={() => {
                  setViewModalItem(null);
                  onSendBulkEmail([viewModalItem.email], `Re: ${viewModalItem.subject || 'Academic Inquiry'}`);
                }}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Reply className="w-3.5 h-3.5" />
                <span>Compose Reply</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
