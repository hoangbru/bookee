/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export const PrivateRoute = ({ isAuth }: any) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!isAuth) navigate("/signin");
    }, [isAuth, navigate]);
    return isAuth ? <Outlet /> : <Navigate to="/signin" />;
  };