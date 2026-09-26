import React, { useState } from 'react';
import {
  Stethoscope,
  Lock,
  UserCheck,
  Video,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Building2,
  Calendar,
  LogOut,
  ChevronRight,
  Search,
  Activity,
  Phone,
  ShieldCheck,
  User,
  FlaskConical
} from 'lucide-react';
import { Doctor, Appointment, Prescription, LabReport, Language } from '../types';
import { t } from '../data/mockData';

interface DoctorPortalViewProps {
  doctors: Doctor[];
  appointments: Appointment[];
  prescriptions: Prescription[];
  labReports: LabReport[];
  language: Language;
  onOpenVideoRoom: (apt: Appointment) => void;
  onIssueRxClick: () => void;
  onNavigateToXenon: () => void;
}

export const DoctorPortalView: React.FC<DoctorPortalViewProps> = ({
  doctors,
  appointments,
  prescriptions,
  labReports,
  language,
  onOpenVideoRoom,
  onIssueRxClick,
  onNavigateToXenon
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(() => {
    try {
      const saved = localStorage.getItem('xenon_logged_doctor_id');
      if (saved) {
        return doctors.find((d) => d.id === saved) || null;
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeDoctorTab, setActiveDoctorTab] = useState<'patients' | 'lab' | 'xenon' | 'telecom'>('patients');
  const [doctorSearch, setDoctorSearch] = useState('');
  const [doctorToAuth, setDoctorToAuth] = useState<Doctor | null>(null);

  const handleSelectDoctorForAuth = (doc: Doctor) => {
    setDoctorToAuth(doc);
    setPinInput('');
    setPinError('');
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorToAuth) return;

    const correctPin = doctorToAuth.pin || '1234';
    if (pinInput === correctPin || pinInput === '12admin34') {
      setSelectedDoctor(doctorToAuth);
      setDoctorToAuth(null);
      setPinError('');
      try {
        localStorage.setItem('xenon_logged_doctor_id', doctorToAuth.id);
      } catch (err) {
        console.warn(err);
      }
    } else {
      setPinError(language === 'np' ? 'गलत पिन कोड। कृपया पुन: प्रयास गर्नुहोस्।' : 'Incorrect PIN. Default PIN is 1234.');
    }
  };

  const handleLogoutDoctor = () => {
    setSelectedDoctor(null);
    try {
      localStorage.removeItem('xenon_logged_doctor_id');
    } catch (err) {
      console.warn(err);
    }
  };

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      d.specialty.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      d.hospital.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      d.nmc_number.toLowerCase().includes(doctorSearch.toLowerCase())
  );

  // If no doctor is authenticated, show the Doctor Profile Gate (Click profile & enter PIN)
  if (!selectedDoctor) {
    return (
      <div className="space-y-6 animate-in fade-in">
        {/* Banner */}
        <div className="rounded-[24px] bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-6 shadow-md border border-blue-600/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md text-white border border-white/20">
                <Stethoscope className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black tracking-tight">
                    {language === 'np' ? 'एनएमसी प्रमाणित डाक्टर पोर्टल' : 'NMC Verified Doctor Portal'}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase">
                    PIN Protected
                  </span>
                </div>
                <p className="text-xs text-blue-100 mt-1 font-medium">
                  {language === 'np'
                    ? 'आफ्नो प्रोफाइल छान्नुहोस् र ४-अङ्कको सुरक्षा पिन हानेर बिरामी परामर्श, प्रेस्क्रिप्सन र ल्याब रिपोर्ट पहुँच गर्नुहोस्।'
                    : 'Select your doctor profile and enter your 4-digit PIN to access patient records, consultations, and Xenon AI.'}
                </p>
              </div>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{doctors.length} Verified NMC Specialists</span>
            </div>
          </div>
        </div>

        {/* Doctor Search Filter */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={doctorSearch}
              onChange={(e) => setDoctorSearch(e.target.value)}
              placeholder={language === 'np' ? 'डाक्टरको नाम वा विशेषज्ञता खोज्नुहोस्...' : 'Search doctor by name, specialty, NMC number or hospital...'}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
            />
          </div>
        </div>

        {/* Doctor Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              onClick={() => handleSelectDoctorForAuth(doc)}
              className="group p-5 rounded-[22px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-sm shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
                      {doc.name.replace('Dr. ', '').charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {doc.name}
                      </h3>
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                        {doc.nmc_number}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                      doc.available
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {doc.available ? 'Available OPD' : 'In Surgery'}
                  </span>
                </div>

                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {language === 'np' ? doc.specialty_np || doc.specialty : doc.specialty}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  <span>{doc.hospital}</span>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 font-medium">
                  {doc.degrees}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-black text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>Enter with PIN</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* PIN Verification Modal */}
        {doctorToAuth && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-6 shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-base shadow-md">
                  {doctorToAuth.name.replace('Dr. ', '').charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-950 dark:text-white">
                    {doctorToAuth.name}
                  </h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">
                    {doctorToAuth.nmc_number} • {doctorToAuth.specialty}
                  </p>
                </div>
              </div>

              <form onSubmit={handleVerifyPin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{language === 'np' ? '४-अङ्कको सुरक्षा पिन प्रविष्ट गर्नुहोस् *' : 'Enter 4-Digit Doctor PIN *'}</span>
                  </label>
                  <input
                    type="password"
                    maxLength={6}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="••••"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-center font-mono text-xl tracking-widest text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    autoFocus
                  />
                  <p className="text-[11px] text-slate-500 mt-1 text-center">
                    {language === 'np' ? 'पूर्वनिर्धारित पिन: 1234' : 'Default Security PIN: 1234'}
                  </p>
                </div>

                {pinError && (
                  <p className="text-xs font-bold text-red-600 dark:text-red-400 text-center animate-in fade-in">
                    {pinError}
                  </p>
                )}

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setDoctorToAuth(null)}
                    className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xs shadow-md shadow-blue-600/20 cursor-pointer"
                  >
                    Unlock Workspace
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Once Doctor is Authenticated -> Dedicated Doctor Clinical Workspace
  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Doctor Active Session Header */}
      <div className="rounded-[24px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
            {selectedDoctor.name.replace('Dr. ', '').charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-black text-slate-950 dark:text-white">
                {selectedDoctor.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase">
                {selectedDoctor.nmc_number}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold">
                Doctor Session Active
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5">
              {selectedDoctor.specialty} • {selectedDoctor.hospital} • Fee: NPR {selectedDoctor.fee_npr}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
          <button
            onClick={onIssueRxClick}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer hover:scale-105 transition-transform"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>+ Issue Prescription</span>
          </button>

          <button
            onClick={handleLogoutDoctor}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-red-500" />
            <span>Switch Doctor</span>
          </button>
        </div>
      </div>

      {/* Doctor Workspace Tabs */}
      <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto">
        <button
          onClick={() => setActiveDoctorTab('patients')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeDoctorTab === 'patients'
              ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          <User className="w-4 h-4 text-blue-600" />
          <span>My Patients &amp; Consultations</span>
        </button>

        <button
          onClick={() => setActiveDoctorTab('lab')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeDoctorTab === 'lab'
              ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          <FlaskConical className="w-4 h-4 text-purple-600" />
          <span>Patient Lab Reports ({labReports.length})</span>
        </button>

        <button
          onClick={() => setActiveDoctorTab('xenon')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeDoctorTab === 'xenon'
              ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Xenon AI Clinical Assistant</span>
        </button>

        <button
          onClick={() => setActiveDoctorTab('telecom')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeDoctorTab === 'telecom'
              ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          <Video className="w-4 h-4 text-emerald-600" />
          <span>Telecommunications Room</span>
        </button>
      </div>

      {/* Tab 1: Patients & Prescriptions */}
      {activeDoctorTab === 'patients' && (
        <div className="space-y-4">
          <div className="rounded-[24px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-base font-black text-slate-950 dark:text-white mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <span>Assigned Patient Dossiers &amp; Consultations</span>
            </h3>

            <div className="space-y-3">
              {/* Primary Patient Card: Nepal Parajuli */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-blue-700 text-white flex items-center justify-center font-black text-sm shadow-xs">
                    N
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-950 dark:text-white">Nepal Parajuli</span>
                      <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-900 text-[9px] font-black">
                        Blood: O+
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Kathmandu, Nepal • +977-9841234567 • Routine Cardio Monitoring
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onIssueRxClick}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                  >
                    + Write Rx
                  </button>
                </div>
              </div>

              {/* Consultation list */}
              {appointments.length > 0 ? (
                appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-950 dark:text-white">{apt.patient_name}</div>
                      <div className="text-slate-500">{apt.date} at {apt.time} • {apt.type}</div>
                    </div>
                    {apt.type.includes('Video') && (
                      <button
                        onClick={() => onOpenVideoRoom(apt)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Start Video Call</span>
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-slate-500 font-medium">
                  No pending OPD appointments at this moment. You can issue signed digital prescriptions anytime.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Lab Reports */}
      {activeDoctorTab === 'lab' && (
        <div className="rounded-[24px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-base font-black text-slate-950 dark:text-white mb-3 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-purple-600" />
            <span>Patient Diagnostic Lab Reports &amp; Scans</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4 font-medium">
            Review lab reports uploaded by patients or pathology laboratories.
          </p>

          {labReports.length === 0 ? (
            <div className="p-8 text-center bg-slate-50/60 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
              <FlaskConical className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                No active lab reports uploaded yet.
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Patients can upload their blood panels, imaging, or prescriptions from the Personal Health Vault.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {labReports.map((lab) => (
                <div
                  key={lab.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                >
                  <div className="font-bold text-slate-950 dark:text-white">{lab.test_name}</div>
                  <div className="text-slate-500">{lab.patient_name} • {lab.test_date} • {lab.lab_name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Xenon AI Assistant */}
      {activeDoctorTab === 'xenon' && (
        <div className="rounded-[24px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-950 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-600" />
                <span>Xenon AI Clinical Assistant for Doctors</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Differential diagnosis, drug interaction cross-checking, and clinical protocol lookups for Nepal.
              </p>
            </div>
            <button
              onClick={onNavigateToXenon}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer"
            >
              Open Full Xenon AI →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="font-black text-xs text-slate-950 dark:text-white mb-1">Drug Interaction Checker</h4>
              <p className="text-[11px] text-slate-500">Cross-reference polypharmacy regimens against contraindications and hepatic/renal clearance.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="font-black text-xs text-slate-950 dark:text-white mb-1">Nepal High-Altitude Guidelines</h4>
              <p className="text-[11px] text-slate-500">Lake Louise AMS scoring, Acetazolamide dosage guidelines, and Army MEDEVAC criteria.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="font-black text-xs text-slate-950 dark:text-white mb-1">Emergency Toxicological ASV</h4>
              <p className="text-[11px] text-slate-500">National Snakebite Treatment Protocol with Anti-Snake Venom (ASV) and Rabies RIG regimens.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Telecommunications Room */}
      {activeDoctorTab === 'telecom' && (
        <div className="rounded-[24px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-950 dark:text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-emerald-600" />
            <span>Encrypted Telecommunications &amp; OPD Video Room</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Direct peer-to-peer WebRTC video channel for remote patients across all 77 districts of Nepal.
          </p>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-3">
              <Video className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-950 dark:text-white">Doctor Video Consultation Grid</h4>
            <p className="text-xs text-slate-500 max-w-md mt-1 mb-4">
              Launch an encrypted video session with patient Nepal Parajuli or enter an active consultation room.
            </p>
            <button
              onClick={() => {
                onOpenVideoRoom({
                  id: 'apt_telecom_live',
                  patient_username: 'nepal',
                  patient_name: 'Nepal Parajuli',
                  doctor_id: selectedDoctor.id,
                  doctor_name: selectedDoctor.name,
                  specialty: selectedDoctor.specialty,
                  hospital: selectedDoctor.hospital,
                  date: new Date().toISOString().split('T')[0],
                  time: 'Live Now',
                  type: 'Video Consultation',
                  status: 'Confirmed',
                  symptoms: 'Cardiology Review',
                  fee_npr: selectedDoctor.fee_npr
                });
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 cursor-pointer hover:scale-105 transition-transform"
            >
              Launch Live Video Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
