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
    sendVerificationEmailForRegistration:
      "/auth/sendVerificationEmailForRegistration",
    createPassword: "/auth/createPassword",
    login: "/auth/login",
  },
};

export default urls;
