import React, { useState } from 'react';
import {
  Code,
  Users,
  Stethoscope,
  Activity,
  Plus,
  Trash2,
  Edit3,
  ShieldCheck,
  Server,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Lock,
  Eye,
  Building2,
  Calendar,
  Sparkles,
  Database
} from 'lucide-react';
import { Doctor, User, Appointment, Prescription, LabReport, Language } from '../types';

interface DeveloperConsoleViewProps {
  doctors: Doctor[];
  users: User[];
  appointments: Appointment[];
  prescriptions: Prescription[];
  labReports: LabReport[];
  language: Language;
  onAddDoctor: (doctor: Doctor) => void;
  onUpdateDoctor: (doctor: Doctor) => void;
  onDeleteDoctor: (doctorId: string) => void;
  onSwitchUserSession: (user: User) => void;
  onNavigate: (tab: string) => void;
}

export const DeveloperConsoleView: React.FC<DeveloperConsoleViewProps> = ({
  doctors,
  users,
  appointments,
  prescriptions,
  labReports,
  language,
  onAddDoctor,
  onUpdateDoctor,
  onDeleteDoctor,
  onSwitchUserSession,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'doctors' | 'patients' | 'system' | 'database'>('doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  // Add Doctor Form State
  const [docName, setDocName] = useState('');
  const [docNmc, setDocNmc] = useState('');
  const [docSpecialty, setDocSpecialty] = useState('Cardiothoracic Surgery & Cardiology');
  const [docSpecialtyNp, setDocSpecialtyNp] = useState('मुटुरोग विशेषज्ञ');
  const [docHospital, setDocHospital] = useState('Shahid Gangalal National Heart Centre');
  const [docDegrees, setDocDegrees] = useState('MBBS, MD');
  const [docExp, setDocExp] = useState(10);
  const [docFee, setDocFee] = useState(1000);
  const [docSchedule, setDocSchedule] = useState('Sun - Fri (09:00 AM - 03:00 PM)');
  const [docPin, setDocPin] = useState('1234');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim() || !docNmc.trim()) return;

    const newDoc: Doctor = {
      id: `doc_${Date.now()}`,
      name: docName.trim().startsWith('Dr.') ? docName.trim() : `Dr. ${docName.trim()}`,
      nmc_number: docNmc.trim().toUpperCase(),
      specialty: docSpecialty.trim(),
      specialty_np: docSpecialtyNp.trim() || docSpecialty.trim(),
      hospital_id: 'hosp_001',
      hospital: docHospital.trim(),
      degrees: docDegrees.trim(),
      experience_years: Number(docExp) || 5,
      fee_npr: Number(docFee) || 800,
      available: true,
      rating: 5.0,
      reviews_count: 1,
      languages: ['Nepali', 'English'],
      schedule: docSchedule.trim(),
      pin: docPin.trim() || '1234'
    };

    onAddDoctor(newDoc);
    showToast(`Doctor ${newDoc.name} (${newDoc.nmc_number}) registered successfully with PIN ${newDoc.pin}!`);
    setShowAddDoctorModal(false);

    // Reset fields
    setDocName('');
    setDocNmc('');
    setDocDegrees('MBBS, MD');
    setDocExp(10);
    setDocFee(1000);
    setDocPin('1234');
  };

  const handleToggleDoctorAvailability = (doc: Doctor) => {
    const updated = { ...doc, available: !doc.available };
    onUpdateDoctor(updated);
    showToast(`${doc.name} status changed to ${updated.available ? 'Available' : 'Busy / In Surgery'}`);
  };

  const handleResetDoctorPin = (doc: Doctor) => {
    const newPin = window.prompt(`Enter new 4-digit PIN for ${doc.name}:`, doc.pin || '1234');
    if (newPin && newPin.trim()) {
      const updated = { ...doc, pin: newPin.trim() };
      onUpdateDoctor(updated);
      showToast(`Security PIN for ${doc.name} updated to ${newPin.trim()}`);
    }
  };

  const patientUsers = users.filter((u) => u.role === 'patient');

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.nmc_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.hospital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="rounded-[26px] bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 shadow-xl border border-purple-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-purple-500/20 backdrop-blur-md border border-purple-400/30 text-white shadow-md">
              <Code className="w-7 h-7 text-purple-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight text-white">
                  Developer &amp; Admin Management Center
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500 text-white text-[10px] font-black uppercase tracking-wider">
                  Root Admin
                </span>
              </div>
              <p className="text-xs text-purple-200 mt-1 font-medium">
                Live monitoring of registered patients, NMC specialist onboarding, security PIN controls, and server diagnostics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddDoctorModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-xs font-black shadow-lg shadow-purple-600/30 flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add NMC Doctor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Statistics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Registered Patients</p>
          <h3 className="text-2xl font-black text-slate-950 dark:text-white mt-1">{patientUsers.length}</h3>
          <span className="text-[10px] font-bold text-emerald-600">Active: Nepal Parajuli</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">NMC Doctors</p>
          <h3 className="text-2xl font-black text-slate-950 dark:text-white mt-1">{doctors.length}</h3>
          <span className="text-[10px] font-bold text-blue-600">All PIN-Protected</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Consultations</p>
          <h3 className="text-2xl font-black text-slate-950 dark:text-white mt-1">{appointments.length}</h3>
          <span className="text-[10px] font-bold text-purple-600">Live WebRTC Ready</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">System Status</p>
          <h3 className="text-lg font-black text-emerald-600 mt-1 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>100% Operational</span>
          </h3>
          <span className="text-[10px] font-mono text-slate-500">Kathmandu Edge Node</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('doctors')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'doctors'
              ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          <Stethoscope className="w-4 h-4 text-blue-600" />
          <span>Monitor &amp; Manage Doctors ({doctors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('patients')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'patients'
              ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-600" />
          <span>Monitor Patients ({patientUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('system')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'system'
              ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          <Server className="w-4 h-4 text-purple-600" />
          <span>Server Diagnostics &amp; Telemetry</span>
        </button>
      </div>

      {/* TAB 1: DOCTORS MANAGEMENT */}
      {activeTab === 'doctors' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctors by name, specialty, NMC license, or hospital..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <button
              onClick={() => setShowAddDoctorModal(true)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Doctor</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-xs">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Doctor &amp; License</th>
                  <th className="py-3 px-4">Specialty</th>
                  <th className="py-3 px-4">Hospital</th>
                  <th className="py-3 px-4">Fee / Rating</th>
                  <th className="py-3 px-4">PIN Code</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredDoctors.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-950 dark:text-white">{doc.name}</div>
                      <div className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold">{doc.nmc_number}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                      {doc.specialty}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      {doc.hospital}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-950 dark:text-white">
                      NPR {doc.fee_npr} <span className="text-[10px] text-amber-500 font-normal">({doc.rating} ★)</span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleResetDoctorPin(doc)}
                        className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-[11px] hover:bg-purple-100 dark:hover:bg-purple-950/60 cursor-pointer"
                        title="Click to change PIN"
                      >
                        🔑 {doc.pin || '1234'}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleDoctorAvailability(doc)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold cursor-pointer transition-all ${
                          doc.available
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                            : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {doc.available ? '● Available OPD' : '○ Busy'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to remove ${doc.name}?`)) {
                            onDeleteDoctor(doc.id);
                            showToast(`${doc.name} deleted.`);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                        title="Delete Doctor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PATIENTS MONITORING */}
      {activeTab === 'patients' && (
        <div className="space-y-4">
          <div className="rounded-[24px] bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-base font-black text-slate-950 dark:text-white mb-2 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <span>Registered Patient Records &amp; Profiles</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Real-time monitoring of registered patients in the Xenon Health Grid.
            </p>

            <div className="space-y-3">
              {patientUsers.map((pat) => (
                <div
                  key={pat.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-blue-700 text-white flex items-center justify-center font-black text-base shadow-xs">
                      {pat.full_name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-sm text-slate-950 dark:text-white">{pat.full_name}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[9px] font-black uppercase">
                          Patient
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 text-[9px] font-bold">
                          Blood: {pat.blood_group || 'O+'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        Username: <b className="text-slate-800 dark:text-slate-200">{pat.username}</b> • Email: {pat.email} • Phone: {pat.phone}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        District: {pat.district || 'Kathmandu'} • Age: {pat.age || 28} • Emergency SOS: {pat.emergency_contact || '+977-9841234567'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSwitchUserSession(pat)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Impersonate / Test View
                    </button>
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                    >
                      Open Patient Vault →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SYSTEM DIAGNOSTICS */}
      {activeTab === 'system' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-[24px] bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-base font-black text-slate-950 dark:text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-purple-600" />
              <span>Edge Server Architecture</span>
            </h3>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 font-mono">
              <p>• Node: <b>Xenon Health Edge (Kathmandu Gateway)</b></p>
              <p>• Port: <b>3000 (Express + Vite Middleware)</b></p>
              <p>• AI Engine: <b>Google Gemini 3.1 Flash / Xenon Clinical Fallback</b></p>
              <p>• Auth Policy: <b>Root Developer Access + Strict Patient Auth</b></p>
              <p>• Doctor Gateway: <b>Dedicated PIN Gate (4-Digit NMC Access)</b></p>
            </div>
          </div>

          <div className="p-6 rounded-[24px] bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-base font-black text-slate-950 dark:text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-600" />
              <span>Storage &amp; Cache State</span>
            </h3>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 font-mono">
              <p>• Verified Doctors In-Memory: <b>{doctors.length}</b></p>
              <p>• Users Registered: <b>{users.length}</b></p>
              <p>• Active Prescriptions: <b>{prescriptions.length}</b></p>
              <p>• Encrypted Lab Vaults: <b>{labReports.length}</b></p>
            </div>
          </div>
        </div>
      )}

      {/* ADD DOCTOR MODAL */}
      {showAddDoctorModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-6 shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-purple-600 text-white shadow-md">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-950 dark:text-white">
                  Add &amp; Verify New NMC Specialist
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Direct doctor onboarding by root administrator.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateDoctorSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Doctor Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="e.g. Dr. Roshan Thapa"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    NMC License Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={docNmc}
                    onChange={(e) => setDocNmc(e.target.value)}
                    placeholder="e.g. NMC-9920"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Doctor Login PIN *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={docPin}
                    onChange={(e) => setDocPin(e.target.value)}
                    placeholder="1234"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Specialty *
                </label>
                <input
                  type="text"
                  required
                  value={docSpecialty}
                  onChange={(e) => setDocSpecialty(e.target.value)}
                  placeholder="e.g. Senior Consultant Cardiologist"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Affiliated Hospital *
                </label>
                <input
                  type="text"
                  required
                  value={docHospital}
                  onChange={(e) => setDocHospital(e.target.value)}
                  placeholder="e.g. Shahid Gangalal National Heart Centre"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Degrees / Qualifications
                  </label>
                  <input
                    type="text"
                    value={docDegrees}
                    onChange={(e) => setDocDegrees(e.target.value)}
                    placeholder="MBBS, MD, DM"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Consultation Fee (NPR)
                  </label>
                  <input
                    type="number"
                    value={docFee}
                    onChange={(e) => setDocFee(Number(e.target.value))}
                    placeholder="1000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  OPD Schedule
                </label>
                <input
                  type="text"
                  value={docSchedule}
                  onChange={(e) => setDocSchedule(e.target.value)}
                  placeholder="Sun - Fri (09:00 AM - 03:00 PM)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddDoctorModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-md cursor-pointer"
                >
                  Confirm &amp; Issue NMC Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-purple-950 text-white border border-purple-800 text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
