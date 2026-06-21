import api from "./api";
import { PaymetDTO } from "../types";
import { getUserIdFromToken } from "../utils/jwt";

export const PaymensService = {
    async subscription_payment(
        amount: number,
        subscriptionPlan: string,
        description: string,
        returnUrl: string,
        month:number
    ) {
        const userId = getUserIdFromToken();
        console.log(userId)
        const response = await api.post<PaymetDTO>("/payments/create", { userId, amount, subscriptionPlan, description, returnUrl, month });
        return response.data;
    }
}