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
  { label: "In Progress", value: "in_progress" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

export const TODO_LEVEL_COLOR = {
  easy: "green",
  medium: "orange",
  hard: "red",
};

export const TODO_STATUS_COLOR = {
  pending: "red",
  in_progress: "orange",
  completed: "green",
};
