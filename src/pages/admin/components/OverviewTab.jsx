import React from 'react';
import { 
  Users, Mail, Cake, MessageSquare, ArrowUpRight, 
  Calendar, Phone, Send, Clock, CheckCircle2, ChevronRight 
} from 'lucide-react';

export default function OverviewTab({ 
  stats, 
  birthdays = [], 
  recentRegistrations = [], 
  recentQueries = [],
  onNavigateTab,
  onQuickEmail
}) {
  return (
    <div className="space-y-6">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Registrations */}
        <div 
          onClick={() => onNavigateTab('registrations')}
          className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Webinar / Students</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{stats?.totalRegistrations || 0}</span>
            {stats?.newRegistrations > 0 && (
              <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                {stats.newRegistrations} new
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <span>View all applicants</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </p>
        </div>

        {/* Contact Queries */}
        <div 
          onClick={() => onNavigateTab('contacts')}
          className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Contact Inquiries</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{stats?.totalQueries || 0}</span>
            {stats?.unreadQueries > 0 && (
              <span className="text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                {stats.unreadQueries} unread
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <span>View messages</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </p>
        </div>

        {/* Today's Birthdays */}
        <div 
          onClick={() => {
            if (birthdays.length > 0) {
              const birthdayEmails = birthdays.map(b => b.email);
              onQuickEmail(
                birthdayEmails,
                "Warm Birthday Wishes from Dr. Vishwajeet's Office",
                `Dear Student,\n\nOn behalf of Dr. Vishwajeet and our research team at IIT Roorkee, we wish you a very Happy Birthday! 🎉\n\nMay this year bring immense academic growth, intellectual achievements, and great success in your scholarly journey.\n\nWarm regards,\nDr. Vishwajeet\nFaculty & Ramanujan Fellow, IIT Roorkee`
              );
            } else {
              const el = document.getElementById('birthday-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Birthdays Today</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Cake className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{birthdays.length}</span>
            {birthdays.length > 0 && (
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Active today
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <span>{birthdays.length > 0 ? 'Send greetings' : 'No birthdays today'}</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </p>
        </div>

        {/* Emails Sent */}
        <div 
          onClick={() => onNavigateTab('email')}
          className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Email Broadcasts</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{stats?.totalEmailsSent || 0}</span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <span>Compose new email</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </p>
        </div>
      </div>

      {/* Primary Highlight: Birthday Alert Today (Explicit User Requirement) */}
      <div id="birthday-section" className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Cake className="w-5 h-5 text-slate-200" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Today's Student Birthdays ({new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })})
              </h2>
              <p className="text-xs text-slate-500">
                Registered students celebrating their birthday today. You can send an official academic greeting with one click.
              </p>
            </div>
          </div>

          {birthdays.length > 0 && (
            <button
              onClick={() => {
                const birthdayEmails = birthdays.map(b => b.email);
                onQuickEmail(birthdayEmails, "Warm Birthday Wishes from Dr. Vishwajeet's Office", `Dear Student,\n\nOn behalf of Dr. Vishwajeet and our research team at IIT Roorkee, we wish you a very Happy Birthday! 🎉\n\nMay this year bring immense academic growth, intellectual achievements, and great success in your scholarly journey.\n\nWarm regards,\nDr. Vishwajeet\nFaculty & Ramanujan Fellow, IIT Roorkee`);
              }}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 inline-flex items-center gap-2 cursor-pointer transition-colors shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Wish All Today ({birthdays.length})</span>
            </button>
          )}
        </div>

        <div className="mt-4">
          {birthdays.length === 0 ? (
            <div className="py-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
              <Cake className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-medium text-slate-600">No student birthdays registered for today ({new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})</p>
              <p className="text-[11px] text-slate-400 mt-0.5">As students submit application forms with their DOB, any birthdays on the current date will automatically appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {birthdays.map((student) => (
                <div 
                  key={student._id || student.email}
                  className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{student.name}</h4>
                      <span className="text-[10px] font-semibold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                        🎂 Today
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{student.occupation}</p>
                    <div className="text-[11px] text-slate-500 space-y-0.5 pt-1">
                      <p className="flex items-center gap-1.5 truncate">
                        <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{student.email}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{student.whatsapp}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400">DOB: {student.dob}</span>
                    <button
                      onClick={() => onQuickEmail(
                        [student.email],
                        `Happy Birthday ${student.name}! - Wishes from Dr. Vishwajeet`,
                        `Dear ${student.name},\n\nWishing you a very Happy Birthday! 🎉\n\nMay this year bring you great research breakthroughs, personal fulfillment, and success in all your academic endeavors.\n\nWarm regards,\nDr. Vishwajeet\nFaculty & Ramanujan Fellow, IIT Roorkee`
                      )}
                      className="px-2.5 py-1.5 rounded-md text-[11px] font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Send className="w-3 h-3 text-slate-600" />
                      <span>Send Wish</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dual Columns: Recent Registrations & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Registrations */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-600" />
                <span>Recent Webinar Applications</span>
              </h3>
              <button
                onClick={() => onNavigateTab('registrations')}
                className="text-xs text-slate-500 hover:text-slate-900 font-medium inline-flex items-center gap-0.5 cursor-pointer"
              >
                View all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {recentRegistrations.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No registrations yet.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentRegistrations.map((reg) => (
                  <div key={reg._id} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">{reg.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{reg.occupation} • {reg.email}</p>
                    </div>
                    <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0 capitalize">
                      {reg.status || 'new'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Contact Inquiries */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-600" />
                <span>Recent Contact Inquiries</span>
              </h3>
              <button
                onClick={() => onNavigateTab('contacts')}
                className="text-xs text-slate-500 hover:text-slate-900 font-medium inline-flex items-center gap-0.5 cursor-pointer"
              >
                View all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {recentQueries.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No contact queries yet.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentQueries.map((item) => (
                  <div key={item._id} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">{item.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{item.subject || 'General Inquiry'}</p>
                    </div>
                    <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0 capitalize">
                      {item.status || 'unread'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
