const paths = {
  home: '/',
  pricing: '/#pricing',
  features: '/#features',
  createPresentin: '/presentin/new',
  login: '/login',
  presentinById: (presentinId: string) => `/presentin/${presentinId}`,
  presentinMessage: (presentinId: string) =>
    `/presentin/${presentinId}/message`,
};

export default paths;
