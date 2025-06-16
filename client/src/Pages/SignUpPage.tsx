import { Navigate } from "react-router-dom";
import { authenticate } from "../util/authenticate";
import SignUp from "../Components/Signup";

export default function SignUpPage() {
    const isAuthenticate = authenticate()

    return isAuthenticate ? <Navigate to="/blog" /> : <SignUp />
}

