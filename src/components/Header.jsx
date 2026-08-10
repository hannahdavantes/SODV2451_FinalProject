import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

export default function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="bg-white border-b px-6 py-4 flex justify-end">
      <button className="text-sm text-gray-600" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}