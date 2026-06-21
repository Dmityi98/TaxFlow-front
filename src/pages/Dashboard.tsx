import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserProfile } from '../types';
import { TaxTableList } from '../components/TaxTable';
import { SubscriptionList } from '../components/Subscriptions';
import Profile from '../components/Profile/Profile';
import { Drawer } from '../components/common';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'tables' | 'subscriptions'>('tables');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '',
    userId: '',
    ipRegistrationDateTime: new Date(),
    companyName: '',
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileSave = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    // TODO: здесь будет вызов API для сохранения
    console.log('Profile saved:', updatedProfile);
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <span className="brand-icon">📊</span>
          <span className="brand-name">SMT</span>
        </div>
        <div className="nav-user">
          <span className="user-name">{user?.userName || 'User'}</span>
          <button
            className={`nav-section-btn ${activeSection === 'tables' ? 'active' : ''}`}
            onClick={() => setActiveSection('tables')}
          >
            📊 Таблицы
          </button>
          <button
            className={`nav-section-btn ${activeSection === 'subscriptions' ? 'active' : ''}`}
            onClick={() => setActiveSection('subscriptions')}
          >
            💳 Подписка
          </button>
          <button className="profile-btn" onClick={() => setIsProfileOpen(true)}>
            👤 Профиль
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </nav>

      <main className="dashboard-main">
        {activeSection === 'tables' ? <TaxTableList /> : <SubscriptionList />}
      </main>

      <Drawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        title="Мой профиль"
        width={450}
      >
        {user && (
          <Profile
            userProfile={userProfile}
            onSave={handleProfileSave}
          />
        )}
      </Drawer>

      <footer className="dashboard-footer">
        <p>© 2024 SMT - Tax Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
