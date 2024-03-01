export type SingleProductType = {
  _id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: [string];
  generalCategory: string;
  quantity: number;
};

export type ProductsType = SingleProductType[];

// form types
export interface MyFormValues {
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  additionalInfo?: string;
}

export type UserType = {
  img: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  mobileNumber: string;
  country: string;
  city: string;
  address: string;
  password: string;
  orders: [ProductsType];
  wishlist: ProductsType;
};

export type OrderType = {
  total: number;
  order: ProductsType;
};
