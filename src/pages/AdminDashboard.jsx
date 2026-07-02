import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Phone, CheckCircle, Clock, Inbox, AlertCircle, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE_URL}/api/quotes`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();
      
      if (Array.isArray(data)) {
        setLeads(data);
        setError(null);
      } else {
        setLeads([]);
        setError('Backend returned invalid data format.');
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
      setLeads([]);
      setError(`Failed to load leads: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    if (!id) return;
    const newStatus = currentStatus === 'Pending' ? 'Contacted' : 'Pending';
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await fetch(`${API_BASE_URL}/api/quotes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });
      fetchLeads(); 
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await fetch(`${API_BASE_URL}/api/auth/logout`, { 
        method: 'POST',
        credentials: 'include' 
      });
      // Force reload the page to naturally wipe state and send user to login guard
      window.location.reload(); 
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const safeLeads = Array.isArray(leads) ? leads : [];
  const pendingCount = safeLeads.filter(l => l?.status === 'Pending').length;

  return (
    <div className="bg-slate-50 min-h-screen pt-8 pb-24">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-12">
        
        {/* Header Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <LayoutDashboard className="text-orange-600" />
                Sales Dashboard
              </h1>
              
              {/* LOGOUT BUTTON ADDEED HERE */}
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1.5 ml-2 text-slate-400 hover:text-red-600 text-xs font-bold uppercase tracking-wider transition-colors border border-slate-200 bg-white px-2.5 py-1 rounded-lg shadow-sm hover:border-red-100"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
            <p className="text-slate-600">Manage incoming quote requests and fabrication inquiries.</p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white px-6 py-3 border border-slate-200 rounded-xl shadow-sm text-center">
              <p className="text-2xl font-bold text-slate-900">{safeLeads.length}</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Leads</p>
            </div>
            <div className="bg-white px-6 py-3 border border-slate-200 rounded-xl shadow-sm text-center">
              <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Calls</p>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Leads Data Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden min-h-[400px]">
          {loading ? (
            <div className="flex h-full items-center justify-center p-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            </div>
          ) : safeLeads.length === 0 ? (
            <div className="p-20 text-center text-slate-500 flex flex-col items-center">
              <Inbox className="w-12 h-12 mb-4 text-slate-300" />
              <p className="font-medium text-slate-900">No quote requests found.</p>
              <p className="text-sm mt-1">Submit a test inquiry on the products page to see it here!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-5 font-bold text-slate-900 uppercase text-xs tracking-wider">Date</th>
                    <th className="p-5 font-bold text-slate-900 uppercase text-xs tracking-wider">Client Name</th>
                    <th className="p-5 font-bold text-slate-900 uppercase text-xs tracking-wider">Contact</th>
                    <th className="p-5 font-bold text-slate-900 uppercase text-xs tracking-wider">Requirement</th>
                    <th className="p-5 font-bold text-slate-900 uppercase text-xs tracking-wider">Status</th>
                    <th className="p-5 font-bold text-slate-900 uppercase text-xs tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                  {safeLeads.map((lead, index) => {
                    if (!lead) return null;
                    
                    return (
                      <tr key={lead._id || index} className="hover:bg-slate-50 transition-colors">
                        <td className="p-5 whitespace-nowrap text-slate-500">
                          {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="p-5 font-semibold text-slate-900">{lead.name || 'Unknown'}</td>
                        <td className="p-5">
                          <a href={`tel:${lead.mobileNumber || ''}`} className="flex items-center gap-2 text-orange-600 hover:underline font-medium">
                            <Phone className="w-4 h-4" />
                            {lead.mobileNumber || 'No Number'}
                          </a>
                        </td>
                        <td className="p-5 max-w-xs truncate" title={lead.requirement || ''}>
                          {lead.requirement || 'No details provided'}
                        </td>
                        <td className="p-5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                            lead.status === 'Pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {lead.status === 'Pending' ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                            {lead.status || 'Pending'}
                          </span>
                        </td>
                        <td className="p-5 text-right">
                          <button 
                            onClick={() => toggleStatus(lead._id, lead.status)}
                            className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded border transition-colors ${
                              lead.status === 'Pending'
                                ? 'border-emerald-600 text-emerald-600 hover:bg-emerald-50'
                                : 'border-slate-300 text-slate-500 hover:bg-slate-50'
                            }`}
                          >
                            {lead.status === 'Pending' ? 'Mark Contacted' : 'Mark Pending'}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}