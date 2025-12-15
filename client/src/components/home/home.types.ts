export type Product = {
  _id: string;
  productName: string;
  description: string;
  images: [{ url: string }];
  price: number;
};
