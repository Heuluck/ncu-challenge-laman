import { Route, Routes } from "react-router";
import Login from "./pages/login";
import BaseLayout from "./layout/base";
import RequireAuth from "./layout/RequireAuth";
import Index from "./pages/index";
import UsersPage from "./pages/users";
import Raman from "./pages/raman";
import "./App.css";
import RamanDetailPage from "./pages/raman/view";

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
          <Route path="/raman" element={<Raman />} />
          <Route path="/raman/view" element={<RamanDetailPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
