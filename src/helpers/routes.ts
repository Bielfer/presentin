const routes = {
  home: '/',
  pricing: '/#pricing',
  features: '/#features',
  createPresentin: '/presentin/new',
};

export const getRoute = (type: keyof typeof routes) => routes[type];

export const temp = {};
