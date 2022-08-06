const paths = {
  home: '/',
  pricing: '/#pricing',
  features: '/#features',
  createPresentin: '/presentin/new',
  login: '/login',
  dashboard: '/dashboard',
  presentinById: (presentinId: string) => `/presentin/${presentinId}`,
  presentinMessage: (presentinId: string) =>
    `/presentin/${presentinId}/message`,
  presentinRecipient: (presentinId: string) =>
    `/presentin/${presentinId}/recipient`,
  presentinSend: (presentinId: string) => `/presentin/${presentinId}/send`,
  presentinExample: '/presentin/example',
};

export default paths;
