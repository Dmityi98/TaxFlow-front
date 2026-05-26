import { Month } from './models';

// DTOs matching backend structure
export interface MonthColumnDto {
  id: string;
  month: Month;
  turnover?: number | null;
  taxPayable?: number | null;
  paidTax?: number | null;
}

export interface QuarterDTO {
  id: string;
  columns: MonthColumnDto[];
}

export interface YearDTO {
  id: string;
  userId: string;
  nameTable: string;
  quarters: QuarterDTO[];
}

// Authentication DTOs
export interface LoginUserDto {
  userName: string;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterUserDto {
  name: string;
  id: string;
}

export interface RefreshTokenDto {
  name: string;
  accessToken: string;
  refreshToken: string;
}

// Command DTOs
export interface LoginCommand {
  name: string;
  password: string;
}

export interface RegisterCommand {
  name: string;
  password: string;
}

export interface RefreshTokenCommand {
  refreshToken: string;
}

export interface CreateTableCommand {
  userId: string;
  nameTable: string;
}

export interface GetYearByIdCommand {
  id: string;
  userId: string;
}

export interface UpdateTableCommand {
  userId: string;
  yearId: string;
  nameTable: string;
  yearDto: YearDTO;
}
