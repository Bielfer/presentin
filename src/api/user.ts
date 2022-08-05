import { ResponseFormat } from '@/types/api';
import { User } from '@/types/user';
import { apiWithToken } from '.';

const createUser = (body: Record<string, any>) =>
  apiWithToken
    .post<ResponseFormat<User>>('/users', body)
    .then((res) => res.data.data);

const getUser = () =>
  apiWithToken.get<ResponseFormat<User>>('/user').then((res) => res.data.data);

export { createUser, getUser };
