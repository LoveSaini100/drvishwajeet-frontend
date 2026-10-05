import React, { useState } from 'react';
import { 
  Search, Filter, Mail, Trash2, CheckCircle, Clock, 
  ExternalLink, Download, User, Calendar, MapPin, 
  Briefcase, Phone, MessageSquare, X, Eye, Cake
} from 'lucide-react';
import { api } from '../../../services/api';

export default function RegistrationsTab({ 
  registrations = [], 
  onRefresh, 
  onSendBulkEmail, 
  onShowToast 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewModalItem, setViewModalItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Client-side filtering
  const filtered = registrations.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      item.name?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.whatsapp?.toLowerCase().includes(term) ||
      item.occupation?.toLowerCase().includes(term) ||
      item.address?.toLowerCase().includes(term);

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
      await api.updateRegistrationStatus(id, newStatus);
      if (onShowToast) onShowToast({ type: 'success', message: `Status changed to ${newStatus}` });
      onRefresh();
    } catch (err) {
      if (onShowToast) onShowToast({ type: 'error', message: err.message });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this applicant registration?')) return;
    try {
      setIsDeleting(true);
      await api.deleteRegistration(id);
      setSelectedIds(selectedIds.filter((item) => item !== id));
      if (viewModalItem?._id === id) setViewModalItem(null);
      if (onShowToast) onShowToast({ type: 'success', message: 'Registration deleted successfully' });
      onRefresh();
    } catch (err) {
      if (onShowToast) onShowToast({ type: 'error', message: err.message });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkEmail = () => {
    const selectedStudents = registrations.filter((r) => selectedIds.includes(r._id));
    const emails = selectedStudents.map((r) => r.email);
    if (emails.length === 0) return;
    onSendBulkEmail(emails);
  };

  const handleExportCSV = () => {
    if (registrations.length === 0) return;
    const headers = ['Full Name', 'Email', 'WhatsApp', 'DOB', 'Occupation', 'Address', 'Status', 'Submitted At'];
    const rows = registrations.map(r => [
      `"${r.name || ''}"`,
      `"${r.email || ''}"`,
      `"${r.whatsapp || ''}"`,
      `"${r.dob || ''}"`,
      `"${r.occupation || ''}"`,
      `"${r.address || ''}"`,
      `"${r.status || 'new'}"`,
      `"${new Date(r.createdAt).toLocaleString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `webinar_applicants_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const checkIsBirthday = (dob) => {
    if (!dob) return false;
    const today = new Date();
    const curM = String(today.getMonth() + 1).padStart(2, '0');
    const curD = String(today.getDate()).padStart(2, '0');
    if (dob.includes('-')) {
      const p = dob.split('-');
      if (p.length === 3) {
        const m = (p[0].length === 4 ? p[1] : p[1]).padStart(2, '0');
        const d = (p[0].length === 4 ? p[2] : p[0]).padStart(2, '0');
        return m === curM && d === curD;
      }
    }
    return false;
  };

  return (
    <div className="space-y-4">
      
      {/* Top Controls Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, phone, occupation, city..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 bg-slate-50/50"
          />
        </div>

        {/* Filter & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 font-medium focus:outline-hidden focus:ring-2 focus:ring-slate-900"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="contacted">Contacted</option>
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

      {/* Main Table Card */}
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
                <th className="p-3.5">Candidate</th>
                <th className="p-3.5">Contact / WhatsApp</th>
                <th className="p-3.5">DOB & Age</th>
                <th className="p-3.5">Role / Location</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No applicant registrations match your filter.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const isBday = checkIsBirthday(item.dob);
                  return (
                    <tr 
                      key={item._id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        selectedIds.includes(item._id) ? 'bg-slate-50' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="p-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item._id)}
                          onChange={() => handleToggleSelect(item._id)}
                          className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                        />
                      </td>

                      {/* Candidate Name & Email */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{item.name}</span>
                              {isBday && (
                                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded" title="Birthday Today!">
                                  🎂 Today
                                </span>
                              )}
                            </div>
                            <span className="text-slate-500 font-mono text-[11px] block">{item.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* WhatsApp / Phone */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-700">{item.whatsapp}</span>
                          <a
                            href={`https://wa.me/${item.whatsapp?.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-emerald-600 transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>

                      {/* DOB */}
                      <td className="p-3.5">
                        <span className="text-slate-700 font-medium">{item.dob || '—'}</span>
                      </td>

                      {/* Role & Location */}
                      <td className="p-3.5">
                        <div className="max-w-xs">
                          <p className="font-medium text-slate-800 truncate">{item.occupation}</p>
                          <p className="text-[11px] text-slate-500 truncate">{item.address}</p>
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="p-3.5">
                        <select
                          value={item.status || 'new'}
                          onChange={(e) => handleStatusChange(item._id, e.target.value)}
                          className={`px-2 py-1 rounded text-[11px] font-semibold border cursor-pointer ${
                            item.status === 'reviewed' 
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : item.status === 'contacted'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : item.status === 'archived'
                              ? 'bg-slate-100 text-slate-600 border-slate-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="contacted">Contacted</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => setViewModalItem(item)}
                          title="View Full Application"
                          className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onSendBulkEmail([item.email])}
                          title="Send Email"
                          className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          title="Delete Registration"
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Showing {filtered.length} of {registrations.length} registrations</span>
          <span>Official IIT Roorkee Desk Database</span>
        </div>
      </div>

      {/* Details Modal */}
      {viewModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">{viewModalItem.name}</h3>
                <p className="text-xs text-slate-500">Applicant Details & Statement</p>
              </div>
              <button 
                onClick={() => setViewModalItem(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Address</span>
                <span className="font-semibold text-slate-800 break-all">{viewModalItem.email}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">WhatsApp Number</span>
                <span className="font-semibold text-slate-800">{viewModalItem.whatsapp}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Date of Birth</span>
                <span className="font-semibold text-slate-800">{viewModalItem.dob}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Occupation / Role</span>
                <span className="font-semibold text-slate-800">{viewModalItem.occupation}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Address / Location</span>
              <p className="text-slate-700">{viewModalItem.address}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Research Interest / Statement</span>
              <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                {viewModalItem.message || 'No statement provided.'}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-[11px] text-slate-400">
                Submitted: {new Date(viewModalItem.createdAt).toLocaleString()}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setViewModalItem(null);
                    onSendBulkEmail([viewModalItem.email]);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg inline-flex items-center gap-1 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
