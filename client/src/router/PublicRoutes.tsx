import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = () => {
    const localStorageToken = localStorage.getItem("user");

    return localStorageToken ? <Navigate to="/kanban" replace /> : <Outlet />;
};
