import { api } from '@/api';
import { Presentin } from '@/types/presentin';
import useSWR from 'swr';

const usePresentins = () => {
  const { data, error, mutate } = useSWR<Presentin[]>('/presentins/', (url) =>
    api.get(url).then((res) => res.data.data)
  );

  return {
    presentins: data,
    error,
    loading: !data && !error,
    mutate,
  };
};

export default usePresentins;
