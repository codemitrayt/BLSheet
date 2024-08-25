import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";

import Router from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#2F667F" },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router} />
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default App;
