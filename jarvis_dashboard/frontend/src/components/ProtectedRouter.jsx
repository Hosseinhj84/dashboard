import { Navigate } from "react-router-dom";

export default function ProtectedRouter({ children }) {
    const isAuthed = localStorage.getItem("auth") === "yes";
    if (!isAuthed) {
        return <Navigate to="/login" replace />;
    }
    return children
}