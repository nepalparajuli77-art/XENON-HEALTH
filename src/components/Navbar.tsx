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
  UserCheck,
  Stethoscope,
  HeartPulse,
  ChevronDown,
  UserPlus,
  Sparkles,
  Building2,
  FileText,
  Search,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Compass,
  FlaskConical,
  Upload
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

  const menuItems = [
    {
      id: 'dashboard',
      label: t('dashboard', language),
      desc: language === 'np' ? 'स्वास्थ्य प्रोफाइल, व्यक्तिगत सल्लाह र डाटा भल्ट' : 'Personal health profile, bite-sized advice & data vault',
      icon: '📊',
      category: 'Overview'
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
      id: 'doctors',
      label: t('doctors', language),
      desc: language === 'np' ? 'नेपाल मेडिकल काउन्सिल (NMC) प्रमाणित विशेषज्ञहरू' : 'NMC certified specialists & video OPD appointments',
      icon: '👨‍⚕️',
      category: 'Clinical Services'
    },
    {
      id: 'hospitals',
      label: t('hospitals', language),
      desc: language === 'np' ? 'नेपालभरका प्रमुख अस्पताल, आईसीयू र २४/७ सहायता' : 'Major hospitals & ICU directories across Nepal',
      icon: '🏥',
      category: 'Clinical Services'
    },
    {
      id: 'records',
      label: t('patientRecords', language),
      desc: language === 'np' ? 'डिजिटल प्रिस्क्रिप्शन, भिडियो कल र मेडिकल इतिहास' : 'Digital prescriptions & consultation history',
      icon: '📑',
      category: 'Records & Data'
    },
    {
      id: 'lab',
      label: t('labReports', language),
      desc: language === 'np' ? 'ल्याब रिपोर्ट बायोमार्कर स्क्यानर र विश्लेषण' : 'Automated lab report scanner & biomarker flags',
      icon: '🧪',
      category: 'Records & Data'
    },
    {
      id: 'offlineGuide',
      label: t('offlineGuide', language),
      desc: language === 'np' ? 'हिमाली भेगका लागि इन्टरनेट बिना चल्ने प्राथमिक उपचार' : 'High-altitude & trekker offline first-aid protocol',
      icon: '🏔️',
      category: 'Emergency & Safety'
    },
    {
      id: 'emergency',
      label: t('emergency', language),
      desc: language === 'np' ? 'नेपाली सेना हेलिकप्टर उद्धार, १०२ एम्बुलेन्स र हटलाइन' : 'Army helicopter rescue, 102 ambulance & hotlines',
      icon: '🚨',
      badge: 'SOS 102',
      category: 'Emergency & Safety'
    }
  ];

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.label.toLowerCase().includes(menuSearch.toLowerCase()) ||
      item.desc.toLowerCase().includes(menuSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(menuSearch.toLowerCase())
  );

  const activeItem = menuItems.find((i) => i.id === currentTab) || menuItems[0];

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
            {/* Left: Brand + Active View Pill */}
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

              {/* Current Active Tab Indicator */}
              <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                  {language === 'np' ? 'सक्रिय:' : 'Active:'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-700">
                  <span>{activeItem.icon}</span>
                  <span>{activeItem.label}</span>
                </span>
              </div>
            </div>

            {/* Right Controls: Minimalist Menu Button + Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Primary Minimalist Menu Button */}
              <button
                id="main-menu-trigger-btn"
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer shadow-sm border ${
                  menuOpen
                    ? 'bg-red-600 text-white border-red-600 scale-105 shadow-md shadow-red-600/30'
                    : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white border-transparent'
                }`}
                title="Open Navigation Menu"
              >
                {menuOpen ? <X className="w-4 h-4" /> : <MenuIcon className="w-4 h-4 text-white dark:text-slate-950" />}
                <span>{language === 'np' ? 'मेनु (Menu)' : 'Menu'}</span>
                <span className="px-1.5 py-0.5 rounded-md bg-white/20 dark:bg-black/10 text-[10px] font-black">
                  {menuItems.length}
                </span>
              </button>

              {/* Language Switcher */}
              <button
                id="lang-toggle-btn"
                onClick={() => setLanguage(language === 'en' ? 'np' : 'en')}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition-all cursor-pointer"
                title="Toggle English / नेपाली"
              >
                <Globe className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span>{language === 'en' ? 'नेपाली' : 'EN'}</span>
              </button>

              {/* Dark Mode Switcher */}
              <button
                id="theme-toggle-btn"
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 transition-all cursor-pointer"
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

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            onOpenAuth('register-doctor');
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all text-left cursor-pointer font-medium"
                        >
                          <Stethoscope className="w-4 h-4 text-blue-600" />
                          <span>{language === 'np' ? 'डाक्टर दर्ता (Doctor Reg)' : 'Register as NMC Doctor'}</span>
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

          {/* Quick Category Tab Strip for Instant Access */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-2 border-t border-slate-100 dark:border-slate-800/80 scrollbar-none">
            {menuItems.map((tab) => {
              const isActive = currentTab === tab.id;
              const isXenon = tab.id === 'xenon';
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSelectTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? isXenon
                        ? 'bg-gradient-to-r from-red-600 to-blue-700 text-white shadow-xs'
                        : 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
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

      {/* FULL-SCREEN SLIDE-OUT MENU DRAWER (Rendered Outside Header to Avoid Containing Block Issues) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
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
                    {language === 'np' ? 'जेनन स्वास्थ्य सेवा मेनु' : 'Xenon Health Services'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {language === 'np' ? 'नेपालको सम्पूर्ण डिजिटल स्वास्थ्य प्लेटफर्म' : 'Digital Healthcare & Emergency Grid of Nepal'}
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

            {/* Search Input */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  placeholder={language === 'np' ? 'सेवा खोज्नुहोस् (डाक्टर, एआई, ल्याब, आपतकालीन)...' : 'Search services (e.g. AI Triage, Doctors, Lab, Rescue)...'}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  autoFocus
                />
              </div>
            </div>

            {/* Services List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {filteredMenuItems.map((item) => {
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
                              OPEN
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
