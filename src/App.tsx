import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import PageNotFound from "./pages/PageNotFound";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import LoginPage from "./pages/LoginPage";
import Landingpage from "./pages/Landingpage";
import Homepage from "./pages/Homepage";
import Server from "./pages/Server";
import { Toaster } from "./components/ui/toaster";
import { store } from "./store/store";
import { Provider } from "react-redux";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="orca-theme">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="login" element={<LoginPage />} />
              <Route path="/" element={<Landingpage />} />
              <Route path="app" element={<Homepage />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="server/:serverId" element={<Server />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;

{
  /* <ReactQueryDevtools initialIsOpen={false} /> */
}
