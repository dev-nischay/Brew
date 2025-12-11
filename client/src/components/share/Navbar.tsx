import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Cart } from "./Cart";
import { useCartStore } from "../../store/cartStore";

export const Navbar = () => {
  const nav = useNavigate();
  const isUser = useAuthStore((state) => state.username);
  const logout = useAuthStore((state) => state.logout);
  const counter = useCartStore((state) => state.counter);

  const links = [
    {
      name: "Social",
      href: "https://x.com/nischaytwt",
    },
    {
      name: "Github",
      href: "https://github.com/dev-nischay",
    },
    {
      name: "Contact",
      href: "mailto:nischay.mehn@gmail.com",
    },
  ];

  const handleLogout = () => {
    logout!();
    nav("/");
  };

  return (
    <div className="  flex justify-between items-center   px-6 pb-20">
      <div className="  ">
        <h1
          onClick={() => nav("/")}
          className=" text-4xl font-extrabold text-[#634832] cursor-pointer "
        >
          Brew
        </h1>
      </div>
      <div className=" flex gap-16  text-lg">
        {links.map((e, index) => (
          <a
            key={index}
            className="hover:text-yellow-800 font-semibold transition-all"
            href={e.href}
          >
            {e.name}
          </a>
        ))}
        {!isUser ? (
          <div className="cursor-pointer" onClick={() => nav("/signin")}>
            Signin
          </div>
        ) : (
          <div className="cursor-pointer" onClick={() => handleLogout()}>
            Logout
          </div>
        )}
        <Cart count={counter} />
      </div>
    </div>
  );
};

export default Navbar;
