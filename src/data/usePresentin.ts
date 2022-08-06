import { api } from '@/api';
import { Presentin } from '@/types/presentin';
import useSWR from 'swr';

const usePresentin = (presentinId: string) => {
  const { data, error, mutate } = useSWR<Presentin>(
    `/presentins/${presentinId}`,
    (url) => api.get(url).then((res) => res.data.data)
  );

  return {
    presentin: data,
    error,
    loading: !data && !error,
    mutate,
  };
};

export default usePresentin;
