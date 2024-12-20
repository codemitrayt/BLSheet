const queryKeys = {
  auth: {
    uploadProfilePicture: "UPLOAD_PROFILE_PICTURE",
  },
  blSheet: {
    get: "BL_SHEET_GET",
    create: "BL_SHEET_CREATE",
    update: "BL_SHEET_UPDATE",
    delete: "BL_SHEET_DELETE",
    getList: "BL_SHEET_LIST",
  },
  project: {
    getProjectLables: "GET_PROJECT_LABELS",
    updateProjectMemberRole: "UPDATE_PROJECT_MEMBER_ROLE",
  },
  projectMember: {
    getProjectMembers: "GET_PROJECT_MEMBERS",
  },
  projectTask: {
    getProjectTask: "GET_PROJECT_TASK",
    assignUserToProjectTask: "ASSIGN_USER_TO_PROJECT_TASK",
    removeAssignUserFromProjectTask: "REMOVE_ASSIGN_USER_TO_PROJECT_TASK",
    createProjectTaskComment: "CREATE_PROJECT_TASK_COMMENT",
    getProjectTaskComments: "GET_PROJECT_TASK_COMMENT",
    deleteProjectTaskComment: "DELETE_PROJECT_TASK_COMMENT",
    updateProjectTaskComment: "UPDATE_PROJECT_TASK_COMMENT",
    replyProjectTaskComment: "REPLY_PROJECT_TASK_COMMENT",
    getProjectTaskCommentReplies: "GET_PROJECT_TASK_COMMENT_REPLIES",
  },
  issue: {
    getIssue: "GET_ISSUE",
    getIssues: "GET_ISSUES",
    createIssue: "CREATE_ISSUE",
    assignUser: "ASSIGN_USER_TO_ISSUE",
    removeUser: "REMOVE_USER_TO_ISSUE",
    getComments: "GET_COMMENTS",
  },
};

export default queryKeys;
