import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Product } from "../../types";
import { fetcher, QueryKeys } from "../../queryClient";

const ProductDetail = () => {
  const { id } = useParams();
  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    fetcher({
      method: "GET",
      path: `/products/${id}`,
    })
  );

  if (!data) return null;

  const {
    category,
    description,
    title,
    image,
    price,
    rating: { count, rate },
  } = data;

  return (
    <li className="products-detail">
      <p className="products-detail_category">{category}</p>
      <p className="products-detail_title">{title}</p>
      <p className="products-detail_description">{description}</p>
      <img src={image} className="products-detail_image" />
      <span className="products-detail_price">${price}</span>
      <span className="products-detail_rating">
        {count}/{rate}
      </span>
    </li>
  );
};

export default ProductDetail;
