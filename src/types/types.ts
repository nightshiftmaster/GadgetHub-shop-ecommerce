export type SingleProductType = {
  userId?: number;
  id?: number;
  title?: string;
  thumbnail?: string | undefined;
  description?: string;
  category?: string;
  price?: number;
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
