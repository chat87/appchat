import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="mt-auto">
      <BiLogOut
        className="w-6 h-6 text-white cursor-pointer"
        onClick={handleLogout}
      />
    </div>
  );
}
