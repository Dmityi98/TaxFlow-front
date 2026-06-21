import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common';
import { SubscriptionPlan } from '../types';
import { PaymensService } from '../services/subscriprionService';
import './Subscriptions.css';


// Переделать планы подписки
const plans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'FREE',
    price: 0,
    period: 'month',
    features: [
      '1 таблица для расчётов',
      'Базовые налоговые расчёты',
      'Доступ к дашборду',
      'Поддержка по email',
    ],
  },
  {
    id: 'pro',
    name: 'BASIC',
    price: 499,
    period: 'month',
    highlighted: true,
    features: [
      'До 10 таблиц для расчётов',
      'Расширенные отчёты',
      'Экспорт в PDF и Excel',
      'Приоритетная поддержка',
      'История изменений',
    ],
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    price: 999,
    period: 'month',
    features: [
      'Неограниченное количество таблиц',
      'Все функции Про',
      'API доступ',
      'Персональный менеджер',
      'Интеграция с 1С',
      'SLA 99.9%',
    ],
  },
];

const Subscriptions: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSelectPlan = async (plan: SubscriptionPlan) => {
    if (plan.price === 0) {
      setSuccessMessage(`Подписка «${plan.name}» успешно активирована!`);
      setTimeout(() => setSuccessMessage(null), 3000);
      return;
    }

    try {
      const data = await PaymensService.subscription_payment(
        plan.price,
        plan.name,
        `Подписка: ${plan.name}`,
        `${window.location.origin}/payment-result`,
        1
      );
      if (data.value) {
        window.location.href = data.value.redirectUrl;
      }
    } catch (error) {
      console.error("Error", error);
    }
  };


  return (
    <div className="subscriptions-page">
      <nav className="subscriptions-nav">
        <div className="nav-brand">
          <span className="brand-icon">📊</span>
          <span className="brand-name">SMT</span>
        </div>
        <div className="nav-user">
          <button className="nav-dashboard-btn" onClick={() => navigate('/dashboard')}>
            Дашборд
          </button>
          <span className="user-name">{user?.userName || 'User'}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </nav>

      <main className="subscriptions-main">
        <div className="subscriptions-header">
          <h1>Выберите подписку</h1>
          <p className="subscriptions-subtitle">
            Получите доступ ко всем возможностям SMT для управления налогами
          </p>
        </div>

        {successMessage && (
          <div className="subscriptions-success">
            {successMessage}
          </div>
        )}

        <div className="plans-grid">
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`plan-card ${plan.highlighted ? 'plan-highlighted' : ''}`}
            >
              {plan.highlighted && (
                <div className="plan-badge">Популярное</div>
              )}
              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  <span className="plan-amount">{plan.price}</span>
                  <span className="plan-currency">
                    ₽/{plan.period === 'month' ? 'мес' : 'год'}
                  </span>
                </div>
              </div>
              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="plan-feature">
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.highlighted ? 'primary' : 'secondary'}
                fullWidth
                size="large"
                onClick={() => handleSelectPlan(plan)}
              >
                {plan.price === 0 ? 'Выбрать бесплатно' : 'Выбрать'}
              </Button>
            </div>
          ))}
        </div>
      </main>

      <footer className="subscriptions-footer">
        <p>© 2024 SMT - Tax Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Subscriptions;
