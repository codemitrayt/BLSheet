import { URLType } from "../types";

const urls: URLType = {
  auth: {
    login: "/auth/login",
    self: "/auth/self",

    createPassword: "/auth/createPassword",
    forgotPassword: "/auth/forgotPassword",
    resetPassword: "/auth/resetPassword",

    sendVerificationEmailForRegistration:
      "/auth/sendVerificationEmailForRegistration",
  },
  blSheet: {
    getBlSheets: "/blSheet/getBLSheets",
    editBlSheet: "/blSheet/editBLSheet",
    createBlSheet: "blSheet/createBLSheet",
    deleteBlSheet: "/blSheet/deleteBLSheet",

    totalMoneyDistributedAnalytics: "/blSheet/totalMoneyDistributedAnalytics",
    dailyAnalytics: "/blSheet/dailyAnalytics",
  },
  todo: {
    getTodoList: "/todo/getTodoList",
    createTodo: "/todo/createTodo",
    updateTodo: "/todo/updateTodo",
    deleteTodo: "/todo/deleteTodo",
  },
  project: {
    getProject: "/project/getProject",
    getProjectList: "/project/getProjectList",
    createProject: "/project/createProject",
    updateProject: "/project/updateProject",
    deleteProject: "/project/deleteProject",

    getProjectMembers: "/project/getProjectMembers",
    inviteTeamMember: "/project/inviteTeamMember",
    updateProjectMember: "/project/updateProjectMember",
    removeProjectMember: "/project/removeProjectMember",
    updateProjectMemberRole: "/project/updateProjectMemberRole",

    getProjectLabels: "/project/getProjectLabels",
    getProjectWithMember: "/project/getProjectWithMember",
    getProjectsWithRole: "/project/getProjectsWithRole",
  },
  projectTask: {
    getProjectTasks: "/projectTask/getProjectTasks",
    createProjectTask: "/projectTask/createProjectTask",
    updateProjectTask: "/projectTask/updateProjectTask",
    deleteProjectTask: "/projectTask/deleteProjectTask",

    getProjectTaskForUser: "/projectTask/getProjectTaskForUser",

    assignUserToProjectTask: "/projectTask/assignUserToProjectTask",
    removeAssignedUserFormProjectTask:
      "/projectTask/removeAssignedUserFormProjectTask",

    createProjectTaskComment: "/projectTask/createProjectTaskComment",
    getProjectTaskComments: "/projectTask/getProjectTaskComments",
    deleteProjectTaskComment: "/projectTask/deleteProjectTaskComment",
    updateProjectTaskComment: "/projectTask/updateProjectTaskComment",
    replyToProjectTaskComment: "/projectTask/replyToProjectTaskComment",
    getProjectTaskCommentReplies: "/projectTask/getProjectTaskCommentReplies",
  },
  issue: {
    getIssue: "/issue/getIssue",
    getIssues: "/issue/getIssues",
    createIssue: "/issue/createIssue",
    updateIssue: "/issue/updateIssue",
    deleteIssue: "/issue/deleteIssue",

    changeIssueStatus: "/issue/changeStatusIssue",
    assignUserToIssue: "/issue/assignUserToIssue",
    removeAssignedUserFormIssue: "/issue/removeAssignedUserFormIssue",

    createIssueComment: "/issue/createIssueComment",
    updateIssueComment: "/issue/updateIssueComment",
    getIssueComments: "/issue/getIssueComments",
    replyToIssueComment: "/issue/replyToIssueComment",
    getIssueCommentReplies: "/issue/getIssueCommentReplies",
    deleteIssueComment: "/issue/deleteIssueComment",
  },
};

export default urls;
