import React, { useState, useEffect } from 'react';
import { 
  Mail, Send, Users, Cake, Check, AlertCircle, 
  Clock, FileText, Sparkles, X, ChevronDown, CheckCircle2 
} from 'lucide-react';
import { api } from '../../../services/api';

export default function EmailComposeTab({ 
  initialRecipients = [], 
  initialSubject = '', 
  initialMessage = '',
  registrations = [],
  contacts = [],
  birthdays = [],
  onShowToast 
}) {
  const [recipientInput, setRecipientInput] = useState('');
  const [recipientsList, setRecipientsList] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [emailLogs, setEmailLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // Sync initial props
  useEffect(() => {
    if (initialRecipients && initialRecipients.length > 0) {
      setRecipientsList(Array.from(new Set(initialRecipients)));
    }
    if (initialSubject) {
      setSubject(initialSubject);
    }
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialRecipients, initialSubject, initialMessage]);

  // Load email history logs
  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      setLoadingLogs(true);
      const res = await api.getEmailLogs();
      if (res.success) {
        setEmailLogs(res.data || []);
      }
    } catch (e) {
      console.warn('Could not load email logs:', e);
    } finally {
      setLoadingLogs(false);
    }
  };

  const handleAddManualEmails = () => {
    if (!recipientInput.trim()) return;
    const splitEmails = recipientInput
      .split(/[,;\s]+/)
      .map(e => e.trim().toLowerCase())
      .filter(e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));

    if (splitEmails.length === 0) {
      if (onShowToast) onShowToast({ type: 'error', message: 'No valid email addresses detected.' });
      return;
    }

    setRecipientsList(prev => Array.from(new Set([...prev, ...splitEmails])));
    setRecipientInput('');
  };

  const handleRemoveRecipient = (emailToRemove) => {
    setRecipientsList(prev => prev.filter(e => e !== emailToRemove));
  };

  // Quick Preset Handlers
  const handleSelectAllRegistered = () => {
    const emails = registrations.map(r => r.email).filter(Boolean);
    if (emails.length === 0) {
      if (onShowToast) onShowToast({ type: 'info', message: 'No registered student emails found.' });
      return;
    }
    setRecipientsList(Array.from(new Set([...recipientsList, ...emails])));
    if (onShowToast) onShowToast({ type: 'success', message: `Added ${emails.length} registered student emails` });
  };

  const handleSelectAllContacts = () => {
    const emails = contacts.map(c => c.email).filter(Boolean);
    if (emails.length === 0) {
      if (onShowToast) onShowToast({ type: 'info', message: 'No contact inquiry emails found.' });
      return;
    }
    setRecipientsList(Array.from(new Set([...recipientsList, ...emails])));
    if (onShowToast) onShowToast({ type: 'success', message: `Added ${emails.length} contact inquiry emails` });
  };

  const handleSelectTodayBirthdays = () => {
    const emails = birthdays.map(b => b.email).filter(Boolean);
    if (emails.length === 0) {
      if (onShowToast) onShowToast({ type: 'info', message: 'No birthdays for today.' });
      return;
    }
    setRecipientsList(Array.from(new Set([...recipientsList, ...emails])));
    setSubject("Warm Birthday Greetings from Dr. Vishwajeet's Office");
    setMessage(`Dear Student,\n\nOn behalf of Dr. Vishwajeet and our research team at IIT Roorkee, we extend our warmest wishes on your birthday! 🎉\n\nMay this year be filled with scholarly achievements, inspiring discoveries, and boundless success.\n\nWarm regards,\nDr. Vishwajeet\nFaculty & Ramanujan Fellow, IIT Roorkee`);
    if (onShowToast) onShowToast({ type: 'success', message: `Added ${emails.length} birthday student(s) & prepared greeting!` });
  };

  const handleApplyTemplate = (type) => {
    switch (type) {
      case 'webinar':
        setSubject("Upcoming Webinar Details & Joining Link - Dr. Vishwajeet, IIT Roorkee");
        setMessage(`Dear Scholar / Applicant,\n\nThank you for registering for the upcoming Webinar & Research Mentorship Session hosted by Dr. Vishwajeet.\n\nHere are the session details:\n• Topic: Clean Energy Innovations, Waste-to-Gasification & International Ph.D. Pathways\n• Session Link: https://webinar.drvishwajeet.com/session\n• Platform: Google Meet / MS Teams\n\nPlease join 5 minutes prior to the scheduled time.\n\nWarm regards,\nDr. Vishwajeet\nFaculty Member, IIT Roorkee`);
        break;
      case 'birthday':
        setSubject("Happy Birthday from Dr. Vishwajeet & IIT Roorkee Team!");
        setMessage(`Dear Student,\n\nWe wish you a wonderful and happy birthday! 🎂\n\nMay your academic and research pursuits flourish in the coming year.\n\nWarm regards,\nDr. Vishwajeet\nIIT Roorkee`);
        break;
      case 'mentorship':
        setSubject("Notice regarding Research Supervision & Mentorship Discussion");
        setMessage(`Dear Student,\n\nThank you for reaching out regarding academic mentorship and research collaboration. We have reviewed your initial background and statement.\n\nPlease share your updated CV and a brief 1-page research proposal for further evaluation.\n\nSincerely,\nDr. Vishwajeet\nDepartment of Mechanical & Industrial Engineering\nIIT Roorkee`);
        break;
      default:
        break;
    }
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    
    // Add any pending email in input box
    let finalRecipients = [...recipientsList];
    if (recipientInput.trim()) {
      const extra = recipientInput
        .split(/[,;\s]+/)
        .map(e => e.trim().toLowerCase())
        .filter(e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
      finalRecipients = Array.from(new Set([...finalRecipients, ...extra]));
    }

    if (finalRecipients.length === 0) {
      if (onShowToast) onShowToast({ type: 'error', message: 'Please add at least one recipient email address.' });
      return;
    }

    if (!subject.trim()) {
      if (onShowToast) onShowToast({ type: 'error', message: 'Please provide an email subject.' });
      return;
    }

    if (!message.trim()) {
      if (onShowToast) onShowToast({ type: 'error', message: 'Please provide email message content.' });
      return;
    }

    setIsSending(true);

    try {
      const res = await api.sendEmail({
        recipients: finalRecipients,
        subject: subject.trim(),
        message: message.trim(),
      });

      if (onShowToast) {
        onShowToast({
          type: 'success',
          message: res.message || `Email dispatched to ${finalRecipients.length} recipient(s)!`
        });
      }

      // Reset form
      setRecipientsList([]);
      setRecipientInput('');
      setSubject('');
      setMessage('');
      
      // Reload sent history
      loadLogs();
    } catch (err) {
      console.error('Send email error:', err);
      if (onShowToast) {
        onShowToast({
          type: 'error',
          message: err.message || 'Failed to dispatch email. Check server log.'
        });
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
        
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-slate-700" />
            <span>Broadcast & Multi-Recipient Email Center</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Compose and dispatch official academic emails to multiple recipients, all applicants, or specific students at once.
          </p>
        </div>

        {/* Quick Add Presets Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 mr-1">Quick Add:</span>
          
          <button
            type="button"
            onClick={handleSelectAllRegistered}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-slate-600" />
            <span>All Registered Students ({registrations.length})</span>
          </button>

          <button
            type="button"
            onClick={handleSelectAllContacts}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-slate-600" />
            <span>All Contact Senders ({contacts.length})</span>
          </button>

          <button
            type="button"
            onClick={handleSelectTodayBirthdays}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Cake className="w-3.5 h-3.5 text-slate-600" />
            <span>Today's Birthday Students ({birthdays.length})</span>
          </button>

          {recipientsList.length > 0 && (
            <button
              type="button"
              onClick={() => setRecipientsList([])}
              className="px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md inline-flex items-center gap-1 transition-colors cursor-pointer ml-auto"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Email Form */}
        <form onSubmit={handleSendEmail} className="space-y-4">
          
          {/* Recipients Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Recipients List ({recipientsList.length})
              </label>
              <span className="text-[11px] text-slate-400">
                Emails are sent with BCC for confidentiality
              </span>
            </div>

            {/* Recipient Chips Container */}
            {recipientsList.length > 0 && (
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 max-h-36 overflow-y-auto flex flex-wrap gap-1.5">
                {recipientsList.map((email) => (
                  <span
                    key={email}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-800 shadow-2xs"
                  >
                    <span>{email}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRecipient(email)}
                      className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Manual Email Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={recipientInput}
                onChange={(e) => setRecipientInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddManualEmails();
                  }
                }}
                placeholder="Type or paste emails (separated by comma, space or semicolon) and press Add..."
                className="flex-1 px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 bg-slate-50/50"
              />
              <button
                type="button"
                onClick={handleAddManualEmails}
                className="px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                + Add Email(s)
              </button>
            </div>
          </div>

          {/* Quick Templates Selector */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-500">Insert Template:</span>
            <button
              type="button"
              onClick={() => handleApplyTemplate('webinar')}
              className="px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded transition-colors cursor-pointer"
            >
              Webinar Joining Info
            </button>
            <button
              type="button"
              onClick={() => handleApplyTemplate('birthday')}
              className="px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded transition-colors cursor-pointer"
            >
              Birthday Greeting
            </button>
            <button
              type="button"
              onClick={() => handleApplyTemplate('mentorship')}
              className="px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded transition-colors cursor-pointer"
            >
              Mentorship Follow-up
            </button>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Official Update: Webinar Schedule & Joining Link"
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 bg-slate-50/50"
            />
          </div>

          {/* Message Content */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Body Content <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your email announcement, mentorship response, or birthday wish here..."
              className="w-full p-3.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 bg-slate-50/50 resize-y font-sans leading-relaxed"
            />
          </div>

          {/* Submit / Dispatch button */}
          <div className="pt-2 flex items-center justify-between">
            <p className="text-[11px] text-slate-500">
              Sender: <span className="font-semibold text-slate-700">Dr. Vishwajeet | IIT Roorkee Desk</span>
            </p>

            <button
              type="submit"
              disabled={isSending}
              className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-60 shadow-xs"
            >
              {isSending ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Dispatching to {recipientsList.length} recipient(s)...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Email ({recipientsList.length} Recipients)</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>

      {/* Email Dispatch History Log */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-600" />
            <span>Sent Email Logs ({emailLogs.length})</span>
          </h3>
          <button
            onClick={loadLogs}
            className="text-xs text-slate-500 hover:text-slate-900 font-medium cursor-pointer"
          >
            Refresh Logs
          </button>
        </div>

        {emailLogs.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">No emails sent yet.</p>
        ) : (
          <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
            {emailLogs.map((log) => (
              <div key={log._id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="space-y-0.5">
                  <div className="font-semibold text-slate-900 flex items-center gap-2">
                    <span>{log.subject}</span>
                    <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded border border-slate-200">
                      {log.recipientCount} recipient{log.recipientCount > 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] truncate max-w-xl">{log.details || log.message}</p>
                </div>
                <div className="text-[11px] text-slate-400 shrink-0">
                  {new Date(log.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
