const TASK_TYPE: { value: string; label: string }[] = [
  {
    value: "Bug Fix",
    label: "Bug Fix",
  },
  {
    value: "Feature Request",
    label: "Feature Request",
  },
  {
    value: "Enhancement",
    label: "Enhancement",
  },
  {
    value: "Documentation",
    label: "Documentation",
  },
  {
    value: "Frontend",
    label: "Frontend",
  },
  { value: "Backend", label: "Backend" },
  { value: "API", label: "API" },
  { value: "Testing", label: "Testing" },
  { value: "UI Design", label: "UI Design" },
];

export const TASK_TYPE_COLOR: Record<string, string> = {
  "Bug Fix": "red",
  "Feature Request": "blue",
  Enhancement: "gold",
  Documentation: "green",
  Frontend: "purple",
  Backend: "pink",
  API: "cyan",
  Testing: "geekblue",
  "UI Design": "orange",
};

export default TASK_TYPE;
