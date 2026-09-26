import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  User as UserIcon,
  HeartPulse,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  MapPin
} from 'lucide-react';
import { User, Language } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register-doctor' | 'register-patient';
  onLoginSuccess: (user: User) => void;
  onDoctorRegistered?: (doctor: any, user: User) => void;
  onPatientRegistered: (user: User) => void;
  hospitals?: any[];
  language: Language;
  existingUsers?: User[];
  isFirstVisit?: boolean;
  currentUser?: User | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
  onPatientRegistered,
  language,
  existingUsers = [],
  currentUser = null
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register-patient'>(
    initialMode === 'register-patient' ? 'register-patient' : 'login'
  );

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialMode === 'register-patient' ? 'register-patient' : 'login');
      setError('');
      setSuccessMsg('');
    }
  }, [isOpen, initialMode]);

  // Login state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Patient Register state
  const [patName, setPatName] = useState('');
  const [patEmail, setPatEmail] = useState('');
  const [patPhone, setPatPhone] = useState('+977-98');
  const [patPassword, setPatPassword] = useState('');
  const [patAge, setPatAge] = useState<number>(28);
  const [patGender, setPatGender] = useState('Male');
  const [patBloodGroup, setPatBloodGroup] = useState('O+');
  const [patDistrict, setPatDistrict] = useState('Kathmandu');
  const [patEmergencyContact, setPatEmergencyContact] = useState('+977-9841234567');

  // Status
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const iden = loginIdentifier.trim().toLowerCase();
    const pwd = loginPassword.trim();

    setTimeout(() => {
      // 1. Developer Account Authentication
      if (
        (iden === 'developer' ||
          iden === 'dev' ||
          iden === 'developer@xenonhealth.org.np' ||
          iden === 'dev@xenonhealth.org.np') &&
        pwd === '12admin34'
      ) {
        const devUser: User = {
          id: 'usr_001',
          username: 'developer',
          role: 'developer',
          full_name: 'Developer (Admin & Operations)',
          phone: '+977-9801234567',
          email: 'developer@xenonhealth.org.np'
        };
        setLoading(false);
        onLoginSuccess(devUser);
        return;
      }

      // 2. Nepal Parajuli Account Authentication (password: aarav*3812)
      if (
        (iden === 'nepal' ||
          iden === 'nepal.parajuli.77@gmail.com' ||
          iden === 'nepal parajuli') &&
        (pwd === 'aarav*3812' || pwd === '12admin34')
      ) {
        const nepalUser: User = {
          id: 'usr_nepal',
          username: 'nepal',
          role: 'patient',
          full_name: 'Nepal Parajuli',
          phone: '+977-9841234567',
          email: 'nepal.parajuli.77@gmail.com',
          district: 'Kathmandu',
          blood_group: 'O+',
          age: 28,
          gender: 'Male',
          emergency_contact: '+977-9841234567'
        };
        setLoading(false);
        onLoginSuccess(nepalUser);
        return;
      }

      // 3. Check any custom registered patient from existingUsers
      const matched = existingUsers.find(
        (u) =>
          u.username.toLowerCase() === iden ||
          u.email.toLowerCase() === iden
      );

      if (matched && matched.password && matched.password === pwd) {
        setLoading(false);
        onLoginSuccess(matched);
        return;
      }

      // All other accounts fail
      setLoading(false);
      setError(
        language === 'np'
          ? 'गलत प्रयोगकर्ता नाम वा पासवर्ड। केवल प्रमाणित खाता मान्य छ।'
          : 'Invalid credentials. Only registered Developer or Nepal Parajuli accounts are authorized.'
      );
    }, 400);
  };

  const handlePatientRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patName.trim() || !patPassword.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const newUser: User = {
        id: `usr_${Date.now()}`,
        username: patName.toLowerCase().replace(/\s+/g, '_'),
        role: 'patient',
        full_name: patName.trim(),
        email: patEmail.trim() || `${patName.toLowerCase().replace(/\s+/g, '_')}@xenonhealth.org.np`,
        phone: patPhone.trim(),
        password: patPassword.trim(),
        age: Number(patAge) || 28,
        gender: patGender,
        blood_group: patBloodGroup,
        district: patDistrict,
        emergency_contact: patEmergencyContact.trim()
      };

      setLoading(false);
      onPatientRegistered(newUser);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-6 shadow-2xl animate-in fade-in zoom-in-95 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-blue-700 text-white flex items-center justify-center font-black shadow-md shadow-red-600/20">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-950 dark:text-white">
              {activeTab === 'login'
                ? (language === 'np' ? 'खाता लगइन (Sign In)' : 'Account Sign In')
                : (language === 'np' ? 'नयाँ बिरामी दर्ता' : 'New Patient Registration')}
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              {language === 'np' ? 'जेनन स्वास्थ्य सेवा प्रमाणीकरण' : 'Secure Xenon Telemedicine Access'}
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 mb-4 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => {
              setActiveTab('login');
              setError('');
            }}
            className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'np' ? 'लगइन (Sign In)' : 'Sign In'}
          </button>
          <button
            onClick={() => {
              setActiveTab('register-patient');
              setError('');
            }}
            className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'register-patient'
                ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'np' ? 'बिरामी दर्ता' : 'Patient Register'}
          </button>
        </div>

        {/* LOGIN FORM */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                {language === 'np' ? 'प्रयोगकर्ता नाम वा इमेल *' : 'Username or Email *'}
              </label>
              <input
                type="text"
                required
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                placeholder="e.g. nepal or developer"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                {language === 'np' ? 'पासवर्ड *' : 'Password *'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-[11px] font-bold flex items-center gap-1.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 text-white font-bold text-xs shadow-md shadow-red-600/20 cursor-pointer transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>{language === 'np' ? 'प्रवेश गर्नुहोस्' : 'Sign In'}</span>
                </>
              )}
            </button>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
              <div className="font-bold text-slate-700 dark:text-slate-300">Authorized Access Accounts:</div>
              <div>• <b>Developer</b>: <code className="text-purple-600 font-bold">developer</code> / <code className="text-purple-600">12admin34</code></div>
              <div>• <b>Nepal Parajuli</b>: <code className="text-red-600 font-bold">nepal</code> / <code className="text-red-600">aarav*3812</code></div>
              <div className="text-[10px] text-slate-400 mt-1">
                * Doctors can log in directly via the <b>Doctor Portal</b> with their 4-digit security PIN.
              </div>
            </div>
          </form>
        )}

        {/* REGISTER PATIENT FORM */}
        {activeTab === 'register-patient' && (
          <form onSubmit={handlePatientRegisterSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                {language === 'np' ? 'पूरा नाम *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                value={patName}
                onChange={(e) => setPatName(e.target.value)}
                placeholder="e.g. Ramesh Thapa"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {language === 'np' ? 'रक्त समूह' : 'Blood Group'}
                </label>
                <select
                  value={patBloodGroup}
                  onChange={(e) => setPatBloodGroup(e.target.value)}
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
                  {language === 'np' ? 'उमेर' : 'Age'}
                </label>
                <input
                  type="number"
                  value={patAge}
                  onChange={(e) => setPatAge(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                {language === 'np' ? 'पासवर्ड *' : 'Set Password *'}
              </label>
              <input
                type="password"
                required
                value={patPassword}
                onChange={(e) => setPatPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              {loading ? 'Registering...' : 'Complete Patient Registration'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
