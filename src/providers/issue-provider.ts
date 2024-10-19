import { createContext, useContext } from "react";
import { Issue } from "../types";

interface IssueContext {
  issue: Issue | null;
  refetchIssue: () => void;
}

const IssueContext = createContext<IssueContext>({
  issue: null,
  refetchIssue: () => {},
});

export const useIssueContext = () => {
  const context = useContext(IssueContext);
  if (!context || !context.issue) throw new Error("Project context not found");
  return context;
};

export default IssueContext;
