import { api } from '@/api';
import useSWR from 'swr';

const usePresentinMessages = (presentinId: string) => {
  const { data, error, mutate } = useSWR(
    `/presentins/${presentinId}/messages`,
    (url) => api.get(url).then((res) => res.data.data)
  );

  return {
    messages: data,
    error,
    loading: !data && !error,
    mutate,
  };
};

export default usePresentinMessages;
