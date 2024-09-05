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

export const TODO_CARD_LEVEL_TYPES = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

export const TODO_CARD_STATUS_TYPES = [
  { label: "In Progress", value: "inprogress" },
  { label: "On Track", value: "ontrack" },
  { label: "Off Track", value: "offtrack" },
];
