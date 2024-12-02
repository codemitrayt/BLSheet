import { IconType } from "react-icons";

export enum UserRole {
  ADMIN = "admin",
  CUSTOMER = "customer",
  GUEST = "guest",
}

export interface URLType {
  [key: string]: {
    [key: string]: string;
  };
}

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
  isFormData?: boolean;
}

export enum PricingModel {
  FREE = "free",
  PREMIUM = "premium",
  ENTERPRISE = "enterprise",
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  pricingModel: PricingModel;
  avatar?: {
    url: string;
  };
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

// Project Types //

export enum MemberRoles {
  ADMIN = "admin",
  MEMBER = "member",
  OWNER = "owner",
}
export interface Project {
  _id: string;
  name: string;
  description: string;
  userId: string;
  tags: string[];
  img: string;
  user: User;
  role?: MemberRoles;
}

export enum ProjectMemberStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export interface UpdateTeamMember {
  status: ProjectMemberStatus;
  memberEmailId: string;
  invitationToken: string | null;
}

export interface ProjectMember {
  _id: string;
  memberEmailId: string;
  status: ProjectMemberStatus;
  user: {
    fullName: string;
  };
  role: MemberRoles;
}

export enum ProjectTaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  UNDER_REVIEW = "under_review",
  COMPLETED = "completed",
}

export enum ProjectTaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface ProjectTask {
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  tags: string[];
  status: ProjectTaskStatus;
  priority: ProjectTaskPriority;
  assignedMembers: ProjectMember[];
  userId: string;
  projectId: string;
  completedDate?: Date;
  attachments?: string[];
  user?: User;
  commentCount: number;
  isCreator: boolean;
  isMember: boolean;
  subtasks: { title: string; weightage: number }[];
  taskNumber: number;
  taskType: string;
}

export interface ProjectMemberFilters {
  memberEmail?: string;
  currentPage?: number;
  status?: ProjectMemberStatus | "all";
}

export interface AssignUser {
  _id: string;
  memberEmailId: string;
}

export interface Comment {
  _id: string;
  content: string;
  likes: number;
  replies: Comment[];
  createdAt: string;
  updatedAt: string;
  author: {
    _id: string;
    fullName: string;
    email: string;
  };
  isCreator: boolean;
  replyCount: number;
}

export interface ProjectTaskFilters {
  search?: string;
  priority?: string;
  currentPage?: number;
  sortByCreatedAt?: boolean;
  assignedToMe?: boolean;
  createdByMe?: boolean;
  view?: string;
}

export interface ProjectTaskList {
  todo: {
    count: number;
    tasks: ProjectTask[];
  };
  in_progress: {
    count: number;
    tasks: ProjectTask[];
  };
  under_review: {
    count: number;
    tasks: ProjectTask[];
  };
  completed: {
    count: number;
    tasks: ProjectTask[];
  };
}

// ISSUE

export enum IssueStatus {
  OPEN = "open",
  CLOSED = "closed",
}

export enum IssuePriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface Issue {
  _id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  userId: string;
  projectId: string;
  closedIssueDate: Date;
  labels: string[];
  assignedMembers: AssignUser[];
  createdAt: string;
  author: {
    _id: string;
    fullName: string;
    email: string;
  };
  isAuthor: boolean;
  isAssignee: boolean;
  commentCount: number;
  closedBy: {
    fullName: string;
    email: string;
  };
}

export interface IssueFilters {
  search?: string;
  priority?: string;
  currentPage?: number;
  sortByCreatedAt?: boolean;
  assignedToMe?: boolean;
  createdByMe?: boolean;
  status?: string;
  labels?: string[];
  perPage?: number;
}

export interface ColumnChartData {
  type: string;
  value: number;
}

export interface Label {
  name: string;
  descirption: string;
  isDelete: boolean;
  color: string;
}
