import { useEffect, useState } from "react";
import Card from "./ProductCard";
import { useFetch } from "../../hooks/useFetch";
import type { Product } from "./home.types";
export const Home = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      _id: "",
      productName: "",
      description: "",
      price: 0,
      images: [{ url: "" }],
    },
  ]);

  const { error, loading, request } = useFetch("product/", "GET", {
    requireAuth: false,
  });

  useEffect(() => {
    const getData = async () => {
      const data = await request();
      if (data.products) {
        setProducts(data?.products);
      }
      console.log(data.products);
    };
    getData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-16 w-full ">
        {products.map((e) => (
          <Card
            key={e._id}
            _id={e._id}
            images={e.images}
            price={Number(e.price)}
            productName={e.productName}
            description={e.description}
          />
        ))}
      </div>
    </div>
  );
};
