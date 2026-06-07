import React, { useState } from 'react';
import { Button, Input } from '../common';
import { SubscriptionPlan } from '../../types';
import './PaymentModal.css';

interface PaymentModalProps {
  plan: SubscriptionPlan;
  onClose: () => void;
  onPay: (planId: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ plan, onClose, onPay }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setExpiryDate(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 1500));
    onPay(plan.id);
    setIsProcessing(false);
  };

  return (
    <div className="payment-backdrop" onClick={onClose}>
      <div className="payment-modal" onClick={e => e.stopPropagation()}>
        <div className="payment-header">
          <h2 className="payment-title">Оплата подписки</h2>
          <button className="payment-close" onClick={onClose}>×</button>
        </div>

        <div className="payment-plan-summary">
          <span className="payment-plan-name">{plan.name}</span>
          <span className="payment-plan-price">
            {plan.price} ₽/{plan.period === 'month' ? 'мес' : 'год'}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <Input
            label="Номер карты"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            fullWidth
          />

          <div className="payment-row">
            <Input
              label="Срок действия"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/ГГ"
            />
            <Input
              label="CVV"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="123"
              type="password"
            />
          </div>

          <Input
            label="Держатель карты"
            value={cardholderName}
            onChange={e => setCardholderName(e.target.value)}
            placeholder="IVAN IVANOV"
            fullWidth
          />

          <div className="payment-actions">
            <Button variant="secondary" onClick={onClose}>
              Отмена
            </Button>
            <Button
              type="submit"
              loading={isProcessing}
              disabled={!cardNumber || !expiryDate || !cvv || !cardholderName}
            >
              Оплатить {plan.price} ₽
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
