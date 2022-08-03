const paths = {
  home: '/',
  pricing: '/#pricing',
  features: '/#features',
  createPresentin: '/presentin/new',
  login: '/login',
  presentinMessage: (presentinId: string) => `${presentinId}/message`,
};

export default paths;
