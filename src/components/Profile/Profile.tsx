import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { Button, Input } from '../common';
import './Profile.css';

interface ProfileProps {
  userProfile: UserProfile;
  onSave?: (updatedProfile: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ userProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState(userProfile?.companyName || '');

  const handleSave = () => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      companyName,
    };
    onSave?.(updatedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCompanyName(userProfile?.companyName || '');
    setIsEditing(false);
  };

  return (
    <div className="profile-drawer-content">
      <div className="profile-field">
        <label>Дата регистрации:</label>
        <Input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Введите название компании"
            fullWidth
          />
        <span>
          {userProfile?.ipRegistrationDateTime
            ? new Date(userProfile.ipRegistrationDateTime).toLocaleDateString('ru-RU')
            : '—'}
        </span>
      </div>

      <div className="profile-field">
        <label>Компания:</label>
        {isEditing ? (
          <Input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Введите название компании"
            fullWidth
          />
        ) : (
          <span>{companyName || 'Не указана'}</span>
        )}
      </div>

      <div className="profile-actions">
        {isEditing ? (
          <div className="edit-actions">
            <Button variant="success" onClick={handleSave} size="medium">
              Сохранить
            </Button>
            <Button variant="secondary" onClick={handleCancel} size="medium">
              Отмена
            </Button>
          </div>
        ) : (
          <Button variant="primary" onClick={() => setIsEditing(true)} fullWidth>
            Редактировать профиль
          </Button>
        )}
      </div>
    </div>
  );
};

export default Profile;