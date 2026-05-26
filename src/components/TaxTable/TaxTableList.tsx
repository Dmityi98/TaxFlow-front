import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { yearService } from '../../services/yearService';
import { YearDTO } from '../../types';
import TaxTableView from './TaxTableView';
import { Button, Modal, Input } from '../common';
import './TaxTableList.css';

const TaxTableList: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [years, setYears] = useState<YearDTO[]>([]);
  const [selectedYear, setSelectedYear] = useState<YearDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newYearName, setNewYearName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [useBackend, setUseBackend] = useState(isAuthenticated);

  useEffect(() => {
    setUseBackend(isAuthenticated);
    loadYears();
  }, [isAuthenticated]);

  const loadYears = async () => {
    setIsLoading(true);
    try {
      if (useBackend) {
        const data = await yearService.getAllYears();
        setYears(data ?? []);
      }
    } catch (error) {
      console.error('Failed to load years:', error);
      setYears([]);
      setUseBackend(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateYear = async () => {
    if (!newYearName.trim()) return;

    setIsSaving(true);
    try {
      if (useBackend) {
        const created = await yearService.createYear(newYearName);
        setYears([...years, created]);
      }
      
      setNewYearName('');
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Failed to create year:', error);
      alert('Failed to create year. Check backend connection.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteYear = async (yearId: string) => {
    if (!confirm('Are you sure you want to delete this year?')) return;

    setYears(years.filter((y) => y.id !== yearId));
    if (selectedYear?.id === yearId) {
      setSelectedYear(null);
    }
  };

  const handleCellChange = (
    quarterIndex: number,
    monthIndex: number,
    field: string,
    value: number | null
  ) => {
    if (!selectedYear) return;

    const updatedYears = years.map((year) => {
      if (year.id === selectedYear.id) {
        const updatedQuarters = year.quarters.map((quarter, qIdx) => {
          if (qIdx === quarterIndex) {
            const updatedColumns = quarter.columns.map((col, mIdx) => {
              if (mIdx === monthIndex) {
                return { ...col, [field]: value };
              }
              return col;
            });
            return { ...quarter, columns: updatedColumns };
          }
          return quarter;
        });
        return { ...year, quarters: updatedQuarters };
      }
      return year;
    });

    setYears(updatedYears);
    const updatedYear = updatedYears.find((y) => y.id === selectedYear.id)!;
    setSelectedYear(updatedYear);
  };

  const handleSaveChanges = async () => {
    if (!selectedYear) return;

    setIsSaving(true);
    try {
      if (useBackend) {
        await yearService.updateYear(
          selectedYear.id,
          selectedYear.nameTable,
          selectedYear
        );
        alert('Changes saved successfully!');
      } else {
        alert('Changes saved locally (backend unavailable)');
      }
    } catch (error) {
      console.error('Failed to save changes:', error);
      alert('Failed to save changes. Check backend connection.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your tax tables...</p>
      </div>
    );
  }

  return (
    <div className="tax-table-list-container">
      <div className="table-list-header">
        <h1 className="page-title">Tax Management</h1>
        <Button onClick={() => setIsCreateModalOpen(true)} size="medium">
          + Создать новую таблицу
        </Button>
      </div>

      {!selectedYear ? (
        <div className="years-grid">
          {years.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📊</div>
              <h2>No Tax Tables Yet</h2>
              <p>Create your first year table to start tracking taxes</p>
              <Button onClick={() => setIsCreateModalOpen(true)} size="large">
                Create Year Table
              </Button>
            </div>
          ) : (
            years.map((year) => (
              <div key={year.id} className="year-card">
                <div className="year-card-header">
                  <h3 className="year-card-title">{year.nameTable}</h3>
                  <div className="year-card-actions">
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => setSelectedYear(year)}
                    >
                      Просмотр
                    </Button>
                    <Button
                      variant="danger"
                      size="small"
                      onClick={() => handleDeleteYear(year.id)}
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
                <div className="year-card-stats">
                  <div className="stat">
                    <span className="stat-label">Quarters</span>
                    <span className="stat-value">{year.quarters.length}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Months</span>
                    <span className="stat-value">
                      {year.quarters.reduce((sum, q) => sum + q.columns.length, 0)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="year-detail">
          <div className="year-detail-header">
            <Button
              variant="secondary"
              onClick={() => setSelectedYear(null)}
              size="small"
            >
              ← Вернутся назад 
            </Button>
            <div className="year-detail-actions">
              <Button
                variant="success"
                onClick={handleSaveChanges}
                loading={isSaving}
                size="small"
              >
                Сохранить изменения
              </Button>
            </div>
          </div>
          <TaxTableView
            yearData={selectedYear}
            onCellChange={handleCellChange}
            editable
          />
        </div>
      )}

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Year Table"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)}>
              Назад
            </Button>
            <Button onClick={handleCreateYear} loading={isSaving}>
              Создать
            </Button>
          </>
        }
      >
        <Input
          label="Year Name"
          value={newYearName}
          onChange={(e) => setNewYearName(e.target.value)}
          placeholder="e.g., 2024"
          fullWidth
          autoFocus
        />
      </Modal>
    </div>
  );
};

export default TaxTableList;
