import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";

import Router from "./routes";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#2F667F" },
      }}
    >
      <RouterProvider router={Router} />
    </ConfigProvider>
  );
};

export default App;
