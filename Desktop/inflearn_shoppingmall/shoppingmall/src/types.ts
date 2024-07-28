type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
};

/**
 * interface 와 type 차이
 *
 * interface 는 union이 되지 않는다.
 */
