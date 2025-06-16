import { Navigate } from "react-router-dom";
import Login from "../Components/Login";
import { authenticate } from "../util/authenticate";

export default function LoginPage() {
    const isAuthenticate = authenticate()

    return isAuthenticate ? <Navigate to="/blog" /> : <Login />
}