/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { DoctorsView } from './components/DoctorsView';
import { HospitalsView } from './components/HospitalsView';
import { PatientRecordsView } from './components/PatientRecordsView';
import { EmergencyView } from './components/EmergencyView';
import { XenonAiView } from './components/XenonAiView';
import { LabReportsView } from './components/LabReportsView';
import { OfflineGuideView } from './components/OfflineGuideView';
import { BookModal } from './components/BookModal';
import { ChatModal } from './components/ChatModal';
import { IssueRxModal } from './components/IssueRxModal';
import { VideoRoomModal } from './components/VideoRoomModal';
import { AuthModal } from './components/AuthModal';
import {
  INITIAL_DOCTORS,
  INITIAL_HOSPITALS,
  INITIAL_APPOINTMENTS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_EMERGENCY_CONTACTS,
  INITIAL_USERS,
  INITIAL_LAB_REPORTS
} from './data/mockData';
import { Doctor, Hospital, Appointment, Prescription, Language, User, LabReport } from './types';

// Auto-complete appointments whose date has passed
function syncAppointmentStatuses(apts: Appointment[]): Appointment[] {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  return apts.map((apt) => {
    if (apt.status === 'Cancelled' || apt.status === 'Completed') {
      return apt;
    }
    // If appointment date is strictly before today's date string (YYYY-MM-DD), mark completed
    if (apt.date && apt.date < todayStr) {
      return { ...apt, status: 'Completed' as const };
    }
    return apt;
  });
}

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [language, setLanguage] = useState<Language>('en');
  const [isDark, setIsDark] = useState(false);

  // Core Data Collections (Stateful with localStorage persistence)
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('xenon_users') || localStorage.getItem('telemed_users');
      if (saved) {
        const parsed = JSON.parse(saved) as User[];
        // Purge Bina Pokharel and keep staff/doctors
        const cleaned = parsed.filter(
          (u) =>
            u.username !== 'patient_bina' &&
            u.full_name !== 'Bina Pokharel' &&
            u.full_name !== 'Bina Pokhrel'
        );
        if (!cleaned.some((u) => u.username === 'developer' || u.role === 'developer')) {
          cleaned.unshift(INITIAL_USERS[0]);
        }
        localStorage.setItem('xenon_users', JSON.stringify(cleaned));
        return cleaned;
      }
    } catch (e) {
      console.warn('Failed to parse cached users', e);
    }
    return INITIAL_USERS;
  });

  // Track whether site has already been operated
  const [hasOperatedSite, setHasOperatedSite] = useState<boolean>(() => {
    try {
      return localStorage.getItem('telemed_site_operated') === 'true';
    } catch {
      return false;
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('telemed_current_user');
      if (saved) {
        const parsed = JSON.parse(saved) as User;
        if (
          parsed.username !== 'patient_bina' &&
          parsed.full_name !== 'Bina Pokharel' &&
          parsed.full_name !== 'Bina Pokhrel'
        ) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse cached user', e);
    }
    return INITIAL_USERS[0];
  });

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    try {
      const saved = localStorage.getItem('telemed_doctors');
      if (saved) {
        const parsed = JSON.parse(saved) as Doctor[];
        localStorage.setItem('telemed_doctors', JSON.stringify(parsed));
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse cached doctors', e);
    }
    return INITIAL_DOCTORS;
  });

  const [hospitals] = useState<Hospital[]>(INITIAL_HOSPITALS);

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('telemed_appointments');
      if (saved) {
        const parsed = JSON.parse(saved) as Appointment[];
        // Filter out any data of Bina Pokhrel and sync statuses
        const cleaned = parsed.filter(
          (a) =>
            a.patient_username !== 'patient_bina' &&
            a.patient_name !== 'Bina Pokharel' &&
            a.patient_name !== 'Bina Pokhrel'
        );
        const synced = syncAppointmentStatuses(cleaned);
        localStorage.setItem('telemed_appointments', JSON.stringify(synced));
        return synced;
      }
    } catch (e) {
      console.warn('Failed to parse cached appointments', e);
    }
    return syncAppointmentStatuses(INITIAL_APPOINTMENTS);
  });

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    try {
      const saved = localStorage.getItem('telemed_prescriptions');
      if (saved) {
        const parsed = JSON.parse(saved) as Prescription[];
        const cleaned = parsed.filter(
          (p) =>
            p.patient_username !== 'patient_bina' &&
            p.patient_name !== 'Bina Pokharel' &&
            p.patient_name !== 'Bina Pokhrel'
        );
        localStorage.setItem('telemed_prescriptions', JSON.stringify(cleaned));
        return cleaned;
      }
    } catch (e) {
      console.warn('Failed to parse cached prescriptions', e);
    }
    return INITIAL_PRESCRIPTIONS;
  });

  const [labReports, setLabReports] = useState<LabReport[]>(() => {
    try {
      const saved = localStorage.getItem('telemed_lab_reports');
      if (saved) {
        return JSON.parse(saved) as LabReport[];
      }
    } catch (e) {
      console.warn('Failed to parse cached lab reports', e);
    }
    return INITIAL_LAB_REPORTS;
  });

  const handleAddLabReport = (newReport: LabReport) => {
    setLabReports((prev) => {
      const updated = [newReport, ...prev];
      try {
        localStorage.setItem('telemed_lab_reports', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
    showToast(`Analyzed and archived report for ${newReport.test_name}!`);
  };

  // Keep appointment statuses synced on schedule / mount
  useEffect(() => {
    setAppointments((prev) => {
      const synced = syncAppointmentStatuses(prev);
      try {
        localStorage.setItem('telemed_appointments', JSON.stringify(synced));
      } catch (e) {
        console.warn(e);
      }
      return synced;
    });
  }, []);

  // Modal States
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);

  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [selectedHospitalForChat, setSelectedHospitalForChat] = useState<Hospital | null>(null);

  const [issueRxModalOpen, setIssueRxModalOpen] = useState(false);

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideoAppointment, setActiveVideoAppointment] = useState<Appointment | null>(null);

  // Auth Modal state
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register-doctor' | 'register-patient'>('login');

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const markSiteOperated = () => {
    setHasOperatedSite(true);
    try {
      localStorage.setItem('telemed_site_operated', 'true');
    } catch (e) {
      console.warn(e);
    }
  };

  // Auth Handlers
  const handleOpenAuth = (mode: 'login' | 'register-doctor' | 'register-patient' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: User) => {
    markSiteOperated();
    setCurrentUser(user);
    setAuthModalOpen(false);
    try {
      localStorage.setItem('telemed_current_user', JSON.stringify(user));
    } catch (e) {
      console.warn(e);
    }
    showToast(`Welcome, ${user.full_name}! Logged in as ${user.role}.`);
  };

  const handleDoctorRegistered = (newDoctor: Doctor, newUser: User) => {
    markSiteOperated();
    setDoctors((prev) => {
      const updated = [newDoctor, ...prev];
      try {
        localStorage.setItem('telemed_doctors', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    setUsers((prev) => {
      const updated = [newUser, ...prev];
      try {
        localStorage.setItem('telemed_users', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    setCurrentUser(newUser);
    setAuthModalOpen(false);
    try {
      localStorage.setItem('telemed_current_user', JSON.stringify(newUser));
    } catch (e) {
      console.warn(e);
    }

    showToast(`Doctor registration approved! Welcome, ${newDoctor.name} (${newDoctor.nmc_number}).`);
  };

  const handlePatientRegistered = (newPatient: User) => {
    markSiteOperated();
    setUsers((prev) => {
      const updated = [newPatient, ...prev];
      try {
        localStorage.setItem('telemed_users', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    setCurrentUser(newPatient);
    setAuthModalOpen(false);
    try {
      localStorage.setItem('telemed_current_user', JSON.stringify(newPatient));
    } catch (e) {
      console.warn(e);
    }

    showToast(`Patient registered! Welcome, ${newPatient.full_name} (PID: ${newPatient.id}).`);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setUsers((prev) => {
      const updated = prev.map((u) => (u.id === updatedUser.id ? updatedUser : u));
      try {
        localStorage.setItem('xenon_users', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
    try {
      localStorage.setItem('telemed_current_user', JSON.stringify(updatedUser));
    } catch (e) {
      console.warn(e);
    }
    showToast(`Health profile updated for ${updatedUser.full_name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('telemed_current_user');
    } catch (e) {
      console.warn(e);
    }
    setAuthModalMode('login');
    setAuthModalOpen(true);
    showToast('Signed out successfully. Please sign in or register to continue.');
  };

  // Handlers
  const handleOpenBookModal = (doc?: Doctor) => {
    setSelectedDoctorForBooking(doc || doctors[0]);
    setBookModalOpen(true);
  };

  const handleConfirmBooking = (newApt: Appointment) => {
    setAppointments((prev) => {
      const updated = [newApt, ...prev];
      try {
        localStorage.setItem('telemed_appointments', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
    showToast(`Appointment confirmed with ${newApt.doctor_name} for ${newApt.date}!`);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments((prev) => {
      const updated = prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: 'Cancelled' as const } : apt
      );
      try {
        localStorage.setItem('telemed_appointments', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
    showToast(`Appointment #${appointmentId.toUpperCase()} has been cancelled.`);
  };

  const handleOpenChat = (hosp: Hospital) => {
    setSelectedHospitalForChat(hosp);
    setChatModalOpen(true);
  };

  const handleOpenVideoRoom = (apt: Appointment) => {
    setActiveVideoAppointment(apt);
    setVideoModalOpen(true);
  };

  const handleSavePrescription = (newRx: Prescription) => {
    setPrescriptions((prev) => {
      const updated = [newRx, ...prev];
      try {
        localStorage.setItem('telemed_prescriptions', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
    showToast(`Digital Prescription #${newRx.id.toUpperCase()} successfully issued and signed!`);
  };

  // Safe fallback user for records and booking if logged out
  const activeUser = currentUser || INITIAL_USERS[0];

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-200 ${isDark ? 'dark bg-[#070A12] text-white' : 'bg-[#F8FAFC] text-black'}`}>
      {/* Vibrant Nepal Flag Ambient Atmosphere (Crimson Red & Royal Blue) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-red-600/10 dark:bg-red-600/15 blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-blue-600/10 dark:bg-blue-600/15 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-red-600/10 dark:bg-red-600/15 blur-3xl" />
      </div>

      {/* Main Container Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          language={language}
          setLanguage={setLanguage}
          isDark={isDark}
          setIsDark={setIsDark}
          currentUser={currentUser}
          onOpenAuth={handleOpenAuth}
          onLogout={handleLogout}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {currentTab === 'dashboard' && (
            <DashboardView
              doctors={doctors}
              hospitals={hospitals}
              appointments={appointments}
              prescriptions={prescriptions}
              language={language}
              onNavigate={setCurrentTab}
              onBookClick={() => handleOpenBookModal()}
              onOpenVideoRoom={handleOpenVideoRoom}
              currentUser={currentUser}
              onOpenAuth={handleOpenAuth}
              onUpdateUser={handleUpdateUser}
            />
          )}

          {currentTab === 'xenon' && (
            <XenonAiView
              language={language}
              onBookDoctor={() => handleOpenBookModal()}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'doctors' && (
            <DoctorsView
              doctors={doctors}
              language={language}
              onBookDoctor={(doc) => handleOpenBookModal(doc)}
              onOpenDoctorRegister={() => handleOpenAuth('register-doctor')}
            />
          )}

          {currentTab === 'hospitals' && (
            <HospitalsView
              hospitals={hospitals}
              language={language}
              onOpenChat={handleOpenChat}
            />
          )}

          {currentTab === 'records' && (
            <PatientRecordsView
              appointments={appointments}
              prescriptions={prescriptions}
              currentUser={activeUser}
              language={language}
              onOpenVideoRoom={handleOpenVideoRoom}
              onIssueRxClick={() => setIssueRxModalOpen(true)}
              onOpenPatientRegister={() => handleOpenAuth('register-patient')}
              onCancelAppointment={handleCancelAppointment}
            />
          )}

          {currentTab === 'lab' && (
            <LabReportsView
              labReports={labReports}
              onAddLabReport={handleAddLabReport}
              language={language}
            />
          )}

          {currentTab === 'offlineGuide' && (
            <OfflineGuideView
              language={language}
            />
          )}

          {currentTab === 'emergency' && (
            <EmergencyView
              contacts={INITIAL_EMERGENCY_CONTACTS}
              language={language}
            />
          )}
        </main>

        {/* Global Footer */}
        <footer className="mt-auto border-t border-black/[0.08] dark:border-white/[0.08] bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-xl py-4 transition-colors">
          <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-700 dark:text-slate-300 font-medium">
            <p>
              🇳🇵 <b>XENON HEALTH</b> — Next-Gen Digital Healthcare & AI Health Services
            </p>
          </div>
        </footer>
      </div>


      {/* Floating Action Modals */}
      <BookModal
        isOpen={bookModalOpen}
        doctor={selectedDoctorForBooking}
        doctors={doctors}
        currentUser={activeUser}
        language={language}
        onClose={() => setBookModalOpen(false)}
        onConfirmBooking={handleConfirmBooking}
      />

      <ChatModal
        isOpen={chatModalOpen}
        hospital={selectedHospitalForChat}
        currentUser={activeUser}
        onClose={() => setChatModalOpen(false)}
      />

      <IssueRxModal
        isOpen={issueRxModalOpen}
        currentUser={activeUser}
        onClose={() => setIssueRxModalOpen(false)}
        onSavePrescription={handleSavePrescription}
      />

      <VideoRoomModal
        isOpen={videoModalOpen}
        appointment={activeVideoAppointment}
        onClose={() => setVideoModalOpen(false)}
      />

      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onDoctorRegistered={handleDoctorRegistered}
        onPatientRegistered={handlePatientRegistered}
        hospitals={hospitals}
        existingUsers={users}
        language={language}
        isFirstVisit={false}
        currentUser={currentUser}
      />

      {/* Toast Popup Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-white dark:bg-[#1C1C1E] text-black dark:text-white text-xs font-bold shadow-2xl border border-black/10 dark:border-white/20 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3">
          <span>✨</span>
          <span className="text-black dark:text-white">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

