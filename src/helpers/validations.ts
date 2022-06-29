const validationMessages = {
  email: 'Insira um email válido',
  required: 'Campo obrigatório',
};

export const validationMessage = (type: keyof typeof validationMessages) =>
  validationMessages[type];

export const temp = {};
