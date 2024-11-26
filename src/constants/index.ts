import { MemberRoles } from "../types";

export const HTTP_METHODS = {
  delete: "DELETE",
  get: "GET",
  patch: "PATCH",
  post: "POST",
  put: "PUT",
};

export const URLS = {
  signInPageUrl: "/auth/sign-in",
  dashboardHomeUrl: "/dashboard/home",
};

export const BL_SHEET_TYPES = [
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
  { label: "Investment", value: "investment" },
];

export const TODO_LEVELS = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

export const TODO_STATUS = [
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
];

export const TODO_LEVEL_COLOR = {
  easy: "green",
  medium: "yellow",
  hard: "red",
};

export const TODO_STATUS_COLOR = {
  pending: "red",
  in_progress: "yellow",
  completed: "green",
};

export const TASK_STATUS = [
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in_progress" },
  { label: "Under Review", value: "under_review" },
  { label: "Completed", value: "completed" },
];

export const TASK_PRIORITY = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export const TODO_CARD_BORDER_COLOR = {
  hard: "border-l-red-500",
  medium: "border-l-yellow-500",
  easy: "border-l-green-500",
};

export const TASK_CARD_BORDER_COLOR = {
  high: "border-l-red-500",
  medium: "border-l-yellow-500",
  low: "border-l-green-500",
};

export const TASK_CARD_BG_COLOR = {
  high: "red",
  medium: "yellow",
  low: "green",
};

export const PROJECT_MEMBER_STATUS = [
  { value: "all", label: "ALL" },
  { value: "accepted", label: "ACCEPTED" },
  { value: "pending", label: "PENDING" },
  { value: "rejected", label: "REJECTED" },
];

export const TASK_STATUS_DOT_COLOR = {
  todo: "red",
  in_progress: "orange",
  under_review: "blue",
  completed: "green",
};

export const RoleColorMap = {
  [MemberRoles.ADMIN]: "red",
  [MemberRoles.OWNER]: "orange",
  [MemberRoles.MEMBER]: "blue",
};
