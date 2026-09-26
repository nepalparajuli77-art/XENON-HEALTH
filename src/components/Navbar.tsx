import React, { useState, useEffect } from 'react';
import {
  Activity,
  Globe,
  Moon,
  Sun,
  Menu as MenuIcon,
  X,
  Lock,
  LogOut,
  Stethoscope,
  HeartPulse,
  ChevronDown,
  Sparkles,
  PhoneCall,
  Search,
  ArrowRight,
  ShieldCheck,
  Code,
  User,
  FileText
} from 'lucide-react';
import { Language, User as UserType } from '../types';
import { t } from '../data/mockData';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  currentUser: UserType | null;
  onOpenAuth: (mode?: 'login' | 'register-patient') => void;
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');

  // Close menu drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setUserMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // Mandatory primary navigation items requested by user: Patient, Doctor, Xenon, SOS
  const primaryNavItems = [
    {
      id: 'dashboard',
      label: language === 'np' ? 'बिरामी (Patient)' : 'Patient',
      icon: '📑',
      desc: 'Health Portal & Personal Vault'
    },
    {
      id: 'doctors',
      label: language === 'np' ? 'डाक्टर (Doctor)' : 'Doctor',
      icon: '👨‍⚕️',
      desc: 'NMC Doctor PIN Portal'
    },
    {
      id: 'xenon',
      label: 'Xenon AI',
      icon: '✨',
      badge: 'AI 24/7',
      desc: 'Clinical Triage & Emergency AI'
    },
    {
      id: 'emergency',
      label: language === 'np' ? 'आपतकालीन SOS' : 'SOS (102)',
      icon: '🚨',
      badge: '102',
      desc: 'Army Heli Rescue & Ambulance'
    }
  ];

  // Full comprehensive catalog for the slide-out menu drawer
  const allServices = [
    {
      id: 'dashboard',
      label: language === 'np' ? 'बिरामी स्वास्थ्य पोर्टल (Patient Portal)' : 'Patient Health Portal',
      desc: language === 'np' ? 'व्यक्तिगत स्वास्थ्य प्रोफाइल, दैनिक सल्लाह र डाटा भल्ट' : 'Personal health profile, bite-sized advice & data vault',
      icon: '📑',
      category: 'Patient Services'
    },
    {
      id: 'doctors',
      label: language === 'np' ? 'डाक्टर पोर्टल (Doctor OPD & PIN Access)' : 'Doctor Portal (NMC Gate)',
      desc: language === 'np' ? 'डाक्टर लगइन, बिरामी जाँच्ने कोठा र डिजिटल प्रेस्क्रिप्सन' : 'NMC specialist workspace, video OPD & digital prescriptions',
      icon: '👨‍⚕️',
      category: 'Clinical Services'
    },
    {
      id: 'xenon',
      label: t('xenonAi', language),
      desc: language === 'np' ? 'आपतकालीन एआई ट्राइज, लक्षण विश्लेषण र तत्काल सिफारिस' : 'AI emergency triage, symptoms check & protocols',
      icon: '✨',
      badge: 'AI 24/7',
      category: 'Clinical AI'
    },
    {
      id: 'emergency',
      label: t('emergency', language),
      desc: language === 'np' ? 'नेपाली सेना हेलिकप्टर उद्धार, १०२ एम्बुलेन्स र हटलाइन' : 'Army helicopter rescue, 102 ambulance & hotlines',
      icon: '🚨',
      badge: 'SOS 102',
      category: 'Emergency & Safety'
    },
    {
      id: 'hospitals',
      label: t('hospitals', language),
      desc: language === 'np' ? 'नेपालभरका प्रमुख अस्पताल, आईसीयू र २४/७ सहायता' : 'Major hospitals & ICU directories across Nepal',
      icon: '🏥',
      category: 'Directory'
    },
    {
      id: 'records',
      label: t('patientRecords', language),
      desc: language === 'np' ? 'डिजिटल प्रिस्क्रिप्शन, भिडियो कल र मेडिकल इतिहास' : 'Digital prescriptions & consultation timeline',
      icon: '📑',
      category: 'Records & Data'
    },
    {
      id: 'offlineGuide',
      label: t('offlineGuide', language),
      desc: language === 'np' ? 'हिमाली भेगका लागि इन्टरनेट बिना चल्ने प्राथमिक उपचार' : 'High-altitude & trekker offline first-aid protocol',
      icon: '🏔️',
      category: 'Emergency & Safety'
    }
  ];

  if (currentUser?.role === 'developer') {
    allServices.unshift({
      id: 'developer',
      label: 'Developer & Admin Console',
      desc: 'Monitor patients, onboard NMC doctors, reset PINs, telemetry',
      icon: '💻',
      badge: 'Root Admin',
      category: 'Administration'
    });
  }

  const filteredServices = allServices.filter(
    (item) =>
      item.label.toLowerCase().includes(menuSearch.toLowerCase()) ||
      item.desc.toLowerCase().includes(menuSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(menuSearch.toLowerCase())
  );

  const handleSelectTab = (tabId: string) => {
    setCurrentTab(tabId);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#0A0E1A]/95 border-b border-black/[0.08] dark:border-white/[0.08] shadow-xs">
        {/* Vibrant Nepal Flag Accent Stripe (Crimson Red & Royal Blue) */}
        <div className="h-1 w-full bg-gradient-to-r from-red-600 via-blue-700 to-red-600" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-17">
            {/* Left: Brand */}
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2.5 cursor-pointer group"
                onClick={() => handleSelectTab('dashboard')}
              >
                <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-red-600 via-red-700 to-blue-700 flex items-center justify-center text-white shadow-md shadow-red-600/30 border border-white/25 transition-transform group-hover:scale-105">
                  <Activity className="w-5.5 h-5.5 stroke-[2.4] text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-lg tracking-tight text-slate-950 dark:text-white">
                      {t('appName', language)}
                    </span>
                    <span className="text-[10px] font-extrabold tracking-wide px-1.5 py-0.5 rounded-md bg-red-600 text-white shadow-xs">
                      नेपाल
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden md:block">
                    {t('appTagline', language)}
                  </p>
                </div>
              </div>
            </div>

            {/* Center: Clean & Focused Navigation (Strictly SOS, Doctor, Patient, Xenon) */}
            <nav className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              {primaryNavItems.map((item) => {
                const isActive = currentTab === item.id;
                const isXenon = item.id === 'xenon';
                const isEmergency = item.id === 'emergency';
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? isXenon
                          ? 'bg-gradient-to-r from-red-600 to-blue-700 text-white shadow-xs'
                          : isEmergency
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs'
                        : isEmergency
                        ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40'
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1 py-0.2 rounded bg-red-600 text-white text-[8px] font-black">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {currentUser?.role === 'developer' && (
                <button
                  onClick={() => handleSelectTab('developer')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    currentTab === 'developer'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Dev Console</span>
                </button>
              )}
            </nav>

            {/* Right Controls: Menu Button + User Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Minimalist Menu Button */}
              <button
                id="main-menu-trigger-btn"
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer shadow-xs border ${
                  menuOpen
                    ? 'bg-red-600 text-white border-red-600 scale-105 shadow-md shadow-red-600/30'
                    : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white border-transparent'
                }`}
                title="Open Services Menu"
              >
                {menuOpen ? <X className="w-4 h-4" /> : <MenuIcon className="w-4 h-4 text-white dark:text-slate-950" />}
                <span>{language === 'np' ? 'मेनु' : 'Menu'}</span>
              </button>

              {/* Language Switcher */}
              <button
                id="lang-toggle-btn"
                onClick={() => setLanguage(language === 'en' ? 'np' : 'en')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition-all cursor-pointer"
                title="Toggle Language"
              >
                <Globe className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span>{language === 'en' ? 'नेपाली' : 'EN'}</span>
              </button>

              {/* Dark Mode Switcher */}
              <button
                id="theme-toggle-btn"
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 transition-all cursor-pointer"
                title="Toggle Theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>

              {/* User Capsule / Profile Dropdown */}
              {currentUser ? (
                <div className="relative pl-1 sm:pl-2 border-l border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer border border-transparent"
                  >
                    <div
                      className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-black shadow-xs ${
                        currentUser.role === 'developer'
                          ? 'bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 ring-2 ring-purple-400/50'
                          : currentUser.role === 'doctor'
                          ? 'bg-gradient-to-br from-blue-600 to-indigo-700 ring-2 ring-blue-400/40'
                          : 'bg-gradient-to-br from-red-600 to-blue-700'
                      }`}
                    >
                      {currentUser.role === 'developer' ? '💻' : currentUser.full_name.charAt(0)}
                    </div>
                    <div className="hidden lg:block text-left max-w-[110px]">
                      <div className="text-xs font-bold text-slate-950 dark:text-white truncate">
                        {currentUser.full_name}
                      </div>
                      <div className="text-[10px] text-slate-500 capitalize">
                        {currentUser.role === 'developer' ? 'Developer' : currentUser.role}
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
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 mb-1.5 border border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-2">
                            <div className="font-bold text-slate-950 dark:text-white truncate">
                              {currentUser.full_name}
                            </div>
                            {currentUser.role === 'developer' && (
                              <span className="px-1.5 py-0.5 rounded bg-purple-600 text-white text-[9px] font-black uppercase">
                                Developer
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono truncate mt-0.5">
                            {currentUser.email}
                          </div>
                        </div>

                        {currentUser.role === 'developer' && (
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              handleSelectTab('developer');
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all text-left cursor-pointer font-bold"
                          >
                            <Code className="w-4 h-4 text-purple-600" />
                            <span>Developer &amp; Admin Console</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            onOpenAuth('login');
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-left cursor-pointer font-medium"
                        >
                          <Lock className="w-4 h-4 text-slate-500" />
                          <span>{language === 'np' ? 'खाता परिवर्तन (Switch Account)' : 'Switch / Login Account'}</span>
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
                <button
                  onClick={() => onOpenAuth('login')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 text-white shadow-xs cursor-pointer transition-all hover:scale-105"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{language === 'np' ? 'लगइन' : 'Sign In'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Navigation Strip (Strictly Doctor, Patient, Xenon, SOS) */}
          <div className="md:hidden flex items-center gap-1.5 overflow-x-auto py-2 border-t border-slate-100 dark:border-slate-800/80 scrollbar-none">
            {primaryNavItems.map((tab) => {
              const isActive = currentTab === tab.id;
              const isXenon = tab.id === 'xenon';
              const isEmergency = tab.id === 'emergency';
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSelectTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? isXenon
                        ? 'bg-gradient-to-r from-red-600 to-blue-700 text-white shadow-xs'
                        : isEmergency
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="px-1 py-0.2 rounded bg-red-600 text-white text-[8px] font-black">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* FULL-SCREEN SLIDE-OUT MENU DRAWER */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in"
            onClick={() => setMenuOpen(false)}
          />

          {/* Slide-over Panel */}
          <div className="relative w-full max-w-lg h-full bg-white dark:bg-[#0F172A] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-blue-700 flex items-center justify-center text-white shadow-md">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-950 dark:text-white">
                    {language === 'np' ? 'जेनन स्वास्थ्य सेवा मेनु' : 'Xenon Health Navigation'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {language === 'np' ? 'सबै स्वास्थ्य सेवाहरू र डिजिटल सुविधा' : 'Access all portals, clinical grids & emergency services'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="p-2.5 rounded-2xl text-slate-500 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close Menu (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input (No autoFocus so keyboard never pops up automatically!) */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  placeholder={language === 'np' ? 'सेवा खोज्नुहोस्...' : 'Search services (Patient, Doctor, AI Triage, SOS)...'}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Services List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {filteredServices.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full p-3.5 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-gradient-to-r from-red-600/10 via-blue-600/10 to-red-600/10 dark:from-red-600/20 dark:via-blue-600/20 dark:to-red-600/20 border-red-500/40 shadow-xs'
                        : 'bg-slate-50/70 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-800/80 border-slate-200/80 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-2xl p-2 rounded-xl bg-white dark:bg-slate-800 shadow-xs border border-slate-200/60 dark:border-slate-700 shrink-0">
                        {item.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-black ${isActive ? 'text-red-600 dark:text-red-400' : 'text-slate-950 dark:text-white'}`}>
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-black">
                              {item.badge}
                            </span>
                          )}
                          {isActive && (
                            <span className="px-1.5 py-0.2 rounded bg-emerald-500 text-white text-[8px] font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-red-600 dark:text-red-400' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Drawer Footer with Quick Shortcuts */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectTab('xenon')}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  ✨ Xenon AI
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectTab('emergency')}
                  className="px-3.5 py-2 rounded-xl bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300 text-xs font-bold border border-red-200 dark:border-red-900 cursor-pointer"
                >
                  🚨 102 SOS
                </button>
              </div>

              <span className="text-[11px] text-slate-400 font-medium">
                Press ESC to close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
