import { ProductCard } from "../../components/productCard";

export default function ProductPage({ data }) {
  if (data.length === 0) {
    return <div className="loader text-xl font-bold">No products found.</div>;
  }

  const content = data.map((product) => {
    return <ProductCard key={product.id} product={product}></ProductCard>;
  });

  return <div className=" flex flex-col gap-4 ">{content}</div>;
}
