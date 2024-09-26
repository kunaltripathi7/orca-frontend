import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import PageNotFound from "./pages/PageNotFound";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import Landingpage from "./pages/Landingpage";
import Homepage from "./pages/Homepage";
import Server from "./pages/Server";
import { Toaster } from "./components/ui/toaster";
import { store } from "./store/store";
import { Provider } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import { ModalProvider } from "./components/providers/ModalProvider";
import ServerInvite from "./pages/ServerInvite";
import ChannelPage from "./pages/ChannelPage";
import ServerIdPage from "./pages/ServerIdPage";

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
            <ModalProvider />
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* index -> parent route */}
                <Route path="servers/:serverId" element={<Server />}>
                  <Route index element={<ServerIdPage />} />
                  <Route path="channels/:channelId" element={<ChannelPage />} />
                </Route>
              </Route>
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <Homepage />
                  </ProtectedRoute>
                }
              />
              <Route path="invite/:inviteCode" element={<ServerInvite />} />
              <Route path="/" element={<Landingpage />} />
              <Route path="*" element={<PageNotFound />} />
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
