export const Navbar = () => {
  const links = ["Social", "ContactUs", "Github"];
  return (
    <div className="flex pb-40 justify-between px-6  items-center ">
      <h1 className=" text-4xl font-extrabold text-[#634832]">Brew</h1>
      <div className=" flex gap-16 pr-[25rem] text-lg">
        {links.map((e, index) => (
          <a
            key={index}
            className="hover:text-yellow-800 font-semibold transition-all"
            href="#"
          >
            {e}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
