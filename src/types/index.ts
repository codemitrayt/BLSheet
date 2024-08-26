import { IconType } from "react-icons";

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
