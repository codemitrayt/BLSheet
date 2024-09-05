interface URLType {
  [key: string]: {
    [key: string]: string;
  };
}

const urls: URLType = {
  main: {
    baseUrl: "https://bl-sheet-server.vercel.app/api/v1",
    developmentBaseUrl: "http://localhost:5500/api/v1",
  },
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
  },
  todo: {
    getTodoList: "/todo/getTodoList",
    createTodo: '/todo/createTodo',
    updateTodoList: "/todo/updateTodo",
    deleteTodo: "/todo/deleteTodo",
  },
};

export default urls;
