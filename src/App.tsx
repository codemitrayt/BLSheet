import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";

import Router from "./routes";
import store, { persistor } from "./store";
import "react-quill/dist/quill.snow.css";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#2F667F" },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={Router} />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default App;
