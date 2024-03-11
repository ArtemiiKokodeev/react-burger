export type TIngredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number;
  count?: number;
};

export type TConstructorIngredient = TIngredient & { key: string };

export interface IUserInfoFormValues {
  name: string;
  email: string;
  password?: string;
}; 

export interface IOrderArr {
  ingredients: string[],
  _id: string,
  status: string,
  name: string,
  number: number,
  createdAt: string,
  updatedAt: string
}

export interface IMessageType {
  success: boolean,
  orders: IOrderArr[],
  total: number | null;
  totalToday: number | null;
}