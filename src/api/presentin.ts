import { ResponseFormat } from '@/types/api';
import { Presentin } from '@/types/presentin';
import { apiWithToken } from '.';

const createPresentin = (body: Record<string, any>) =>
  apiWithToken
    .post<ResponseFormat<Presentin>>('/presentins', body)
    .then((res) => res.data.data);

const editPresentin = (presentinId: string, body: Record<string, any>) =>
  apiWithToken.patch(`presentins/${presentinId}`, body).then((res) => res.data);

const createPresentinMessage = (
  presentinId: string,
  body: Record<string, any>
) =>
  apiWithToken
    .post(`/presentins/${presentinId}/messages`, body)
    .then((res) => res.data);

export { createPresentin, editPresentin, createPresentinMessage };
