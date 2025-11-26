import { Route, Routes } from "react-router";
import Login from "./pages/login";
import BaseLayout from "./layout/base";
import RequireAuth from "./layout/RequireAuth";
import Index from "./pages/index";
import UsersPage from "./pages/user";
import Raman from "./pages/raman";
import "./App.css";
import RamanDetailPage from "./pages/raman/view";
import DownloadReqPage from "./pages/user/download-req";

function App() {
  return (
    <>
      <Routes>
        <Route
          element={
            <RequireAuth>
              <BaseLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Index />} />
          <Route path="/user" element={<UsersPage />} />
          <Route path="/user/download-req" element={<DownloadReqPage />} />
          <Route path="/raman" element={<Raman />} />
          <Route path="/raman/view" element={<RamanDetailPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
