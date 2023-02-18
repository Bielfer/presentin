const paths = {
  home: '/',
  pricing: '/#pricing',
  features: '/#features',
  createPresentin: '/presentin/new',
  login: '/login',
  dashboard: '/dashboard',
  withdraw: '/withdraw',
  presentinById: (presentinId: string) => `/presentin/${presentinId}`,
  presentinMessage: (presentinId: string) =>
    `/presentin/${presentinId}/message`,
  presentinRecipient: (presentinId: string) =>
    `/presentin/${presentinId}/recipient`,
  presentinSend: (presentinId: string) => `/presentin/${presentinId}/send`,
  presentinExample: '/presentin/example',
};

export const pathsLoggedIn = [
  { href: paths.dashboard, text: 'Presentins' },
  { href: paths.withdraw, text: 'Sacar Dinheiro' },
];

export const pixCopyPasteTutorial =
  'https://www.youtube.com/watch?v=SrkmHyZXcgM';

export default paths;
