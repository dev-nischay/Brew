import { useCartStore } from "../../store/cartStore";
import type { Product } from "./home.types";
import { useState } from "react";
export const Card = ({
  productName,
  price,
  _id,
  image,
  description,
}: Product) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [clicked, setClicked] = useState(false);

  const addProduct = (product: any) => {
    addToCart!(product);
  };

  const handleClick = () => {
    addProduct({
      productName,
      price,
      _id,
      description,
      fixedImage, // this will be removed after image backend is sorted
    });

    setClicked((prev) => !prev);
  };

  const fixedImage = image[0].url;

  return (
    <div>
      <div className="w-[20rem] p-3 h-[30rem] bg-background text-foreground rounded-3xl flex flex-col gap-4 ">
        <div className="bg-white h-[18rem]  rounded-3xl">
          <img
            src={fixedImage}
            alt="coffee"
            className="rounded-3xl h-[15rem] w-[6rem] object-fill mx-auto mt-4"
          />
        </div>
        <div className="text-xl font-semibold pb-6">{productName}</div>
        <div className="flex gap-8 items-center ">
          <div className="flex flex-col pl-4  gap-2 ">
            <div className="text-black text-xl">Price</div>
            <div className="font-semibold text-lg">₹{price}</div>
          </div>
          <div>
            <button
              onClick={() => handleClick}
              className={`px-14 rounded-3xl py-2   hover:bg-[#38220f]/60 transition-all duration-100 flex justify-center tracking-wider ${
                clicked ? "bg-green-400 " : "bg-coffee-dark"
              }`}
            >
              {clicked ? "✔" : "AddtoCart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
