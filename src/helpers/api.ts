import axios from 'axios';

const api = axios;

export default api;

const fetcher = (url: string) => api.get(url).then((res) => res.data);

const swrConfig = {
  fetcher,
};

export { fetcher, swrConfig };
