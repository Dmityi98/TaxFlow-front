import api from './api';
import { SubscriptionPlan } from '../types';

export const subscriptionService = {
  async getPlans(): Promise<SubscriptionPlan[]> {
    const response = await api.get<SubscriptionPlan[]>('/subscriptions/plans');
    return response.data;
  },

  async subscribe(planId: string, paymentInfo: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
  }): Promise<void> {
    await api.post('/subscriptions/subscribe', { planId, ...paymentInfo });
  },

  async cancelSubscription(): Promise<void> {
    await api.post('/subscriptions/cancel');
  },
};
