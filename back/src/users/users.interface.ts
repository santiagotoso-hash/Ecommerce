export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  country: string;
  city: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  country: string;
  city: string;
}
