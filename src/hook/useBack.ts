import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router";

export default function useBack(fallback = "/") {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(() => {
    const from = location.state?.from;

    if (from) {
      // navigate(-1) 不一定在站内
      navigate(from);
      return;
    }

    navigate(fallback, { replace: true });
  }, [navigate, location, fallback]);
}
