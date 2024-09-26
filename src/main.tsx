import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";
// import SocketProvider from "./providers/socket-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <SocketProvider> */}
    <App />
    <Analytics />
    {/* </SocketProvider> */}
  </StrictMode>
);
