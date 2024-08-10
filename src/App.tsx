import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import LoginPage from "./pages/LoginPage";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="orca-theme">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

{
  /* <ReactQueryDevtools initialIsOpen={false} /> */
}
