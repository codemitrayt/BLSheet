const queryKeys = {
  auth: {},
  project: {},
  blSheet: {
    get: "BL_SHEET_GET",
    create: "BL_SHEET_CREATE",
    update: "BL_SHEET_UPDATE",
    delete: "BL_SHEET_DELETE",
    getList: "BL_SHEET_LIST",
  },
  projectMember: {
    getProjectMembers: "GET_PROJECT_MEMBERS",
  },
  projectTask: {
    assignUserToProjectTask: "ASSIGN_USER_TO_PROJECT_TASK",
    removeAssignUserFromProjectTask: "REMOVE_ASSIGN_USER_TO_PROJECT_TASK",
    createProjectTaskComment: "CREATE_PROJECT_TASK_COMMENT",
    getProjectTaskComments: "GET_PROJECT_TASK_COMMENT",
  },
  todo: {},
};

export default queryKeys;
