import { useQuery } from "react-query";
import { fetcher, QueryKeys } from "../../queryClient";
import { Product } from "../../types";
import ProductItem from "../../components/item";
import "../../scss/index.scss";

const ProductList = () => {
  const { data } = useQuery<Product[]>(QueryKeys.PRODUCTS, () =>
    fetcher({
      method: "GET",
      path: "/products",
    })
  );

  return (
    <>
      <div>상품목록</div>
      <ul className="products">
        {data?.map((item) => (
          <ProductItem {...item} key={item.id} />
        ))}
      </ul>
    </>
  );
};

export default ProductList;
