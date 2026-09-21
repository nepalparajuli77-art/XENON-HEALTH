import React, { useState } from 'react';
import {
  Activity,
  Globe,
  Moon,
  Sun,
  ShieldAlert,
  FileText,
  Lock,
  LogOut,
  UserCheck,
  Stethoscope,
  HeartPulse,
  ChevronDown,
  UserPlus,
  Shield
} from 'lucide-react';
import { Language, User } from '../types';
import { t } from '../data/mockData';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  currentUser: User | null;
  onOpenAuth: (mode?: 'login' | 'register-doctor' | 'register-patient') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  isDark,
  setIsDark,
  currentUser,
  onOpenAuth,
  onLogout
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', label: t('dashboard', language), icon: '📊' },
    { id: 'xenon', label: t('xenonAi', language), icon: '✨' },
    { id: 'doctors', label: t('doctors', language), icon: '👨‍⚕️' },
    { id: 'hospitals', label: t('hospitals', language), icon: '🏥' },
    { id: 'records', label: t('patientRecords', language), icon: '📑' },
    { id: 'lab', label: t('labReports', language), icon: '🧪' },
    { id: 'offlineGuide', label: t('offlineGuide', language), icon: '🏔️' },
    { id: 'emergency', label: t('emergency', language), icon: '🚨' },
  ];

  return (
    <header className="sticky top-0 z-30 backdrop-blur-2xl bg-white/95 dark:bg-[#0A0E1A]/95 border-b border-black/[0.08] dark:border-white/[0.08] transition-colors shadow-xs">
      {/* Vibrant Nepal Flag Accent Stripe (Crimson Red & Royal Blue) */}
      <div className="h-1 w-full bg-gradient-to-r from-red-600 via-blue-700 to-red-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-17">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-red-600 via-red-700 to-blue-700 flex items-center justify-center text-white shadow-md shadow-red-600/30 border border-white/25">
              <Activity className="w-5.5 h-5.5 stroke-[2.4] text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-tight text-black dark:text-white">
                  {t('appName', language)}
                </span>
                <span className="text-[10px] font-extrabold tracking-wide px-2 py-0.5 rounded-full bg-red-600 text-white shadow-xs flex items-center gap-1">
                  <span>🇳🇵</span> नेपाल
                </span>
              </div>
              <p className="text-xs text-black dark:text-white font-medium hidden sm:block opacity-90">
                {t('appTagline', language)}
              </p>
            </div>
          </div>

          {/* Controls: Language, Theme, Auth & User Capsule */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Xenon Quick Launch Pill */}
            <button
              onClick={() => setCurrentTab('xenon')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 text-white shadow-sm shadow-red-600/20 cursor-pointer transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>Xenon AI</span>
            </button>

            {/* Quick Registration Shortcut */}
            <button
              onClick={() => onOpenAuth('register-doctor')}
              className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 cursor-pointer transition-all"
              title="NMC Certified Doctor Registration"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{language === 'np' ? 'डाक्टर दर्ता' : 'Doctor Reg'}</span>
            </button>

            {/* Language Switcher */}
            <button
              id="lang-toggle-btn"
              onClick={() => setLanguage(language === 'en' ? 'np' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-[#F1F5F9] dark:bg-[#131C31] hover:bg-neutral-200 dark:hover:bg-[#1E293B] text-black dark:text-white border border-black/10 dark:border-white/10 shadow-xs transition-all cursor-pointer"
              title="Toggle English / नेपाली"
            >
              <Globe className="w-3.5 h-3.5 text-black dark:text-white" />
              <span className="text-black dark:text-white">{language === 'en' ? '🇳🇵 नेपाली' : '🌐 EN'}</span>
            </button>

            {/* Theme Switcher */}
            <button
              id="theme-toggle-btn"
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full text-black dark:text-white backdrop-blur-md bg-[#F1F5F9] dark:bg-[#131C31] hover:bg-neutral-200 dark:hover:bg-[#1E293B] border border-black/10 dark:border-white/10 shadow-xs transition-all cursor-pointer"
              title="Toggle Light / Dark Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-white" /> : <Moon className="w-4 h-4 text-black" />}
            </button>

            {/* User Profile / Auth Action */}
            {currentUser ? (
              <div className="relative pl-1.5 border-l border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <div
                    className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-black shadow-xs ${
                      currentUser.role === 'staff'
                        ? 'bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 ring-2 ring-amber-400/50'
                        : currentUser.role === 'doctor'
                        ? 'bg-gradient-to-br from-blue-600 to-indigo-700 ring-2 ring-blue-400/40'
                        : 'bg-gradient-to-br from-red-600 to-blue-700'
                    }`}
                  >
                    {currentUser.role === 'staff' ? '🛡️' : currentUser.full_name.charAt(0)}
                  </div>
                  <div className="text-left hidden md:block max-w-[130px]">
                    <div className="text-xs font-black text-slate-950 dark:text-white leading-tight truncate">
                      {currentUser.full_name}
                    </div>
                    <div className="text-[10px] text-slate-600 dark:text-slate-400 capitalize font-bold flex items-center gap-1">
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full ${
                          currentUser.role === 'staff'
                            ? 'bg-amber-500'
                            : currentUser.role === 'doctor'
                            ? 'bg-blue-500'
                            : 'bg-emerald-500'
                        }`}
                      />
                      <span>{currentUser.role}</span>
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-2 text-xs animate-in fade-in slide-in-from-top-2">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 mb-1.5 border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <div className="font-bold text-slate-950 dark:text-white truncate">
                            {currentUser.full_name}
                          </div>
                          {currentUser.role === 'staff' && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-600 text-white text-[9px] font-black uppercase">
                              Staff Access
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate mt-0.5">
                          {currentUser.email}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          onOpenAuth('login');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-left cursor-pointer font-medium"
                      >
                        <Lock className="w-4 h-4 text-slate-500" />
                        <span>{language === 'np' ? 'खाता परिवर्तन (Switch Account)' : 'Switch / Login Other Account'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          onOpenAuth('register-doctor');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all text-left cursor-pointer font-medium"
                      >
                        <Stethoscope className="w-4 h-4 text-blue-600" />
                        <span>{language === 'np' ? 'डाक्टर दर्ता (NMC Doctor Reg)' : 'Register as NMC Doctor'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          onOpenAuth('register-patient');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all text-left cursor-pointer font-medium"
                      >
                        <HeartPulse className="w-4 h-4 text-emerald-600" />
                        <span>{language === 'np' ? 'बिरामी दर्ता (Patient Reg)' : 'Register New Patient'}</span>
                      </button>

                      <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all text-left cursor-pointer font-bold"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>{language === 'np' ? 'लगआउट (Sign Out)' : 'Sign Out'}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-1.5 border-l border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 text-white shadow-sm shadow-red-600/20 cursor-pointer transition-all hover:scale-105"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{language === 'np' ? 'लगइन' : 'Sign In'}</span>
                </button>

                <button
                  onClick={() => onOpenAuth('register-patient')}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 cursor-pointer transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{language === 'np' ? 'दर्ता' : 'Register'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-2.5 pt-1 scrollbar-none">
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 max-w-full">
            {tabs.map((tab) => {
              const active = currentTab === tab.id;
              const isXenon = tab.id === 'xenon';
              return (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? isXenon
                        ? 'bg-gradient-to-r from-red-600 to-blue-700 text-white shadow-md shadow-red-600/20'
                        : 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700 scale-[1.01]'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span className={active && isXenon ? 'text-white' : active ? 'text-slate-950 dark:text-white' : 'text-slate-700 dark:text-slate-300'}>
                    {tab.label}
                  </span>
                  {isXenon && (
                    <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-black tracking-wider animate-pulse">
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};
