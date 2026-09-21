import React from 'react';
import {
  UserCheck,
  Building2,
  CalendarDays,
  PhoneCall,
  Video,
  ArrowRight,
  Sparkles,
  Clock,
  HeartPulse,
  Lock,
  Stethoscope,
  UserPlus,
  ShieldCheck
} from 'lucide-react';
import { Doctor, Hospital, Appointment, Prescription, Language, User } from '../types';
import { t } from '../data/mockData';
import { MedicationReminderCard } from './MedicationReminderCard';

interface DashboardViewProps {
  doctors: Doctor[];
  hospitals: Hospital[];
  appointments: Appointment[];
  prescriptions: Prescription[];
  language: Language;
  onNavigate: (tab: string) => void;
  onBookClick: () => void;
  onOpenVideoRoom: (apt: Appointment) => void;
  currentUser?: User | null;
  onOpenAuth?: (mode?: 'login' | 'register-doctor' | 'register-patient') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  doctors,
  hospitals,
  appointments,
  prescriptions,
  language,
  onNavigate,
  onBookClick,
  onOpenVideoRoom,
  currentUser,
  onOpenAuth
}) => {
  const statCards = [
    {
      title: t('activeDoctors', language),
      value: doctors.length,
      icon: UserCheck,
      color: 'from-red-600 to-red-700',
      badge: '16+ Specialties'
    },
    {
      title: t('hospitalsCount', language),
      value: hospitals.length,
      icon: Building2,
      color: 'from-blue-700 to-blue-800',
      badge: 'Kathmandu, Pokhara, etc.'
    },
    {
      title: t('appointmentsCount', language),
      value: appointments.length,
      icon: CalendarDays,
      color: 'from-red-600 to-blue-700',
      badge: 'Active Grid'
    },
    {
      title: t('ambulanceHotline', language),
      value: '102 (24/7)',
      icon: PhoneCall,
      color: 'from-red-700 to-red-800',
      badge: 'Nepal Ambulance Service'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Account & Registration Status Capsule */}
      <div className="rounded-[22px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black text-white shadow-md shrink-0 ${
              currentUser?.role === 'admin'
                ? 'bg-gradient-to-br from-amber-500 via-red-600 to-red-700'
                : currentUser?.role === 'doctor'
                ? 'bg-gradient-to-br from-blue-600 to-indigo-700'
                : 'bg-gradient-to-br from-red-600 to-blue-700'
            }`}
          >
            {currentUser?.role === 'admin' ? '👑' : currentUser ? currentUser.full_name.charAt(0) : '🔐'}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black text-slate-950 dark:text-white">
                {currentUser ? currentUser.full_name : (language === 'np' ? 'लगइन आवश्यक' : 'Sign In Required')}
              </span>
              {currentUser && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                    currentUser.role === 'admin'
                      ? 'bg-red-600 text-white'
                      : currentUser.role === 'doctor'
                      ? 'bg-blue-600 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {currentUser.role}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
              {currentUser?.role === 'admin'
                ? '👑 Administrator Active • Manage doctors, patients & clinical operations'
                : currentUser
                ? `Logged in as ${currentUser.full_name} (${currentUser.role}) • Telemedicine Services Active`
                : 'Authentication Required • Please sign in or register to access clinical services'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
          {onOpenAuth && (
            <>
              <button
                onClick={() => onOpenAuth('register-doctor')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold transition-all cursor-pointer"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>{language === 'np' ? 'डाक्टर दर्ता' : 'Doctor Reg'}</span>
              </button>

              <button
                onClick={() => onOpenAuth('register-patient')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition-all cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{language === 'np' ? 'बिरामी दर्ता' : 'Patient Reg'}</span>
              </button>

              <button
                onClick={() => onOpenAuth('login')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{currentUser ? (language === 'np' ? 'खाता परिवर्तन' : 'Switch Account') : (language === 'np' ? 'लगइन' : 'Sign In')}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Xenon AI Triage Hero Banner with Vibrant Nepal Flag Colors */}
      <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-r from-red-600 via-blue-700 to-red-600 p-1 shadow-xl">
        <div className="rounded-[24px] bg-white dark:bg-[#0F172A] p-6 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-red-600 to-blue-700 p-0.5 shadow-md shrink-0">
                <div className="w-full h-full rounded-[14px] bg-white dark:bg-[#1E293B] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-red-600 dark:text-red-400 stroke-[2.2]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-black text-slate-950 dark:text-white tracking-tight">
                    Xenon AI Clinical Assistant (जिनोन एआई)
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black tracking-wide uppercase">
                    Nepal First-Aid Triage
                  </span>
                </div>
                <p className="text-xs text-black dark:text-white mt-1 leading-relaxed font-medium">
                  {language === 'np'
                    ? 'रगत बग्ने, छाती दुख्ने, पोलेको वा लेक लागेको अवस्थामा तत्काल तार्किक प्राथमिक उपचार, औषधि सल्लाह र अस्पताल रेफरल।'
                    : 'Context-aware clinical triage for acute injuries, active bleeding, cardiac alerts, burns, and altitude AMS with verified Nepal protocols.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('xenon')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 text-white font-black text-xs shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 shrink-0"
            >
              <span>Launch Xenon AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards with Nepal Flag Red & Blue Accents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="relative overflow-hidden rounded-[22px] bg-white dark:bg-[#0F172A] p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm transition-all hover:translate-y-[-1px]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    {c.title}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-black mt-1 text-slate-950 dark:text-white">
                    {c.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${c.color} text-white shadow-md`}>
                  <Icon className="w-5.5 h-5.5 stroke-[2.4] text-white" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{c.badge}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Left Quick Actions, Right Daily Health Tip & Upcoming Consultations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Quick Actions Launchpad (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-[22px] bg-white dark:bg-[#0F172A] p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm">
            <h3 className="text-base font-black text-slate-950 dark:text-white flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-red-600 dark:text-red-400" />
              {t('quickActions', language)}
            </h3>

            <div className="space-y-2.5">
              <button
                onClick={() => onNavigate('xenon')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 text-white font-bold text-xs shadow-md shadow-red-600/20 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2.5 text-white">
                  <HeartPulse className="w-4 h-4 text-white" />
                  <span className="text-white font-bold">Xenon AI Emergency Triage</span>
                </span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={onBookClick}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-[#1E293B] dark:hover:bg-[#283548] text-slate-900 dark:text-white font-bold text-xs border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <CalendarDays className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                  <span>{t('bookConsultation', language)}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              </button>

              <button
                onClick={() => onNavigate('hospitals')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-[#1E293B] dark:hover:bg-[#283548] text-slate-900 dark:text-white font-bold text-xs border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span>{t('hospitalHelpdesk', language)}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              </button>

              {onOpenAuth && (
                <>
                  <button
                    onClick={() => onOpenAuth('register-doctor')}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-blue-50 hover:bg-blue-100/80 dark:bg-blue-950/40 dark:hover:bg-blue-900/40 text-blue-900 dark:text-blue-200 font-bold text-xs border border-blue-200 dark:border-blue-800 transition-all cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Stethoscope className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>{language === 'np' ? 'NMC डाक्टर दर्ता' : 'NMC Doctor Registration'}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </button>

                  <button
                    onClick={() => onOpenAuth('register-patient')}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 font-bold text-xs border border-emerald-200 dark:border-emerald-800 transition-all cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <UserPlus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>{language === 'np' ? 'नयाँ बिरामी दर्ता' : 'New Patient Registration'}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </button>
                </>
              )}

              <button
                onClick={() => onNavigate('lab')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-[#1E293B] dark:hover:bg-[#283548] text-slate-900 dark:text-white font-bold text-xs border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base">🧪</span>
                  <span>{t('labReports', language)}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              </button>

              <button
                onClick={() => onNavigate('offlineGuide')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-teal-50 hover:bg-teal-100/80 dark:bg-teal-950/40 dark:hover:bg-teal-900/40 text-teal-950 dark:text-teal-200 font-bold text-xs border border-teal-200 dark:border-teal-800 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base">🏔️</span>
                  <span>{t('offlineGuide', language)}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              </button>

              <button
                onClick={() => onNavigate('records')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-[#1E293B] dark:hover:bg-[#283548] text-slate-900 dark:text-white font-bold text-xs border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <UserCheck className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                  <span>{t('viewMedicalRecords', language)}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              </button>

              <button
                onClick={() => onNavigate('emergency')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-red-600/15 via-blue-600/15 to-emerald-600/15 hover:from-red-600/25 hover:via-blue-600/25 hover:to-emerald-600/25 text-slate-950 dark:text-white font-bold text-xs border border-red-500/30 dark:border-blue-500/30 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base">🚁</span>
                  <span className="text-left">
                    <span className="block font-black text-red-600 dark:text-red-400">Army Medevac &amp; DJI Drone</span>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-medium">Heli Rescue + 40kg FlyCart Supply</span>
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
              </button>

              <button
                onClick={() => onNavigate('emergency')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-[#1E293B] dark:hover:bg-[#283548] text-slate-900 dark:text-white font-bold text-xs border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span>{t('emergencyAmbulance', language)}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              </button>
            </div>
          </div>

          {/* Quick Doctor Highlights */}
          <div className="rounded-[22px] bg-white dark:bg-[#0F172A] p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-white mb-2 flex items-center gap-1.5">
              <span>🇳🇵</span> Certified NMC Specialists
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              All doctors on XENON HEALTH are verified with the <b className="font-extrabold text-red-600 dark:text-red-400">Nepal Medical Council (NMC)</b> with transparent fees in NPR and digital prescription signing.
            </p>
          </div>
        </div>

        {/* Right Col: Medication Reminders & Consultations (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Daily Medication Notification & Reminder Simulation */}
          <MedicationReminderCard
            prescriptions={prescriptions}
            language={language}
            onNavigateToRecords={() => onNavigate('records')}
          />

          {/* Health Tip Banner */}
          <div className="rounded-[22px] bg-white dark:bg-[#0F172A] p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-950 dark:text-white">
                  {t('healthTipTitle', language)}
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed font-medium">
                  {t('healthTipBody', language)}
                </p>
              </div>
            </div>
          </div>

          {/* Upcoming Consultations Table */}
          <div className="rounded-[22px] bg-white dark:bg-[#0F172A] p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-black text-slate-950 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                {t('upcomingConsultations', language)}
              </h3>
              <button
                onClick={() => onNavigate('records')}
                className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
              >
                View All →
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              {appointments.length === 0 ? (
                <div className="p-8 text-center bg-slate-50/50 dark:bg-slate-900/50">
                  <CalendarDays className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {language === 'np' ? 'कुनै आगामी परामर्श छैन' : 'No upcoming consultations'}
                  </p>
                  <button
                    onClick={onBookClick}
                    className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-blue-700 text-white font-bold text-xs shadow-sm cursor-pointer"
                  >
                    <span>{t('bookConsultation', language)}</span>
                  </button>
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-3">{t('date', language)}</th>
                      <th className="py-3 px-3">{t('doctor', language)}</th>
                      <th className="py-3 px-3">{t('type', language)}</th>
                      <th className="py-3 px-3">{t('status', language)}</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {appointments.slice(0, 4).map((apt) => (
                      <tr key={apt.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-slate-950 dark:text-white">
                          {apt.date} <span className="text-[11px] text-slate-500 dark:text-slate-400">({apt.time})</span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-950 dark:text-white">{apt.doctor_name}</div>
                          <div className="text-[11px] font-semibold text-blue-700 dark:text-blue-400">{apt.specialty}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800 text-[11px] font-bold">
                            {apt.type.includes('Video') ? <Video className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" /> : null}
                            <span>{apt.type}</span>
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          {apt.status === 'Confirmed' ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                              Confirmed
                            </span>
                          ) : apt.status === 'Completed' ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                              Completed
                            </span>
                          ) : apt.status === 'Cancelled' ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-red-100 dark:bg-red-950/80 text-red-900 dark:text-red-300 border border-red-300 dark:border-red-800">
                              Cancelled
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                              {apt.status}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right">
                          {apt.type.includes('Video') && apt.status === 'Confirmed' ? (
                            <button
                              onClick={() => onOpenVideoRoom(apt)}
                              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 text-white font-bold text-[11px] shadow-sm cursor-pointer inline-flex items-center gap-1.5 transition-all"
                            >
                              <Video className="w-3.5 h-3.5 text-white" />
                              <span className="text-white">Join</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => onNavigate('records')}
                              className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-[11px] hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 cursor-pointer transition-all"
                            >
                              <span>Details</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
