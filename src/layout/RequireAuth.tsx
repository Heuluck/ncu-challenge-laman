import { type ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import useUserStore from "../store/user";
import { Me } from "../api/user/user";
import { Spin } from "antd";

type Props = {
  children: ReactNode;
};

function RequireAuth({ children }: Props) {
  const location = useLocation();
  const userStore = useUserStore();

  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        if (mounted) {
          setAuthed(false);
          setLoading(false);
        }
        return;
      }

      try {
        const meRes = await Me();
        if (meRes && meRes.data) {
          userStore.setUserData(meRes.data);
          localStorage.setItem("userData", JSON.stringify(meRes.data));
          if (mounted) setAuthed(true);
        } else {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
          if (mounted) setAuthed(false);
        }
      } catch (_err) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        if (mounted) setAuthed(false);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    check();

    return () => {
      mounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (!authed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

export default RequireAuth;
