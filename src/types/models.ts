export enum Month {
  January = 0,
  February = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  August = 7,
  September = 8,
  October = 9,
  November = 10,
  December = 11
}

export interface MonthColumn {
  id: string;
  month: Month;
  turnover?: number | null;
  tax?: number | null;
  taxPayable?: number | null;
  paidTax?: number | null;
  quarterId: string;
}

export interface UserProfile{
  id: string;
  userId: string;
  ipRegistrationDateTime: Date;
  companyName: string;
}


export interface Quarter {
  id: string;
  columns: MonthColumn[];
  yearId: string;
}

export interface Year {
  id: string;
  userId: string;
  nameTable: string;
  quarters: Quarter[];
  totalForQuarter?: number;
}

export interface User {
  id: string;
  name: string;
  password?: string;
  refreshToken?: string | null;
  refreshTokenExpiryTime?: Date | null;
  isRefreshTokenExpired?: boolean;
  hasValidRefreshToken?: boolean;
}
