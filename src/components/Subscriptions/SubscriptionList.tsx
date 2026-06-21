import React, { useState } from 'react';
import { Button } from '../common';
import { SubscriptionPlan } from '../../types';
import { PaymensService } from '../../services/subscriprionService';
import './SubscriptionList.css';

const plans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'FREE',
    price: 0,
    period: 'month',
    features: ['1 таблица для расчётов', 'Базовые налоговые расчёты', 'Доступ к дашборду', 'Поддержка по email'],
  },
  {
    id: 'pro',
    name: 'BASIC',
    price: 499,
    period: 'month',
    highlighted: true,
    features: ['До 10 таблиц для расчётов', 'Расширенные отчёты', 'Экспорт в PDF и Excel', 'Приоритетная поддержка', 'История изменений'],
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    price: 999,
    period: 'month',
    features: ['Неограниченное количество таблиц', 'Все функции Про', 'API доступ', 'Персональный менеджер', 'Интеграция с 1С', 'SLA 99.9%'],
  },
];

const SubscriptionList: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  const handleSelectPlan = async (plan: SubscriptionPlan) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (plan.price === 0) {
      console.log("Начало оплаты подписки ", plan.id);
      setSuccessMessage(`Подписка «${plan.name}» успешно активирована!`);
      setTimeout(() => setSuccessMessage(null), 3000);
      return;
    }

    setLoadingPlanId(plan.id);
    try {
      const data = await PaymensService.subscription_payment(
        plan.price,
        plan.name,
        `Подписка: ${plan.name}`,
        `${window.location.origin}`,
        1
      );

      console.log("✅ Ответ от сервера:", data);

      // value — это объект, а не массив
      if (data?.isSuccess && data.value) {
        window.location.href = data.value.redirectUrl;
      } else {
        setErrorMessage(data?.error || 'Не получена ссылка на оплату');
      }
    } catch (error: any) {
      console.error('❌ Payment error:', error);
      const serverError = error.response?.data?.error || error.response?.data?.title || error.message;
      setErrorMessage(`Ошибка: ${serverError || 'Не удалось создать платеж. Попробуйте позже.'}`);
    } finally {
      setLoadingPlanId(null);
    }
  };

  return (
    <div className="subscription-list-container">
      <div className="subscription-list-header">
        <h2 className="subscription-list-title">Выберите подписку</h2>
        <p className="subscription-list-subtitle">
          Получите доступ ко всем возможностям SMT
        </p>
      </div>

      {(successMessage || errorMessage) && (
        <div className={`subscription-message ${successMessage ? 'success' : 'error'}`}>
          {successMessage || errorMessage}
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
              loading={loadingPlanId === plan.id}
              disabled={loadingPlanId !== null}
            >
              {plan.price === 0 ? 'Выбрать бесплатно' : 'Выбрать'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionList;