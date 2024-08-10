import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
import ErrorFallBack from "./components/ErrorFallBack";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallBack}
      onReset={() => window.location.replace("/")}
    >
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
