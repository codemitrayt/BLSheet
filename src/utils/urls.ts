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
    createBlSheet: "blSheet/createBLSheet",
    getBlSheets: "/blSheet/getBLSheets",
    deleteBlSheet: "/blSheet/deleteBLSheet",
    editBlSheet: "/blSheet/editBLSheet",
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
    getProjectList: "/project/getProjectList",
    createProject: "/project/createProject",
    updateProject: "/project/updateProject",
    deleteProject: "/project/deleteProject",
    getProject: "/project/getProject",
    inviteTeamMember: "/project/inviteTeamMember",
    updateProjectMember: "/project/updateProjectMember",
    getProjectMembers: "/project/getProjectMembers",
    removeProjectMember: "/project/removeProjectMember",
  },
  projectTask: {
    createProjectTask: "/projectTask/createProjectTask",
    getProjectTasks: "/projectTask/getProjectTasks",
    deleteProjectTask: "/projectTask/deleteProjectTask",
    updateProjectTask: "/projectTask/updateProjectTask",
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
};

export default urls;
