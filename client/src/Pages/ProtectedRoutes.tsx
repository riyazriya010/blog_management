import { Navigate } from "react-router-dom";
import { authenticate } from "../util/authenticate";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode
}

export default function ProtectedRoutes({children}: ProtectedRouteProps) {
    const isAuthenticate = authenticate()

    return isAuthenticate ? <>{children}</> : <Navigate to='/' />
}