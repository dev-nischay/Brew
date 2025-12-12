import Navbar from "../components/share/Navbar";
import { Outlet } from "react-router-dom";
export const GridsLayout = () => {
  return (
    <div className="min-h-screen w-full p-4  bg-coffee-light ">
      <Navbar />

      <div className="mx-auto lg:max-w-[80rem] 2xl:max-w-[90rem] ">
        <Outlet />
      </div>
    </div>
  );
};
