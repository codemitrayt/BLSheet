import { IconType } from "react-icons";

export enum SheetType {
  INCOME = "income",
  EXPENSE = "expense",
  INVESTMENT = "investment",
}

export interface NavLinkType {
  id: number;
  title: string;
  path: string;
  icon: IconType;
  onyForDesktop?: boolean;
}

export type SendVerificationEmailForRegistrationBody = {
  fullName: string;
  email: string;
};

export interface CreatePasswordBody {
  password: string;
  confirmPassword: string;
  token: string;
}

export interface LoginUserBody {
  email: string;
  password: string;
}

export interface RequestType {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";
  authToken?: string | null;
  data?: any;
  params?: any;
  url?: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface BLSheet {
  _id?: string;
  clientName: string;
  description: string;
  money: number;
  isPaid: boolean;
  tax: number;
  date: string;
  type: SheetType;
  totalMoney: number;
}

export interface CreateSheetTabProps {
  createBlSheet: ({ data }: { data: BLSheet }) => void;
  isLoading: boolean;
}

export interface BLSheetFilter {
  type?: SheetType | "all";
  search?: string;
  currentPage?: number;
  perPage?: number;
  startDate?: string;
  endDate?: string;
}

export interface MatricsType {
  type: SheetType | "profit";
  total: number;
}

export enum TodoStatus {
  COMPLETED = "completed",
  IN_PROGRESS = "in_progress",
  PENDING = "pending",
}

export enum TodoLevel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface Todo {
  _id: string;
  title: string;
  description: string;
  status: TodoStatus;
  userId: string;
  level: TodoLevel;
  createdAt: string;
}

export interface TodoFilter {
  date?: string;
}
