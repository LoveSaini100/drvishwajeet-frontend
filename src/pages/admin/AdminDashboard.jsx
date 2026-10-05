import React, { useState, useEffect, useCallback } from 'react';
import { 
  LayoutDashboard, Users, MessageSquare, Mail, Cake, 
  LogOut, ArrowLeft, RefreshCw, ShieldCheck 
} from 'lucide-react';
import OverviewTab from './components/OverviewTab';
import RegistrationsTab from './components/RegistrationsTab';
import ContactsTab from './components/ContactsTab';
import EmailComposeTab from './components/EmailComposeTab';
import AdminLogin from './components/AdminLogin';
import { api } from '../../services/api';

export default function AdminDashboard({ onBackToHome, onShowToast }) {
  // Session authentication state (persists until manual logout)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const savedSession = sessionStorage.getItem('vishwajeet_admin_session');
      if (savedSession) {
        return true;
      }
    } catch (e) {}
    return false;
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [birthdays, setBirthdays] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Quick email compose state
  const [emailComposeState, setEmailComposeState] = useState({
    recipients: [],
    subject: '',
    message: '',
  });

  // Logout Handler
  const handleLogout = useCallback((reason = '') => {
    sessionStorage.removeItem('vishwajeet_admin_session');
    localStorage.removeItem('vishwajeet_admin_auth');
    setIsAuthenticated(false);
    
    if (reason && onShowToast) {
      onShowToast({ type: 'warning', message: reason });
    } else if (onShowToast) {
      onShowToast({ type: 'info', message: 'Logged out successfully.' });
    }
  }, [onShowToast]);

  // Fetch all dashboard data
  const loadAllData = async (isManual = false) => {
    if (!isAuthenticated) return;
    try {
      if (isManual) setRefreshing(true);
      else setLoading(true);

      const [statsRes, regRes, contactRes, bdayRes] = await Promise.allSettled([
        api.getDashboardStats(),
        api.getRegistrations(),
        api.getContacts(),
        api.getTodayBirthdays(),
      ]);

      if (statsRes.status === 'fulfilled' && statsRes.value.success) {
        setStats(statsRes.value.stats);
        if (statsRes.value.todayBirthdays) {
          setBirthdays(statsRes.value.todayBirthdays);
        }
      }

      if (regRes.status === 'fulfilled' && regRes.value.success) {
        setRegistrations(regRes.value.data || []);
      }

      if (contactRes.status === 'fulfilled' && contactRes.value.success) {
        setContacts(contactRes.value.data || []);
      }

      if (bdayRes.status === 'fulfilled' && bdayRes.value.success) {
        setBirthdays(bdayRes.value.data || []);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
      if (onShowToast) onShowToast({ type: 'error', message: 'Could not connect to backend server. Make sure backend is running.' });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
      document.title = "Admin Desk | Dr. Vishwajeet Portfolio";
    }
  }, [isAuthenticated]);

  const handleQuickEmail = (recipients = [], subject = '', message = '') => {
    setEmailComposeState({
      recipients,
      subject,
      message,
    });
    setActiveTab('email');
  };

  // If not authenticated, ALWAYS show Login Screen First
  if (!isAuthenticated) {
    return (
      <AdminLogin 
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          if (onShowToast) onShowToast({ type: 'success', message: 'Authentication successful! Welcome to Admin Desk.' });
        }}
        onBackToSite={onBackToHome}
      />
    );
  }

  const unreadCount = contacts.filter(c => c.status === 'unread').length;
  const newRegCount = registrations.filter(r => r.status === 'new').length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Brand & Return */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                V
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-900 leading-none">
                  Dr. Vishwajeet Admin Desk
                </h1>
                <span className="text-[10px] text-slate-500 font-medium">IIT Roorkee Portal</span>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {birthdays.length > 0 && (
              <button
                onClick={() => {
                  const birthdayEmails = birthdays.map(b => b.email);
                  handleQuickEmail(
                    birthdayEmails,
                    "Warm Birthday Wishes from Dr. Vishwajeet's Office",
                    `Dear Student,\n\nOn behalf of Dr. Vishwajeet and our research team at IIT Roorkee, we wish you a very Happy Birthday! 🎉\n\nMay this year bring immense academic growth, intellectual achievements, and great success in your scholarly journey.\n\nWarm regards,\nDr. Vishwajeet\nFaculty & Ramanujan Fellow, IIT Roorkee`
                  );
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold hover:bg-amber-100 transition-colors cursor-pointer"
              >
                <Cake className="w-3.5 h-3.5" />
                <span>{birthdays.length} Birthday{birthdays.length > 1 ? 's' : ''} Today</span>
              </button>
            )}

            <button
              onClick={() => loadAllData(true)}
              disabled={refreshing}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => handleLogout()}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-red-700 hover:bg-red-50 border border-slate-200 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation Menu */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar border-t border-slate-100">
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3.5 text-xs font-semibold border-b-2 transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'overview' || !['registrations', 'contacts', 'email'].includes(activeTab)
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('registrations')}
            className={`py-3 px-3.5 text-xs font-semibold border-b-2 transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'registrations'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Webinar Applicants ({registrations.length})</span>
            {newRegCount > 0 && (
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-bold">
                {newRegCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-3 px-3.5 text-xs font-semibold border-b-2 transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'contacts'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Messages ({contacts.length})</span>
            {unreadCount > 0 && (
              <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded-full font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('email')}
            className={`py-3 px-3.5 text-xs font-semibold border-b-2 transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'email'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Compose Email</span>
          </button>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-3 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
            <p className="text-xs text-slate-500 font-medium">Loading records from database...</p>
          </div>
        ) : (
          <>
            {(activeTab === 'overview' || !['registrations', 'contacts', 'email'].includes(activeTab)) && (
              <OverviewTab
                stats={stats}
                birthdays={birthdays}
                recentRegistrations={registrations.slice(0, 5)}
                recentQueries={contacts.slice(0, 5)}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onQuickEmail={handleQuickEmail}
              />
            )}

            {activeTab === 'registrations' && (
              <RegistrationsTab
                registrations={registrations}
                onRefresh={loadAllData}
                onSendBulkEmail={(emails) => handleQuickEmail(emails)}
                onShowToast={onShowToast}
              />
            )}

            {activeTab === 'contacts' && (
              <ContactsTab
                contacts={contacts}
                onRefresh={loadAllData}
                onSendBulkEmail={(emails, subject) => handleQuickEmail(emails, subject)}
                onShowToast={onShowToast}
              />
            )}

            {activeTab === 'email' && (
              <EmailComposeTab
                initialRecipients={emailComposeState.recipients}
                initialSubject={emailComposeState.subject}
                initialMessage={emailComposeState.message}
                registrations={registrations}
                contacts={contacts}
                birthdays={birthdays}
                onShowToast={onShowToast}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>Dr. Vishwajeet • Academic & Mentorship Administration</span>
        </div>
      </footer>

    </div>
  );
}
