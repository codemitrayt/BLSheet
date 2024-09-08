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

export const TODO_CARD_BORDER_COLOR = {
  hard: "border-l-red-500",
  medium: "border-l-yellow-500",
  easy: "border-l-green-500",
};
