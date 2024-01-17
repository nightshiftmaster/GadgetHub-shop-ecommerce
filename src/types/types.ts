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
};

export type ProductsType = SingleProductType[];

// form types
export interface MyFormValues {
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  emailAdress?: string;
  deliveryAdress?: string;
  cityName?: string;
  country?: string;
  additionalInfo?: string;
}

export interface MyFormTouched {
  firstName?: boolean;
  lastName?: boolean;
  mobileNumber?: boolean;
  emailAdress?: boolean;
  deliveryAdress?: boolean;
  cityName?: boolean;
  country?: boolean;
  additionalInfo?: boolean;
}
