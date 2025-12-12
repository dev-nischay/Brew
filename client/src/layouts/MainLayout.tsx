import { Outlet } from "react-router-dom";
import Navbar from "../components/share/Navbar";

export const MainLayout = () => {
  return (
    <div
      className={`min-h-screen max-w-[120rem]  font-wenkai p-4  w-full bg-[url('/Users/nischay/nischay_codes/fullstack/brew/client/src/assets/top-view-cup-coffee-with-copy-space.jpg')] bg-cover bg-center `}
    >
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
