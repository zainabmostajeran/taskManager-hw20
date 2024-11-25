"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logout } from "../store/slices/authSlice";
import { useRouter } from "next/navigation";
const Navbar: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  
  const handleLogout = async () => {
    await dispatch(logout());
    router.push("/login");
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">
        <Link href="/">TodoApp</Link>
      </div>
      <div className="flex space-x-4">
        {auth.isAuthenticated ? (
          <>
            <Link href="/todos" className="text-white font-semibold hover:underline">
              Todos
            </Link>
            <Link href="/inprogress" className="text-white font-semibold hover:underline">
              In Progress
            </Link>
            <Link href="/done" className="text-white  font-semibold hover:underline">
              Done
            </Link>
            <button
              onClick={handleLogout}
              className="text-white font-semibold hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="text-white font-semibold hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
