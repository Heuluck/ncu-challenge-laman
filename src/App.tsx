import { Route, Routes } from "react-router";
import Login from "./pages/login";
import BaseLayout from "./layout/base";
import Index from "./pages";
import "./App.css";
import UsersPage from "./pages/users";

function App() {
  return (
    <>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<Index />} />
          <Route path="/user" element={<UsersPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
