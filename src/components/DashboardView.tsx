import React, { useState } from 'react';
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
  ShieldCheck,
  Upload,
  FileText,
  ChevronRight,
  Lightbulb,
  Share2,
  RefreshCw,
  Edit3,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { Doctor, Hospital, Appointment, Prescription, Language, User, UserVitals } from '../types';
import { t } from '../data/mockData';
import { MedicationReminderCard } from './MedicationReminderCard';
import { PersonalHealthVault } from './PersonalHealthVault';

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
  onUpdateUser?: (updatedUser: User) => void;
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
  onOpenAuth,
  onUpdateUser
}) => {
  // Advice carousel index
  const [adviceIndex, setAdviceIndex] = useState(0);
  const [adviceCategory, setAdviceCategory] = useState<'all' | 'altitude' | 'cardio' | 'nutrition' | 'wellness'>('all');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Profile Edit Local State
  const [editFullName, setEditFullName] = useState(currentUser?.full_name || '');
  const [editBloodGroup, setEditBloodGroup] = useState(currentUser?.blood_group || 'O+');
  const [editAge, setEditAge] = useState(currentUser?.age?.toString() || '28');
  const [editGender, setEditGender] = useState(currentUser?.gender || 'Male');
  const [editDistrict, setEditDistrict] = useState(currentUser?.district || 'Kathmandu');
  const [editEmergencyPhone, setEditEmergencyPhone] = useState(currentUser?.emergency_contact || '+977-9841234567');
  const [editAllergies, setEditAllergies] = useState(currentUser?.allergies?.join(', ') || 'None');

  // Curated Minimalist Nepal Health Advices
  const healthAdvices = [
    {
      id: 1,
      category: 'altitude',
      tag: language === 'np' ? 'हिमाली उचाइ सल्लाह' : 'Altitude & Hydration',
      icon: '🏔️',
      title: language === 'np' ? 'उचाइ र दैनिक पानीको मात्रा' : 'High-Altitude Hydration Balance',
      content: language === 'np'
        ? 'काठमाडौं (१,४०० मिटर) वा हिमाली भेगमा शरीरबाट छिटो पानी खेर जान्छ। दैनिक कम्तिमा ३-४ लिटर पानी पिउनुहोस् जसले अक्सिजन प्रवाह र टाउको दुखाई कम गर्न मद्दत गर्छ।'
        : 'In Kathmandu valley (1,400m) and hilly terrain, respiration loses fluid faster. Maintain 3-4 liters of daily water intake to optimize SpO2 transport and prevent altitude lethargy.'
    },
    {
      id: 2,
      category: 'cardio',
      tag: language === 'np' ? 'मुटु तथा रक्तचाप' : 'Cardiovascular Care',
      icon: '❤️',
      title: language === 'np' ? 'रक्तचाप तथा नुनको मात्रा नियन्त्रण' : 'Optimal Blood Pressure & Sodium Intake',
      content: language === 'np'
        ? 'दैनिक नुनको मात्रा ५ ग्रामभन्दा कम राख्नुहोस् र बिहान २० मिनेट हिंड्नुहोस्। यसले रक्तचापलाई सामान्य (१२०/८०) राख्न मद्दत गर्छ।'
        : 'Keep daily dietary sodium under 5g and incorporate 20 minutes of daily brisk walking to maintain resting BP around 120/80 mmHg.'
    },
    {
      id: 3,
      category: 'wellness',
      tag: language === 'np' ? 'वायु प्रदूषण सतर्कता' : 'Air Quality & Respiratory',
      icon: '🫁',
      title: language === 'np' ? 'उपत्यकाको हावा र मास्क प्रयोग' : 'Urban Air Quality & Lung Defense',
      content: language === 'np'
        ? 'काठमाडौंमा बिहानको समयमा धुलो र PM2.5 धेरै हुने भएकाले बाहिर निस्कँदा मास्क लगाउनुहोस् र घर फर्केपछि मनतातो पानीले मुख कुल्ला गर्नुहोस्।'
        : 'Kathmandu valley sees elevated morning PM2.5 particulates. Wear a particulate mask during commutes and rinse with warm saline.'
    },
    {
      id: 4,
      category: 'nutrition',
      tag: language === 'np' ? 'नेपाली पोषण सल्लाह' : 'Nepal Nutrition Balance',
      icon: '🍲',
      title: language === 'np' ? 'दाल, भात र सागपातको सन्तुलन' : 'Balanced Fiber & Protein in Traditional Diet',
      content: language === 'np'
        ? 'खानाको थालीमा भातको मात्रा अलि घटाएर ताजा हरियो साग, गेडागुडी र दही थप्दा पाचन प्रक्रिया राम्रो हुन्छ र मधुमेहबाट बचिन्छ।'
        : 'Balance white rice portions by doubling local green vegetables (saag), sprouted lentils (gedagudi), and probiotic curd (dahi).'
    },
    {
      id: 5,
      category: 'wellness',
      tag: language === 'np' ? 'औषधि नियमितता' : 'Medication Adherence',
      icon: '💊',
      title: language === 'np' ? 'डाक्टरको सिफारिस बिना औषधि नछोड्नुहोस्' : 'Course Completion & Digital Records',
      content: language === 'np'
        ? 'एन्टिबायोटिक वा रक्तचापको औषधि बीचमै नरोक्नुहोस्। नयाँ प्रिस्क्रिप्शन प्राप्त भएपछि तुरुन्त व्यक्तिगत भल्टमा अपलोड गर्नुहोस्।'
        : 'Never stop antibiotic or antihypertensive regimens abruptly. Upload digital Rx copies directly to your vault for instant refill reminders.'
    }
  ];

  const filteredAdvices = adviceCategory === 'all'
    ? healthAdvices
    : healthAdvices.filter((a) => a.category === adviceCategory);

  const currentAdvice = filteredAdvices[adviceIndex % filteredAdvices.length] || healthAdvices[0];

  const handleNextAdvice = () => {
    setAdviceIndex((prev) => (prev + 1) % filteredAdvices.length);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updatedUser: User = {
      ...currentUser,
      full_name: editFullName.trim() || currentUser.full_name,
      blood_group: editBloodGroup,
      age: parseInt(editAge) || currentUser.age || 28,
      gender: editGender,
      district: editDistrict.trim(),
      emergency_contact: editEmergencyPhone.trim(),
      allergies: editAllergies.split(',').map((s) => s.trim()).filter(Boolean)
    };

    if (onUpdateUser) {
      onUpdateUser(updatedUser);
    }

    try {
      localStorage.setItem('telemed_current_user', JSON.stringify(updatedUser));
      const savedUsers = localStorage.getItem('xenon_users') || localStorage.getItem('telemed_users');
      if (savedUsers) {
        const parsed = JSON.parse(savedUsers) as User[];
        const updatedList = parsed.map((u) => (u.id === updatedUser.id ? updatedUser : u));
        localStorage.setItem('xenon_users', JSON.stringify(updatedList));
      }
    } catch (e) {
      console.warn(e);
    }

    setIsEditingProfile(false);
  };

  // Safe fallback display user
  const activeUser = currentUser || {
    id: 'guest_user',
    username: 'guest',
    role: 'patient' as const,
    full_name: language === 'np' ? 'अतिथि बिरामी' : 'Guest Patient',
    phone: '+977-98XXXXXXXX',
    email: 'patient@xenonhealth.org.np',
    blood_group: 'O+',
    age: 28,
    gender: 'Male',
    district: 'Kathmandu',
    emergency_contact: '102 (National Ambulance)'
  };

  const timeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return language === 'np' ? 'शुभ प्रभात' : 'Good Morning';
    if (hour < 17) return language === 'np' ? 'शुभ दिउँसो' : 'Good Afternoon';
    return language === 'np' ? 'शुभ सन्ध्या' : 'Good Evening';
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: User Info & Health Identity Card (Opens First) */}
      <section className="relative overflow-hidden rounded-[26px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* User Profile Capsule */}
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-lg shrink-0 ${
                activeUser.role === 'developer'
                  ? 'bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 ring-2 ring-purple-400/50'
                  : activeUser.role === 'doctor'
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-700 ring-2 ring-blue-400/40'
                  : 'bg-gradient-to-br from-red-600 to-blue-700'
              }`}
            >
              {activeUser.role === 'developer' ? '💻' : activeUser.full_name.charAt(0)}
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {timeGreeting()},
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
                  {activeUser.full_name}
                </h2>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    activeUser.role === 'developer'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : activeUser.role === 'doctor'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-emerald-600 text-white shadow-xs'
                  }`}
                >
                  {activeUser.role === 'developer' ? 'Developer Access' : activeUser.role === 'doctor' ? 'NMC Doctor' : 'Patient'}
                </span>
              </div>

              {/* Patient Quick Vitals & Health Attributes */}
              <div className="mt-2 flex items-center gap-2 sm:gap-3 flex-wrap text-xs text-slate-700 dark:text-slate-300 font-medium">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
                  <span>🆔</span>
                  <span>{activeUser.id}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/40 font-bold">
                  <span>🩸</span>
                  <span>{activeUser.blood_group || 'O+'}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/40">
                  <MapPin className="w-3 h-3 text-blue-600" />
                  <span>{activeUser.district || 'Kathmandu, Nepal'}</span>
                </span>

                {activeUser.emergency_contact && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40">
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <span>SOS: {activeUser.emergency_contact}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions for User Profile */}
          <div className="flex items-center gap-2.5 self-start lg:self-auto flex-wrap">
            <button
              onClick={() => setIsEditingProfile(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{language === 'np' ? 'प्रोफाइल सम्पादन' : 'Edit Profile'}</span>
            </button>

            {onOpenAuth && (
              <button
                onClick={() => onOpenAuth('login')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{currentUser ? (language === 'np' ? 'खाता परिवर्तन' : 'Switch Account') : (language === 'np' ? 'लगइन' : 'Sign In')}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: "Only a little bit of advices" (Personalized & Curated Daily Health Nuggets) */}
      <section className="rounded-[24px] bg-gradient-to-r from-red-600/10 via-blue-600/10 to-red-600/10 dark:from-red-600/20 dark:via-blue-600/20 dark:to-red-600/20 border border-red-500/20 dark:border-blue-500/30 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-600 text-white shadow-xs">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-950 dark:text-white">
                  {language === 'np' ? 'दैनिक व्यक्तिगत स्वास्थ्य सल्लाह' : 'Personalized Daily Health Advice'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-extrabold uppercase">
                  Bite-Sized
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {language === 'np' ? 'तपाईंको भूगोल र आवश्यकता अनुसार तयार गरिएको' : 'Tailored for your altitude, season & profile'}
              </p>
            </div>
          </div>

          {/* Advice Category Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {(['all', 'altitude', 'cardio', 'nutrition'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setAdviceCategory(cat);
                  setAdviceIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-all cursor-pointer ${
                  adviceCategory === cat
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Advice Content Box */}
        <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#0F172A] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-start gap-3.5">
            <span className="text-3xl p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
              {currentAdvice.icon}
            </span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                  {currentAdvice.tag}
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-950 dark:text-white">
                {currentAdvice.title}
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed font-medium">
                {currentAdvice.content}
              </p>
            </div>
          </div>

          <button
            onClick={handleNextAdvice}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold transition-all cursor-pointer shrink-0 self-end md:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5 text-red-600" />
            <span>{language === 'np' ? 'अर्को सल्लाह' : 'Next Tip'}</span>
          </button>
        </div>
      </section>

      {/* SECTION 3: Upload Their Own Data (Personalized Health Vault) */}
      <section>
        <PersonalHealthVault
          currentUser={activeUser}
          language={language}
          onUpdateUserVitals={(vitals) => {
            if (currentUser && onUpdateUser) {
              onUpdateUser({ ...currentUser, vitals });
            }
          }}
        />
      </section>

      {/* SECTION 4: Minimalist Consultations & Medication Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Medication Reminders (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <MedicationReminderCard
            prescriptions={prescriptions}
            language={language}
            onNavigateToRecords={() => onNavigate('records')}
          />
        </div>

        {/* Right Col: Upcoming Consultations (6 cols) */}
        <div className="lg:col-span-6 rounded-[22px] bg-white dark:bg-[#0F172A] p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-blue-600" />
                <span>{t('upcomingConsultations', language)}</span>
              </h3>
              <button
                onClick={() => onNavigate('records')}
                className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
              >
                View Records →
              </button>
            </div>

            {appointments.length === 0 ? (
              <div className="p-6 text-center bg-slate-50/60 dark:bg-slate-900/60 rounded-xl">
                <p className="text-xs text-slate-500 font-medium">
                  {language === 'np' ? 'कुनै आगामी भिडियो वा ओपीडी परामर्श छैन।' : 'No upcoming consultations scheduled.'}
                </p>
                <button
                  onClick={onBookClick}
                  className="mt-3 px-4 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>{t('bookConsultation', language)}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {appointments.slice(0, 3).map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-950 dark:text-white">
                        {apt.doctor_name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {apt.date} ({apt.time}) • {apt.specialty}
                      </div>
                    </div>

                    {apt.type.includes('Video') && apt.status === 'Confirmed' ? (
                      <button
                        onClick={() => onOpenVideoRoom(apt)}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join</span>
                      </button>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {apt.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => onNavigate('xenon')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Xenon AI Triage</span>
            </button>

            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer"
            >
              <span>+ Book NMC Specialist</span>
            </button>
          </div>
        </div>
      </section>

      {/* Profile Edit Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-base font-black text-slate-950 dark:text-white mb-1">
              {language === 'np' ? 'व्यक्तिगत स्वास्थ्य प्रोफाइल सम्पादन' : 'Edit Personal Health Profile'}
            </h3>
            <p className="text-xs text-slate-500 mb-4 font-medium">
              {language === 'np' ? 'यसले परामर्श र एआई स्वास्थ्य सिफारिसलाई व्यक्तिगत बनाउँछ।' : 'Update your personal info for tailored healthcare & alerts.'}
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {language === 'np' ? 'पूरा नाम' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {language === 'np' ? 'रक्त समूह (Blood Group)' : 'Blood Group'}
                  </label>
                  <select
                    value={editBloodGroup}
                    onChange={(e) => setEditBloodGroup(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-bold"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {language === 'np' ? 'उमेर (Age)' : 'Age'}
                  </label>
                  <input
                    type="number"
                    value={editAge}
                    onChange={(e) => setEditAge(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {language === 'np' ? 'जिल्ला (District)' : 'District'}
                  </label>
                  <input
                    type="text"
                    value={editDistrict}
                    onChange={(e) => setEditDistrict(e.target.value)}
                    placeholder="Kathmandu"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {language === 'np' ? 'आपतकालीन सम्पर्क (SOS)' : 'Emergency Contact'}
                  </label>
                  <input
                    type="text"
                    value={editEmergencyPhone}
                    onChange={(e) => setEditEmergencyPhone(e.target.value)}
                    placeholder="+977-98XXXXXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {language === 'np' ? 'एलर्जीहरू (Allergies - कमाले छुट्याउनुहोस्)' : 'Allergies (comma separated)'}
                </label>
                <input
                  type="text"
                  value={editAllergies}
                  onChange={(e) => setEditAllergies(e.target.value)}
                  placeholder="e.g. Penicillin, Dust, Peanuts"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-blue-700 text-white font-bold shadow-sm cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
