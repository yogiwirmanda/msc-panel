export type LoginForm = {
  username?: string;
  password?: string;
  email?: string;
  password_confirm?: string;
}

export type RegisterForm = {
  name: string;
  nickname: string;
  username: string;
  phone_number: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  address: string;
  birthdate: any;
  gender: string;
  profession: { name: string; code: string } | null;
  last_education: { name: string; code: string } | null;
  consent: string;
}